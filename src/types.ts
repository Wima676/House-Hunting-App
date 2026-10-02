export type City = 'Nairobi' | 'Mombasa' | 'Kisumu';

export type PropertyType = 'Apartment' | 'Townhouse';

export type RemotenessTier = 'Urban Core' | 'Suburban' | 'Tranquil & Semi-Remote' | 'Quiet Sanctuary';

export interface AmenityItem {
  id: string;
  name: string;
  category: 'essential' | 'comfort' | 'lifestyle';
  iconName: string;
}

export interface Property {
  id: string;
  title: string;
  city: City;
  neighborhood: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  sizeSqMeters: number;
  rentKes: number; // 10,000 - 400,000 KES/month
  depositKes: number;
  serviceChargeKes: number;
  distanceToCbdKm: number;
  commuteMinutesCbd: number;
  remotenessTier: RemotenessTier;
  remotenessScore: number; // 1 (dense downtown) to 10 (remote serene hillside/beach)
  amenities: string[];
  waterReliability: string; // e.g. "Borehole + County Water (24/7 continuous)"
  powerBackup: string; // e.g. "Full Inverter + Standby Generator"
  scenicView?: string;
  description: string;
  images: string[];
  agent: {
    name: string;
    phone: string;
    agency: string;
    verified: boolean;
  };
  floorNumber?: number;
  totalFloors?: number;
  petsAllowed: boolean;
  parkingSpots: number;
}

export interface FilterState {
  city: City | 'All';
  propertyType: PropertyType | 'All';
  minRent: number;
  maxRent: number;
  bedrooms: number | 'Any';
  maxDistanceToCbd: number; // in km (e.g. up to 35km)
  minRemoteness: number; // 1 - 10
  selectedAmenities: string[];
  sortBy: 'rent_asc' | 'rent_desc' | 'cbd_asc' | 'remoteness_desc' | 'bedrooms_desc';
  searchQuery: string;
}
