import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudHeartIcon } from '../components/icons';

const AdminLoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Simulate admin authentication
            // In a real app, this would be an API call to verify admin credentials
            if (email === 'admin@sonhocoletivo.com.br' && password === 'admin123') {
                // Store admin session
                localStorage.setItem('isAdminLoggedIn', 'true');
                localStorage.setItem('adminEmail', email);
                navigate('/dashboard');
            } else {
                setError('E-mail ou senha incorretos.');
            }
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <Link to="/" className="flex justify-center items-center space-x-2 text-3xl font-bold text-brand-primary">
                        <CloudHeartIcon className="h-10 w-10 text-brand-secondary" />
                        <span>Sonho Coletivo</span>
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Área Administrativa
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Acesse o painel de controle da plataforma
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                E-mail Administrativo
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm"
                                placeholder="admin@sonhocoletivo.com.br"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-accent focus:border-brand-accent focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-accent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50"
                            >
                                {isLoading ? 'Acessando...' : 'Entrar no Painel'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Dados de acesso para teste: <br />
                            <span className="font-mono">admin@sonhocoletivo.com.br</span> / 
                            <span className="font-mono"> admin123</span>
                        </p>
                    </div>
                </div>
                <div className="text-center">
                    <Link to="/" className="text-sm text-brand-primary hover:text-brand-secondary">
                        ← Voltar ao site
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginPage;