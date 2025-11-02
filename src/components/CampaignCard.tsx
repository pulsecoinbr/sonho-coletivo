import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { MapPinIcon, CheckCircleIcon } from './icons';

interface CampaignCardProps {
  campaign: any; // Using 'any' for now, will define a proper interface later
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const percentage = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <Link to={`/campaign/${campaign.id}`} className="block">
        <img 
          className="h-48 w-full object-cover" 
          src={campaign.image_url || 'https://picsum.photos/seed/campaign/600/400'} 
          alt={campaign.title} 
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-gray-500 uppercase font-semibold">{campaign.category}</p>
        <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 h-14 overflow-hidden">
            <Link to={`/campaign/${campaign.id}`} className="hover:text-brand-primary transition-colors">{campaign.title}</Link>
        </h3>
        <div className="flex items-center text-sm text-gray-600 mb-4">
            <span>Por {campaign.user_id}</span> {/* Assuming user_id is enough for now, or fetch profile name */}
            {campaign.user_verified && <CheckCircleIcon className="h-4 w-4 text-blue-500 ml-1" />}
        </div>
        
        <div className="mt-auto">
            <ProgressBar current={campaign.raised} goal={campaign.goal} />
            <div className="flex justify-between items-center mt-2 text-sm">
                <span className="font-bold text-brand-secondary">{percentage}%</span>
                <span className="text-gray-600"><span className="font-bold text-gray-800">{formatCurrency(campaign.raised)}</span> arrecadados</span>
            </div>
             <div className="flex items-center text-xs text-gray-500 mt-3">
              <MapPinIcon className="h-4 w-4 mr-1" />
              {campaign.city}, {campaign.state}
            </div>
            <Link to={`/donate/${campaign.id}`} className="mt-4 w-full block text-center bg-brand-accent text-white font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity">
                Doar Agora
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;