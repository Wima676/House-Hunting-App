import React, { useState } from 'react';
import {
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Droplet,
  Zap,
  ShieldCheck,
  Calendar,
  Phone,
  MessageSquare,
  CheckCircle2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Car,
  Compass
} from 'lucide-react';
import { Property } from '../types';
import { formatKes } from '../utils/formatters';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showViewingModal, setShowViewingModal] = useState(false);
  const [viewingDate, setViewingDate] = useState('');
  const [viewingTime, setViewingTime] = useState('10:00 AM');
  const [viewingSuccess, setViewingSuccess] = useState(false);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));
  };

  const handleScheduleViewing = (e: React.FormEvent) => {
    e.preventDefault();
    setViewingSuccess(true);
    setTimeout(() => {
      setViewingSuccess(false);
      setShowViewingModal(false);
    }, 2500);
  };

  const totalMoveInKes = property.rentKes + property.depositKes + property.serviceChargeKes;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#1A0F0A]/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-3xl shadow-2xl overflow-hidden my-6 border border-[#E8DED1] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          id="close-property-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#2A1810]/80 hover:bg-[#2A1810] text-[#FFFDF9] backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery Container */}
        <div className="relative h-64 sm:h-96 bg-[#2A1810]">
          <img
            src={property.images[activeImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-300"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />

          {/* Carousel navigation controls */}
          {property.images.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10">
              <button
                type="button"
                onClick={handlePrevImage}
                className="p-2 rounded-full bg-[#FFFDF9]/85 hover:bg-[#FFFDF9] text-[#2A1810] backdrop-blur-md shadow-md transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="p-2 rounded-full bg-[#FFFDF9]/85 hover:bg-[#FFFDF9] text-[#2A1810] backdrop-blur-md shadow-md transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#2A1810]/85 backdrop-blur-md text-[#FFFDF9] border border-[#FFFDF9]/10">
              {property.city}
            </span>
            <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#C27835] backdrop-blur-md text-white">
              {property.propertyType} for Rent
            </span>
          </div>

          {/* Bottom Hero Info */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
                {property.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#F5EAE0] flex items-center gap-1.5 mt-1">
                <MapPin className="w-4 h-4 text-[#F5D09D]" />
                {property.neighborhood}, {property.city}
              </p>
            </div>

            {/* Price Pill */}
            <div className="bg-[#FFFDF9]/95 backdrop-blur-md rounded-2xl px-4 py-2 text-right border border-[#E8DED1] shadow-lg">
              <span className="text-[10px] font-bold text-[#8A7161] uppercase tracking-wider block">
                Monthly Rent
              </span>
              <span className="text-2xl font-black text-[#2A1810]">
                {formatKes(property.rentKes)}
                <span className="text-xs font-normal text-[#8A7161] ml-1">/ mo</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="p-5 sm:p-8 max-h-[calc(90vh-16rem)] overflow-y-auto space-y-8">
          {/* Quick Property Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-[#FAF6F0] border border-[#E8DED1] rounded-2xl text-center">
              <span className="text-xs text-[#7A6658] block">Bedrooms</span>
              <span className="text-lg font-bold text-[#2A1810] flex items-center justify-center gap-1.5 mt-0.5">
                <Bed className="w-4 h-4 text-[#C27835]" />
                {property.bedrooms} Beds
              </span>
            </div>
            <div className="p-3.5 bg-[#FAF6F0] border border-[#E8DED1] rounded-2xl text-center">
              <span className="text-xs text-[#7A6658] block">Bathrooms</span>
              <span className="text-lg font-bold text-[#2A1810] flex items-center justify-center gap-1.5 mt-0.5">
                <Bath className="w-4 h-4 text-[#C27835]" />
                {property.bathrooms} Baths
              </span>
            </div>
            <div className="p-3.5 bg-[#FAF6F0] border border-[#E8DED1] rounded-2xl text-center">
              <span className="text-xs text-[#7A6658] block">Floor Area</span>
              <span className="text-lg font-bold text-[#2A1810] flex items-center justify-center gap-1.5 mt-0.5">
                <Maximize2 className="w-4 h-4 text-[#C27835]" />
                {property.sizeSqMeters} m²
              </span>
            </div>
            <div className="p-3.5 bg-[#FAF6F0] border border-[#E8DED1] rounded-2xl text-center">
              <span className="text-xs text-[#7A6658] block">Parking</span>
              <span className="text-lg font-bold text-[#2A1810] flex items-center justify-center gap-1.5 mt-0.5">
                <Car className="w-4 h-4 text-[#C27835]" />
                {property.parkingSpots} Spot{property.parkingSpots > 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-[#2A1810] mb-2">Property Overview</h3>
            <p className="text-sm text-[#544135] leading-relaxed">{property.description}</p>
            {property.scenicView && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF2E8] text-[#804D1B] border border-[#EAD4BE] text-xs font-medium">
                <span>Scenic Outlook:</span>
                <strong>{property.scenicView}</strong>
              </div>
            )}
          </div>

          {/* Move-in Financial Breakdown */}
          <div className="bg-[#FAF6F0] rounded-2xl p-5 sm:p-6 border border-[#E8DED1]">
            <h3 className="text-base font-bold text-[#2A1810] mb-4 flex items-center gap-2">
              <span>Rental Financial Transparency</span>
              <span className="text-xs font-normal text-[#8A7161]">(First Month Move-In Breakdown)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-4 border-b border-[#E8DED1] text-sm">
              <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E8DED1]">
                <span className="text-xs text-[#8A7161] block">Monthly Rent</span>
                <span className="text-base font-bold text-[#2A1810]">{formatKes(property.rentKes)}</span>
                <span className="text-[10px] text-[#A8907E] block mt-0.5">Due every 1st of month</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E8DED1]">
                <span className="text-xs text-[#8A7161] block">Security Deposit (Refundable)</span>
                <span className="text-base font-bold text-[#2A1810]">{formatKes(property.depositKes)}</span>
                <span className="text-[10px] text-[#A8907E] block mt-0.5">
                  Refundable upon lease exit
                </span>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E8DED1]">
                <span className="text-xs text-[#8A7161] block">Monthly Service Charge</span>
                <span className="text-base font-bold text-[#2A1810]">{formatKes(property.serviceChargeKes)}</span>
                <span className="text-[10px] text-[#A8907E] block mt-0.5">Security, garbage & cleaning</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 text-xs sm:text-sm">
              <span className="font-semibold text-[#544135]">Estimated Total Initial Move-In:</span>
              <span className="text-lg font-black text-[#2A1810]">{formatKes(totalMoveInKes)}</span>
            </div>
          </div>

          {/* Essential Utilities & Full Amenities Grid */}
          <div>
            <h3 className="text-base font-bold text-[#2A1810] mb-3">
              Included Amenities & Kenyan Infrastructure
            </h3>

            {/* Key Utilities highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 rounded-xl bg-[#FAF2E8] border border-[#EAD4BE] flex items-start gap-3">
                <Droplet className="w-5 h-5 text-[#C27835] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#804D1B] block">Water Infrastructure</span>
                  <p className="text-xs text-[#544135] mt-0.5">{property.waterReliability}</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F6ECE1] border border-[#E0D0BE] flex items-start gap-3">
                <Zap className="w-5 h-5 text-[#C27835] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#804D1B] block">Electricity Backup</span>
                  <p className="text-xs text-[#544135] mt-0.5">{property.powerBackup}</p>
                </div>
              </div>
            </div>

            {/* Full Amenities list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {property.amenities.map((am, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F0] border border-[#E8DED1] text-xs font-medium text-[#4A3528]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C27835] shrink-0" />
                  <span className="truncate">{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Commute Details */}
          <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#E8DED1]">
            <h3 className="text-base font-bold text-[#2A1810] mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#C27835]" />
              Location & Accessibility
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E8DED1]">
                <span className="text-[#8A7161] block">Distance to {property.city} CBD</span>
                <span className="text-sm font-bold text-[#2A1810] block mt-0.5">
                  {property.distanceToCbdKm} Kilometers
                </span>
              </div>
              <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E8DED1]">
                <span className="text-[#8A7161] block">Estimated Peak Commute</span>
                <span className="text-sm font-bold text-[#2A1810] block mt-0.5">
                  ~{property.commuteMinutesCbd} Minutes
                </span>
              </div>
              <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E8DED1]">
                <span className="text-[#8A7161] block">Remoteness / Setting</span>
                <span className="text-sm font-bold text-[#2A1810] block mt-0.5">
                  {property.remotenessTier} ({property.remotenessScore}/10)
                </span>
              </div>
            </div>
          </div>

          {/* Caretaker / Agent Contact & Actions */}
          <div className="p-5 sm:p-6 bg-[#2A1810] rounded-2xl text-[#FFFDF9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C27835] flex items-center justify-center text-white font-black text-lg">
                {property.agent.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-[#FFFDF9]">{property.agent.name}</h4>
                  {property.agent.verified && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8A766] text-[#2A1810] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#D8C6B6]">{property.agent.agency}</p>
                <p className="text-xs text-[#EADFCF] font-mono mt-0.5">{property.agent.phone}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                id="schedule-viewing-modal-trigger-btn"
                onClick={() => setShowViewingModal(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C27835] hover:bg-[#A86124] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Viewing</span>
              </button>

              <a
                id="whatsapp-agent-link"
                href={`https://wa.me/${property.agent.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${property.agent.name}, I found your rental listing "${property.title}" in ${property.neighborhood} (Rent: KES ${property.rentKes}/mo) on KRH Rentals. Is it currently available for viewing?`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFFDF9]/10 hover:bg-[#FFFDF9]/20 text-[#FFFDF9] font-semibold text-xs border border-[#FFFDF9]/20 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#F5D09D]" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                id="modal-toggle-save-btn"
                onClick={() => onToggleSave(property.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#C27835] border-[#C27835] text-white'
                    : 'bg-[#FFFDF9]/10 border-[#FFFDF9]/20 text-[#D8C6B6] hover:bg-[#FFFDF9]/20'
                }`}
                title={isSaved ? 'Remove from saved' : 'Save listing'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Viewing Sub-Modal */}
        {showViewingModal && (
          <div className="absolute inset-0 z-30 bg-[#1A0F0A]/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FFFFFF] rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#E8DED1]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-[#2A1810] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C27835]" />
                  Schedule In-Person Viewing
                </h4>
                <button
                  type="button"
                  onClick={() => setShowViewingModal(false)}
                  className="p-1 text-[#8A7161] hover:text-[#2A1810] rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {viewingSuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-[#C27835] mx-auto mb-2" />
                  <h5 className="font-bold text-[#2A1810] text-base">Viewing Booked!</h5>
                  <p className="text-xs text-[#544135] mt-1">
                    Caretaker {property.agent.name} has been notified for {viewingDate || 'Tomorrow'} at{' '}
                    {viewingTime}. You will receive a WhatsApp confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleViewing} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-[#544135] mb-1">Select Date</label>
                    <input
                      type="date"
                      required
                      value={viewingDate}
                      onChange={(e) => setViewingDate(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0D3C4] rounded-xl focus:ring-2 focus:ring-[#C27835] focus:outline-hidden bg-[#FAF6F0]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#544135] mb-1">Preferred Time</label>
                    <select
                      value={viewingTime}
                      onChange={(e) => setViewingTime(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0D3C4] rounded-xl focus:ring-2 focus:ring-[#C27835] focus:outline-hidden bg-[#FAF6F0]"
                    >
                      <option value="9:00 AM">9:00 AM (Morning)</option>
                      <option value="11:30 AM">11:30 AM (Midday)</option>
                      <option value="2:00 PM">2:00 PM (Afternoon)</option>
                      <option value="4:30 PM">4:30 PM (Evening)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#544135] mb-1">Your Mobile / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +254 700 000 000"
                      className="w-full px-3 py-2 border border-[#E0D3C4] rounded-xl focus:ring-2 focus:ring-[#C27835] focus:outline-hidden bg-[#FAF6F0]"
                    />
                  </div>
                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowViewingModal(false)}
                      className="flex-1 py-2 px-3 rounded-xl border border-[#DFD2C2] text-[#6E5A4D] hover:bg-[#FAF6F0] font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#2A1810] hover:bg-[#43271A] text-white font-bold transition-colors cursor-pointer"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
