import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import InputField from '@/components/InputField';
import { uploadImage } from '@/services/storageService';
import { supabase } from '@/integrations/supabase/client';
import { GoogleGenAI } from "@google/genai";
import { MagicWandIcon } from '@/components/icons';

const CreateCampaignPage: React.FC = () => {
    const navigate = useNavigate();
    const { session } = useContext(AppContext);
    const [isImproving, setIsImproving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (!session) {
            navigate('/login?redirect=/create');
        }
    }, [session, navigate]);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Comunidade',
        goal: '',
        description: '',
        city: '',
        state: '',
        imageFile: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, imageFile: file }));
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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
            const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            alert("Você precisa estar logado para criar uma campanha.");
            return;
        }
        
        try {
            let imageUrl = '';
            
            // Upload image if provided
            if (formData.imageFile) {
                setIsUploading(true);
                imageUrl = await uploadImage(formData.imageFile, 'campaigns', 'images');
                setIsUploading(false);
            }
            
            // Create campaign in database
            const { data, error } = await supabase
                .from('campaigns')
                .insert([
                    {
                        user_id: session.user.id,
                        title: formData.title,
                        description: formData.description,
                        category: formData.category,
                        goal: parseFloat(formData.goal),
                        city: formData.city,
                        state: formData.state,
                        image_url: imageUrl,
                        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            alert('Campanha criada com sucesso! Ela será revisada pela nossa equipe.');
            navigate(`/campaign/${data.id}`);
        } catch (error) {
            console.error('Error creating campaign:', error);
            alert('Ocorreu um erro ao criar a campanha. Por favor, tente novamente.');
            setIsUploading(false);
        }
    };

    if (!session) {
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
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imagem Principal</label>
                                <div className="mt-1 flex items-center">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-md" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setFormData(prev => ({ ...prev, imageFile: null }));
                                                    setImagePreview(null);
                                                }}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label htmlFor="imageFile" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary hover:text-brand-secondary">
                                                        <span>Upload de arquivo</span>
                                                        <input 
                                                            id="imageFile" 
                                                            name="imageFile" 
                                                            type="file" 
                                                            className="sr-only" 
                                                            accept="image/*" 
                                                            onChange={handleImageChange}
                                                        />
                                                    </label>
                                                    <p className="pl-1">ou arraste e solte</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG até 10MB</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
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
                                {imagePreview && (
                                    <div>
                                        <strong>Imagem:</strong>
                                        <img src={imagePreview} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-md" />
                                    </div>
                                )}
                             </div>
                             <div className="mt-6 space-y-4 text-sm text-gray-600">
                               <div className="flex items-start">
                                    <input id="terms" type="checkbox" className="h-4 w-4 text-brand-accent border-gray-300 rounded focus:ring-brand-accent mt-1" required/>
                                    <label htmlFor="terms" className="ml-2">Concordo com os <a href="#/termos-participante" target="_blank" className="text-brand-primary hover:underline">termos de uso</a>.</label>
                               </div>
                               <div className="flex items-start">
                                    <input id="bank" type="checkbox" className="h-4 w-4 text-brand-accent border-gray-300 rounded focus:ring-brand-accent mt-1" required/>
                                    <label htmlFor="bank" className="ml-2">Estou ciente que para receber as doações terei de indicar uma conta bancária vinculada ao CPF cadastrado.</label>
                               </div>
                            </div>
                             <div className="flex justify-between mt-8">
                                <button type="button" onClick={handleBack} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded-md hover:bg-gray-300">Voltar</button>
                                <button 
                                    type="submit" 
                                    disabled={isUploading}
                                    className="px-6 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 disabled:opacity-50"
                                >
                                    {isUploading ? 'Enviando...' : 'Finalizar e Criar Campanha'}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CreateCampaignPage;