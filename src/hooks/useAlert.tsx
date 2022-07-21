import { createContext, useContext, useState, ReactNode } from 'react';

type AlertContextType = {
  isAlertVisible: boolean;
  title: string;
  description: string;
  actionFunction?: () => {};
  showAlert: (title: string, description: string, actionFunction?: () => void) => void;
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
  const [actionFunction, setActionFunction] = useState(null);

  function showAlert(title: string, description: string, actionFunction = null) {
    setTitle(title);
    setDescription(description);
    setActionFunction(actionFunction);
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
        actionFunction,
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