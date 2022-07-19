import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { VStack } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} p={6} pt={0} bg="gray.600">
        <Header title="New order" />

        <Input
          placeholder="Patrimony number"
          mt={4}
        />
        <Input
          placeholder="Order description"
          flex={1}
          mt={5}
          multiline
          textAlignVertical="top"
        />

        <Button title="Register" mt={5} />
      </VStack>
    </TouchableWithoutFeedback>
  );
}