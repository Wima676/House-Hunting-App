import React from 'react';
import { Bookmark, Compass, PlusCircle } from 'lucide-react';
import { City } from '../types';
import { KrhLogo } from './KrhLogo';

interface NavbarProps {
  selectedCity: City | 'All';
  onSelectCity: (city: City | 'All') => void;
  savedCount: number;
  onOpenSaved: () => void;
  totalListingsCount: number;
  onNavigateToListings?: () => void;
  onNavigateToHome?: () => void;
  onOpenAddProperty?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  savedCount,
  onOpenSaved,
  totalListingsCount,
  onNavigateToListings,
  onNavigateToHome,
  onOpenAddProperty,
}) => {
  const cities: Array<{ label: string; value: City | 'All' }> = [
    { label: 'All Cities', value: 'All' },
    { label: 'Nairobi', value: 'Nairobi' },
    { label: 'Mombasa', value: 'Mombasa' },
    { label: 'Kisumu', value: 'Kisumu' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EAE1D5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Brand */}
          <div
            onClick={onNavigateToHome}
            className="cursor-pointer transition-opacity hover:opacity-90"
            title="KRH Rentals - Home"
          >
            <KrhLogo variant="full" size="md" />
          </div>

          {/* City quick selector */}
          <div className="hidden lg:flex items-center bg-[#EFE6DC] p-1 rounded-xl border border-[#DFD2C2]">
            {cities.map((c) => {
              const isActive = selectedCity === c.value;
              return (
                <button
                  key={c.value}
                  id={`city-nav-${c.value.toLowerCase()}`}
                  onClick={() => {
                    onSelectCity(c.value);
                    if (onNavigateToListings) onNavigateToListings();
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#2A1810] text-[#FFFDF9] shadow-xs'
                      : 'text-[#6A574A] hover:text-[#2A1810]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenAddProperty && (
              <button
                type="button"
                id="list-rental-navbar-btn"
                onClick={onOpenAddProperty}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#804D1B] bg-[#FAF2E8] hover:bg-[#F5E6D4] border border-[#EAD4BE] rounded-xl transition-colors cursor-pointer shadow-2xs"
                title="List your apartment or townhouse to be rented"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#C27835]" />
                <span>List a Rental</span>
              </button>
            )}

            {onNavigateToListings && (
              <button
                type="button"
                onClick={onNavigateToListings}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#685344] hover:text-[#2A1810] hover:bg-[#F2EAE0] rounded-xl transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-[#C27835]" />
                <span>Explore</span>
              </button>
            )}

            <button
              type="button"
              id="saved-rentals-drawer-btn"
              onClick={onOpenSaved}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#FFFDF9] bg-[#2A1810] hover:bg-[#43271A] rounded-xl transition-colors shadow-xs cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#D48B47]" />
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="ml-0.5 inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#C27835] text-white">
                  {savedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile City Selector Row */}
        <div className="flex lg:hidden pb-3 overflow-x-auto gap-1.5 no-scrollbar">
          {cities.map((c) => {
            const isActive = selectedCity === c.value;
            return (
              <button
                key={c.value}
                id={`mobile-city-nav-${c.value.toLowerCase()}`}
                onClick={() => {
                  onSelectCity(c.value);
                  if (onNavigateToListings) onNavigateToListings();
                }}
                className={`px-3 py-1.5 whitespace-nowrap rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#2A1810] text-[#FFFDF9]'
                    : 'bg-[#EFE6DC] text-[#6A574A] hover:bg-[#E5D7C9]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
