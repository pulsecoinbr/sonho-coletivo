import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorksPage: React.FC = () => {

    const StepCard: React.FC<{ number: number, title: string, description: string }> = ({ number, title, description }) => (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-brand-accent">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 flex-shrink-0 bg-brand-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {number}
                </div>
                <h3 className="ml-4 text-xl font-bold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-600">{description}</p>
        </div>
    );

    return (
        <div className="bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Como a Sonho Coletivo Funciona</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Arrecadar fundos para sua causa nunca foi tão fácil. Siga os três passos simples abaixo e comece a transformar seu sonho em realidade hoje mesmo.
                    </p>
                </div>

                <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-8">
                    <StepCard 
                        number={1} 
                        title="Crie sua Campanha"
                        description="É rápido, fácil e gratuito. Conte sua história, defina uma meta de arrecadação, adicione fotos e vídeos para inspirar doadores. Em poucos minutos, sua campanha estará no ar, pronta para receber apoio."
                    />
                    <StepCard 
                        number={2} 
                        title="Divulgue para Amigos"
                        description="O segredo do sucesso é a divulgação. Compartilhe o link da sua campanha nas redes sociais, WhatsApp e e-mail. Mobilize sua rede de contatos e incentive-os a compartilhar também. Quanto mais pessoas souberem, maior a chance de atingir sua meta."
                    />
                    <StepCard 
                        number={3} 
                        title="Receba as Doações"
                        description="Acompanhe o progresso da sua campanha em tempo real pelo seu painel. Você pode solicitar o saque do dinheiro arrecadado a qualquer momento, de forma segura e direta para sua conta bancária, sem precisar atingir a meta."
                    />
                </div>

                <div className="mt-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">Pronto para começar?</h2>
                    <p className="mt-3 text-gray-600">Junte-se a milhares de pessoas que já realizaram seus sonhos com a nossa ajuda.</p>
                     <Link to="/create" className="mt-8 inline-block px-10 py-4 text-lg font-medium text-white bg-brand-accent rounded-md hover:opacity-90 transition-opacity shadow-lg">
                        Criar minha campanha agora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;