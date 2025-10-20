import { createContext, useContext, useState, useCallback } from "react";
import ToastContainer from "./ToastContainer";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message: toast.message,
      type: toast.type || "info",
      duration: toast.duration || 3000,
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    return addToast({ message, type, duration });
  }, [addToast]);

  const showSuccess = useCallback((message, duration = 3000) => {
    return showToast(message, "success", duration);
  }, [showToast]);

  const showError = useCallback((message, duration = 5000) => {
    return showToast(message, "error", duration);
  }, [showToast]);

  const showWarning = useCallback((message, duration = 4000) => {
    return showToast(message, "warning", duration);
  }, [showToast]);

  const showInfo = useCallback((message, duration = 3000) => {
    return showToast(message, "info", duration);
  }, [showToast]);

  const value = {
    addToast,
    removeToast,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    toasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
