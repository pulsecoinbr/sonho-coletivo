import axios from 'axios';

// In a real application, these would come from environment variables
const SAFE2PAY_API_KEY = process.env.SAFE2PAY_API_KEY || '';
const SAFE2PAY_SECRET_KEY = process.env.SAFE2PAY_SECRET_KEY || '';

console.log('Safe2Pay API Key:', SAFE2PAY_API_KEY ? 'Set' : 'Not set');
console.log('Safe2Pay Secret Key:', SAFE2PAY_SECRET_KEY ? 'Set' : 'Not set');

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

// Mock implementation for testing
export const createBoletoPayment = async (data: BoletoPaymentData): Promise<Safe2PayResponse> => {
  try {
    console.log('Sending Safe2Pay request (MOCK):', JSON.stringify(data, null, 2));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock boleto data
    const mockTransactionId = Math.floor(Math.random() * 1000000);
    const mockBoletoLink = `https://boleto.mock.com/boleto_${mockTransactionId}.pdf`;
    const mockDigitableLine = `23790.81210 00000.123456 12345.678901 1 12345670000012345`;
    
    const mockResponse: Safe2PayResponse = {
      HasError: false,
      Message: "Boleto gerado com sucesso",
      ResponseDetail: {
        Id: mockTransactionId,
        Status: "Pending",
        Message: "Boleto gerado e enviado por e-mail",
        LinkBoleto: mockBoletoLink,
        DigitableLine: mockDigitableLine,
        Barcode: mockDigitableLine.replace(/\D/g, '').slice(0, 44)
      }
    };
    
    console.log('Safe2Pay mock response:', mockResponse);
    
    return mockResponse;
  } catch (error: any) {
    console.error('Error creating boleto payment (MOCK):', error);
    throw error;
  }
};

// For webhook callback handling
export const handlePaymentCallback = async (callbackData: any): Promise<void> => {
  try {
    // Process the callback data here
    console.log('Payment callback received (MOCK):', callbackData);
    
    // Update payment status in your database
    // Save Reference and TransactionId for reconciliation
    
    // Example:
    // const { Reference, TransactionId, Status } = callbackData;
    // Update payment status in database based on Reference
  } catch (error) {
    console.error('Error handling payment callback (MOCK):', error);
    throw error;
  }
};