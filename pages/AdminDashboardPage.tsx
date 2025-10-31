import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    CloudHeartIcon, 
    UsersIcon, 
    CampaignsIcon, 
    FinancialIcon, 
    SettingsIcon,
    BarChartIcon,
    ImageIcon,
    PaletteIcon,
    MessageSquareIcon
} from '../components/icons';

interface AdminStats {
    totalUsers: number;
    totalCampaigns: number;
    totalDonations: number;
    totalRevenue: number;
}

const AdminDashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<AdminStats>({
        totalUsers: 0,
        totalCampaigns: 0,
        totalDonations: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        // Check if admin is logged in
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn !== 'true') {
            navigate('/admin/login');
            return;
        }

        // Mock stats - in real app, this would come from API
        setStats({
            totalUsers: 156,
            totalCampaigns: 23,
            totalDonations: 89,
            totalRevenue: 125000
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('adminEmail');
        navigate('/admin/login');
    };

    const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
                <div className={`p-3 rounded-full ${color}`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/admin" className="flex items-center space-x-2 text-2xl font-bold text-brand-primary">
                                <CloudHeartIcon className="h-8 w-8 text-brand-secondary" />
                                <span>Painel Administrativo — Sonho Coletivo</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Administrador</span>
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-2 text-gray-600">Bem-vindo ao painel administrativo da plataforma Sonho Coletivo</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        title="Total de Usuários" 
                        value={stats.totalUsers.toString()} 
                        icon={UsersIcon} 
                        color="bg-blue-500"
                    />
                    <StatCard 
                        title="Campanhas Ativas" 
                        value={stats.totalCampaigns.toString()} 
                        icon={CampaignsIcon} 
                        color="bg-green-500"
                    />
                    <StatCard 
                        title="Doações Realizadas" 
                        value={stats.totalDonations.toString()} 
                        icon={FinancialIcon} 
                        color="bg-purple-500"
                    />
                    <StatCard 
                        title="Receita Total" 
                        value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR')}`} 
                        icon={BarChartIcon} 
                        color="bg-orange-500"
                    />
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link to="/admin/visual-identity" className="group">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <PaletteIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="ml-4 text-lg font-semibold text-gray-900">Identidade Visual</h3>
                            </div>
                            <p className="text-gray-600">Configure logo, favicon e cores do tema</p>
                        </div>
                    </Link>

                    <Link to="/admin/images-banners" className="group">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <ImageIcon className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="ml-4 text-lg font-semibold text-gray-900">Imagens e Banners</h3>
                            </div>
                            <p className="text-gray-600">Gerencie banners e imagens do site</p>
                        </div>
                    </Link>

                    <Link to="/admin/users" className="group">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <UsersIcon className="h-6 w-6 text-purple-600" />
                                </div>
                                <h3 className="ml-4 text-lg font-semibold text-gray-900">Usuários</h3>
                            </div>
                            <p className="text-gray-600">Gerencie usuários e permissões</p>
                        </div>
                    </Link>

                    <Link to="/admin/campaigns" className="group">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-orange-100 rounded-full">
                                    <CampaignsIcon className="h-6 w-6 text-orange-600" />
                                </div>
                                <h3 className="ml-4 text-lg font-semibold text-gray-900">Campanhas</h3>
                            </div>
                            <p className="text-gray-600">Gerencie campanhas de vaquinha</p>
                        </div>
                    </Link>

                    <Link to="/admin/donations" className="group">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-red-100 rounded-full">
                                    <FinancialIcon className="h-6 w-6 text-red-600" />
                                </div>
                                <h3 className="ml-4 text-lg font-semibold text-gray-900">Doações</h3>
                            </div>
                            <p className="text-gray-600">Controle financeiro e relatórios</p>
                        </div>
                    </Link>

                    <Link to="/admin/analytics" className="group">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-indigo-100 rounded-full">
                                    <BarChartIcon className="h-6 w-6 text-indigo-600" />
                                </div>
                                <h3 className="ml-4 text-lg font-semibold text-gray-900">Estatísticas</h3>
                            </div>
                            <p className="text-gray-600">Acessos e métricas do site</p>
                        </div>
                    </Link>

                    <Link to="/admin/settings" className="group">
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center mb-4">
                                <div className="p-3 bg-gray-100 rounded-full">
                                    <SettingsIcon className="h-6 w-6 text-gray-600" />
                                </div>
                                <h3 className="ml-4 text-lg font-semibold text-gray-900">Configurações</h3>
                            </div>
                            <p className="text-gray-600">Configurações gerais do site</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;