import React from 'react';
import {
  MapPin,
  Home,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Droplet,
  Zap,
  Building2,
  Waves,
  TreePine,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { City, FilterState, PropertyType } from '../types';
import { formatKes } from '../utils/formatters';
import { KrhLogo } from './KrhLogo';

// Local generated high-fidelity image assets
import heroInteriorImg from '../assets/images/hero_brown_cream_interior_1790341288819.jpg';
import kitchenDiningImg from '../assets/images/interior_warm_kitchen_dining_1790341301000.jpg';
import bedroomLoungeImg from '../assets/images/interior_cream_bedroom_1790341308463.jpg';

interface LandingHeroProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onExploreListings: () => void;
  totalListingsCount: number;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  filters,
  onFilterChange,
  onExploreListings,
  totalListingsCount,
}) => {
  const handleCityPick = (city: City) => {
    onFilterChange({ city });
    onExploreListings();
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onFilterChange({ maxRent: value });
  };

  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pb-16">
      {/* Background warm ambient glow */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#F2E8DC] via-[#FAF6F0] to-transparent pointer-events-none -z-10" />

      {/* Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Headline & Hero Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Editorial Copy & Quick Search Box */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Top Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE4D6] text-[#78482A] text-xs font-semibold tracking-wide border border-[#DFCEBD]">
              <span className="w-2 h-2 rounded-full bg-[#C27835] animate-pulse" />
              <span>Strictly For Renters · Nairobi · Mombasa · Kisumu</span>
            </div>

            {/* Headline */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#241811] font-semibold tracking-tight leading-[1.08] text-balance">
              Find Your Sanctuary in Warmth & Ease.
            </h1>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-[#665245] leading-relaxed max-w-xl">
              Discover beautiful apartments and serene townhouses designed for modern Kenyan living. 
              No buy listings, no hidden commissions—just transparent rental rates from{' '}
              <strong className="text-[#2C1810] font-semibold">KES 10,000 to KES 400,000</strong> with 
              verified utility reliability and neighborhood insights.
            </p>

            {/* Quick Hero Interactive Search & Slider Card */}
            <div className="bg-[#FFFFFF] rounded-2xl p-5 sm:p-6 border border-[#E8DED1] shadow-md shadow-[#2D1B13]/5 space-y-5">
              {/* City Selection Buttons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#8A7161] mb-2">
                  Select Target City
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['All', 'Nairobi', 'Mombasa', 'Kisumu'] as const).map((city) => {
                    const isSelected = filters.city === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => onFilterChange({ city })}
                        className={`py-2 px-2 text-xs font-bold rounded-xl transition-all duration-150 text-center ${
                          isSelected
                            ? 'bg-[#2A1810] text-[#FFFDF9] shadow-xs'
                            : 'bg-[#FAF6F0] text-[#635043] hover:bg-[#F2EAE0] hover:text-[#2A1810] border border-[#E8DFD3]'
                        }`}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Property Type Radio */}
              <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#F2EAE0]">
                <span className="text-xs font-bold text-[#8A7161] uppercase tracking-wider">
                  Home Type
                </span>
                <div className="inline-flex rounded-xl bg-[#FAF6F0] p-1 border border-[#E8DFD3]">
                  {(['All', 'Apartment', 'Townhouse'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => onFilterChange({ propertyType: t })}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        filters.propertyType === t
                          ? 'bg-[#FFFFFF] text-[#2A1810] shadow-xs font-bold'
                          : 'text-[#7A6658] hover:text-[#2A1810]'
                      }`}
                    >
                      {t === 'All' ? 'Any Type' : t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Slider */}
              <div className="space-y-2 pt-1 border-t border-[#F2EAE0]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#8A7161] uppercase tracking-wider">
                    Maximum Monthly Rent
                  </span>
                  <span className="font-black text-[#2A1810] text-sm tabular-nums bg-[#F7EFE4] px-2 py-0.5 rounded-md border border-[#E8DCCF]">
                    KES {formatKes(filters.maxRent)} /mo
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={400000}
                  step={5000}
                  value={filters.maxRent}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-[#EADFD3] rounded-lg appearance-none cursor-pointer warm-slider"
                />
                <div className="flex justify-between text-[11px] text-[#9E8A7D] font-medium">
                  <span>KES 10,000</span>
                  <span>KES 200,000</span>
                  <span>KES 400,000</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id="hero-explore-btn"
                onClick={onExploreListings}
                className="w-full py-3.5 px-6 rounded-xl bg-[#2A1810] hover:bg-[#43271A] text-[#FFFDF9] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <span>Browse {totalListingsCount} Curated Rentals</span>
                <ArrowRight className="w-4 h-4 text-[#D48B47] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#544135]">
                <CheckCircle2 className="w-4 h-4 text-[#C27835] shrink-0" />
                <span>Zero Buying Spam</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#544135]">
                <Droplet className="w-4 h-4 text-[#C27835] shrink-0" />
                <span>Borehole Verified</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#544135]">
                <Zap className="w-4 h-4 text-[#C27835] shrink-0" />
                <span>Generator Backup</span>
              </div>
            </div>
          </div>

          {/* Right Column: Beautiful Brown & Cream Interior Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFFFFF] bg-[#EFE6DC]">
              {/* Main Brown & Cream Interior Image */}
              <img
                src={heroInteriorImg}
                alt="Beautiful warm brown and cream living room interior with plush bouclé seating and walnut wood finishes"
                className="w-full aspect-4/3 sm:aspect-16/11 object-cover hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Floating Architectural Badge */}
              <div className="absolute top-4 left-4 bg-[#2A1810]/85 backdrop-blur-md text-[#FFFDF9] py-2 px-3.5 rounded-xl border border-[#FFFDF9]/15 shadow-lg flex items-center gap-2">
                <KrhLogo variant="icon" size="sm" tone="cream" />
                <div className="text-left">
                  <p className="text-[10px] text-[#D8C7B5] uppercase font-bold tracking-wider">
                    Curated Interior Standard
                  </p>
                  <p className="text-xs font-semibold text-[#FFFDF9]">
                    Natural Light & Warm Woods
                  </p>
                </div>
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-4 inset-x-4 bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl p-4 border border-[#E8DFD3] shadow-lg flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#C27835]">
                    Tenant Sanctuary
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-[#241811]">
                    Warm, Earth-Toned Living in Kenya
                  </h2>
                  <p className="text-xs text-[#786457]">
                    High ceilings, reliable borehole, and quiet residential estates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onExploreListings}
                  className="px-3.5 py-2 rounded-xl bg-[#C27835] hover:bg-[#A86124] text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  View Rentals
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interior Aesthetics Showcase Strip */}
        <div className="mb-16 bg-[#FFFFFF] rounded-3xl p-6 sm:p-10 border border-[#E8DED1] shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C27835]">
              Living In Harmony
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#241811] font-semibold mt-1">
              Curated Brown & Cream Spaces Built for Real Comfort
            </h2>
            <p className="text-xs sm:text-sm text-[#735F52] mt-2">
              We look beyond square meters. Every listing is reviewed for natural lighting, peaceful ambiance, 
              and authentic architectural charm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Vignette 1: Kitchen & Dining */}
            <div className="group rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#EFE7DC] p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="aspect-16/10 rounded-xl overflow-hidden mb-4 bg-[#EADFD3]">
                <img
                  src={kitchenDiningImg}
                  alt="Modern warm dining and kitchen area with dark walnut accents and cream marble island"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center justify-between text-xs text-[#8A7161] font-medium mb-1">
                  <span>Culinary & Gathering Spaces</span>
                  <span className="text-[#C27835] font-bold">Open-Plan Living</span>
                </div>
                <h3 className="text-base font-bold text-[#2A1810]">
                  Modern Kitchens with Stone & Warm Timber
                </h3>
                <p className="text-xs text-[#6E5A4D] mt-1">
                  Enjoy fitted cookers, kitchen pantries, and breakfast counters tailored for effortless hosting and everyday warmth.
                </p>
              </div>
            </div>

            {/* Vignette 2: Bedroom Sanctuary */}
            <div className="group rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#EFE7DC] p-4 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="aspect-16/10 rounded-xl overflow-hidden mb-4 bg-[#EADFD3]">
                <img
                  src={bedroomLoungeImg}
                  alt="Peaceful master bedroom in cream and warm mocha tones with soft sunlight"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="text-left">
                <div className="flex items-center justify-between text-xs text-[#8A7161] font-medium mb-1">
                  <span>Restful Sanctuaries</span>
                  <span className="text-[#C27835] font-bold">Acoustic Serenity</span>
                </div>
                <h3 className="text-base font-bold text-[#2A1810]">
                  Bedrooms Bathed in Morning Light
                </h3>
                <p className="text-xs text-[#6E5A4D] mt-1">
                  Generous master en-suites, fitted floor-to-ceiling wardrobes, and tranquil window exposures away from street noise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* City Portals Showcase: Nairobi, Mombasa, Kisumu */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C27835]">
                Destinations
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-[#241811] font-semibold mt-1">
                Explore Rentals by City
              </h2>
            </div>
            <p className="text-xs text-[#735F52] max-w-sm">
              Click any city to instantly view vetted apartments and townhouses tailored for Kenyan tenants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Nairobi Card */}
            <div
              onClick={() => handleCityPick('Nairobi')}
              className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-[#FFFFFF] to-[#FAF5EE] border border-[#E8DED1] hover:border-[#C27835] shadow-xs hover:shadow-md transition-all text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2A1810] text-[#FFFDF9] flex items-center justify-center group-hover:bg-[#C27835] transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#C27835] uppercase tracking-wider">
                  Capital Region
                </span>
                <h3 className="text-xl font-bold text-[#241811] mt-0.5">
                  Nairobi
                </h3>
                <p className="text-xs text-[#6E5A4D] mt-1">
                  Kilimani, Westlands, Karen, Kileleshwa, and Lavington. Fast commutes to CBD & vibrant amenities.
                </p>
              </div>
              <div className="pt-3 border-t border-[#EFE7DC] flex items-center justify-between text-xs">
                <span className="text-[#8A7161]">Rent from KES 25k/mo</span>
                <span className="font-bold text-[#2A1810] group-hover:text-[#C27835] flex items-center gap-1 transition-colors">
                  Explore Nairobi <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Mombasa Card */}
            <div
              onClick={() => handleCityPick('Mombasa')}
              className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-[#FFFFFF] to-[#FAF5EE] border border-[#E8DED1] hover:border-[#C27835] shadow-xs hover:shadow-md transition-all text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2A1810] text-[#FFFDF9] flex items-center justify-center group-hover:bg-[#C27835] transition-colors">
                <Waves className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#C27835] uppercase tracking-wider">
                  Coastal Living
                </span>
                <h3 className="text-xl font-bold text-[#241811] mt-0.5">
                  Mombasa
                </h3>
                <p className="text-xs text-[#6E5A4D] mt-1">
                  Nyali, Bamburi, Tudor, and Shanzu. Ocean breeze, swimming pools, and gated beach-side communities.
                </p>
              </div>
              <div className="pt-3 border-t border-[#EFE7DC] flex items-center justify-between text-xs">
                <span className="text-[#8A7161]">Rent from KES 18k/mo</span>
                <span className="font-bold text-[#2A1810] group-hover:text-[#C27835] flex items-center gap-1 transition-colors">
                  Explore Mombasa <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Kisumu Card */}
            <div
              onClick={() => handleCityPick('Kisumu')}
              className="group cursor-pointer rounded-2xl p-6 bg-gradient-to-br from-[#FFFFFF] to-[#FAF5EE] border border-[#E8DED1] hover:border-[#C27835] shadow-xs hover:shadow-md transition-all text-left space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2A1810] text-[#FFFDF9] flex items-center justify-center group-hover:bg-[#C27835] transition-colors">
                <TreePine className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#C27835] uppercase tracking-wider">
                  Lakeside Serenity
                </span>
                <h3 className="text-xl font-bold text-[#241811] mt-0.5">
                  Kisumu
                </h3>
                <p className="text-xs text-[#6E5A4D] mt-1">
                  Milimani, Riat Hills, and Tom Mboya. Expansive lake views, cool hill air, and tranquil private compounds.
                </p>
              </div>
              <div className="pt-3 border-t border-[#EFE7DC] flex items-center justify-between text-xs">
                <span className="text-[#8A7161]">Rent from KES 14k/mo</span>
                <span className="font-bold text-[#2A1810] group-hover:text-[#C27835] flex items-center gap-1 transition-colors">
                  Explore Kisumu <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
