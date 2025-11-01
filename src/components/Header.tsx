import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CloudHeartIcon, UserIcon, LogoutIcon } from '@/components/icons';
import { AppContext } from '@/context/AppContext';

const Header: React.FC = () => {
  const { session, signOut } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-brand-primary">
              <CloudHeartIcon className="h-8 w-8 text-brand-secondary" />
              <span>Sonho Coletivo</span>
            </NavLink>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/como-funciona" className="text-gray-600 hover:text-brand-primary transition-colors">Como Funciona</NavLink>
            <NavLink to="/quem-somos" className="text-gray-600 hover:text-brand-primary transition-colors">Quem Somos</NavLink>
            <NavLink to="/ajuda" className="text-gray-600 hover:text-brand-primary transition-colors">Ajuda</NavLink>
            {session && <NavLink to="/dashboard" className="text-gray-600 hover:text-brand-primary transition-colors">Minha Conta</NavLink>}
          </nav>
          <div className="flex items-center space-x-2">
            {session ? (
              <div className="relative">
                <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-md hover:bg-opacity-90">
                  <UserIcon className="h-5 w-5" />
                  <span>Olá, {session.user.email.split('@')[0]}</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Minha Conta</Link>
                    <button onClick={handleLogout} className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <LogoutIcon className="h-5 w-5" />
                      <span>Sair</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  Login
                </NavLink>
                <NavLink to="/register" className="px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:opacity-90 transition-opacity">
                  Cadastre-se
                </NavLink>
              </>
            )}
             <NavLink to="/create" className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:opacity-90 transition-opacity">
              Criar Campanha
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;