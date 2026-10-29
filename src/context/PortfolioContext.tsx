import React, { createContext, useContext, useState } from 'react';
import { soundFX } from '../utils/soundEffects';

interface PortfolioContextType {
  activeSystemId: string;
  setActiveSystemId: (id: string) => void;
  activeTag: string | null;
  setActiveTag: (tag: string | null) => void;
  inspectedItem: {
    title: string;
    category: string;
    description: string;
    specs: string[];
    metrics?: { label: string; value: string }[];
    link?: string;
    videoUrl?: string;
  } | null;
  setInspectedItem: (item: any | null) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSystemId, setActiveSystemId] = useState<string>('web-systems');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [inspectedItem, setInspectedItem] = useState<any | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const toggleSound = () => {
    const next = soundFX.toggle();
    setSoundEnabled(next);
  };

  const handleSetActiveTag = (tag: string | null) => {
    soundFX.playClick();
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const handleSetInspectedItem = (item: any | null) => {
    if (item) soundFX.playTransition();
    setInspectedItem(item);
  };

  return (
    <PortfolioContext.Provider
      value={{
        activeSystemId,
        setActiveSystemId,
        activeTag,
        setActiveTag: handleSetActiveTag,
        inspectedItem,
        setInspectedItem: handleSetInspectedItem,
        soundEnabled,
        toggleSound,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
