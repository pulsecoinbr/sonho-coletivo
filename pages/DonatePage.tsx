import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import InputField from '../components/InputField';
import { CreditCardIcon, BarcodeIcon, ArrowLeftIcon, CheckCircleIcon } from '../components/icons';
import { Campaign, PaymentMethod, Donation } from '../types';
import { createBoletoPayment, Safe2PayResponse, BoletoPaymentData } from '../services/safe2pay';

const DonatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { campaigns, addDonation, currentUser } = useContext(AppContext);
  
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number | ''>('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('boleto'); // Default to boleto
  const [message, setMessage] = useState('');
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [paymentError, setPaymentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [boletoLink, setBoletoLink] = useState('');
  const [digitableLine, setDigitableLine] = useState('');

  const [formData, setFormData] = useState({
    name: '', cpf: '', phone: '', email: '', isAnonymous: false, isCompany: false,
    zip: '', state: '', city: '', district: '', street: '', number: '', complement: '',
  });

  useEffect(() => {
    const foundCampaign = campaigns.find(c => c.id === id);
    if (foundCampaign) setCampaign(foundCampaign);
    else navigate('/');
  }, [id, campaigns, navigate]);
  
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
        cpf: currentUser.cpf,
        phone: currentUser.phone,
        zip: currentUser.address?.zip || '',
        street: currentUser.address?.street || '',
        number: currentUser.address?.number || '',
        complement: currentUser.address?.complement || '',
        district: currentUser.address?.district || '',
        city: currentUser.address?.city || '',
        state: currentUser.address?.state || '',
      }));
    }
  }, [currentUser]);

  useEffect(() => {
      if (step === 5) {
          const timer = setTimeout(() => navigate(`/campaign/${id}`), 4000);
          return () => clearTimeout(timer);
      }
  }, [step, navigate, id]);

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
    setStep(2);
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, '');
      setCustomAmount(value);
      setAmount(value ? parseFloat(value) / 100 : '');
  };

  const handleProceedFromAmount = () => {
    if (amount && amount >= 5) {
      setStep(2);
    } else {
      alert("O valor mínimo da doação é R$ 5,00.");
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const checked = isCheckbox ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({ ...prev, [name]: isCheckbox ? checked : value }));
  };

  const processDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentError('');

    try {
      if (!campaign) {
        setPaymentError('Campanha não encontrada.');
        setIsSubmitting(false);
        return;
      }

      // Prepare Safe2Pay payment data
      const paymentData: BoletoPaymentData = {
        IsSandbox: true,
        Customer: {
          Name: formData.name,
          Identity: formData.cpf.replace(/\D/g, ''),
          Email: formData.email,
          Phone: formData.phone.replace(/\D/g, ''),
          Address: {
            ZipCode: formData.zip.replace(/\D/g, ''),
            Street: formData.street,
            Number: formData.number,
            District: formData.district,
            CityName: formData.city,
            StateInitials: formData.state,
            CountryName: "Brasil"
          }
        },
        Products: [
          {
            Description: "Donation",
            UnitPrice: Number(amount),
            Quantity: 1
          }
        ],
        PaymentObject: {
          DueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
          Instruction: "Payable until the due date.",
          CancelAfterDue: true
        },
        PaymentMethod: "1", // 1 for boleto
        Application: "Sonho Coletivo",
        CallbackUrl: "https://sonhocoletivo.com.br/api/callback/safe2pay",
        Reference: `DONATION_${campaign.id}_${Date.now()}`
      };

      console.log('Payment data prepared:', paymentData);

      const response: Safe2PayResponse = await createBoletoPayment(paymentData);
      
      console.log('Safe2Pay response received:', response);
      
      if (response.HasError) {
        setPaymentError(response.Message || 'Erro ao gerar boleto. Por favor, tente novamente.');
        setIsSubmitting(false);
        return;
      }

      // Save donation data
      const donationData: Donation = {
        campaignId: campaign.id,
        amount: Number(amount),
        donor: {
          name: formData.name, 
          email: formData.email, 
          phone: formData.phone, 
          cpf: formData.cpf,
          address: {
            zip: formData.zip, 
            street: formData.street, 
            number: formData.number,
            complement: formData.complement, 
            district: formData.district,
            city: formData.city, 
            state: formData.state,
          },
        },
        paymentMethod: 'boleto',
        message: message,
        isAnonymous: formData.isAnonymous,
        boletoLink: response.ResponseDetail.LinkBoleto,
      };
      
      addDonation(donationData);

      // Store reference and transaction ID for future reconciliation
      if (response.ResponseDetail.Id) {
        console.log('Transaction ID:', response.ResponseDetail.Id);
        console.log('Reference:', paymentData.Reference);
      }

      // Set boleto link and digitable line if available
      if (response.ResponseDetail.LinkBoleto) {
        setBoletoLink(response.ResponseDetail.LinkBoleto);
      }
      if (response.ResponseDetail.DigitableLine) {
        setDigitableLine(response.ResponseDetail.DigitableLine);
      }

      setStep(5); // Success page
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentError('Erro ao processar pagamento. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };
  
  if (!campaign) return <div>Carregando...</div>;

  const renderStep = () => {
    switch (step) {
      case 1: // Amount
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Com quanto você deseja contribuir?</h2>
            <p className="text-gray-600 mb-6">Sua doação para "{campaign.title}" faz toda a diferença.</p>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[25, 50, 100].map(val => (
                <button key={val} onClick={() => handleAmountSelect(val)} className="py-4 px-2 border border-gray-300 rounded-lg text-lg font-bold text-gray-700 hover:border-brand-accent hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent">
                  R$ {val}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">R$</span>
              <input type="text" value={customAmount} onChange={handleCustomAmountChange} placeholder="Outro Valor" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-lg text-center focus:ring-brand-accent focus:border-brand-accent" />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Valor mínimo: R$ 5,00</p>
            <button onClick={handleProceedFromAmount} disabled={!amount} className="w-full mt-6 bg-brand-accent text-white font-bold py-3 rounded-lg text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">Próximo Passo</button>
          </div>
        );
      case 2: // Identification
        return (
            <div className="space-y-4">
                 <h2 className="text-2xl font-bold text-gray-800 mb-4">Identificação</h2>
                <InputField id="name" label="Nome Completo *" name="name" value={formData.name} onChange={handleFormChange} required placeholder="Nome completo como consta em seu CPF"/>
                <div className="grid grid-cols-2 gap-4">
                    <InputField id="cpf" label="CPF *" name="cpf" value={formData.cpf} onChange={handleFormChange} required />
                    <InputField id="phone" label="Celular *" name="phone" value={formData.phone} onChange={handleFormChange} required placeholder="Informe o seu celular ou..." />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="isAnonymous" name="isAnonymous" checked={formData.isAnonymous} onChange={handleFormChange} className="h-4 w-4 text-brand-accent border-gray-300 rounded focus:ring-brand-accent" />
                    <label htmlFor="isAnonymous" className="ml-2 text-sm text-gray-600">Não divulgar meu nome na lista de doadores.</label>
                </div>
                <InputField id="email" label="E-mail *" name="email" type="email" value={formData.email} onChange={handleFormChange} required placeholder="Informe o seu melhor e-mail"/>
                <div className="flex justify-between pt-4">
                    <button onClick={() => setStep(1)} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                    <button onClick={() => setStep(3)} className="px-6 py-2 bg-brand-accent text-white font-bold rounded-md hover:opacity-90">Próximo Passo</button>
                </div>
            </div>
        );
      case 3: // Address
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Endereço</h2>
                <div className="grid grid-cols-2 gap-4">
                    <InputField id="zip" label="CEP *" name="zip" value={formData.zip} onChange={handleFormChange} required />
                    <InputField id="state" label="Estado *" name="state" value={formData.state} onChange={handleFormChange} required placeholder="Estado onde você mora" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField id="city" label="Cidade *" name="city" value={formData.city} onChange={handleFormChange} required placeholder="Cidade onde você mora" />
                    <InputField id="district" label="Bairro *" name="district" value={formData.district} onChange={handleFormChange} required placeholder="Informe o bairro onde você mora" />
                </div>
                <InputField id="street" label="Endereço *" name="street" value={formData.street} onChange={handleFormChange} required placeholder="Informe a rua/avenida onde você mora" />
                <div className="grid grid-cols-2 gap-4">
                    <InputField id="number" label="Número *" name="number" value={formData.number} onChange={handleFormChange} required />
                    <InputField id="complement" label="Complemento" name="complement" value={formData.complement} onChange={handleFormChange} placeholder="Exemplo: Bloco 15, AP 2" />
                </div>
                <div className="flex justify-between pt-4">
                    <button onClick={() => setStep(2)} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                    <button onClick={() => setStep(4)} className="px-6 py-2 bg-brand-accent text-white font-bold rounded-md hover:opacity-90">Próximo Passo</button>
                </div>
            </div>
        );
      case 4: // Payment Method Selection
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Forma de Pagamento</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  type="button" 
                  onClick={() => setPaymentMethod('boleto')} 
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg ${paymentMethod === 'boleto' ? 'border-brand-accent ring-2 ring-brand-accent' : 'border-gray-300'}`}
                >
                    <BarcodeIcon className="h-8 w-8 text-gray-600 mb-2" /> 
                    <span className="font-semibold">Boleto Bancário</span>
                </button>
            </div>
            
            <div className="p-4 border rounded-lg bg-gray-50 text-center">
                <p>O boleto será gerado e enviado para o seu e-mail.</p>
            </div>

            {paymentError && (
              <div className="mt-4 p-4 bg-red-600 text-white rounded-md text-sm font-semibold text-center">
                {paymentError}
              </div>
            )}

            <div className="flex justify-between pt-6">
                <button type="button" onClick={() => setStep(3)} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                <button type="submit" form="donationForm" disabled={isSubmitting} className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 disabled:opacity-50">
                    {isSubmitting ? 'Processando...' : `Doar R$ ${Number(amount).toFixed(2)}`}
                </button>
            </div>
          </div>
        );
      case 5: // Success
        return (
          <div className="text-center py-10">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Obrigado pela sua doação!</h2>
            <p className="text-gray-600 mt-2">Sua contribuição de <span className="font-bold">R$ {Number(amount).toFixed(2)}</span> para "{campaign.title}" foi processada com sucesso.</p>
            
            {boletoLink && (
              <div className="mt-6">
                <p className="text-gray-600 mb-4">Clique no botão abaixo para acessar e imprimir seu boleto:</p>
                <a 
                  href={boletoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-brand-accent text-white font-bold rounded-md hover:opacity-90 transition-opacity"
                >
                  Acessar Boleto
                </a>
              </div>
            )}
            
            {digitableLine && (
              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Linha Digitável:</p>
                <p className="font-mono text-sm break-all">{digitableLine}</p>
              </div>
            )}
            
            <p className="mt-6 text-sm text-gray-500">Você também receberá o boleto por e-mail.</p>
            <p className="mt-4 text-sm">Redirecionando para a página da campanha...</p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(`/campaign/${id}`)} className="flex items-center text-sm font-medium text-gray-600 hover:text-brand-primary mb-4">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Voltar
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <form id="donationForm" onSubmit={processDonation}>
              {renderStep()}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;