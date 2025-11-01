import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CloudHeartIcon, FinancialIcon, DownloadIcon, SearchIcon, CalendarIcon, DollarSignIcon, CreditCardIcon, BarcodeIcon } from '../components/icons';

interface Donation {
    id: string;
    campaignId: string;
    campaignTitle: string;
    donorName: string;
    donorEmail: string;
    amount: number;
    paymentMethod: 'credit_card' | 'boleto';
    status: 'pendente' | 'aprovado' | 'cancelado' | 'reembolsado';
    createdAt: string;
    processedAt?: string;
    transactionId?: string;
    boletoLink?: string;
}

const AdminDonationsPage: React.FC = () => {
    const navigate = useNavigate();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('todos');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('todos');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [financialStats, setFinancialStats] = useState({
        totalDonations: 0,
        totalAmount: 0,
        pendingAmount: 0,
        approvedAmount: 0,
        averageDonation: 0
    });

    useEffect(() => {
        // Check if admin is logged in
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isAdminLoggedIn !== 'true') {
            navigate('/admin/login');
            return;
        }

        // Load mock donations
        const mockDonations: Donation[] = [
            {
                id: 'd1',
                campaignId: '1',
                campaignTitle: 'Ajude a construir um novo parquinho para as crianças',
                donorName: 'Carlos Andrade',
                donorEmail: 'carlos.andrade@email.com',
                amount: 150,
                paymentMethod: 'boleto',
                status: 'aprovado',
                createdAt: '2024-01-20 14:30',
                processedAt: '2024-01-20 14:35',
                transactionId: 'TXN001',
                boletoLink: 'https://example.com/boleto/001'
            },
            {
                id: 'd2',
                campaignId: '2',
                campaignTitle: 'Recuperação do Quiosque do Sr. João pós-enchente',
                donorName: 'Mariana Costa',
                donorEmail: 'mariana.costa@email.com',
                amount: 250,
                paymentMethod: 'credit_card',
                status: 'aprovado',
                createdAt: '2024-01-19 10:15',
                processedAt: '2024-01-19 10:18',
                transactionId: 'TXN002'
            },
            {
                id: 'd3',
                campaignId: '3',
                campaignTitle: 'Vencendo a tetraplegia: Fisioterapia para o Marcos',
                donorName: 'Juliana Paes',
                donorEmail: 'juliana.paes@email.com',
                amount: 100,
                paymentMethod: 'boleto',
                status: 'pendente',
                createdAt: '2024-01-18 16:45',
                transactionId: 'TXN003'
            },
            {
                id: 'd4',
                campaignId: '1',
                campaignTitle: 'Ajude a construir um novo parquinho para as crianças',
                donorName: 'Doador Anônimo',
                donorEmail: '',
                amount: 50,
                paymentMethod: 'credit_card',
                status: 'aprovado',
                createdAt: '2024-01-17 11:30',
                processedAt: '2024-01-17 11:32',
                transactionId: 'TXN004'
            },
            {
                id: 'd5',
                campaignId: '4',
                campaignTitle: 'Cirurgia para o cachorro Toby',
                donorName: 'Roberto Viana',
                donorEmail: 'roberto.viana@email.com',
                amount: 200,
                paymentMethod: 'boleto',
                status: 'cancelado',
                createdAt: '2024-01-16 09:20',
                processedAt: '2024-01-16 09:25',
                transactionId: 'TXN005'
            }
        ];
        setDonations(mockDonations);
        setFilteredDonations(mockDonations);
        calculateFinancialStats(mockDonations);
    }, [navigate]);

    useEffect(() => {
        // Apply filters
        let result = donations;

        if (searchTerm) {
            result = result.filter(donation => 
                donation.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donation.donorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donation.campaignTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donation.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter !== 'todos') {
            result = result.filter(donation => donation.status === statusFilter);
        }

        if (paymentMethodFilter !== 'todos') {
            result = result.filter(donation => donation.paymentMethod === paymentMethodFilter);
        }

        if (dateRange.start) {
            result = result.filter(donation => donation.createdAt >= dateRange.start);
        }

        if (dateRange.end) {
            result = result.filter(donation => donation.createdAt <= dateRange.end);
        }

        setFilteredDonations(result);
    }, [donations, searchTerm, statusFilter, paymentMethodFilter, dateRange]);

    const calculateFinancialStats = (donationsList: Donation[]) => {
        const totalDonations = donationsList.length;
        const totalAmount = donationsList.reduce((sum, donation) => sum + donation.amount, 0);
        const pendingAmount = donationsList
            .filter(d => d.status === 'pendente')
            .reduce((sum, donation) => sum + donation.amount, 0);
        const approvedAmount = donationsList
            .filter(d => d.status === 'aprovado')
            .reduce((sum, donation) => sum + donation.amount, 0);
        const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

        setFinancialStats({
            totalDonations,
            totalAmount,
            pendingAmount,
            approvedAmount,
            averageDonation
        });
    };

    const handleApproveDonation = (donationId: string) => {
        setDonations(prev => prev.map(donation => 
            donation.id === donationId ? { 
                ...donation, 
                status: 'aprovado' as const,
                processedAt: new Date().toLocaleString('pt-BR')
            } : donation
        ));
        alert('Doação aprovada com sucesso!');
    };

    const handleCancelDonation = (donationId: string) => {
        if (window.confirm('Tem certeza que deseja cancelar esta doação?')) {
            setDonations(prev => prev.map(donation => 
                donation.id === donationId ? { 
                    ...donation, 
                    status: 'cancelado' as const,
                    processedAt: new Date().toLocaleString('pt-BR')
                } : donation
            ));
            alert('Doação cancelada com sucesso!');
        }
    };

    const handleExportDonations = () => {
        const csvContent = [
            ['ID', 'Campanha', 'Doador', 'E-mail', 'Valor', 'Método', 'Status', 'Data', 'Transação'],
            ...filteredDonations.map(donation => [
                donation.id,
                donation.campaignTitle,
                donation.donorName,
                donation.donorEmail || '',
                donation.amount.toString(),
                donation.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 'Boleto',
                donation.status,
                donation.createdAt,
                donation.transactionId || ''
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `doacoes_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'aprovado': return 'bg-green-100 text-green-800';
            case 'pendente': return 'bg-yellow-100 text-yellow-800';
            case 'cancelado': return 'bg-red-100 text-red-800';
            case 'reembolsado': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentMethodIcon = (method: string) => {
        return method === 'credit_card' ? CreditCardIcon : BarcodeIcon;
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/admin" className="flex items-center space-x-2 text-2xl font-bold text-brand-primary">
                                <CloudHeartIcon className="h-8 w-8 text-brand-secondary" />
                                <span>Painel Administrativo — Sonho Coletivo</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to="/admin" className="text-sm text-gray-600 hover:text-gray-900">
                                ← Voltar
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <FinancialIcon className="h-8 w-8 text-red-600 mr-3" />
                            <h1 className="text-3xl font-bold text-gray-900">Doações</h1>
                        </div>
                        <button
                            onClick={handleExportDonations}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                        >
                            <DownloadIcon className="h-4 w-4" />
                            <span>Exportar CSV</span>
                        </button>
                    </div>
                    <p className="text-gray-600">Controle financeiro e relatórios de doações</p>
                </div>

                {/* Financial Stats */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-500 rounded-full">
                                <DollarSignIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total de Doações</p>
                                <p className="text-2xl font-semibold text-gray-900">{financialStats.totalDonations}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-500 rounded-full">
                                <DollarSignIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                                <p className="text-2xl font-semibold text-gray-900">R$ {financialStats.totalAmount.toLocaleString('pt-BR')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-yellow-500 rounded-full">
                                <DollarSignIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pendente</p>
                                <p className="text-2xl font-semibold text-gray-900">R$ {financialStats.pendingAmount.toLocaleString('pt-BR')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-500 rounded-full">
                                <DollarSignIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Aprovado</p>
                                <p className="text-2xl font-semibold text-gray-900">R$ {financialStats.approvedAmount.toLocaleString('pt-BR')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-orange-500 rounded-full">
                                <DollarSignIcon className="h-6 w-6 text-white" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Média</p>
                                <p className="text-2xl font-semibold text-gray-900">R$ {financialStats.averageDonation.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por doador, campanha ou transação..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                        >
                            <option value="todos">Todos os Status</option>
                            <option value="pendente">Pendentes</option>
                            <option value="aprovado">Aprovados</option>
                            <option value="cancelado">Cancelados</option>
                            <option value="reembolsado">Reembolsados</option>
                        </select>
                        <select
                            value={paymentMethodFilter}
                            onChange={(e) => setPaymentMethodFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                        >
                            <option value="todos">Todos os Métodos</option>
                            <option value="credit_card">Cartão de Crédito</option>
                            <option value="boleto">Boleto</option>
                        </select>
                        <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="Data inicial"
                        />
                        <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
                            placeholder="Data final"
                        />
                        <div className="flex items-center justify-center">
                            <span className="text-sm text-gray-600">
                                {filteredDonations.length} doação{filteredDonations.length !== 1 ? 's' : ''} encontrada{filteredDonations.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Donations Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doação</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doador</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDonations.map((donation) => {
                                    const PaymentIcon = getPaymentMethodIcon(donation.paymentMethod);
                                    return (
                                        <tr key={donation.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{donation.campaignTitle}</div>
                                                <div className="text-xs text-gray-500">ID: {donation.id}</div>
                                                {donation.transactionId && (
                                                    <div className="text-xs text-gray-400">Transação: {donation.transactionId}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{donation.donorName}</div>
                                                {donation.donorEmail && (
                                                    <div className="text-sm text-gray-500">{donation.donorEmail}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">R$ {donation.amount.toLocaleString('pt-BR')}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <PaymentIcon className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm text-gray-600">
                                                        {donation.paymentMethod === 'credit_card' ? 'Cartão de Crédito' : 'Boleto'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(donation.status)}`}>
                                                    {donation.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div>{donation.createdAt}</div>
                                                {donation.processedAt && (
                                                    <div className="text-xs text-gray-400">Processado: {donation.processedAt}</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    {donation.status === 'pendente' && (
                                                        <button
                                                            onClick={() => handleApproveDonation(donation.id)}
                                                            className="text-green-600 hover:text-green-900"
                                                            title="Aprovar"
                                                        >
                                                            Aprovar
                                                        </button>
                                                    )}
                                                    {donation.status === 'pendente' && (
                                                        <button
                                                            onClick={() => handleCancelDonation(donation.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                            title="Cancelar"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    )}
                                                    {donation.boletoLink && (
                                                        <a
                                                            href={donation.boletoLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:text-blue-900"
                                                            title="Ver Boleto"
                                                        >
                                                            Boleto
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredDonations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        Nenhuma doação encontrada com os filtros aplicados.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDonationsPage;