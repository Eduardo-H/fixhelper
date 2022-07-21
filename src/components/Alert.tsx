import { useRef } from 'react';
import { AlertDialog, Button } from 'native-base';

import { useAlert } from '../hooks/useAlert';

export function Alert() {
  const { 
    isAlertVisible, 
    title, 
    description, 
    actionFunction, 
    closeAlert 
  } = useAlert();

  const cancelRef = useRef(null);
  
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isAlertVisible} onClose={closeAlert}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          {title}
        </AlertDialog.Header>
        <AlertDialog.Body>
          {description}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            {
              actionFunction
              ? (
                <>
                  <Button variant="unstyled" colorScheme="coolGray" onPress={closeAlert} ref={cancelRef}>
                    No
                  </Button>
                  <Button colorScheme="danger" px={5} onPress={actionFunction}>
                    Yes
                  </Button>
                </>
              ) : (
                <Button variant="unstyled" colorScheme="coolGray" onPress={closeAlert} ref={cancelRef}>
                  OK
                </Button>
              )
            }
            
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}