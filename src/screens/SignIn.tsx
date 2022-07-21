import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme, FormControl, WarningOutlineIcon } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import { useAlert } from '../hooks/useAlert';

import Logo from '../assets/logo_primary.svg';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormSchema = yup.object({
  email: yup.string().required('This field is required'),
  password: yup.string().required('This field is required')
}).required();

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { colors } = useTheme();
  const { showAlert } = useAlert();


  const { control, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  function handleSignIn(data: SignInFormData) {
    console.log(data);
    setIsLoading(true);

    auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .catch((error) => {
      setIsLoading(false);

      switch (error.code) {
        case 'auth/invalid-email':
          return showAlert('Authentication error', 'Invalid e-mail.');
        case 'auth/user-not-found':
          return showAlert('Authentication error', 'E-mail or password is invalid.');
        case 'auth/wrong-password':
          return showAlert('Authentication error', 'E-mail or password is invalid.');
        default:
          return showAlert('Authentication error', 'Error trying to sign in.');
      }
    });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
        <Logo />

        <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
          Access your account
        </Heading>

        <FormControl isRequired>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  placeholder="E-mail"
                  InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                  isInvalid={errors.password !== undefined}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormControl.ErrorMessage 
                  leftIcon={<WarningOutlineIcon size="xs" />} 
                  isInvalid={errors.email !== undefined}
                >
                  {errors.email?.message}
                </FormControl.ErrorMessage>
              </>
            )}
          />
          
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Input
                  mt={4}
                  placeholder="Password"
                  secureTextEntry
                  InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                  isInvalid={errors.password !== undefined}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormControl.ErrorMessage 
                  leftIcon={<WarningOutlineIcon size="xs" />} 
                  isInvalid={errors.password !== undefined}
                >
                  {errors.password?.message}
                </FormControl.ErrorMessage>
              </>
            )}
          />
        </FormControl>

        <Button 
          title="Log in" 
          w="full" 
          mt={8}
          onPress={handleSubmit(handleSignIn)} 
          isLoading={isLoading}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}