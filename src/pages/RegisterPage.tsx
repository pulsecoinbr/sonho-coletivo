import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import InputField from '@/components/InputField';
import { CloudHeartIcon } from '@/components/icons';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { signUp } = useContext(AppContext);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        cpf: '',
        phone: '',
        dob: '',
        zip: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        state: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (step === 1) {
            if (formData.email !== formData.confirmEmail) {
                setError('Os e-mails não coincidem.');
                return;
            }
            if (formData.password.length < 6) {
                setError('A senha deve ter pelo menos 6 caracteres.');
                return;
            }
            setError('');
        }
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const { data, error } = await signUp(
                formData.email, 
                formData.password, 
                formData.firstName, 
                formData.lastName
            );
            
            if (error) {
                setError(error.message);
                return;
            }
            
            if (data.user) {
                navigate('/dashboard');
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro no cadastro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Link to="/" className="flex justify-center items-center space-x-2 text-3xl font-bold text-brand-primary">
                        <CloudHeartIcon className="h-10 w-10 text-brand-secondary" />
                        <span>Sonho Coletivo</span>
                    </Link>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        Crie sua conta
                    </h2>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-4 animate-fade-in">
                                <h3 className="text-lg font-medium text-center text-gray-600">Passo 1 de 3: Dados de Acesso</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField id="firstName" name="firstName" label="Nome" value={formData.firstName} onChange={handleInputChange} required />
                                    <InputField id="lastName" name="lastName" label="Sobrenome" value={formData.lastName} onChange={handleInputChange} required />
                                </div>
                                <InputField id="email" name="email" label="E-mail" type="email" value={formData.email} onChange={handleInputChange} required />
                                <InputField id="confirmEmail" name="confirmEmail" label="Confirme o E-mail" type="email" value={formData.confirmEmail} onChange={handleInputChange} required />
                                <InputField id="password" name="password" label="Senha" type="password" value={formData.password} onChange={handleInputChange} required />
                                <div className="flex justify-end">
                                    <button type="button" onClick={handleNext} className="px-6 py-2 bg-brand-accent text-white font-bold rounded-md hover:opacity-90">Próximo</button>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                             <div className="space-y-4 animate-fade-in">
                                <h3 className="text-lg font-medium text-center text-gray-600">Passo 2 de 3: Dados Pessoais</h3>
                                <InputField id="cpf" name="cpf" label="CPF" value={formData.cpf} onChange={handleInputChange} placeholder="000.000.000-00" required />
                                <InputField id="phone" name="phone" label="Celular" value={formData.phone} onChange={handleInputChange} placeholder="(00) 00000-0000" required />
                                <InputField id="dob" name="dob" label="Data de Nascimento" type="date" value={formData.dob} onChange={handleInputChange} required />
                                <div className="flex justify-between">
                                    <button type="button" onClick={handleBack} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                                    <button type="button" onClick={handleNext} className="px-6 py-2 bg-brand-accent text-white font-bold rounded-md hover:opacity-90">Próximo</button>
                                </div>
                             </div>
                        )}
                        {step === 3 && (
                             <div className="space-y-4 animate-fade-in">
                                <h3 className="text-lg font-medium text-center text-gray-600">Passo 3 de 3: Endereço</h3>
                                <InputField id="zip" name="zip" label="CEP" value={formData.zip} onChange={handleInputChange} required />
                                <InputField id="street" name="street" label="Rua" value={formData.street} onChange={handleInputChange} required />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField id="number" name="number" label="Número" value={formData.number} onChange={handleInputChange} required />
                                    <InputField id="complement" name="complement" label="Complemento" value={formData.complement} onChange={handleInputChange} />
                                </div>
                                <InputField id="district" name="district" label="Bairro" value={formData.district} onChange={handleInputChange} required />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField id="city" name="city" label="Cidade" value={formData.city} onChange={handleInputChange} required />
                                    <InputField id="state" name="state" label="Estado" value={formData.state} onChange={handleInputChange} maxLength={2} required />
                                </div>
                                <div className="flex justify-between mt-8">
                                    <button type="button" onClick={handleBack} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                                    <button 
                                        type="submit" 
                                        disabled={loading}
                                        className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                                    </button>
                                </div>
                            </div>
                        )}
                        {error && <p className="mt-2 text-sm text-red-600 text-center">{error}</p>}
                    </form>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="font-medium text-brand-primary hover:text-brand-secondary">
                        Faça login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;