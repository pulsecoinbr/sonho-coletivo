import React from 'react';
import { Link } from 'react-router-dom';
import { CloudHeartIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-xl font-bold text-brand-primary mb-4">
              <CloudHeartIcon className="h-7 w-7 text-brand-secondary" />
              <span>Sonho Coletivo</span>
            </div>
            <p className="text-gray-500 text-sm">Realizando sonhos, uma doação de cada vez.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-600 hover:text-brand-primary">Início</Link></li>
              <li><Link to="/como-funciona" className="text-gray-600 hover:text-brand-primary">Como Funciona</Link></li>
              <li><Link to="/create" className="text-gray-600 hover:text-brand-primary">Criar Campanha</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ajuda" className="text-gray-600 hover:text-brand-primary">Central de Ajuda</Link></li>
              <li><a href="mailto:contato@sonhocoletivo.com.br" className="text-gray-600 hover:text-brand-primary">contato@sonhocoletivo.com.br</a></li>
              <li><Link to="/termos-participante" className="text-gray-600 hover:text-brand-primary">Termos do Participante</Link></li>
              <li><Link to="/termos-doador" className="text-gray-600 hover:text-brand-primary">Termos do Doador</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-primary">Política de Privacidade</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
               {/* Social Icons would go here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sonho Coletivo. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;