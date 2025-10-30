import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Campaign } from '../types';
import ProgressBar from '../components/ProgressBar';
import { CheckCircleIcon, MapPinIcon, ShieldExclamationIcon, MessageCircleIcon, UsersIcon, InfoIcon } from '../components/icons';
import { AppContext } from '../context';

const CampaignPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { campaigns } = useContext(AppContext);
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [activeTab, setActiveTab] = useState('sobre');
    const [denunciaText, setDenunciaText] = useState('');


    useEffect(() => {
        const foundCampaign = campaigns.find(c => c.id === id);
        if (foundCampaign) {
            setCampaign(foundCampaign);
        } else {
            // handle not found, maybe redirect
        }
    }, [id, campaigns]);

    if (!campaign) {
        return <div className="text-center py-20">Carregando campanha...</div>;
    }

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    const percentage = Math.round((campaign.raised / campaign.goal) * 100);

    const handleDenuncia = () => {
        if (!denunciaText.trim()) {
            alert('Por favor, descreva o motivo da denúncia.');
            return;
        }
        const subject = `Denúncia da Campanha: "${campaign.title}" (ID: ${campaign.id})`;
        const body = `Motivo da denúncia:\n\n${denunciaText}\n\n---\nURL da Campanha: ${window.location.href}`;
        window.location.href = `mailto:contato@sonhocoletivo.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        alert('Você será redirecionado para o seu aplicativo de e-mail para enviar a denúncia.');
    };

    const TabButton: React.FC<{tabName: string; label: string; count: number, Icon: React.ElementType}> = ({ tabName, label, count, Icon }) => (
        <button 
            onClick={() => setActiveTab(tabName)}
            className={`flex items-center space-x-2 px-4 py-3 font-semibold transition-colors border-b-2 ${activeTab === tabName ? 'border-brand-primary text-brand-primary' : 'text-gray-500 hover:text-gray-700 border-transparent'}`}
        >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
            {count > 0 && <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5">{count}</span>}
        </button>
    );

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                 <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{campaign.title}</h1>
                 <div className="flex items-center text-md text-gray-600 mb-6">
                    <span>Por {campaign.author}</span>
                    {/* FIX: Removed invalid 'title' prop from CheckCircleIcon component. */}
                    {campaign.authorVerified && <CheckCircleIcon className="h-5 w-5 text-blue-500 ml-2" />}
                    <span className="mx-2">·</span>
                     <div className="flex items-center text-md text-gray-500">
                      <MapPinIcon className="h-5 w-5 mr-1" />
                      {campaign.city}, {campaign.state}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    <div className="lg:col-span-2">
                        <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg mb-6" />
                       
                        <div className="bg-white rounded-lg shadow-md">
                            <div className="border-b border-gray-200">
                               <nav className="flex space-x-1">
                                   <TabButton tabName="sobre" label="Sobre" count={0} Icon={InfoIcon}/>
                                   <TabButton tabName="mensagens" label="Mensagens" count={campaign.messages.length} Icon={MessageCircleIcon}/>
                                   <TabButton tabName="doadores" label="Doadores" count={campaign.donors.length} Icon={UsersIcon} />
                                   <TabButton tabName="denunciar" label="Denunciar" count={0} Icon={ShieldExclamationIcon} />
                               </nav>
                            </div>
                            <div className="p-6 min-h-[300px]">
                                {activeTab === 'sobre' && (
                                    <div className="prose max-w-none text-gray-700">
                                        <h2 className="text-xl font-bold mb-4">Sobre esta Campanha</h2>
                                        <p>{campaign.description}</p>
                                    </div>
                                )}
                                {activeTab === 'doadores' && (
                                    <div>
                                        <h2 className="text-xl font-bold mb-4">Quem já contribuiu ({campaign.donors.length})</h2>
                                        <ul className="space-y-3">
                                            {campaign.donors.map(donor => (
                                                <li key={donor.id} className="p-3 bg-gray-50 rounded-md flex justify-between items-center">
                                                    <span className="font-semibold text-gray-800">{donor.name}</span>
                                                    <span className="text-sm text-gray-500">{donor.timestamp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'mensagens' && (
                                     <div>
                                        <h2 className="text-xl font-bold mb-4">Mensagens Recebidas ({campaign.messages.length})</h2>
                                        <ul className="space-y-4">
                                            {campaign.messages.map(message => (
                                               <li key={message.id} className="p-4 border rounded-lg bg-white shadow-sm">
                                                   <div className="flex justify-between items-center mb-2">
                                                        <p className="font-bold text-brand-primary">{message.donorName}</p>
                                                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                                                   </div>
                                                   <p className="text-gray-600">"{message.text}"</p>
                                               </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {activeTab === 'denunciar' && (
                                     <div>
                                        <h2 className="text-xl font-bold mb-4 text-red-700">Denunciar Campanha</h2>
                                        <p className="text-gray-600 mb-4 text-sm">Se você acha esta campanha inapropriada ou fraudulenta, por favor nos conte os motivos. O anonimato da denúncia é sempre garantido.</p>
                                        <textarea 
                                            className="w-full p-2 border rounded-md" 
                                            rows={5} 
                                            placeholder="Descreva detalhadamente o motivo da sua denúncia. Inclua todas as informações que possam nos ajudar a analisar o caso."
                                            value={denunciaText}
                                            onChange={(e) => setDenunciaText(e.target.value)}
                                        ></textarea>
                                        <button onClick={handleDenuncia} className="mt-4 px-6 py-2 bg-gray-700 text-white font-bold rounded-md hover:bg-gray-800">
                                            Enviar Denúncia por E-mail
                                        </button>
                                         <p className="text-xs text-gray-500 mt-2">A Sonho Coletivo é uma empresa engajada no combate às fraudes na internet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="text-2xl font-bold text-brand-dark">{formatCurrency(campaign.raised)}</span>
                                <span className="text-sm text-gray-600">arrecadados</span>
                            </div>
                            <ProgressBar current={campaign.raised} goal={campaign.goal} />
                             <p className="text-sm text-gray-600 mt-2 flex justify-between">
                                <span>{campaign.donors.length} pessoas já contribuiram</span>
                                <span>Meta: <span className="font-semibold">{formatCurrency(campaign.goal)}</span> ({percentage}%)</span>
                            </p>
                            
                            <button 
                                onClick={() => navigate(`/donate/${campaign.id}`)}
                                className="w-full mt-6 bg-brand-accent text-white font-bold py-3 px-4 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg">
                                DOAR
                            </button>
                            
                            <div className="mt-6 text-center">
                                <h3 className="font-semibold text-gray-800 mb-2">COMPARTILHAR</h3>
                                <div className="flex items-center border rounded-md p-2">
                                    <input type="text" readOnly value={`sonhocoletivo.com/${campaign.id}`} className="flex-grow text-sm text-gray-600 outline-none"/>
                                    <button onClick={() => navigator.clipboard.writeText(`sonhocoletivo.com/${campaign.id}`)} className="ml-2 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm">Copiar</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignPage;