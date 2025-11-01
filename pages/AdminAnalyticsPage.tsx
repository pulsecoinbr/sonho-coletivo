import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudHeartIcon, BarChartIcon, UsersIcon, CampaignsIcon, DollarSignIcon, TrendingUpIcon, TrendingDownIcon, CalendarIcon } from '../components/icons';

interface AnalyticsData {
    totalUsers: number;
    newUsers: number;
    totalCampaigns: number;
    activeCampaigns: number;
    totalDonations: number;
    totalRevenue: number;
    monthlyStats: {
        month: string;
        users: number;
        campaigns: number;
        donations: number;
        revenue: number;
    }[];
    topCampaigns: {
        id: string;
        title: string;
        donations: number;
        revenue: number;
    }[];
    userGrowth: {
        date: string;
        count: number;
    }[];
    donationTrends: {
        date: string;
        count: number;
        amount: number;
    }[];
}

const AdminAnalyticsPage: React.FC = () => {
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<string>('30days');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if admin is logged in
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn !== 'true') {
            navigate('/admin/login');
            return;
        }

        // Load mock analytics data
        const mockData: AnalyticsData = {
            totalUsers: 156,
            newUsers: 12,
            totalCampaigns: 23,
            activeCampaigns: 18,
            totalDonations: 89,
            totalRevenue: 125000,
            monthlyStats: [
                { month: 'Jan', users: 45, campaigns: 8, donations: 25, revenue: 35000 },
                { month: 'Fev', users: 52, campaigns: 10, donations: 30, revenue: 42000 },
                { month: 'Mar', users: 61, campaigns: 12, donations: 35, revenue: 48000 },
                { month: 'Abr', users: 78, campaigns: 15, donations: 42, revenue: 55000 },
                { month: 'Mai', users: 89, campaigns: 18, donations: 48, revenue: 62000 },
                { month: 'Jun', users: 102, campaigns: 20, donations: 55, revenue: 68000 },
                { month: 'Jul', users: 118, campaigns: 22, donations: 62, revenue: 75000 },
                { month: 'Ago', users: 134, campaigns: 23, donations: 68, revenue: 82000 },
                { month: 'Set', users: 145, campaigns: 23, donations: 74, revenue: 89000 },
                { month: 'Out', users: 156, campaigns: 23, donations: 80, revenue: 95000 },
                { month: 'Nov', users: 168, campaigns: 23, donations: 85, revenue: 102000 },
                { month: 'Dez', users: 180, campaigns: 23, donations: 89, revenue: 125000 }
            ],
            topCampaigns: [
                { id: '1', title: 'Ajude a construir um novo parquinho para as crianças', donations: 45, revenue: 37500 },
                { id: '2', title: 'Recuperação do Quiosque do Sr. João pós-enchente', donations: 32, revenue: 48600 },
                { id: '3', title: 'Vencendo a tetraplegia: Fisioterapia para o Marcos', donations: 28, revenue: 56000 },
                { id: '4', title: 'Cirurgia para o cachorro Toby', donations: 15, revenue: 9750 },
                { id: '5', title: 'Material escolar para crianças carentes', donations: 12, revenue: 14400 }
            ],
            userGrowth: [
                { date: '2024-01-01', count: 10 },
                { date: '2024-01-02', count: 12 },
                { date: '2024-01-03', count: 15 },
                { date: '2024-01-04', count: 18 },
                { date: '2024-01-05', count: 22 },
                { date: '2024-01-06', count: 25 },
                { date: '2024-01-07', count: 28 },
                { date: '2024-01-08', count: 32 },
                { date: '2024-01-09', count: 35 },
                { date: '2024-01-10', count: 38 },
                { date: '2024-01-11', count: 42 },
                { date: '2024-01-12', count: 45 },
                { date: '2024-01-13', count: 48 },
                { date: '2024-01-14', count: 52 },
                { date: '2024-01-15', count: 55 }
            ],
            donationTrends: [
                { date: '2024-01-01', count: 2, amount: 300 },
                { date: '2024-01-02', count: 3, amount: 450 },
                { date: '2024-01-03', count: 4, amount: 600 },
                { date: '2024-01-04', count: 5, amount: 750 },
                { date: '2024-01-05', count: 6, amount: 900 },
                { date: '2024-01-06', count: 7, amount: 1050 },
                { date: '2024-01-07', count: 8, amount: 1200 },
                { date: '2024-01-08', count: 9, amount: 1350 },
                { date: '2024-01-09', count: 10, amount: 1500 },
                { date: '2024-01-10', count: 11, amount: 1650 },
                { date: '2024-01-11', count: 12, amount: 1800 },
                { date: '2024-01-12', count: 13, amount: 1950 },
                { date: '2024-01-13', count: 14, amount: 2100 },
                { date: '2024-01-14', count: 15, amount: 2250 },
                { date: '2024-01-15', count: 16, amount: 2400 }
            ]
        };

        setTimeout(() => {
            setAnalyticsData(mockData);
            setIsLoading(false);
        }, 1000);
    }, [navigate, selectedPeriod]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const getGrowthPercentage = (current: number, previous: number) => {
        if (previous === 0) return 0;
        return Math.round(((current - previous) / previous) * 100);
    };

    const getGrowthIcon = (percentage: number) => {
        if (percentage > 0) return TrendingUpIcon;
        if (percentage < 0) return TrendingDownIcon;
        return null;
    };

    const getGrowthColor = (percentage: number) => {
        if (percentage > 0) return 'text-green-600';
        if (percentage < 0) return 'text-red-600';
        return 'text-gray-600';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando estatísticas...</p>
                </div>
            </div>
        );
    }

    if (!analyticsData) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Erro ao carregar dados de analytics.</p>
                </div>
            </div>
        );
    }

    const userGrowth = getGrowthPercentage(analyticsData.totalUsers, analyticsData.totalUsers - analyticsData.newUsers);
    const userGrowthIcon = getGrowthIcon(userGrowth);
    const userGrowthColor = getGrowthColor(userGrowth);

    const revenueGrowth = getGrowthPercentage(analyticsData.totalRevenue, 95000);
    const revenueGrowthIcon = getGrowthIcon(revenueGrowth);
    const revenueGrowthColor = getGrowthColor(revenueGrowth);

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
                            <Link to="/admin" className="text-sm text-gray-600 hover:text-gray-900">
                                ← Voltar
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <BarChartIcon className="h-8 w-8 text-indigo-600 mr-3" />
                            <h1 className="text-3xl font-bold text-gray-900">Estatísticas</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                            >
                                <option value="7days">Últimos 7 dias</option>
                                <option value="30days">Últimos 30 dias</option>
                                <option value="90days">Últimos 90 dias</option>
                                <option value="1year">Último ano</option>
                            </select>
                        </div>
                    </div>
                    <p className="text-gray-600">Métricas e análise de desempenho da plataforma</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Usuários Totais</p>
                                <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalUsers}</p>
                                <div className="flex items-center mt-2">
                                    {userGrowthIcon && <userGrowthIcon className="h-4 w-4 mr-1" />}
                                    <span className={`text-sm ${userGrowthColor}`}>
                                        +{userGrowth}% este mês
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <UsersIcon className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Campanhas Ativas</p>
                                <p className="text-2xl font-semibold text-gray-900">{analyticsData.activeCampaigns}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-sm text-green-600">
                                        +{(analyticsData.activeCampaigns / analyticsData.totalCampaigns * 100).toFixed(1)}% ativas
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <CampaignsIcon className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Doações Realizadas</p>
                                <p className="text-2xl font-semibold text-gray-900">{analyticsData.totalDonations}</p>
                                <div className="flex items-center mt-2">
                                    <span className="text-sm text-blue-600">
                                        +{Math.round(analyticsData.totalDonations / analyticsData.totalCampaigns)} por campanha
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <DollarSignIcon className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Receita Total</p>
                                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(analyticsData.totalRevenue)}</p>
                                <div className="flex items-center mt-2">
                                    {revenueGrowthIcon && <revenueGrowthIcon className="h-4 w-4 mr-1" />}
                                    <span className={`text-sm ${revenueGrowthColor}`}>
                                        +{revenueGrowth}% este mês
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <DollarSignIcon className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Monthly Stats Chart */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução Mensal</h3>
                        <div className="space-y-4">
                            {analyticsData.monthlyStats.slice(-6).map((stat, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">{stat.month}</span>
                                        <span className="font-medium">{formatCurrency(stat.revenue)}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-brand-secondary h-2 rounded-full" 
                                            style={{ width: `${(stat.revenue / 125000) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Campaigns */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campanhas Mais Populares</h3>
                        <div className="space-y-4">
                            {analyticsData.topCampaigns.map((campaign, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 truncate">{campaign.title}</p>
                                        <p className="text-xs text-gray-500">{campaign.donations} doações</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">{formatCurrency(campaign.revenue)}</p>
                                        <p className="text-xs text-green-600">+{Math.round(campaign.revenue / campaign.donations)} médio</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* User Growth and Donation Trends */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Growth */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crescimento de Usuários</h3>
                        <div className="space-y-3">
                            {analyticsData.userGrowth.slice(-7).map((growth, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{growth.date}</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-500 h-2 rounded-full" 
                                                style={{ width: `${(growth.count / 55) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{growth.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Donation Trends */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendências de Doações</h3>
                        <div className="space-y-3">
                            {analyticsData.donationTrends.slice(-7).map((trend, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">{trend.date}</span>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-20 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-500 h-2 rounded-full" 
                                                style={{ width: `${(trend.amount / 2400) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{formatCurrency(trend.amount)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalyticsPage;