import axios from 'axios';

// In a real application, these would come from environment variables
const SAFE2PAY_API_KEY = process.env.SAFE2PAY_API_KEY || '';
const SAFE2PAY_SECRET_KEY = process.env.SAFE2PAY_SECRET_KEY || '';

const api = axios.create({
  baseURL: 'https://api.safe2pay.com.br/v2', // Production URL
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': SAFE2PAY_API_KEY,
  },
});

// For sandbox testing
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
    const response = await sandboxApi.post('/Payment', data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating boleto payment:', error.response?.data || error.message);
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