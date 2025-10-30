import React from 'react';

const TermsParticipantPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark text-center mb-8">Termos do Participante</h1>
                    <div className="prose lg:prose-lg max-w-none text-gray-700 space-y-6">
                        <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                        
                        <p>
                            Bem-vindo à Sonho Coletivo! Estes Termos do Participante ("Termos") regem o uso da nossa plataforma de financiamento coletivo ("Plataforma") por parte dos criadores de campanhas ("Participantes"). Ao criar uma campanha na Sonho Coletivo, você concorda com estes Termos.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">1. A Plataforma</h2>
                        <p>
                           A Sonho Coletivo é uma plataforma de tecnologia que conecta Participantes que desejam arrecadar fundos para suas causas e projetos com Doadores dispostos a contribuir. A plataforma é operada por <strong>Imperatriz Construtora e Transportes Ltda</strong>, CNPJ 03.813.886/0001-80, com sede na Rua JJ Seabra, 216 - Comercio - Centro, Santaluz - BA, CEP 48.880-000.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">2. Elegibilidade e Cadastro</h2>
                        <p>
                            Para criar uma campanha, você deve ser maior de 18 anos (pessoa física) ou ser um representante legal de uma pessoa jurídica devidamente constituída. Você é responsável por fornecer informações verdadeiras, precisas e completas durante o cadastro e por manter seus dados atualizados.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">3. Suas Responsabilidades como Participante</h2>
                         <ul className="space-y-2">
                            <li><strong>Veracidade:</strong> Você garante que todas as informações fornecidas em sua campanha (textos, imagens, vídeos, metas) são verdadeiras e não enganosas.</li>
                            <li><strong>Uso dos Fundos:</strong> Você se compromete a utilizar os fundos arrecadados exclusivamente para os fins declarados na sua campanha.</li>
                            <li><strong>Comunicação:</strong> Você é responsável por se comunicar de forma clara e honesta com os doadores, fornecendo atualizações sobre o andamento do projeto sempre que possível.</li>
                            <li><strong>Conteúdo Proibido:</strong> É estritamente proibido criar campanhas que promovam atividades ilegais, discurso de ódio, violência, discriminação, ou que violem direitos de terceiros.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">4. Taxas e Repasses</h2>
                         <p>
                           A criação de campanhas na Sonho Coletivo é gratuita. Incide sobre o valor total arrecadado uma taxa de serviço para cobrir os custos operacionais da plataforma e dos processadores de pagamento. O valor líquido (arrecadado menos taxas) será repassado para a conta bancária informada pelo Participante, que deve obrigatoriamente ser da mesma titularidade (CPF/CNPJ) do cadastro.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">5. Moderação e Remoção de Campanhas</h2>
                        <p>
                           A Sonho Coletivo reserva-se o direito de revisar, suspender ou remover qualquer campanha que viole estes Termos ou que seja considerada fraudulenta, inadequada ou prejudicial à comunidade, a nosso exclusivo critério e sem aviso prévio.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-gray-800 pt-6">6. Limitação de Responsabilidade</h2>
                        <p>
                            A Sonho Coletivo atua como intermediária, facilitando a conexão entre Participantes e Doadores. Não nos responsabilizamos pelo sucesso ou fracasso de uma campanha, nem pela execução dos projetos ou pela veracidade total das informações fornecidas pelos Participantes. A responsabilidade pela campanha e pela entrega do que foi prometido é inteiramente do Participante.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">7. Disposições Gerais</h2>
                        <p>
                           Estes Termos podem ser atualizados a qualquer momento. Notificaremos sobre alterações significativas. A continuação do uso da plataforma após as alterações constitui sua aceitação dos novos Termos.
                        </p>
                         <p>
                           Para qualquer dúvida sobre estes Termos, entre em contato conosco através do e-mail <a href="mailto:contato@sonhocoletivo.com.br" className="text-brand-primary hover:underline">contato@sonhocoletivo.com.br</a> ou da nossa página de <a href="#/ajuda" className="text-brand-primary hover:underline">Ajuda</a>.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsParticipantPage;