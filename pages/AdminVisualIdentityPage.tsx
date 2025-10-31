import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudHeartIcon, UploadIcon, PaletteIcon, ArrowLeftIcon } from '../components/icons';

interface SiteSettings {
    logo: string;
    favicon: string;
    primaryColor: string;
    secondaryColor: string;
}

const AdminVisualIdentityPage: React.FC = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState<SiteSettings>({
        logo: '',
        favicon: '',
        primaryColor: '#1E40AF',
        secondaryColor: '#3B82F6'
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [faviconFile, setFaviconFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if admin is logged in
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn !== 'true') {
            navigate('/admin/login');
            return;
        }

        // Load settings from localStorage (in real app, this would come from API)
        const savedSettings = localStorage.getItem('siteSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, [navigate]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file
            if (!file.type.match(/^image\/(png|svg)$/)) {
                alert('Formato inválido. Use PNG ou SVG.');
                return;
            }
            if (file.size > 1 * 1024 * 1024) { // 1MB
                alert('Arquivo muito grande. Máximo 1MB.');
                return;
            }
            setLogoFile(file);
        }
    };

    const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file
            if (!file.type.match(/^image\/(ico|png)$/)) {
                alert('Formato inválido. Use ICO ou PNG.');
                return;
            }
            if (file.size > 64 * 1024) { // 64KB
                alert('Arquivo muito grande. Máximo 64KB.');
                return;
            }
            setFaviconFile(file);
        }
    };

    const handleColorChange = (field: keyof SiteSettings, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        setIsLoading(true);
        
        // Simulate saving to database
        setTimeout(() => {
            localStorage.setItem('siteSettings', JSON.stringify(settings));
            alert('Configurações salvas com sucesso!');
            setIsLoading(false);
        }, 1000);
    };

    const handlePreview = () => {
        // Update the site theme in real-time
        document.documentElement.style.setProperty('--brand-primary', settings.primaryColor);
        document.documentElement.style.setProperty('--brand-secondary', settings.secondaryColor);
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
                        <PaletteIcon className="h-8 w-8 text-blue-600 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-900">Identidade Visual</h1>
                    </div>
                    <p className="text-gray-600">Configure a aparência visual do seu site</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
                    {/* Logo Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Logo do Site</h2>
                        <div className="flex items-center space-x-6">
                            <div className="flex-shrink-0">
                                {settings.logo ? (
                                    <img 
                                        src={settings.logo} 
                                        alt="Logo" 
                                        className="h-20 w-20 object-contain"
                                    />
                                ) : (
                                    <div className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400 text-sm">Sem logo</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <input
                                    type="file"
                                    accept=".png,.svg"
                                    onChange={handleLogoChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Formato: PNG ou SVG | Tamanho máximo: 1MB | Resolução ideal: 500x500px
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Favicon Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Favicon</h2>
                        <div className="flex items-center space-x-6">
                            <div className="flex-shrink-0">
                                {settings.favicon ? (
                                    <img 
                                        src={settings.favicon} 
                                        alt="Favicon" 
                                        className="h-12 w-12 object-contain"
                                    />
                                ) : (
                                    <div className="h-12 w-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400 text-xs">Sem favicon</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <input
                                    type="file"
                                    accept=".ico,.png"
                                    onChange={handleFaviconChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Formato: ICO ou PNG | Tamanho máximo: 64KB | Resolução: 64x64px
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Colors Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Cores do Tema</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cor Primária
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={settings.primaryColor}
                                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={settings.primaryColor}
                                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cor Secundária
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="color"
                                        value={settings.secondaryColor}
                                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                                        className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={settings.secondaryColor}
                                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Section */}
                    <div className="border-t pt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Visualização</h2>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center space-x-3 mb-4">
                                {settings.favicon ? (
                                    <img src={settings.favicon} alt="Favicon" className="h-6 w-6" />
                                ) : (
                                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                                )}
                                <span className="font-bold text-gray-800">Sonho Coletivo</span>
                            </div>
                            <div className="flex space-x-2">
                                <div className="h-2 w-8 rounded" style={{ backgroundColor: settings.primaryColor }}></div>
                                <div className="h-2 w-8 rounded" style={{ backgroundColor: settings.secondaryColor }}></div>
                                <div className="h-2 w-8 rounded bg-gray-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-4 pt-6 border-t">
                        <button
                            onClick={handlePreview}
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Visualizar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Salvando...' : 'Salvar Configurações'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminVisualIdentityPage;