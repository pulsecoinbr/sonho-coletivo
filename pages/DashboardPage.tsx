import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import ProgressBar from '../components/ProgressBar';
import {
    WithdrawIcon,
    CampaignsIcon,
    FinancialIcon,
    MyDataIcon,
    ReceivedDonationIcon,
    MadeDonationIcon
} from '../components/icons';

const DashboardPage: React.FC = () => {
    const { campaigns, currentUser } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login?redirect=/dashboard');
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        return <div className="text-center py-20">Carregando...</div>;
    }
    
    const userCampaigns = campaigns.filter(c => c.authorId === currentUser.id);

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    const DashboardButton: React.FC<{ Icon: React.ElementType, label: string, to: string }> = ({ Icon, label, to }) => (
        <Link to={to} className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all space-y-2">
            <Icon className="h-10 w-10 text-brand-primary" />
            <span className="text-sm font-semibold text-gray-700 text-center">{label}</span>
        </Link>
    );

    return (
        <div className="min-h-screen bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Olá, {currentUser.name}!</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <DashboardButton Icon={WithdrawIcon} label="Solicitar Saque" to="#" />
                    <DashboardButton Icon={CampaignsIcon} label="Minhas Campanhas" to="#" />
                    <DashboardButton Icon={FinancialIcon} label="Financeiro" to="#" />
                    <DashboardButton Icon={MyDataIcon} label="Meus Dados" to="#" />
                    <DashboardButton Icon={ReceivedDonationIcon} label="Doações Recebidas" to="#" />
                    <DashboardButton Icon={MadeDonationIcon} label="Doações Realizadas" to="#" />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-700">Minhas Campanhas</h2>
                         <Link to="/create" className="px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:opacity-90 transition-opacity">
                          + Nova Campanha
                        </Link>
                    </div>
                    {userCampaigns.length > 0 ? (
                        <div className="space-y-6">
                            {userCampaigns.map(campaign => (
                                <div key={campaign.id} className="border rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <img src={campaign.imageUrl} alt={campaign.title} className="w-full md:w-32 h-24 object-cover rounded-md"/>
                                    <div className="flex-grow">
                                        <Link to={`/campaign/${campaign.id}`} className="font-bold text-lg text-brand-primary hover:underline">{campaign.title}</Link>
                                        <div className="mt-2">
                                            <ProgressBar current={campaign.raised} goal={campaign.goal} />
                                            <div className="flex justify-between text-sm mt-1 text-gray-600">
                                                <span>{formatCurrency(campaign.raised)}</span>
                                                <span>Meta: {formatCurrency(campaign.goal)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 flex space-x-2 mt-4 md:mt-0">
                                        <button className="px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">Editar</button>
                                        <button className="px-3 py-1 text-xs font-semibold text-white bg-gray-500 rounded-md hover:bg-gray-600">Ver Doações</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 border-2 border-dashed rounded-lg">
                            <p className="text-gray-500">Você ainda não criou nenhuma campanha.</p>
                            <Link to="/create" className="mt-4 inline-block px-5 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:opacity-90">
                                Criar minha primeira campanha
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
