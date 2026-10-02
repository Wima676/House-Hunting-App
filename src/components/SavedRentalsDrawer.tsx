import React from 'react';
import { X, Trash2, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Property } from '../types';
import { formatKes } from '../utils/formatters';

interface SavedRentalsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveSaved: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const SavedRentalsDrawer: React.FC<SavedRentalsDrawerProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveSaved,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#1A0F0A]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col border-l border-[#E8DED1] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8DED1] flex items-center justify-between bg-[#FAF6F0]">
          <div>
            <h3 className="text-lg font-black text-[#2A1810]">Saved Rentals</h3>
            <p className="text-xs text-[#7A6658]">
              {savedProperties.length} propert{savedProperties.length === 1 ? 'y' : 'ies'} bookmarked
            </p>
          </div>
          <button
            type="button"
            id="close-saved-drawer-btn"
            onClick={onClose}
            className="p-2 text-[#8A7161] hover:text-[#2A1810] rounded-xl hover:bg-[#EFE6DC] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF6F0]/50">
          {savedProperties.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EFE6DC] flex items-center justify-center text-[#8A7161] mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-[#C27835]" />
              </div>
              <h4 className="font-bold text-[#2A1810] text-sm">No saved rentals yet</h4>
              <p className="text-xs text-[#7A6658] mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any rental card to save homes you want to review.
              </p>
            </div>
          ) : (
            savedProperties.map((prop) => {
              return (
                <div
                  key={prop.id}
                  id={`saved-item-${prop.id}`}
                  className="bg-[#FFFFFF] border border-[#E8DED1] rounded-2xl p-3 hover:border-[#CCA98A] transition-all flex gap-3 shadow-xs"
                >
                  <img
                    src={prop.images[0]}
                    alt={prop.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs text-[#2A1810] truncate">{prop.title}</h4>
                      <button
                        type="button"
                        onClick={() => onRemoveSaved(prop.id)}
                        className="text-[#9C8A7C] hover:text-[#B23820] p-0.5 transition-colors cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#7A6658] truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#C27835] shrink-0" />
                      {prop.neighborhood}, {prop.city}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-black text-[#2A1810]">
                        {formatKes(prop.rentKes)}
                        <span className="text-[10px] font-normal text-[#8A7161] ml-0.5">/mo</span>
                      </span>

                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-[#FAF2E8] text-[#804D1B] border border-[#EAD4BE]">
                        {prop.bedrooms} Bed · {prop.bathrooms} Bath
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="mt-2 text-[11px] font-bold text-[#C27835] hover:text-[#A86124] flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {savedProperties.length > 0 && (
          <div className="p-4 border-t border-[#E8DED1] bg-[#FAF6F0] flex items-center justify-between text-xs">
            <span className="text-[#7A6658]">
              Average Saved Rent:{' '}
              <strong className="text-[#2A1810]">
                {formatKes(
                  Math.round(
                    savedProperties.reduce((acc, p) => acc + p.rentKes, 0) /
                      savedProperties.length
                  )
                )}{' '}
                /mo
              </strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
