import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark text-center mb-8">Sobre Nós</h1>
                    <div className="prose lg:prose-lg max-w-none text-gray-700 space-y-6">
                        <p>
                            Na SonhoColetivo, acreditamos que sonhos podem virar realidade quando recebem apoio certo e uma plataforma confiável. Somos uma equipe dedicada ao propósito de conectar quem tem uma causa — uma necessidade, um projeto, uma meta — com pessoas que querem doar, apoiar e impactar positivamente.
                        </p>
                        <p>
                            Com simplicidade, transparência e responsabilidade, oferecemos um ambiente onde qualquer pessoa pode criar sua campanha de arrecadação (“vaquinha”), definir uma meta, contar sua história — e mobilizar doadores com segurança. Do outro lado, quem doa encontra uma plataforma fácil, confiável e que respeita seus valores.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 pt-6">Por que escolher a SonhoColetivo?</h2>
                        
                        <ul className="space-y-4">
                            <li>
                                <strong>Credibilidade:</strong> todas as campanhas são verificadas pela nossa equipe, garantindo que os projetos sejam legítimos, claros e alinhados ao propósito de ajuda.
                            </li>
                            <li>
                                <strong>Transparência total:</strong> cada campanha exibe o valor arrecadado, a meta definida, o histórico e o autor da campanha — e você pode acompanhar em tempo real.
                            </li>
                            <li>
                                <strong>Foco no impacto:</strong> não somos apenas uma página de doações. Somos uma rede de pessoas que acreditam que ajudar é parte da vida. Com slogan “Doe livremente, impacte positivamente”, queremos que cada contribuição gere resultado real.
                            </li>
                            <li>
                                <strong>Facilidade de uso:</strong> criadores de campanha têm acesso a um painel dedicado para editar sua campanha, subir imagens, contar sua história e mobilizar apoiadores. Doadores podem contribuir facilmente, sem burocracia, com cartão ou boleto — e acompanhar todo o processo.
                            </li>
                             <li>
                                <strong>Compromisso com o Brasil:</strong> entendemos como é importante que a plataforma fale a sua língua, ofereça pagamento no Brasil, e seja simples de usar. Por isso tudo está em português, e o sistema foi pensado para você.
                            </li>
                        </ul>

                        <p>
                            Nosso caminho está apenas começando — mas cada campanha publicada, cada real doado e cada meta alcançada fortalece nossa missão: criar uma comunidade de solidez, empatia e impacto real. A SonhoColetivo é o lugar onde sonhos se conectam com pessoas que querem fazer o bem — e juntos realizamos aquilo que parecia distante.
                        </p>
                        <p>
                            Se você tem um sonho, uma necessidade ou uma meta — ou se quer apoiar alguém que tem — você está no lugar certo. Bem-vindo à SonhoColetivo. Doe livremente. Impacte positivamente.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
