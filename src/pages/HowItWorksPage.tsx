import React from 'react';
import { Link } from 'react-router-dom';
import { CloudHeartIcon, UsersIcon, CampaignsIcon, FinancialIcon, CheckCircleIcon, ArrowRightIcon } from '@/components/icons';

const HowItWorksPage: React.FC = () => {
    return (
        <div className="bg-brand-light">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                            Como a Sonho Coletivo Funciona
                        </h1>
                        <p className="text-xl text-white opacity-90">
                            Transforme seus sonhos e causas em realidade com nossa plataforma de crowdfunding
                        </p>
                    </div>
                </div>
            </div>

            {/* Steps Section */}
            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Realize seu sonho em 3 passos simples
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Siga nosso processo fácil e intuitivo para criar sua campanha e começar a arrecadar
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Step 1 */}
                            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform hover:-translate-y-2">
                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl font-bold text-blue-600">1</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Crie sua Campanha</h3>
                                <p className="text-gray-600 mb-6">
                                    Conte sua história de forma envolvente, defina uma meta realista e adicione fotos que toquem o coração.
                                </p>
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <UsersIcon className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">Dica:</span> Seja honesto e transparente sobre como os recursos serão usados.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform hover:-translate-y-2">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl font-bold text-green-600">2</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Divulgue e Compartilhe</h3>
                                <p className="text-gray-600 mb-6">
                                    Compartilhe sua campanha nas redes sociais, por e-mail e com amigos. Quanto mais divulgar, maior o alcance.
                                </p>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <CampaignsIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">Dica:</span> Atualize regularmente seus apoiadores sobre o progresso.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform transition-transform hover:-translate-y-2">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl font-bold text-purple-600">3</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Receba as Doações</h3>
                                <p className="text-gray-600 mb-6">
                                    Acompanhe em tempo real o progresso da sua campanha. Solicite o saque quando quiser, sem precisar atingir a meta.
                                </p>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <FinancialIcon className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">Dica:</span> Agradeça publicamente aos seus apoiadores para manter o engajamento.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Por que escolher a Sonho Coletivo?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Nossa plataforma foi criada pensando em você e sua causa
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Totalmente Gratuita</h3>
                                    <p className="mt-2 text-gray-600">
                                        Criar uma campanha na Sonho Coletivo não custa nada. Cobramos apenas uma pequena taxa administrativa sobre o valor arrecadado.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Segurança Garantida</h3>
                                    <p className="mt-2 text-gray-600">
                                        Utilizamos tecnologia de ponta para proteger seus dados e transações financeiras, garantindo total segurança.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Foco no Brasil</h3>
                                    <p className="mt-2 text-gray-600">
                                        Nossa plataforma foi desenvolvida especialmente para o público brasileiro, com pagamento em R$ e suporte local.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Transparência Total</h3>
                                    <p className="mt-2 text-gray-600">
                                        Tudo é mostrado de forma clara e objetiva. Seus apoiadores sabem exatamente para onde vai o dinheiro arrecadado.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
                            Números que inspiram confiança
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                                <div className="text-4xl font-bold text-white mb-2">150+</div>
                                <div className="text-white opacity-90">Campanhas Realizadas</div>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                                <div className="text-4xl font-bold text-white mb-2">R$ 500K+</div>
                                <div className="text-white opacity-90">Arrecadados</div>
                            </div>
                            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
                                <div className="text-4xl font-bold text-white mb-2">89%</div>
                                <div className="text-white opacity-90">Meta Atingida</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Dúvidas Frequentes
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Tire suas dúvidas sobre como funciona a plataforma
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Quanto custa para criar uma campanha?
                                </h3>
                                <p className="text-gray-600">
                                    Criar uma campanha na Sonho Coletivo é totalmente gratuito. Cobramos apenas uma pequena taxa administrativa sobre o valor arrecadado, que é descontada no momento do saque.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Preciso atingir a meta para receber o dinheiro?
                                </h3>
                                <p className="text-gray-600">
                                    Não. Você pode solicitar o saque dos valores arrecadados a qualquer momento, independentemente de ter atingido a meta ou não. O valor disponível para saque será o total arrecadado menos as taxas administrativas.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Quais são as formas de pagamento disponíveis?
                                </h3>
                                <p className="text-gray-600">
                                    Aceitamos doações via Cartão de Crédito e Boleto Bancário. Estamos trabalhando para adicionar PIX em breve.
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Como faço para sacar o dinheiro arrecadado?
                                </h3>
                                <p className="text-gray-600">
                                    Você pode solicitar o saque dos valores arrecadados diretamente no seu painel de controle ("Minha Conta"). O valor será transferido para a conta bancária cadastrada, que deve estar vinculada ao mesmo CPF/CNPJ do criador da campanha.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Pronto para realizar seu sonho?
                        </h2>
                        <p className="text-xl text-white opacity-90 mb-10">
                            Junte-se a milhares de pessoas que já transformaram suas ideias em realidade
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link to="/create" className="px-8 py-4 bg-white text-brand-primary font-bold rounded-lg text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center">
                                Criar minha campanha agora
                                <ArrowRightIcon className="h-5 w-5 ml-2" />
                            </Link>
                            <Link to="/register" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-white hover:text-brand-primary transition-colors flex items-center justify-center">
                                Criar conta gratuitamente
                                <ArrowRightIcon className="h-5 w-5 ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Info */}
            <div className="py-12 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <CloudHeartIcon className="h-8 w-8 text-brand-primary" />
                            <span className="text-2xl font-bold text-gray-900">Sonho Coletivo</span>
                        </div>
                        <p className="text-gray-600">
                            Transformando sonhos em realidade, uma doação de cada vez.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;