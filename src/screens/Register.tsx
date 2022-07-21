import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FormControl, useToast, VStack, WarningOutlineIcon } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAlert } from '../hooks/useAlert';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';

interface RegisterOrderFormData {
  patrimony: string;
  description: string;
}

const signInFormSchema = yup.object({
  patrimony: yup.string().required('This field is required'),
  description: yup.string().required('This field is required')
}).required();

export function Register() {
  const [isSubmiting, setIsSubmiting] = useState(false);

  const navigation = useNavigation();
  const toast = useToast();

  const { showAlert } = useAlert();

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterOrderFormData>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      patrimony: '',
      description: ''
    }
  });

  function handleRegisterNewOrder(data: RegisterOrderFormData) {
    setIsSubmiting(true);

    firestore()
    .collection('orders')
    .add({
      patrimony: data.patrimony,
      description: data.description,
      status: 'open',
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      toast.show({
        placement: 'top',
        duration: 3000,
        render: () => {
          return (
            <Toast title="Order successfully registered" type="success" />
          )
        }
      });
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

        <FormControl flex={1} isRequired>
          <Controller
            name="patrimony"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Patrimony number"
                  mt={4}
                  isInvalid={errors.patrimony !== undefined}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                <FormControl.ErrorMessage 
                  leftIcon={<WarningOutlineIcon size="xs" />} 
                  isInvalid={errors.patrimony !== undefined}
                >
                  {errors.patrimony?.message}
                </FormControl.ErrorMessage>
              </>
            )}
          />
          
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="Order description"
                  flex={1}
                  mt={5}
                  multiline
                  textAlignVertical="top"
                  isInvalid={errors.description !== undefined}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
                <FormControl.ErrorMessage 
                  leftIcon={<WarningOutlineIcon size="xs" />} 
                  isInvalid={errors.description !== undefined}
                >
                  {errors.description?.message}
                </FormControl.ErrorMessage>
              </>
            )}
          />
        </FormControl>

        <Button 
          title="Register" 
          mt={5} 
          isLoading={isSubmiting}
          onPress={handleSubmit(handleRegisterNewOrder)}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}