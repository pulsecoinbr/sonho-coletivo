import React, { useState } from 'react';
import { CloudHeartIcon } from '../components/icons';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: "Como Funciona",
    question: "O que é a Sonho Coletivo?",
    answer: "A Sonho Coletivo é uma plataforma online que permite a qualquer pessoa criar uma campanha de arrecadação de fundos (vaquinha) para realizar sonhos, apoiar causas ou superar dificuldades."
  },
  {
    category: "Como Funciona",
    question: "É seguro doar pela Sonho Coletivo?",
    answer: "Sim! Utilizamos as melhores tecnologias de segurança para pagamentos online. Todas as transações são criptografadas e seus dados estão seguros conosco."
  },
  {
    category: "Criação da Campanha",
    question: "Quem pode criar uma campanha?",
    answer: "Qualquer pessoa física maior de 18 anos ou pessoa jurídica com CNPJ ativo pode criar uma campanha na Sonho Coletivo."
  },
  {
    category: "Criação da Campanha",
    question: "Quanto custa criar uma campanha?",
    answer: "Criar uma campanha é totalmente gratuito. A Sonho Coletivo retém uma pequena taxa administrativa apenas sobre o valor arrecadado, para mantermos a plataforma no ar."
  },
   {
    category: "Criação da Campanha",
    question: "Como defino a meta da minha campanha?",
    answer: "Sua meta deve ser o valor total que você precisa para atingir seu objetivo. Pesquise os custos, faça um orçamento detalhado e seja transparente na descrição da campanha sobre como o dinheiro será usado."
  },
  {
    category: "Resgate de Dinheiro",
    question: "Como faço para sacar o dinheiro arrecadado?",
    answer: "Você pode solicitar o saque dos valores arrecadados diretamente no seu painel de controle ('Minha Conta'). O valor será transferido para a conta bancária cadastrada, que deve estar vinculada ao mesmo CPF/CNPJ do criador da campanha."
  },
  {
    category: "Resgate de Dinheiro",
    question: "Preciso atingir a meta para sacar o dinheiro?",
    answer: "Não. Você pode solicitar o saque a qualquer momento, independentemente de ter atingido a meta ou não. O valor disponível para saque será o total arrecadado menos as taxas administrativas."
  },
  {
    category: "Doações",
    question: "Quais são as formas de pagamento?",
    answer: "Aceitamos doações via Cartão de Crédito e Boleto Bancário. Estamos trabalhando para adicionar PIX em breve."
  },
   {
    category: "Doações",
    question: "Posso doar de forma anônima?",
    answer: "Sim. Ao fazer uma doação, você terá a opção de torná-la anônima. Nesse caso, seu nome não será exibido na lista pública de doadores da campanha."
  },
];

const HelpPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [...new Set(faqs.map(faq => faq.category))];

    return (
        <div className="bg-brand-light">
            <div className="text-center bg-white py-12 px-4">
                 <CloudHeartIcon className="h-12 w-12 text-brand-primary mx-auto" />
                 <h1 className="text-3xl font-bold text-gray-800 mt-4">Como podemos ajudar?</h1>
                 <div className="mt-4 max-w-xl mx-auto">
                    <input 
                        type="text"
                        placeholder="Procurar por uma resposta..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-brand-accent focus:border-brand-accent"
                    />
                 </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Categorias</h2>
                        <ul className="space-y-2">
                           {categories.map(category => (
                                <li key={category}>
                                    <a href={`#${category.replace(/\s+/g, '-')}`} className="text-brand-primary hover:underline">{category}</a>
                                </li>
                           ))}
                        </ul>
                        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-semibold text-gray-800">Ainda com dúvidas?</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Entre em contato com nossa equipe de suporte pelo e-mail: <a href="mailto:contato@sonhocoletivo.com.br" className="font-semibold text-brand-primary hover:underline break-all">contato@sonhocoletivo.com.br</a>
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                         {searchTerm ? (
                             <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultados da Busca</h2>
                                {filteredFaqs.length > 0 ? filteredFaqs.map((faq, index) => (
                                     <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                                        <p className="text-gray-600 mt-1">{faq.answer}</p>
                                    </div>
                                )) : <p className="text-gray-600">Nenhum resultado encontrado para "{searchTerm}".</p>}
                             </div>
                         ) : (
                             categories.map(category => (
                                <div key={category} id={category.replace(/\s+/g, '-')} className="mb-10">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">{category}</h2>
                                    <div className="space-y-4">
                                    {faqs.filter(f => f.category === category).map((faq, index) => (
                                         <details key={index} className="bg-white p-4 rounded-lg shadow-sm cursor-pointer">
                                            <summary className="font-semibold text-gray-900">{faq.question}</summary>
                                            <p className="text-gray-600 mt-2">{faq.answer}</p>
                                        </details>
                                    ))}
                                    </div>
                                </div>
                             ))
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelpPage;