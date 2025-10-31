import axios from 'axios';

// In a real application, these would come from environment variables
const SAFE2PAY_API_KEY = process.env.SAFE2PAY_API_KEY || '';
const SAFE2PAY_SECRET_KEY = process.env.SAFE2PAY_SECRET_KEY || '';

console.log('Safe2Pay API Key:', SAFE2PAY_API_KEY ? 'Set' : 'Not set');
console.log('Safe2Pay Secret Key:', SAFE2PAY_SECRET_KEY ? 'Set' : 'Not set');

const sandboxApi = axios.create({
  baseURL: 'https://api.safe2pay.com.br/v2', // Sandbox URL
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': SAFE2PAY_API_KEY,
  },
});

export interface Safe2PayResponse {
  HasError: boolean;
  Message: string;
  ResponseDetail: {
    Id: number;
    Status: string;
    Message: string;
    LinkBoleto?: string;
    DigitableLine?: string;
    Barcode?: string;
  };
}

export interface BoletoPaymentData {
  IsSandbox: boolean;
  Customer: {
    Name: string;
    Identity: string;
    Email: string;
    Phone: string;
    Address: {
      ZipCode: string;
      Street: string;
      Number: string;
      District: string;
      CityName: string;
      StateInitials: string;
      CountryName: string;
    };
  };
  Products: Array<{
    Description: string;
    UnitPrice: number;
    Quantity: number;
  }>;
  PaymentObject: {
    DueDate: string;
    Instruction: string;
    CancelAfterDue: boolean;
  };
  PaymentMethod: string;
  Application: string;
  CallbackUrl: string;
  Reference: string;
}

export const createBoletoPayment = async (data: BoletoPaymentData): Promise<Safe2PayResponse> => {
  try {
    console.log('Sending Safe2Pay request:', JSON.stringify(data, null, 2));
    
    // Tentar múltiplos endpoints possíveis para boletos
    const endpoints = [
      '/Boleto',
      '/BoletoGerar', 
      '/Payment/Boleto',
      '/Boleto/Create',
      '/Payment/Boleto/Create'
    ];
    
    let lastError: any = null;
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        const response = await sandboxApi.post(endpoint, data);
        console.log(`Success with ${endpoint}:`, response.data);
        return response.data;
      } catch (error: any) {
        console.error(`Failed with ${endpoint}:`, error.response?.status);
        lastError = error;
        
        // Se for 404, tenta o próximo endpoint
        if (error.response?.status === 404) {
          continue;
        }
        
        // Se for outro erro, para de tentar
        break;
      }
    }
    
    // Se todos os endpoints falharam, lança o último erro
    throw lastError;
  } catch (error: any) {
    console.error('Error creating boleto payment:', error);
    
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    throw error;
  }
};

// For webhook callback handling
export const handlePaymentCallback = async (callbackData: any): Promise<void> => {
  try {
    // Process the callback data here
    console.log('Payment callback received:', callbackData);
    
    // Update payment status in your database
    // Save Reference and TransactionId for reconciliation
    
    // Example:
    // const { Reference, TransactionId, Status } = callbackData;
    // Update payment status in database based on Reference
  } catch (error) {
    console.error('Error handling payment callback:', error);
    throw error;
  }
};