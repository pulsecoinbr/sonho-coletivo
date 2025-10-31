import axios from 'axios';

// In a real application, these would come from environment variables
const SAFE2PAY_SANDBOX_TOKEN = 'YOUR_SAFE2PAY_SANDBOX_TOKEN'; // Replace with actual token
const SAFE2PAY_SANDBOX_KEY = 'YOUR_SAFE2PAY_SANDBOX_KEY'; // Replace with actual key

const api = axios.create({
  baseURL: 'https://sandbox.safe2pay.com.br/api/v2', // Sandbox URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SAFE2PAY_SANDBOX_TOKEN}`,
    'X-API-KEY': SAFE2PAY_SANDBOX_KEY,
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
    Barcode?: string;
  };
}

export interface BoletoPaymentData {
  dueDate: string;
  amount: number;
  description: string;
  reference: string;
  customer: {
    name: string;
    cpfCnpj: string;
    address: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
    email: string;
    phone: string;
  };
}

export interface CreditCardPaymentData {
  amount: number;
  description: string;
  reference: string;
  customer: {
    name: string;
    cpfCnpj: string;
    email: string;
    phone: string;
  };
  paymentMethod: {
    cardNumber: string;
    holder: string;
    validate: string;
    cvv: string;
  };
}

export const createBoletoPayment = async (data: BoletoPaymentData): Promise<Safe2PayResponse> => {
  try {
    const response = await api.post('/boleto', {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating boleto payment:', error);
    throw error;
  }
};

export const createCreditCardPayment = async (data: CreditCardPaymentData): Promise<Safe2PayResponse> => {
  try {
    const response = await api.post('/creditcard', {
      ...data,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating credit card payment:', error);
    throw error;
  }
};