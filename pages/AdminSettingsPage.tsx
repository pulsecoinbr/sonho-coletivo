import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudHeartIcon, SettingsIcon, SaveIcon, BellIcon, MailIcon, ShieldIcon, GlobeIcon } from '../components/icons';

interface SiteSettings {
    siteName: string;
    siteDescription: string;
    siteUrl: string;
    contactEmail: string;
    supportEmail: string;
    adminEmail: string;
    currency: string;
    language: string;
    timezone: string;
    features: {
        allowAnonymousDonations: boolean;
        requireVerification: boolean;
        enableComments: boolean;
        enableSocialShare: boolean;
    };
    payment: {
        safe2payApiKey: string;
        safe2paySecretKey: string;
        sandboxMode: boolean;
    };
}

const AdminSettingsPage: React.FC = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<SiteSettings>({
        siteName: 'Sonho Coletivo',
        siteDescription: 'Plataforma de crowdfunding para apoiar causas e realizar sonhos',
        siteUrl: 'https://sonhocoletivo.com.br',
        contactEmail: 'contato@sonhocoletivo.com.br',
        supportEmail: 'suporte@sonhocoletivo.com.br',
        adminEmail: 'admin@sonhocoletivo.com.br',
        currency: 'BRL',
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        features: {
            allowAnonymousDonations: true,
            requireVerification: true,
            enableComments: true,
            enableSocialShare: true
        },
        payment: {
            safe2payApiKey: '',
            safe2paySecretKey: '',
            sandboxMode: true
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        // Check if admin is logged in
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn !== 'true') {
            navigate('/admin/login');
            return;
        }

        // Load settings from localStorage
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, [navigate]);

    const handleInputChange = (field: string, value: any) => {
        setSettings(prev => {
            if (field.includes('.')) {
                const [parent, child] = field.split('.');
                return {
                    ...prev,
                    [parent]: {
                        ...prev[parent as keyof SiteSettings],
                        [child]: value
                    }
                };
            }
            return { ...prev, [field]: value };
        });
    };

    const handleSave = () => {
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            localStorage.setItem('siteSettings', JSON.stringify(settings));
            setIsLoading(false);
            alert('Configurações salvas com sucesso!');
        }, 1000);
    };

    const tabs = [
        { id: 'general', label: 'Gerais', icon: GlobeIcon },
        { id: 'features', label: 'Recursos', icon: BellIcon },
        { id: 'payment', label: 'Pagamentos', icon: ShieldIcon },
        { id: 'emails', label: 'E-mails', icon: MailIcon }
    ];

    const renderGeneralSettings = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Site
                </label>
                <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição do Site
                </label>
                <textarea
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL do Site
                </label>
                <input
                    type="url"
                    value={settings.siteUrl}
                    onChange={(e) => handleInputChange('siteUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Moeda
                    </label>
                    <select
                        value={settings.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    >
                        <option value="BRL">Real Brasileiro (BRL)</option>
                        <option value="USD">Dólar Americano (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma
                    </label>
                    <select
                        value={settings.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    >
                        <option value="pt-BR">Português (Brasil)</option>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuso Horário
                </label>
                <select
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                >
                    <option value="America/Sao_Paulo">Brasília (UTC-3)</option>
                    <option value="America/Recife">Recife (UTC-3)</option>
                    <option value="America/Manaus">Manaus (UTC-4)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                    <option value="Europe/London">London (UTC+0)</option>
                </select>
            </div>
        </div>
    );

    const renderFeatureSettings = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Doações Anônimas</h4>
                    <p className="text-sm text-gray-500">Permitir que usuários façam doações sem se identificarem</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.features.allowAnonymousDonations}
                        onChange={(e) => handleInputChange('features.allowAnonymousDonations', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Verificação Obrigatória</h4>
                    <p className="text-sm text-gray-500">Exigir verificação de identidade para criar campanhas</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.features.requireVerification}
                        onChange={(e) => handleInputChange('features.requireVerification', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Habilitar Comentários</h4>
                    <p className="text-sm text-gray-500">Permitir comentários nas páginas das campanhas</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.features.enableComments}
                        onChange={(e) => handleInputChange('features.enableComments', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <h4 className="text-sm font-medium text-gray-900">Compartilhamento Social</h4>
                    <p className="text-sm text-gray-500">Habilitar botões de compartilhamento em redes sociais</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.features.enableSocialShare}
                        onChange={(e) => handleInputChange('features.enableSocialShare', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
        </div>
    );

    const renderPaymentSettings = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div>
                    <h4 className="text-sm font-medium text-yellow-800">Modo Sandbox</h4>
                    <p className="text-sm text-yellow-600">Usar ambiente de teste para processamento de pagamentos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.payment.sandboxMode}
                        onChange={(e) => handleInputChange('payment.sandboxMode', e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-yellow-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safe2Pay API Key
                </label>
                <input
                    type="password"
                    value={settings.payment.safe2payApiKey}
                    onChange={(e) => handleInputChange('payment.safe2payApiKey', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    placeholder="Digite sua API Key do Safe2Pay"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Safe2Pay Secret Key
                </label>
                <input
                    type="password"
                    value={settings.payment.safe2paySecretKey}
                    onChange={(e) => handleInputChange('payment.safe2paySecretKey', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                    placeholder="Digite sua Secret Key do Safe2Pay"
                />
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Configurações de Pagamento</h4>
                <p className="text-sm text-blue-600">
                    As chaves de API são usadas para processar pagamentos de forma segura. 
                    Nunca compartilhe essas informações. Em modo sandbox, nenhuma transação real é processada.
                </p>
            </div>
        </div>
    );

    const renderEmailSettings = () => (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail de Contato
                </label>
                <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail de Suporte
                </label>
                <input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail Administrativo
                </label>
                <input
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                />
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="text-sm font-medium text-green-800 mb-2">Configurações de E-mail</h4>
                <p className="text-sm text-green-600">
                    Os e-mails configurados aqui serão usados para notificações automáticas, 
                    confirmações de doação e suporte aos usuários.
                </p>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return renderGeneralSettings();
            case 'features':
                return renderFeatureSettings();
            case 'payment':
                return renderPaymentSettings();
            case 'emails':
                return renderEmailSettings();
            default:
                return renderGeneralSettings();
        }
    };

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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <SettingsIcon className="h-8 w-8 text-gray-600 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
                    </div>
                    <p className="text-gray-600">Configure as opções gerais da plataforma</p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Icon className="h-4 w-4" />
                                            <span>{tab.label}</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Settings Content */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    {renderContent()}
                </div>

                {/* Save Button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex items-center space-x-2 px-6 py-2 bg-brand-accent text-white rounded-md hover:bg-opacity-90 disabled:opacity-50"
                    >
                        <SaveIcon className="h-4 w-4" />
                        <span>{isLoading ? 'Salvando...' : 'Salvar Configurações'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;