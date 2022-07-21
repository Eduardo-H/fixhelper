import { createContext, useContext, useState, ReactNode } from 'react';

type AlertContextType = {
  isAlertVisible: boolean;
  title: string;
  description: string;
  showAlert: (title: string, description: string) => void;
  closeAlert: () => void;
}

type AlertProviderProps = {
  children: ReactNode;
}

const AlertContext = createContext({} as AlertContextType);

export function AlertProvider({ children }: AlertProviderProps): JSX.Element {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function showAlert(title: string, description: string) {
    setTitle(title);
    setDescription(description);
    setIsAlertVisible(true);
  }

  function closeAlert() {
    setIsAlertVisible(false);
  }

  return (
    <AlertContext.Provider 
      value={{
        isAlertVisible,
        title, 
        description,
        showAlert,
        closeAlert
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);

  return context;
}