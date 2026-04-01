"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import FormPopup, { PopupVariant } from "./FormPopupEnhanced";

interface PopupContextType {
  openCommunityPopup: () => void;
  openSalesPopup: () => void;
  closePopup: () => void;
}

const PopupContext = createContext<PopupContextType>({
  openCommunityPopup: () => {},
  openSalesPopup: () => {},
  closePopup: () => {},
});

export function PopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState<PopupVariant>("community");

  const openCommunityPopup = () => { setVariant("community"); setIsOpen(true); };
  const openSalesPopup     = () => { setVariant("sales");     setIsOpen(true); };
  const closePopup         = () => setIsOpen(false);

  return (
    <PopupContext.Provider value={{ openCommunityPopup, openSalesPopup, closePopup }}>
      {children}
      <FormPopup isOpen={isOpen} onClose={closePopup} variant={variant} />
    </PopupContext.Provider>
  );
}

export function usePopup() {
  return useContext(PopupContext);
}