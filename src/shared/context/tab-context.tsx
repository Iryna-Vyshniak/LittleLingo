import React, { ReactNode, useContext, useState } from 'react';

interface UIContextType {
  showTabs: boolean;
  setShowTabs: React.Dispatch<React.SetStateAction<boolean>>;
}

// create the context
export const UIContext = React.createContext<UIContextType | undefined>(
  undefined
);

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // the reactive values
  const [showTabs, setShowTabs] = useState<boolean>(true);

  // the store object
  const state = {
    showTabs,
    setShowTabs,
  };

  // wrap the application in the provider with the initialized context
  return <UIContext.Provider value={state}>{children}</UIContext.Provider>;
};

export default UIContext;
