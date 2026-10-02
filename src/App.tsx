/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  MapPin,
  Building,
  SlidersHorizontal,
  Home,
  CheckCircle2,
  Droplet,
  Zap,
  Compass,
  ArrowDown,
  PlusCircle
} from 'lucide-react';
import { Property, FilterState, City, PropertyType } from './types';
import { PROPERTIES } from './data/mockRentals';
import { formatKes } from './utils/formatters';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { FilterBar } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { SavedRentalsDrawer } from './components/SavedRentalsDrawer';
import { AddPropertyModal } from './components/AddPropertyModal';
import { KrhLogo } from './components/KrhLogo';

const INITIAL_FILTERS: FilterState = {
  city: 'All',
  propertyType: 'All',
  minRent: 10000,
  maxRent: 500000,
  bedrooms: 'Any',
  maxDistanceToCbd: 40,
  minRemoteness: 1,
  selectedAmenities: [],
  sortBy: 'rent_asc',
  searchQuery: '',
};

export default function App() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // User-added custom properties stored in localStorage
  const [customProperties, setCustomProperties] = useState<Property[]>(() => {
    try {
      const stored = localStorage.getItem('krh_custom_properties');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('saved_rental_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const listingsSectionRef = useRef<HTMLDivElement>(null);

  // Save custom properties to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('krh_custom_properties', JSON.stringify(customProperties));
    } catch (e) {
      console.error(e);
    }
  }, [customProperties]);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('saved_rental_ids', JSON.stringify(savedPropertyIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedPropertyIds]);

  const handleToggleSave = (id: string) => {
    setSavedPropertyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const scrollToListings = () => {
    listingsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Combine static mock rentals and user-listed rentals
  const allProperties = useMemo(() => {
    return [...customProperties, ...PROPERTIES];
  }, [customProperties]);

  const handleAddProperty = (newProp: Property) => {
    setCustomProperties((prev) => [newProp, ...prev]);
    // Set filters to include this property
    setFilters((prev) => ({
      ...prev,
      city: newProp.city,
      propertyType: 'All',
      minRent: Math.min(prev.minRent, newProp.rentKes),
      maxRent: Math.max(prev.maxRent, newProp.rentKes),
    }));
    // Scroll to listings so landlord sees their property immediately
    setTimeout(() => {
      scrollToListings();
    }, 400);
  };

  // Filter & sort properties
  const filteredAndSortedProperties = useMemo(() => {
    return allProperties.filter((property) => {
      // City filter
      if (filters.city !== 'All' && property.city !== filters.city) {
        return false;
      }

      // Property type filter
      if (filters.propertyType !== 'All' && property.propertyType !== filters.propertyType) {
        return false;
      }

      // Rent range slider (KES 10,000 - 400,000)
      if (property.rentKes < filters.minRent || property.rentKes > filters.maxRent) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'Any') {
        if (filters.bedrooms === 4) {
          if (property.bedrooms < 4) return false;
        } else if (property.bedrooms !== filters.bedrooms) {
          return false;
        }
      }

      // Selected Amenities
      if (filters.selectedAmenities.length > 0) {
        const hasAllSelected = filters.selectedAmenities.every((requiredAm) => {
          return property.amenities.some((propAm) =>
            propAm.toLowerCase().includes(requiredAm.toLowerCase())
          );
        });
        if (!hasAllSelected) return false;
      }

      // Search Query
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = property.title.toLowerCase().includes(q);
        const matchesNeighborhood = property.neighborhood.toLowerCase().includes(q);
        const matchesCity = property.city.toLowerCase().includes(q);
        const matchesDesc = property.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesNeighborhood && !matchesCity && !matchesDesc) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'rent_asc':
          return a.rentKes - b.rentKes;
        case 'rent_desc':
          return b.rentKes - a.rentKes;
        case 'cbd_asc':
          return a.distanceToCbdKm - b.distanceToCbdKm;
        case 'remoteness_desc':
          return b.remotenessScore - a.remotenessScore;
        case 'bedrooms_desc':
          return b.bedrooms - a.bedrooms;
        default:
          return a.rentKes - b.rentKes;
      }
    });
  }, [allProperties, filters]);

  const savedPropertiesList = useMemo(() => {
    return allProperties.filter((p) => savedPropertyIds.includes(p.id));
  }, [allProperties, savedPropertyIds]);

  // Market metrics for current view
  const averageRent = useMemo(() => {
    if (filteredAndSortedProperties.length === 0) return 0;
    const sum = filteredAndSortedProperties.reduce((acc, curr) => acc + curr.rentKes, 0);
    return Math.round(sum / filteredAndSortedProperties.length);
  }, [filteredAndSortedProperties]);

  const lowestRent = useMemo(() => {
    if (filteredAndSortedProperties.length === 0) return 0;
    return Math.min(...filteredAndSortedProperties.map((p) => p.rentKes));
  }, [filteredAndSortedProperties]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#241811] flex flex-col selection:bg-[#EBD8C3] selection:text-[#241811]">
      {/* Navigation Header with krh Logo & List a Rental Button */}
      <Navbar
        selectedCity={filters.city}
        onSelectCity={(city) => handleFilterChange({ city })}
        savedCount={savedPropertyIds.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        totalListingsCount={allProperties.length}
        onNavigateToListings={scrollToListings}
        onNavigateToHome={scrollToHome}
        onOpenAddProperty={() => setIsAddModalOpen(true)}
      />

      {/* Landing Page Hero: Brown and Cream Interior Showcase */}
      <LandingHero
        filters={filters}
        onFilterChange={handleFilterChange}
        onExploreListings={scrollToListings}
        totalListingsCount={allProperties.length}
      />

      {/* Main Listings Explorer Section */}
      <main
        ref={listingsSectionRef}
        id="listings-explorer"
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 scroll-mt-20"
      >
        {/* Context Bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] rounded-3xl p-5 sm:p-7 border border-[#E8DED1] shadow-xs text-left">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF2E8] text-[#804D1B] border border-[#EAD4BE]">
                Renters Only
              </span>
              <span className="text-xs text-[#8A7161] font-semibold">
                Nairobi · Mombasa · Kisumu
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#241811] tracking-tight">
              {filters.city === 'All'
                ? 'Curated Kenya Rental Homes'
                : `Verified Rentals in ${filters.city}`}
            </h2>
            <p className="text-xs sm:text-sm text-[#6E5A4D] mt-1 max-w-2xl">
              Explore apartments and townhouses by rent, verified utilities, and closeness to CBD with complete pricing transparency.
            </p>
          </div>

          {/* Quick Metrics Cards & Action */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 bg-[#FAF6F0] rounded-2xl border border-[#E8DED1] text-left">
              <span className="text-[10px] font-bold text-[#8A7161] uppercase tracking-wider block">Available</span>
              <span className="text-lg font-black text-[#2A1810]">
                {filteredAndSortedProperties.length}
                <span className="text-xs font-normal text-[#8A7161] ml-1">units</span>
              </span>
            </div>

            <div className="px-4 py-2.5 bg-[#FAF6F0] rounded-2xl border border-[#E8DED1] text-left">
              <span className="text-[10px] font-bold text-[#8A7161] uppercase tracking-wider block">Average Rent</span>
              <span className="text-lg font-black text-[#2A1810]">
                {formatKes(averageRent)}
                <span className="text-xs font-normal text-[#8A7161] ml-1">/mo</span>
              </span>
            </div>

            <button
              type="button"
              id="context-add-property-btn"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-[#2A1810] hover:bg-[#43271A] text-white rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              title="Add a house or apartment to be rented"
            >
              <PlusCircle className="w-4 h-4 text-[#D48B47]" />
              <span>List Your Property</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar (Slider KES 10k - 400k) */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalFiltered={filteredAndSortedProperties.length}
        />

        {/* Properties Grid */}
        {filteredAndSortedProperties.length === 0 ? (
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8DED1] p-12 text-center my-8">
            <div className="w-14 h-14 rounded-2xl bg-[#FAF6F0] flex items-center justify-center text-[#8A7161] mx-auto mb-4 border border-[#E8DED1]">
              <Home className="w-7 h-7 text-[#C27835]" />
            </div>
            <h3 className="text-lg font-bold text-[#2A1810]">No rental properties match this criteria</h3>
            <p className="text-sm text-[#735F52] max-w-md mx-auto mt-1 mb-6">
              We couldn't find any rentals matching your exact filters within the KES{' '}
              {formatKes(filters.minRent)} - {formatKes(filters.maxRent)} range.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                id="reset-filter-empty-state-btn"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#2A1810] hover:bg-[#43271A] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Reset Filters to Default
              </button>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#FAF2E8] hover:bg-[#F5E6D4] text-[#804D1B] border border-[#EAD4BE] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#C27835]" />
                <span>List a Rental Here</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedPropertyIds.includes(property.id)}
                onToggleSave={handleToggleSave}
                onSelectProperty={(prop) => setSelectedProperty(prop)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Warm Footer with krh Logo */}
      <footer className="bg-[#2A1810] text-[#D8C7B8] border-t border-[#3D2519] py-12 mt-16 text-xs text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#3D2519]">
            <div className="space-y-2">
              <KrhLogo variant="full" size="md" tone="cream" />
              <p className="text-xs text-[#B59F8E] max-w-md">
                Kenya Rental Homes is dedicated exclusively to tenants seeking apartments and townhouses 
                across Nairobi, Mombasa, and Kisumu with complete pricing transparency.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  handleFilterChange({ city: 'Nairobi' });
                  scrollToListings();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Nairobi Rentals
              </button>
              <span className="text-[#593928]">·</span>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange({ city: 'Mombasa' });
                  scrollToListings();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Mombasa Coastal
              </button>
              <span className="text-[#593928]">·</span>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange({ city: 'Kisumu' });
                  scrollToListings();
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Kisumu Serenity
              </button>
              <span className="text-[#593928]">·</span>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="text-[#E8A766] hover:text-[#F5D09D] transition-colors cursor-pointer flex items-center gap-1 font-bold"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                List Your Property
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9E8675]">
            <p>© {new Date().getFullYear()} KRH (Kenya Rental Homes). Exclusively for Renters · KES 10,000 – 400,000.</p>
            <p>Verified Borehole Water · Automatic Standby Generators · Zero Purchase Distractions</p>
          </div>
        </div>
      </footer>

      {/* Property Details Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isSaved={selectedProperty ? savedPropertyIds.includes(selectedProperty.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* List a Rental Modal */}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProperty={handleAddProperty}
      />

      {/* Saved Rentals Comparison Drawer */}
      <SavedRentalsDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedProperties={savedPropertiesList}
        onRemoveSaved={handleToggleSave}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />
    </div>
  );
}
