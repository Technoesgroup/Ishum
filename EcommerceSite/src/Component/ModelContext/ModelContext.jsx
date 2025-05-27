import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showB2BModal, setShowB2BModal] = useState(false);
  const [showB2UModal, setShowB2UModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <ModalContext.Provider value={{
      showB2BModal,
      setShowB2BModal,
      showB2UModal,
      setShowB2UModal,
      showLoginModal,
      setShowLoginModal,
      showAuthModal,
      setShowAuthModal,
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
