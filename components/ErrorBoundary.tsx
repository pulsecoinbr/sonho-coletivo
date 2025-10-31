import React, { Component, ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado</h2>
              <p className="text-gray-600 mb-6">
                Desculpe pelo inconveniente. Ocorreu um erro inesperado na aplicação.
              </p>
              
              {this.state.error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <h3 className="font-medium text-red-800 mb-2">Detalhes do erro:</h3>
                  <p className="text-sm text-red-600 font-mono">{this.state.error.message}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <button
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Recarregar a página
                </button>
                <button
                  onClick={() => this.setState({ hasError: false })}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-6">
                Se o problema persistir, por favor, entre em contato com o suporte.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}