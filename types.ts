export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // In a real app, never store plain text passwords
  cpf: string;
  phone: string;
  dob: string;
  address: {
    zip: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
  };
}

export interface DonorMessage {
    id: string;
    donorName: string;
    text: string;
    timestamp: string;
}

export interface DonorInfo {
    id: string;
    name: string;
    timestamp: string;
}

export interface Campaign {
  id: string;
  authorId: string;
  title: string;
  author: string;
  authorVerified: boolean;
  description: string;
  category: string;
  goal: number;
  raised: number;
  imageUrl: string;
  galleryUrls: string[];
  city: string;
  state: string;
  endDate: string;
  donors: DonorInfo[];
  messages: DonorMessage[];
}

export interface Donor {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: {
    zip: string;
    street: string;
    number: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
  };
}

export type PaymentMethod = 'credit_card' | 'boleto';

export interface Donation {
  campaignId: string;
  amount: number;
  donor: Donor;
  paymentMethod: PaymentMethod;
  message?: string;
  isAnonymous?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  imageUrl: string;
  campaignTitle: string;
  quote: string;
}