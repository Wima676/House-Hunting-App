import React, { useState } from 'react';
import {
  X,
  Plus,
  Building,
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Droplet,
  Zap,
  ShieldCheck,
  Check,
  Upload,
  Phone,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { City, Property, PropertyType, RemotenessTier } from '../types';
import { formatKes } from '../utils/formatters';

import heroInteriorImg from '../assets/images/hero_brown_cream_interior_1790341288819.jpg';
import kitchenDiningImg from '../assets/images/interior_warm_kitchen_dining_1790341301000.jpg';
import bedroomLoungeImg from '../assets/images/interior_cream_bedroom_1790341308463.jpg';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (newProperty: Property) => void;
}

const PRESET_IMAGES = [
  { label: 'Warm Living Room (Brown & Cream)', url: heroInteriorImg },
  { label: 'Modern Dining & Kitchen', url: kitchenDiningImg },
  { label: 'Sunlit Bedroom Sanctuary', url: bedroomLoungeImg },
  { label: 'Executive Modern Apartment', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Tranquil Townhouse Patio', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80' },
];

const AVAILABLE_AMENITIES = [
  'Borehole / Continuous Water',
  'Full Standby Generator',
  '24/7 CCTV & Manned Security',
  'High-Speed Fiber Ready',
  'Dedicated Covered Parking',
  'Fitness Gym',
  'Swimming Pool',
  'Private Balcony',
  'Servants Quarter (DSQ)',
  'Solar Water Heating',
  'Elevator Access',
  'Private Garden',
];

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onAddProperty,
}) => {
  if (!isOpen) return null;

  // Form State
  const [title, setTitle] = useState('');
  const [city, setCity] = useState<City>('Nairobi');
  const [neighborhood, setNeighborhood] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('Apartment');
  const [rentKes, setRentKes] = useState(65000);
  const [depositKes, setDepositKes] = useState(65000);
  const [serviceChargeKes, setServiceChargeKes] = useState(5000);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [sizeSqMeters, setSizeSqMeters] = useState(115);
  const [distanceToCbdKm, setDistanceToCbdKm] = useState(6.5);
  const [remotenessTier, setRemotenessTier] = useState<RemotenessTier>('Suburban');
  const [waterReliability, setWaterReliability] = useState('24/7 Dedicated Borehole + County Water');
  const [powerBackup, setPowerBackup] = useState('Full Automatic Standby Generator');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Borehole / Continuous Water',
    'Full Standby Generator',
    '24/7 CCTV & Manned Security',
    'High-Speed Fiber Ready',
    'Dedicated Covered Parking',
    'Private Balcony'
  ]);
  const [selectedImageUrl, setSelectedImageUrl] = useState(heroInteriorImg);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentPhone, setAgentPhone] = useState('+254 ');
  const [agentAgency, setAgentAgency] = useState('Private Landlord');

  const [formError, setFormError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a descriptive title for your rental.');
      return;
    }

    if (!neighborhood.trim()) {
      setFormError('Please enter the neighborhood or estate name.');
      return;
    }

    if (rentKes < 10000 || rentKes > 400000) {
      setFormError('Monthly rent must be within Kenya Shillings 10,000 to 400,000.');
      return;
    }

    if (!agentName.trim() || !agentPhone.trim()) {
      setFormError('Please provide the contact name and WhatsApp/mobile phone for prospective tenants.');
      return;
    }

    const finalImage = customImageUrl.trim() ? customImageUrl.trim() : selectedImageUrl;

    const newProperty: Property = {
      id: `rental-user-${Date.now()}`,
      title: title.trim(),
      city,
      neighborhood: neighborhood.trim(),
      propertyType,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      sizeSqMeters: Number(sizeSqMeters),
      rentKes: Number(rentKes),
      depositKes: Number(depositKes),
      serviceChargeKes: Number(serviceChargeKes),
      distanceToCbdKm: Number(distanceToCbdKm),
      commuteMinutesCbd: Math.round(distanceToCbdKm * 3.5),
      remotenessTier,
      remotenessScore: remotenessTier === 'Urban Core' ? 3 : remotenessTier === 'Suburban' ? 5 : remotenessTier === 'Tranquil & Semi-Remote' ? 7 : 9,
      amenities: selectedAmenities,
      waterReliability,
      powerBackup,
      description: description.trim() || `Beautiful ${bedrooms}-bedroom ${propertyType.toLowerCase()} located in ${neighborhood.trim()}, ${city}. Features spacious naturally lit rooms, dependable water and backup power, and easy accessibility.`,
      images: [finalImage],
      agent: {
        name: agentName.trim(),
        phone: agentPhone.trim(),
        agency: agentAgency.trim() || 'Private Landlord',
        verified: true,
      },
      petsAllowed: true,
      parkingSpots: 1,
    };

    onAddProperty(newProperty);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A0F0A]/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FFFFFF] rounded-3xl shadow-2xl p-6 sm:p-8 border border-[#E8DED1] my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#8A7161] hover:text-[#2A1810] hover:bg-[#FAF6F0] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#F0E6DA]">
          <div className="w-12 h-12 rounded-2xl bg-[#2A1810] text-[#F9D6A5] flex items-center justify-center shadow-md shrink-0">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-[#2A1810]">
                List a Rental Property
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF2E8] text-[#804D1B] border border-[#EAD4BE]">
                Renters Only
              </span>
            </div>
            <p className="text-xs text-[#7A6658] mt-0.5">
              Add your apartment or townhouse to KRH Rentals in Nairobi, Mombasa, or Kisumu.
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-16 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-[#C27835] mx-auto animate-bounce" />
            <h4 className="text-2xl font-bold text-[#2A1810]">Property Listed Successfully!</h4>
            <p className="text-sm text-[#735F52] max-w-md mx-auto">
              Your rental listing has been published and is now live in the rental explorer.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[calc(85vh-10rem)] overflow-y-auto pr-2">
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* 1. Basic Information */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-[#8A7161] uppercase tracking-wider">
                1. General Property Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elegant 2-Bedroom Apartment with Sunset Balcony"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810] focus:ring-2 focus:ring-[#C27835] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Target City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as City)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810] focus:ring-2 focus:ring-[#C27835] focus:outline-hidden"
                  >
                    <option value="Nairobi">Nairobi</option>
                    <option value="Mombasa">Mombasa</option>
                    <option value="Kisumu">Kisumu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Neighborhood / Estate *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kilimani, Nyali, Karen, Milimani"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810] focus:ring-2 focus:ring-[#C27835] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Home Type *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Apartment', 'Townhouse'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setPropertyType(t)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          propertyType === t
                            ? 'bg-[#2A1810] text-[#FFFDF9] shadow-xs'
                            : 'bg-[#FAF6F0] text-[#6E5A4D] hover:bg-[#F2EAE0] border border-[#E8DFD3]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Environment / Remoteness
                  </label>
                  <select
                    value={remotenessTier}
                    onChange={(e) => setRemotenessTier(e.target.value as RemotenessTier)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810] focus:ring-2 focus:ring-[#C27835] focus:outline-hidden"
                  >
                    <option value="Urban Core">Urban Core (City center hustle)</option>
                    <option value="Suburban">Suburban (Balanced estate)</option>
                    <option value="Tranquil & Semi-Remote">Tranquil & Semi-Remote</option>
                    <option value="Quiet Sanctuary">Quiet Sanctuary (Low-density retreat)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Rental Pricing */}
            <div className="space-y-4 pt-3 border-t border-[#F0E6DA]">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#8A7161] uppercase tracking-wider">
                  2. Rental Rates & Move-in Fees
                </h4>
                <span className="text-[11px] font-bold text-[#C27835]">
                  Valid Range: KES 10,000 – 400,000
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Monthly Rent (KES) *
                  </label>
                  <input
                    type="number"
                    min={10000}
                    max={400000}
                    step={1000}
                    required
                    value={rentKes}
                    onChange={(e) => setRentKes(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm font-bold text-[#2A1810] focus:ring-2 focus:ring-[#C27835] focus:outline-hidden"
                  />
                  <span className="text-[10px] text-[#8A7161] mt-0.5 block">
                    KES {formatKes(rentKes)} / month
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Refundable Security Deposit (KES)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1000}
                    value={depositKes}
                    onChange={(e) => setDepositKes(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810] focus:ring-2 focus:ring-[#C27835] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Monthly Service Charge (KES)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={serviceChargeKes}
                    onChange={(e) => setServiceChargeKes(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810] focus:ring-2 focus:ring-[#C27835] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* 3. Specs */}
            <div className="space-y-4 pt-3 border-t border-[#F0E6DA]">
              <h4 className="text-xs font-bold text-[#8A7161] uppercase tracking-wider">
                3. Space & Layout Specifications
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">Bedrooms</label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs font-medium text-[#2A1810]"
                  >
                    <option value={1}>1 Bedroom</option>
                    <option value={2}>2 Bedrooms</option>
                    <option value={3}>3 Bedrooms</option>
                    <option value={4}>4 Bedrooms</option>
                    <option value={5}>5+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">Bathrooms</label>
                  <select
                    value={bathrooms}
                    onChange={(e) => setBathrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs font-medium text-[#2A1810]"
                  >
                    <option value={1}>1 Bath</option>
                    <option value={2}>2 Baths</option>
                    <option value={3}>3 Baths</option>
                    <option value={4}>4+ Baths</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">Floor Area (m²)</label>
                  <input
                    type="number"
                    min={20}
                    max={1000}
                    value={sizeSqMeters}
                    onChange={(e) => setSizeSqMeters(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs font-medium text-[#2A1810]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">Distance to CBD (km)</label>
                  <input
                    type="number"
                    min={0.5}
                    max={60}
                    step={0.5}
                    value={distanceToCbdKm}
                    onChange={(e) => setDistanceToCbdKm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs font-medium text-[#2A1810]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Essential Utilities & Amenities */}
            <div className="space-y-4 pt-3 border-t border-[#F0E6DA]">
              <h4 className="text-xs font-bold text-[#8A7161] uppercase tracking-wider">
                4. Essential Utilities & Amenities
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Water Reliability
                  </label>
                  <input
                    type="text"
                    value={waterReliability}
                    onChange={(e) => setWaterReliability(e.target.value)}
                    placeholder="e.g. 24/7 Borehole + County Water"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs text-[#2A1810]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Power Backup
                  </label>
                  <input
                    type="text"
                    value={powerBackup}
                    onChange={(e) => setPowerBackup(e.target.value)}
                    placeholder="e.g. Full Automatic Standby Generator"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs text-[#2A1810]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#544135] mb-2">
                  Select Included Amenities:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {AVAILABLE_AMENITIES.map((am) => {
                    const isChecked = selectedAmenities.includes(am);
                    return (
                      <button
                        key={am}
                        type="button"
                        onClick={() => toggleAmenity(am)}
                        className={`flex items-center gap-2 p-2 rounded-xl text-xs text-left border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#FAF2E8] border-[#C27835] text-[#804D1B] font-semibold'
                            : 'bg-[#FAF6F0] border-[#E8DFD3] text-[#6E5A4D]'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-md flex items-center justify-center text-[9px] ${
                            isChecked ? 'bg-[#C27835] text-white' : 'border border-[#CDBEAF]'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="truncate">{am}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 5. Photos */}
            <div className="space-y-4 pt-3 border-t border-[#F0E6DA]">
              <h4 className="text-xs font-bold text-[#8A7161] uppercase tracking-wider">
                5. Property Photography
              </h4>

              <div>
                <span className="block text-xs font-semibold text-[#544135] mb-2">
                  Choose a Curated Warm Interior Photo:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                  {PRESET_IMAGES.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedImageUrl(img.url);
                        setCustomImageUrl('');
                      }}
                      className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all aspect-4/3 relative ${
                        selectedImageUrl === img.url && !customImageUrl
                          ? 'border-[#C27835] shadow-md scale-102'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs text-[#7A6658] mb-1">
                    Or paste custom image link (optional):
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs text-[#2A1810]"
                  />
                </div>
              </div>
            </div>

            {/* 6. Contact & Agent Info */}
            <div className="space-y-4 pt-3 border-t border-[#F0E6DA]">
              <h4 className="text-xs font-bold text-[#8A7161] uppercase tracking-wider">
                6. Landlord or Caretaker Contact
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Mutiso"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    WhatsApp / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#544135] mb-1">
                    Agency or Representation
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Private Landlord, Karen Prime Rentals"
                    value={agentAgency}
                    onChange={(e) => setAgentAgency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E0D3C4] text-xs sm:text-sm text-[#2A1810]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-[#F0E6DA] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-[#DFD2C2] text-[#6E5A4D] hover:bg-[#FAF6F0] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-rental-listing-btn"
                className="px-6 py-2.5 rounded-xl bg-[#2A1810] hover:bg-[#43271A] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4 text-[#D48B47]" />
                <span>Publish Rental Listing</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
