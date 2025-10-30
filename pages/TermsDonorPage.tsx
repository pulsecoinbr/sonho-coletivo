import React from 'react';

const TermsDonorPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark text-center mb-8">Termos do Doador</h1>
                     <div className="prose lg:prose-lg max-w-none text-gray-700 space-y-6">
                        <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                        
                        <p>
                           Obrigado por escolher apoiar uma causa na Sonho Coletivo! Estes Termos do Doador ("Termos") descrevem seus direitos e responsabilidades ao fazer uma doação através da nossa plataforma ("Plataforma"). Ao realizar uma doação, você concorda com estes Termos.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">1. A Plataforma e Nosso Papel</h2>
                        <p>
                           A Sonho Coletivo, operada por <strong>Imperatriz Construtora e Transportes Ltda</strong> (CNPJ 03.813.886/0001-80), é uma plataforma que facilita a doação para campanhas de financiamento coletivo criadas por terceiros ("Participantes"). Nosso papel é de intermediário, fornecendo a tecnologia para que a sua doação chegue até a campanha escolhida.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">2. Processo de Doação</h2>
                        <p>
                           Ao doar, você concorda em fornecer informações de pagamento válidas e autoriza o débito do valor selecionado. As doações são processadas por empresas parceiras especializadas em pagamentos online, garantindo a segurança da transação. As doações são, em geral, não reembolsáveis.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">3. Risco e Responsabilidade</h2>
                         <p>
                           Você entende que doar para uma campanha na Sonho Coletivo envolve um risco. Embora nossa equipe verifique as campanhas para garantir que sejam legítimas e bem-intencionadas, <strong>não podemos garantir</strong> que o Participante utilizará os fundos conforme descrito ou que o projeto será concluído com sucesso.
                        </p>
                        <p>
                            A Sonho Coletivo não se responsabiliza pela execução das campanhas. A responsabilidade final pela utilização dos fundos e pela transparência com os doadores é inteiramente do criador da campanha (Participante). Recomendamos que você doe apenas para campanhas que lhe inspirem confiança.
                        </p>
                        

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">4. Denúncias</h2>
                         <p>
                           Caso suspeite que uma campanha é fraudulenta ou viola nossos termos, utilize a ferramenta "Denunciar" na página da campanha. Nossa equipe investigará todas as denúncias. No entanto, uma investigação não garante o reembolso da sua doação.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">5. Privacidade</h2>
                        <p>
                          Suas informações pessoais serão tratadas conforme nossa Política de Privacidade. Ao doar, você pode optar por ter seu nome exibido na lista de doadores ou permanecer anônimo. Seu e-mail não será compartilhado publicamente.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-gray-800 pt-6">6. Isenção de Garantia</h2>
                        <p>
                            A Sonho Coletivo não endossa, garante ou se responsabiliza por qualquer campanha ou Participante. As decisões de doar são de sua inteira responsabilidade.
                        </p>

                         <p>
                           Ao doar, você reconhece que leu, entendeu e concordou com estes Termos. Se tiver alguma dúvida, por favor, entre em contato através do e-mail <a href="mailto:contato@sonhocoletivo.com.br" className="text-brand-primary hover:underline">contato@sonhocoletivo.com.br</a> ou visite nossa página de <a href="#/ajuda" className="text-brand-primary hover:underline">Ajuda</a>.
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsDonorPage;