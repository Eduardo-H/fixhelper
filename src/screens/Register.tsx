import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';

import { useAlert } from '../hooks/useAlert';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function Register() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  const { showAlert } = useAlert();

  function handleRegisterNewOrder() {
    if (!patrimony || !description) {
      return showAlert('Warning', 'Fill all the fields.');
    }

    setIsSubmiting(true);

    firestore()
    .collection('orders')
    .add({
      patrimony,
      description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      navigation.navigate('home');
    })
    .catch((error) => {
      setIsSubmiting(false);
      return showAlert('Error', 'Unable to register the order.');
    });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} p={6} pt={0} bg="gray.600">
        <Header title="New order" />

        <Input
          placeholder="Patrimony number"
          mt={4}
          onChangeText={setPatrimony}
        />
        <Input
          placeholder="Order description"
          flex={1}
          mt={5}
          multiline
          textAlignVertical="top"
          onChangeText={setDescription}
        />

        <Button 
          title="Register" 
          mt={5} 
          isLoading={isSubmiting}
          onPress={handleRegisterNewOrder}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}