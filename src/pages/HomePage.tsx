import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CampaignCard from '@/components/CampaignCard';
import Carousel from '@/components/Carousel';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { supabase } from '@/integrations/supabase/client';

const HomePage: React.FC = () => {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState<any[]>([]);
    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('em_andamento');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCampaigns();
        fetchTestimonials();
    }, []);

    useEffect(() => {
        let result = [...campaigns];

        const now = new Date();
        if (statusFilter === 'em_andamento') {
            result = result.filter(c => new Date(c.end_date) >= now);
        } else if (statusFilter === 'finalizada') {
            result = result.filter(c => new Date(c.end_date) < now);
        }

        if (nameFilter) {
            result = result.filter(c => c.title.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        if (categoryFilter) {
            result = result.filter(c => c.category === categoryFilter);
        }

        if (locationFilter) {
            const search = locationFilter.toLowerCase();
            result = result.filter(c =>
                c.city.toLowerCase().includes(search) ||
                c.state.toLowerCase().includes(search)
            );
        }

        setFilteredCampaigns(result);
    }, [nameFilter, categoryFilter, locationFilter, statusFilter, campaigns]);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('campaigns')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            setCampaigns(data || []);
            setFilteredCampaigns(data || []);
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const handleClearFilters = () => {
        setNameFilter('');
        setCategoryFilter('');
        setLocationFilter('');
        setStatusFilter('em_andamento');
    };

    const carouselSlides = [
        {
            imageUrl: 'https://picsum.photos/seed/dream/1200/400',
            title: 'Realize o seu sonho',
            subtitle: 'Crie sua campanha e compartilhe com o mundo.',
        },
        {
            imageUrl: 'https://picsum.photos/seed/friends/1200/400',
            title: 'Conte com seus amigos',
            subtitle: 'Juntos, vocês podem alcançar qualquer meta.',
        },
        {
            imageUrl: 'https://picsum.photos/seed/donor/1200/400',
            title: 'Seja um doador',
            subtitle: 'Sua contribuição transforma vidas e espalha esperança.',
        },
        {
            imageUrl: 'https://picsum.photos/seed/payment/1200/400',
            title: 'Pague de forma fácil com PIX',
            subtitle: 'Sua doação é processada de forma rápida e segura.',
        },
    ];
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Tire um sonho do papel.</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Crie ou apoie uma campanha e faça a diferença na vida de alguém. Juntos, podemos mais.</p>
                <div className="mt-8">
                    <Link to="/create" className="px-8 py-3 text-lg font-medium text-white bg-brand-accent rounded-md hover:opacity-90 transition-opacity shadow-lg">
                        Comece sua Campanha
                    </Link>
                </div>
            </div>

            <Carousel slides={carouselSlides} />

            <div className="bg-white p-4 rounded-lg shadow-md mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-1">
                        <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                        <input id="name-filter" type="text" placeholder="Nome da Campanha" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" />
                    </div>
                     <div className="lg:col-span-1">
                        <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Causa</label>
                        <select id="category-filter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent">
                            <option value="">Todas as Causas</option>
                            <option>Animais</option>
                            <option>Causas Sociais</option>
                            <option>Comunidade</option>
                            <option>Cultura</option>
                            <option>Educação</option>
                            <option>Esportes</option>
                            <option>Eventos</option>
                            <option>Família</option>
                            <option>Memoriais</option>
                            <option>Meio Ambiente</option>
                            <option>Negócios</option>
                            <option>Saúde</option>
                            <option>Viagens</option>
                        </select>
                    </div>
                     <div className="lg:col-span-1">
                        <label htmlFor="location-filter" className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                        <input id="location-filter" type="text" placeholder="Cidade ou Estado" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" />
                    </div>
                     <div className="lg:col-span-1">
                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent">
                            <option value="em_andamento">Em Andamento</option>
                            <option value="finalizada">Finalizadas</option>
                            <option value="todas">Todas</option>
                        </select>
                    </div>
                    <button onClick={handleClearFilters} className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 transition-opacity">
                        Limpar Filtros
                    </button>
                </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">Campanhas em Destaque</h2>
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Carregando campanhas...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCampaigns.length > 0 ? (
                        filteredCampaigns.map(campaign => (
                            <CampaignCard key={campaign.id} campaign={campaign} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500">Nenhuma campanha encontrada com os critérios de busca. Tente ajustar os filtros ou ver todas as campanhas.</p>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-20">
                 <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Histórias que Inspiram</h2>
                 <TestimonialCarousel testimonials={testimonials} />
            </div>

        </div>
    );
};

export default HomePage;