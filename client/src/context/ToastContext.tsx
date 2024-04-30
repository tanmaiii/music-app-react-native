import React, { createContext, useContext, useEffect, useState } from "react";
import ToastMessage from "../components/ToastMessage";

interface IToastContext {
  toastMessage: string;
  setToastMessage: (string) => void;
}

export const ToastContext = createContext<IToastContext | null>(null);

type Props = {
  children: React.ReactNode;
};

export function useToast() {
  return useContext(ToastContext)!;
}

export const ToastContextProvider = ({ children }: Props) => {
  const [toastMessage, setToastMessage] = useState<string>("");
  const toastRef = React.useRef(null);

  useEffect(() => {
    console.log("TOAST", toastMessage);

    if (toastMessage && toastRef.current) {
      toastRef.current.show();
    }
  }, [toastMessage]);

  const contextValue = {
    toastMessage,
    setToastMessage,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastMessage description={toastMessage} ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};
