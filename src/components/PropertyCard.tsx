import React, { useState } from 'react';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Droplet,
  Zap,
  Bookmark,
  ArrowRight,
  ShieldCheck,
  Compass,
  Home
} from 'lucide-react';
import { Property } from '../types';
import { formatKes } from '../utils/formatters';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onSelectProperty,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      id={`property-card-${property.id}`}
      className="group bg-[#FFFFFF] rounded-2xl border border-[#E8DED1] hover:border-[#CCA98A] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-16/10 overflow-hidden bg-[#EFE6DC]">
          {!imageError ? (
            <img
              src={property.images[0]}
              alt={property.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#EFE6DC] to-[#DFD2C2] text-[#6E5A4D]">
              <Home className="w-8 h-8 text-[#A88C78] mb-1" />
              <span className="text-xs font-semibold">{property.neighborhood}</span>
            </div>
          )}

          {/* Top gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25 pointer-events-none" />

          {/* City and Property Type Tag */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#2A1810]/85 backdrop-blur-md text-[#FFFDF9] border border-[#FFFDF9]/10">
              {property.city}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-[#FFFDF9]/90 backdrop-blur-md text-[#2A1810]">
              {property.propertyType}
            </span>
          </div>

          {/* Save / Favorite Button */}
          <button
            type="button"
            id={`save-btn-${property.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property.id);
            }}
            className={`absolute top-3 right-3 z-10 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#C27835] text-white shadow-xs'
                : 'bg-[#FFFDF9]/85 text-[#4D3627] hover:bg-[#FFFDF9] hover:text-[#C27835]'
            }`}
            aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Bottom Photo Overlay Info: Rent */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
            <div>
              <p className="text-[10px] font-bold text-[#EADCCF] uppercase tracking-wider">
                Monthly Rent
              </p>
              <p className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-xs">
                {formatKes(property.rentKes)}
                <span className="text-xs font-normal text-[#EADCCF] ml-1">/ mo</span>
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Title & Neighborhood */}
          <div className="mb-3 text-left">
            <h3 className="font-bold text-base text-[#241811] line-clamp-1 group-hover:text-[#C27835] transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-[#6E5A4D] mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#C27835] shrink-0" />
              <span className="font-medium truncate">{property.neighborhood}</span>
            </div>
          </div>

          {/* CBD Distance & Remoteness */}
          <div className="bg-[#FAF6F0] border border-[#EAE1D5] rounded-xl p-2.5 mb-3.5 text-left">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-[#544135]">
                <Compass className="w-3.5 h-3.5 text-[#C27835] shrink-0" />
                <span className="truncate">
                  <strong className="text-[#2A1810]">{property.distanceToCbdKm} km</strong> to CBD
                </span>
              </div>
              <div className="text-right text-[#6E5A4D] truncate">
                <span className="inline-block px-2 py-0.5 rounded-md bg-[#FFFFFF] border border-[#DFD2C2] text-[11px] font-medium text-[#4A3628]">
                  {property.remotenessTier}
                </span>
              </div>
            </div>
          </div>

          {/* Specs: Bed, Bath, Sqm */}
          <div className="flex items-center justify-between py-2 border-y border-[#F0E6DA] text-xs text-[#6B5749] mb-3.5">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-[#A88C78]" />
              <span className="font-bold text-[#2A1810]">{property.bedrooms}</span>
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-[#A88C78]" />
              <span className="font-bold text-[#2A1810]">{property.bathrooms}</span>
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#A88C78]" />
              <span className="font-bold text-[#2A1810]">{property.sizeSqMeters}</span>
              <span>m²</span>
            </div>
          </div>

          {/* Essential Kenyan Utilities */}
          <div className="flex flex-wrap gap-1.5 mb-1">
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-[#F3EBE1] text-[#634835] border border-[#E4D5C5]"
              title={property.waterReliability}
            >
              <Droplet className="w-3 h-3 text-[#C27835]" />
              Borehole Water
            </span>
            {property.amenities.some((a) => a.toLowerCase().includes('generator')) && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-[#F9EFE4] text-[#804D1B] border border-[#EDD9C4]"
                title={property.powerBackup}
              >
                <Zap className="w-3 h-3 text-[#C27835]" />
                Standby Gen
              </span>
            )}
            {property.agent.verified && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-[#EFEBE4] text-[#4A382C] border border-[#DDD3C7]">
                <ShieldCheck className="w-3 h-3 text-[#8A6348]" />
                Verified Agent
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          type="button"
          id={`view-details-${property.id}`}
          onClick={() => onSelectProperty(property)}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-[#2A1810] bg-[#FAF6F0] hover:bg-[#2A1810] hover:text-[#FFFDF9] border border-[#E0D3C4] transition-all flex items-center justify-center gap-2 group-hover:bg-[#2A1810] group-hover:text-[#FFFDF9] cursor-pointer"
        >
          <span>View Property Details</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C27835] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
