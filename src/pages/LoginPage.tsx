import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import InputField from '@/components/InputField';
import { CloudHeartIcon, GoogleIcon } from '@/components/icons';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/dashboard';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const { data, error } = await signIn(email, password);
            
            if (error) {
                setError(error.message);
                return;
            }
            
            if (data.user) {
                navigate(redirectPath);
            }
        } catch (err) {
            setError('Ocorreu um erro. Por favor, tente novamente.');
        } finally {
            setLoading(false);
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
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
                        Acesse sua conta
                    </h2>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <InputField
                            id="email"
                            label="E-mail"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            id="password"
                            label="Senha"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-accent focus:ring-brand-accent border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                                    Lembrar de mim
                                </label>
                            </div>
                            <a href="#" className="font-medium text-brand-primary hover:text-brand-secondary">
                                Esqueceu a senha?
                            </a>
                        </div>
                         {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                        <div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent disabled:opacity-50"
                            >
                                {loading ? 'Entrando...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => alert("Simulação de login com Google. Funcionalidade indisponível no momento.")}
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <GoogleIcon className="h-5 w-5" />
                                <span className="ml-2">Google</span>
                            </button>
                        </div>
                    </div>
                </div>
                 <p className="mt-2 text-center text-sm text-gray-600">
                    É novo por aqui?{' '}
                    <Link to="/register" className="font-medium text-brand-primary hover:text-brand-secondary">
                        Cadastre-se
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;