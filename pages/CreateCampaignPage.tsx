import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context';
import InputField from '../components/InputField';
import { Campaign } from '../types';
import { GoogleGenAI } from "@google/genai";
import { MagicWandIcon } from '../components/icons';

const CreateCampaignPage: React.FC = () => {
    const navigate = useNavigate();
    const { addCampaign, currentUser } = useContext(AppContext);
    const [isImproving, setIsImproving] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login?redirect=/create');
        }
    }, [currentUser, navigate]);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Comunidade',
        goal: '',
        description: '',
        city: '',
        state: '',
        imageUrl: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleImproveDescription = async () => {
        if (!formData.description) {
            alert("Por favor, escreva uma descrição primeiro.");
            return;
        }
        setIsImproving(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `Você é um assistente especialista em criar textos para a plataforma de crowdfunding 'Sonho Coletivo'. Sua tarefa é reescrever a descrição de campanha a seguir para torná-la mais envolvente, persuasiva e inspiradora para potenciais doadores. Mantenha a mensagem central, mas melhore o tom e a estrutura para maximizar o impacto. Texto original: "${formData.description}"`;
            
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
            });
            
            const improvedText = response.text;
            if (improvedText) {
                setFormData(prev => ({...prev, description: improvedText.trim() }));
            }
        } catch (error) {
            console.error("Error improving description:", error);
            alert("Ocorreu um erro ao tentar melhorar a descrição. Tente novamente.");
        } finally {
            setIsImproving(false);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Você precisa estar logado para criar uma campanha.");
            return;
        }
        const newCampaign: Campaign = {
            id: `campaign-${Date.now()}`,
            authorId: currentUser.id,
            title: formData.title,
            author: currentUser.name,
            authorVerified: true, // Assume verified for simplicity
            description: formData.description,
            category: formData.category,
            goal: parseFloat(formData.goal),
            raised: 0,
            imageUrl: formData.imageUrl || `https://picsum.photos/seed/${Date.now()}/600/400`,
            galleryUrls: [],
            city: formData.city,
            state: formData.state,
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            donors: [],
            messages: [],
        };
        addCampaign(newCampaign);
        alert('Campanha criada com sucesso! Ela será revisada pela nossa equipe.');
        navigate(`/campaign/${newCampaign.id}`);
    };
    
    if (!currentUser) {
        return <div className="text-center py-20">Redirecionando para o login...</div>;
    }


    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Crie sua Campanha</h1>
                <p className="text-center text-gray-500 mb-8">Siga os passos para colocar seu sonho no ar.</p>

                {/* Stepper */}
                <div className="mb-8 flex justify-center">
                    {[1, 2, 3].map(s => (
                        <React.Fragment key={s}>
                            <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-brand-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    {s}
                                </div>
                            </div>
                            {s < 3 && <div className={`flex-auto border-t-2 transition-colors duration-500 ${step > s ? 'border-brand-accent' : 'border-gray-200'}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
                            <h2 className="text-xl font-semibold text-gray-700">1. Causa e Título</h2>
                            <InputField id="title" name="title" label="Título da Campanha *" value={formData.title} onChange={handleInputChange} placeholder="Ex: Ajude a reformar o abrigo de animais" maxLength={70} required />
                             <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Causa *</label>
                                {/* FIX: Expanded the list of categories for campaign creation. */}
                                <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" required>
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
                            <InputField id="goal" name="goal" label="Meta de Arrecadação (R$) *" type="number" value={formData.goal} onChange={handleInputChange} placeholder="5000" required />
                             <div className="flex justify-end">
                                <button type="button" onClick={handleNext} className="px-6 py-2 bg-brand-accent text-white font-bold rounded-md hover:opacity-90">Próximo</button>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                             <h2 className="text-xl font-semibold text-gray-700">2. Detalhes e Localização</h2>
                             <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Conte sua história *</label>
                                    <button type="button" onClick={handleImproveDescription} disabled={isImproving} className="flex items-center space-x-1 text-sm text-brand-primary font-semibold hover:text-brand-secondary disabled:opacity-50">
                                        <MagicWandIcon className="h-4 w-4" />
                                        <span>{isImproving ? 'Melhorando...' : 'Melhorar com IA'}</span>
                                    </button>
                                </div>
                                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows={8} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent" placeholder="Descreva o motivo da sua campanha, como os fundos serão usados, etc." required></textarea>
                            </div>
                            <InputField id="imageUrl" name="imageUrl" label="URL da Imagem Principal" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://exemplo.com/imagem.jpg" />
                             <p className="text-xs text-gray-500">Para fins de demonstração, insira a URL de uma imagem. Em uma aplicação real, aqui seria um upload de arquivo.</p>
                            <div className="grid grid-cols-2 gap-4">
                               <InputField id="city" name="city" label="Cidade *" value={formData.city} onChange={handleInputChange} required />
                               <InputField id="state" name="state" label="Estado *" value={formData.state} onChange={handleInputChange} required />
                            </div>
                             <div className="flex justify-between">
                                <button type="button" onClick={handleBack} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                                <button type="button" onClick={handleNext} className="px-6 py-2 bg-brand-accent text-white font-bold rounded-md hover:opacity-90">Próximo</button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="animate-fade-in">
                             <h2 className="text-xl font-semibold text-gray-700">3. Revisão e Publicação</h2>
                             <div className="mt-4 p-4 bg-gray-50 rounded-lg border space-y-2">
                                <p><strong>Título:</strong> {formData.title}</p>
                                <p><strong>Causa:</strong> {formData.category}</p>
                                <p><strong>Meta:</strong> R$ {formData.goal}</p>
                                <p><strong>Local:</strong> {formData.city}, {formData.state}</p>
                             </div>
                             <div className="mt-6 space-y-4 text-sm text-gray-600">
                               <div className="flex items-start">
                                    <input id="terms" type="checkbox" className="h-4 w-4 text-brand-accent border-gray-300 rounded focus:ring-brand-accent mt-1" required/>
                                    {/* FIX: Corrected the link to the terms of use page. */}
                                    <label htmlFor="terms" className="ml-2">Concordo com os <a href="#/termos-participante" target="_blank" className="text-brand-primary hover:underline">termos de uso</a>.</label>
                               </div>
                               <div className="flex items-start">
                                    <input id="bank" type="checkbox" className="h-4 w-4 text-brand-accent border-gray-300 rounded focus:ring-brand-accent mt-1" required/>
                                    <label htmlFor="bank" className="ml-2">Estou ciente que para receber as doações terei de indicar uma conta bancária vinculada ao CPF cadastrado.</label>
                               </div>
                            </div>
                             <div className="flex justify-between mt-8">
                                <button type="button" onClick={handleBack} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                                <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700">Finalizar e Criar Campanha</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateCampaignPage;