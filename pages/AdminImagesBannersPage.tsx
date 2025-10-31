import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudHeartIcon, UploadIcon, ImageIcon, ArrowLeftIcon, PlusIcon, MinusIcon, ArrowUpIcon, ArrowDownIcon } from '../components/icons';

interface Banner {
    id: string;
    imageUrl: string;
    link: string;
    isActive: boolean;
    order: number;
}

const AdminImagesBannersPage: React.FC = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState<Banner[]>([]);
    const [mainBannerFile, setMainBannerFile] = useState<File | null>(null);
    const [newBannerFile, setNewBannerFile] = useState<File | null>(null);
    const [newBannerLink, setNewBannerLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if admin is logged in
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn !== 'true') {
            navigate('/admin/login');
            return;
        }

        // Load banners from localStorage (in real app, this would come from API)
        const savedBanners = localStorage.getItem('banners');
        if (savedBanners) {
            setBanners(JSON.parse(savedBanners));
        }
    }, [navigate]);

    const handleMainBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file
            if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
                alert('Formato inválido. Use JPG ou PNG.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB
                alert('Arquivo muito grande. Máximo 2MB.');
                return;
            }
            setMainBannerFile(file);
        }
    };

    const handleNewBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file
            if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
                alert('Formato inválido. Use JPG ou PNG.');
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB
                alert('Arquivo muito grande. Máximo 2MB.');
                return;
            }
            setNewBannerFile(file);
        }
    };

    const handleAddBanner = () => {
        if (!newBannerFile || !newBannerLink) {
            alert('Por favor, selecione uma imagem e informe o link.');
            return;
        }

        const newBanner: Banner = {
            id: `banner-${Date.now()}`,
            imageUrl: URL.createObjectURL(newBannerFile),
            link: newBannerLink,
            isActive: true,
            order: banners.length + 1
        };

        setBanners(prev => [...prev, newBanner]);
        setNewBannerFile(null);
        setNewBannerLink('');
    };

    const handleRemoveBanner = (id: string) => {
        setBanners(prev => prev.filter(banner => banner.id !== id));
    };

    const handleToggleBanner = (id: string) => {
        setBanners(prev => prev.map(banner => 
            banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
        ));
    };

    const handleMoveBanner = (id: string, direction: 'up' | 'down') => {
        setBanners(prev => {
            const index = prev.findIndex(banner => banner.id === id);
            if (index === -1) return prev;

            const newBanners = [...prev];
            if (direction === 'up' && index > 0) {
                [newBanners[index - 1], newBanners[index]] = [newBanners[index], newBanners[index - 1]];
            } else if (direction === 'down' && index < newBanners.length - 1) {
                [newBanners[index], newBanners[index + 1]] = [newBanners[index + 1], newBanners[index]];
            }

            // Update order numbers
            return newBanners.map((banner, i) => ({ ...banner, order: i + 1 }));
        });
    };

    const handleSave = () => {
        setIsLoading(true);
        
        // Simulate saving to database
        setTimeout(() => {
            localStorage.setItem('banners', JSON.stringify(banners));
            alert('Banners salvos com sucesso!');
            setIsLoading(false);
        }, 1000);
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

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <ImageIcon className="h-8 w-8 text-green-600 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-900">Imagens e Banners</h1>
                    </div>
                    <p className="text-gray-600">Gerencie banners e imagens do site</p>
                </div>

                <div className="space-y-8">
                    {/* Main Banner Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Banner Principal</h2>
                        <div className="flex items-center space-x-6">
                            <div className="flex-shrink-0">
                                <div className="h-32 w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">1920x600px</span>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <input
                                    type="file"
                                    accept=".jpeg,.jpg,.png"
                                    onChange={handleMainBannerChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                                <p className="mt-1 text-xs text-gray-500">
                                    Formato: JPG ou PNG | Tamanho máximo: 2MB | Resolução: 1920x600px | Qualidade: 90%
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Banners Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">Banners de Anunciantes</h2>
                            <button
                                onClick={handleAddBanner}
                                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                <PlusIcon className="h-4 w-4" />
                                <span>Adicionar Banner</span>
                            </button>
                        </div>

                        {/* Add Banner Form */}
                        {newBannerFile && (
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-3">Novo Banner</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input
                                            type="file"
                                            accept=".jpeg,.jpg,.png"
                                            onChange={handleNewBannerChange}
                                            className="block w-full text-sm text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="url"
                                            value={newBannerLink}
                                            onChange={(e) => setNewBannerLink(e.target.value)}
                                            placeholder="URL do link"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="mt-3 flex justify-end space-x-2">
                                    <button
                                        onClick={() => setNewBannerFile(null)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleAddBanner}
                                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Banners List */}
                        <div className="space-y-4">
                            {banners.map((banner, index) => (
                                <div key={banner.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={banner.imageUrl} 
                                            alt={`Banner ${index + 1}`} 
                                            className="h-16 w-32 object-cover rounded"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-sm text-gray-600">Ordem: {banner.order}</span>
                                            <input
                                                type="url"
                                                value={banner.link}
                                                onChange={(e) => {
                                                    const updatedBanners = banners.map(b => 
                                                        b.id === banner.id ? { ...b, link: e.target.value } : b
                                                    );
                                                    setBanners(updatedBanners);
                                                }}
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                                                placeholder="URL do link"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleMoveBanner(banner.id, 'up')}
                                            disabled={index === 0}
                                            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                        >
                                            <ArrowUpIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleMoveBanner(banner.id, 'down')}
                                            disabled={index === banners.length - 1}
                                            className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                        >
                                            <ArrowDownIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleToggleBanner(banner.id)}
                                            className={`p-1 rounded ${banner.isActive ? 'text-green-600' : 'text-gray-400'}`}
                                        >
                                            {banner.isActive ? 'Ativo' : 'Inativo'}
                                        </button>
                                        <button
                                            onClick={() => handleRemoveBanner(banner.id)}
                                            className="p-1 text-red-500 hover:text-red-700"
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {banners.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Nenhum banner adicionado ainda.
                            </div>
                        )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                            {isLoading ? 'Salvando...' : 'Salvar Banners'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminImagesBannersPage;