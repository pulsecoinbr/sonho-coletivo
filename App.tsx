import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CampaignPage from './pages/CampaignPage';
import DonatePage from './pages/DonatePage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import TermsParticipantPage from './pages/TermsParticipantPage';
import TermsDonorPage from './pages/TermsDonorPage';
import HowItWorksPage from './pages/HowItWorksPage';
import WhatsAppButton from './components/WhatsAppButton';
import { Campaign, User, DonorInfo, DonorMessage, Testimonial, Donation } from './types';
import { AppContext } from './context';

// Admin Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminVisualIdentityPage from './pages/AdminVisualIdentityPage';
import AdminImagesBannersPage from './pages/AdminImagesBannersPage';
import AdminDonationsPage from './pages/AdminDonationsPage';
import AdminAnalyticsPage from './pages/AdminAnalyticsPage';
import AdminSettingsPage from './pages/AdminSettingsPage';
import { ErrorBoundary } from './components/ErrorBoundary';

// Initial Mock Data
const initialCampaigns: Campaign[] = [
  {
    id: '1',
    authorId: 'user-1',
    title: 'Ajude a construir um novo parquinho para as crianças',
    author: 'Associação Comunitária',
    authorVerified: true,
    description: 'Nossa comunidade precisa de um espaço seguro e divertido para as crianças brincarem. Com a sua ajuda, vamos construir um parquinho moderno e inclusivo para mais de 100 crianças da região. Cada doação nos aproxima de realizar este sonho coletivo.',
    category: 'Comunidade',
    goal: 15000,
    raised: 8750,
    imageUrl: 'https://picsum.photos/seed/playground/600/400',
    galleryUrls: [],
    city: 'São Paulo',
    state: 'SP',
    endDate: '2024-12-31',
    donors: [
        { id: 'd1-1', name: 'Carlos Andrade', timestamp: 'há 2 dias' },
        { id: 'd1-2', name: 'Mariana Costa', timestamp: 'há 1 semana' },
        { id: 'd1-3', name: 'Doador Anônimo', timestamp: 'há 2 semanas' },
    ],
    messages: [
        { id: 'm1-1', donorName: 'Carlos Andrade', text: 'Uma causa nobre! Feliz em ajudar.', timestamp: 'há 2 dias' },
        { id: 'm1-2', donorName: 'Mariana Costa', text: 'Nossas crianças merecem! Parabéns pela iniciativa.', timestamp: 'há 1 semana' },
    ],
  },
   {
    id: '2',
    authorId: 'user-2',
    title: 'Recuperação do Quiosque do Sr. João pós-enchente',
    author: 'Família Silva',
    authorVerified: false,
    description: 'O quiosque do Sr. João, uma fonte de renda para sua família e um ponto de encontro querido no bairro, foi destruído na última enchente. Vamos unir forças para ajudá-lo a reconstruir seu negócio e sua vida.',
    category: 'Emergência',
    goal: 25000,
    raised: 19300,
    imageUrl: 'https://picsum.photos/seed/kiosk/600/400',
    galleryUrls: [],
    city: 'Porto Alegre',
    state: 'RS',
    endDate: '2024-11-20',
    donors: [],
    messages: [],
  },
  {
    id: '3',
    authorId: 'user-1',
    title: 'Vencendo a tetraplegia: Fisioterapia para o Marcos',
    author: 'Ana Clara (irmã)',
    authorVerified: true,
    description: 'Meu irmão Marcos sofreu um acidente e precisa de fisioterapia intensiva para recuperar seus movimentos. O tratamento é caro e não temos como arcar com todos os custos. Sua doação trará esperança e qualidade de vida para ele.',
    category: 'Saúde',
    goal: 50000,
    raised: 11200,
    imageUrl: 'https://picsum.photos/seed/rehab/600/400',
    galleryUrls: [],
    city: 'Belo Horizonte',
    state: 'MG',
    endDate: '2025-02-10',
    donors: [ { id: 'd3-1', name: 'Juliana Paes', timestamp: 'há 1 mês' }],
    messages: [ { id: 'm3-1', donorName: 'Juliana Paes', text: 'Força, Marcos! Estamos torcendo por você.', timestamp: 'há 1 mês' }],
  },
];

const initialTestimonials: Testimonial[] = [
    {
        id: 't1',
        name: 'Família Oliveira',
        imageUrl: 'https://picsum.photos/seed/family/100/100',
        campaignTitle: 'Reforma da nossa casa',
        quote: 'Não temos palavras para agradecer a todos que doaram. Graças à Sonho Coletivo, nossa casa agora é um lar seguro para nossos filhos. Vocês mudaram nossas vidas!'
    },
    {
        id: 't2',
        name: 'Carla Mendes',
        imageUrl: 'https://picsum.photos/seed/student/100/100',
        campaignTitle: 'Intercâmbio de estudos',
        quote: 'Atingir a meta parecia impossível, mas a força da comunidade me mostrou o contrário. Estou realizando o sonho de estudar fora e sou eternamente grata a cada pessoa que acreditou em mim.'
    },
    {
        id: 't3',
        name: 'Roberto Viana',
        imageUrl: 'https://picsum.photos/seed/pet/100/100',
        campaignTitle: 'Cirurgia para o cachorro Toby',
        quote: 'Quando o Toby adoeceu, nosso mundo desabou. O custo da cirurgia era alto, mas com a ajuda de dezenas de doadores, conseguimos! Hoje ele está correndo e feliz. Obrigado!'
    }
];

const AppWithProvider: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem('campaigns');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(c => 
          c && typeof c === 'object' && c.id && c.title && 
          typeof c.raised === 'number' && typeof c.goal === 'number' &&
          Array.isArray(c.donors) && Array.isArray(c.messages) && 
          Array.isArray(c.galleryUrls)
        )) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to parse campaigns from localStorage", error);
    }
    localStorage.removeItem('campaigns');
    return initialCampaigns;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(u => 
          u && typeof u === 'object' && u.id && u.email && 
          u.address && typeof u.address === 'object'
        )) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to parse users from localStorage", error);
    }
    localStorage.removeItem('users');
    return [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('currentUser');
      if (!saved) return null;
      
      const parsedUser = JSON.parse(saved);
      if (parsedUser && parsedUser.id && parsedUser.name && 
          parsedUser.email && parsedUser.address && 
          typeof parsedUser.address === 'object') {
        return parsedUser;
      }
      localStorage.removeItem('currentUser');
      return null;
    } catch (error) {
      console.error("Failed to parse currentUser from localStorage", error);
      localStorage.removeItem('currentUser');
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const addCampaign = useCallback((campaign: Campaign) => {
    setCampaigns(prev => [campaign, ...prev]);
  }, []);

  const addDonation = useCallback((donation: Donation) => {
    setCampaigns(prev =>
      prev.map(c => {
        if (c.id !== donation.campaignId) return c;

        const newDonor: DonorInfo = {
          id: `d-${Date.now()}`,
          name: donation.isAnonymous ? 'Doador Anônimo' : donation.donor.name,
          timestamp: 'agora',
        };

        const newMessage: DonorMessage | null = donation.message ? {
          id: `m-${Date.now()}`,
          donorName: newDonor.name,
          text: donation.message,
          timestamp: 'agora',
        } : null;

        return { 
          ...c, 
          raised: c.raised + donation.amount,
          donors: [...c.donors, newDonor],
          messages: newMessage ? [...c.messages, newMessage] : c.messages,
        };
      })
    );
  }, []);
  
  const login = useCallback((email: string, passwordHash: string): User | null => {
    const user = users.find(u => u.email === email && u.passwordHash === passwordHash);
    if (user) {
      setCurrentUser(user);
      return user;
    }
    return null;
  }, [users]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    navigate('/');
  }, [navigate]);

  const register = useCallback((userData: Omit<User, 'id'>): User => {
    if (users.some(u => u.email === userData.email)) {
      throw new Error("User with this email already exists");
    }
    const newUser = { id: `user-${Date.now()}`, ...userData };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  }, [users]);

  return (
    <AppContext.Provider value={{ 
      campaigns, 
      testimonials, 
      addCampaign, 
      addDonation, 
      users, 
      currentUser, 
      login, 
      logout, 
      register 
    }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/como-funciona" element={<HowItWorksPage />} />
            <Route path="/quem-somos" element={<AboutPage />} />
            <Route path="/ajuda" element={<HelpPage />} />
            <Route path="/termos-participante" element={<TermsParticipantPage />} />
            <Route path="/termos-doador" element={<TermsDonorPage />} />
            <Route path="/campaign/:id" element={<CampaignPage />} />
            <Route path="/donate/:id" element={<DonatePage />} />
            <Route path="/create" element={<CreateCampaignPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/visual-identity" element={<AdminVisualIdentityPage />} />
            <Route path="/admin/images-banners" element={<AdminImagesBannersPage />} />
            <Route path="/admin/donations" element={<AdminDonationsPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </AppContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <AppWithProvider />
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;