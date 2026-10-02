import React from 'react';
import {
  SlidersHorizontal,
  Search,
  MapPin,
  Building,
  RotateCcw,
  Check,
  ShieldCheck,
  Zap,
  Droplet,
  ChevronDown,
} from 'lucide-react';
import { FilterState, City, PropertyType } from '../types';
import { formatKes } from '../utils/formatters';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFiltered: number;
}

const COMMON_KENYA_AMENITIES = [
  { id: 'Borehole', label: 'Borehole / 24/7 Water', icon: Droplet },
  { id: 'Generator', label: 'Standby Generator', icon: Zap },
  { id: 'Security', label: '24/7 Security & CCTV', icon: ShieldCheck },
  { id: 'Swimming Pool', label: 'Swimming Pool' },
  { id: 'Gym', label: 'Fitness Gym' },
  { id: 'Fiber', label: 'High-Speed Fiber Ready' },
  { id: 'DSQ', label: 'Servants Quarter (DSQ)' },
  { id: 'Parking', label: 'Dedicated Parking' },
  { id: 'Balcony', label: 'Balcony / Terrace' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const handlePricePreset = (min: number, max: number) => {
    onFilterChange({ minRent: min, maxRent: max });
  };

  const toggleAmenity = (amenityKey: string) => {
    const current = filters.selectedAmenities;
    if (current.includes(amenityKey)) {
      onFilterChange({
        selectedAmenities: current.filter((a) => a !== amenityKey),
      });
    } else {
      onFilterChange({
        selectedAmenities: [...current, amenityKey],
      });
    }
  };

  return (
    <div id="listings-filter-bar" className="bg-[#FFFFFF] rounded-2xl border border-[#E8DED1] shadow-xs p-4 sm:p-6 mb-8 text-left">
      {/* Top Search & Primary Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
        {/* Search Input */}
        <div className="md:col-span-4 relative">
          <label htmlFor="search-neighborhood-input" className="sr-only">
            Search neighborhood
          </label>
          <Search className="w-4 h-4 text-[#A8907E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="search-neighborhood-input"
            type="text"
            placeholder="Search neighborhood (e.g. Kilimani, Nyali, Milimani)..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F0] border border-[#E0D3C4] rounded-xl text-xs sm:text-sm text-[#2A1810] placeholder-[#A8907E] focus:outline-hidden focus:ring-2 focus:ring-[#C27835] focus:bg-[#FFFFFF] transition-all"
          />
        </div>

        {/* City Filter */}
        <div className="md:col-span-3">
          <label htmlFor="city-select-dropdown" className="sr-only">
            Select City
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#C27835] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="city-select-dropdown"
              value={filters.city}
              onChange={(e) => onFilterChange({ city: e.target.value as City | 'All' })}
              className="w-full pl-10 pr-8 py-2.5 bg-[#FAF6F0] border border-[#E0D3C4] rounded-xl text-xs sm:text-sm font-medium text-[#2A1810] focus:outline-hidden focus:ring-2 focus:ring-[#C27835] focus:bg-[#FFFFFF] appearance-none cursor-pointer"
            >
              <option value="All">All Cities (Nairobi, Mombasa, Kisumu)</option>
              <option value="Nairobi">Nairobi</option>
              <option value="Mombasa">Mombasa</option>
              <option value="Kisumu">Kisumu</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A8907E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Property Type Filter */}
        <div className="md:col-span-3">
          <label htmlFor="property-type-dropdown" className="sr-only">
            Property Type
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-[#A8907E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              id="property-type-dropdown"
              value={filters.propertyType}
              onChange={(e) => onFilterChange({ propertyType: e.target.value as PropertyType | 'All' })}
              className="w-full pl-10 pr-8 py-2.5 bg-[#FAF6F0] border border-[#E0D3C4] rounded-xl text-xs sm:text-sm font-medium text-[#2A1810] focus:outline-hidden focus:ring-2 focus:ring-[#C27835] focus:bg-[#FFFFFF] appearance-none cursor-pointer"
            >
              <option value="All">All Types (Apartments & Townhouses)</option>
              <option value="Apartment">Apartments only</option>
              <option value="Townhouse">Townhouses only</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#A8907E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div className="md:col-span-2">
          <label htmlFor="bedrooms-select-dropdown" className="sr-only">
            Bedrooms
          </label>
          <select
            id="bedrooms-select-dropdown"
            value={filters.bedrooms}
            onChange={(e) =>
              onFilterChange({
                bedrooms: e.target.value === 'Any' ? 'Any' : Number(e.target.value),
              })
            }
            className="w-full px-3 py-2.5 bg-[#FAF6F0] border border-[#E0D3C4] rounded-xl text-xs sm:text-sm font-medium text-[#2A1810] focus:outline-hidden focus:ring-2 focus:ring-[#C27835] focus:bg-[#FFFFFF] cursor-pointer"
          >
            <option value="Any">Any Beds</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>
      </div>

      {/* RENT SLIDER SECTION: KES 10,000 - 400,000 */}
      <div className="mt-5 pt-5 border-t border-[#F0E6DA]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A6658]">
                Monthly Rent Range (Kenya Shillings)
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF2E8] border border-[#E8D6C1] rounded-lg text-xs font-bold text-[#8A5023]">
                <span>{formatKes(filters.minRent)}</span>
                <span className="text-[#C27835]">—</span>
                <span>{formatKes(filters.maxRent)}</span>
              </div>
            </div>

            {/* Slider controls */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-[11px] text-[#7A6658] mb-1">
                    <span>Minimum Rent</span>
                    <span className="font-semibold text-[#2A1810]">{formatKes(filters.minRent)}</span>
                  </div>
                  <input
                    id="rent-min-slider"
                    type="range"
                    min="10000"
                    max="350000"
                    step="5000"
                    value={filters.minRent}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val <= filters.maxRent - 5000) {
                        onFilterChange({ minRent: val });
                      }
                    }}
                    className="w-full h-2 bg-[#EADFD3] rounded-lg appearance-none cursor-pointer warm-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-[#7A6658] mb-1">
                    <span>Maximum Rent</span>
                    <span className="font-semibold text-[#2A1810]">{formatKes(filters.maxRent)}</span>
                  </div>
                  <input
                    id="rent-max-slider"
                    type="range"
                    min="15000"
                    max="400000"
                    step="5000"
                    value={filters.maxRent}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= filters.minRent + 5000) {
                        onFilterChange({ maxRent: val });
                      }
                    }}
                    className="w-full h-2 bg-[#EADFD3] rounded-lg appearance-none cursor-pointer warm-slider"
                  />
                </div>
              </div>

              {/* Quick Budget Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-[#8C7667] self-center mr-1">Quick ranges:</span>
                <button
                  type="button"
                  id="preset-all"
                  onClick={() => handlePricePreset(10000, 400000)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    filters.minRent === 10000 && filters.maxRent === 400000
                      ? 'bg-[#2A1810] text-[#FFFDF9]'
                      : 'bg-[#FAF6F0] text-[#6E5A4D] hover:bg-[#F2EAE0] border border-[#E8DFD3]'
                  }`}
                >
                  All (10k - 400k)
                </button>
                <button
                  type="button"
                  id="preset-budget"
                  onClick={() => handlePricePreset(10000, 35000)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    filters.minRent === 10000 && filters.maxRent === 35000
                      ? 'bg-[#C27835] text-white'
                      : 'bg-[#FAF6F0] text-[#6E5A4D] hover:bg-[#F2EAE0] border border-[#E8DFD3]'
                  }`}
                >
                  Economy (&lt; 35k)
                </button>
                <button
                  type="button"
                  id="preset-mid"
                  onClick={() => handlePricePreset(35000, 85000)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    filters.minRent === 35000 && filters.maxRent === 85000
                      ? 'bg-[#C27835] text-white'
                      : 'bg-[#FAF6F0] text-[#6E5A4D] hover:bg-[#F2EAE0] border border-[#E8DFD3]'
                  }`}
                >
                  Mid-Tier (35k - 85k)
                </button>
                <button
                  type="button"
                  id="preset-executive"
                  onClick={() => handlePricePreset(85000, 180000)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    filters.minRent === 85000 && filters.maxRent === 180000
                      ? 'bg-[#C27835] text-white'
                      : 'bg-[#FAF6F0] text-[#6E5A4D] hover:bg-[#F2EAE0] border border-[#E8DFD3]'
                  }`}
                >
                  Executive (85k - 180k)
                </button>
                <button
                  type="button"
                  id="preset-luxury"
                  onClick={() => handlePricePreset(180000, 400000)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                    filters.minRent === 180000 && filters.maxRent === 400000
                      ? 'bg-[#C27835] text-white'
                      : 'bg-[#FAF6F0] text-[#6E5A4D] hover:bg-[#F2EAE0] border border-[#E8DFD3]'
                  }`}
                >
                  Luxury Townhouses (180k - 400k)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AMENITIES & SORT ROW */}
      <div className="mt-5 pt-4 border-t border-[#F0E6DA] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="toggle-advanced-amenities-btn"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#544135] hover:text-[#C27835] transition-colors py-1.5 px-3 rounded-xl hover:bg-[#FAF6F0] border border-[#E8DFD3] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C27835]" />
            <span>{showAdvanced ? 'Hide Specific Amenities' : 'Filter by Essential Kenyan Amenities'}</span>
            {filters.selectedAmenities.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] bg-[#C27835] text-white font-bold rounded-full">
                {filters.selectedAmenities.length}
              </span>
            )}
          </button>
        </div>

        {/* Sort and Reset */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7A6658] whitespace-nowrap hidden sm:inline">Sort:</span>
            <select
              id="sort-by-select"
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="px-3 py-1.5 bg-[#FAF6F0] border border-[#E0D3C4] rounded-xl text-xs font-medium text-[#2A1810] focus:outline-hidden focus:ring-1 focus:ring-[#C27835] cursor-pointer"
            >
              <option value="rent_asc">Rent: Lowest to Highest</option>
              <option value="rent_desc">Rent: Highest to Lowest</option>
              <option value="cbd_asc">Closest to CBD</option>
              <option value="remoteness_desc">Most Peaceful / Remote</option>
              <option value="bedrooms_desc">Most Bedrooms</option>
            </select>
          </div>

          <button
            type="button"
            id="reset-filters-btn"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#8C7667] hover:text-[#B23820] py-1.5 px-2 rounded-xl hover:bg-[#FDF0EE] transition-colors cursor-pointer"
            title="Reset all filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Expanded Amenities Checklist */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-[#F0E6DA] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {COMMON_KENYA_AMENITIES.map((am) => {
            const isSelected = filters.selectedAmenities.includes(am.id);
            return (
              <button
                key={am.id}
                type="button"
                id={`amenity-chip-${am.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => toggleAmenity(am.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FAF2E8] border-[#C27835] text-[#804D1B] font-semibold shadow-2xs'
                    : 'bg-[#FAF6F0] border-[#E8DFD3] text-[#6E5A4D] hover:bg-[#F2EAE0]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-[#C27835] text-white' : 'border border-[#CDBEAF]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="truncate">{am.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
