import { createContext } from 'react';
import { Campaign, User, Testimonial, Donation } from './types';

export interface AppContextType {
  campaigns: Campaign[];
  testimonials: Testimonial[];
  addCampaign: (campaign: Campaign) => void;
  addDonation: (donation: Donation) => void;
  users: User[];
  currentUser: User | null;
  login: (email: string, passwordHash: string) => User | null;
  logout: () => void;
  register: (user: Omit<User, 'id'>) => User;
}

export const AppContext = createContext<AppContextType>({
  campaigns: [],
  testimonials: [],
  addCampaign: () => {},
  addDonation: () => {},
  users: [],
  currentUser: null,
  login: () => null,
  logout: () => {},
  register: () => ({} as User),
});