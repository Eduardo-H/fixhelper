import { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import auth from '@react-native-firebase/auth';
import { VStack, Heading, Icon, useTheme } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';

import { Input } from '../components/Input';
import { Button } from '../components/Button';

import Logo from '../assets/logo_primary.svg';
import { useAlert } from '../hooks/useAlert';

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { colors } = useTheme();
  const { showAlert } = useAlert();

  async function handleSignIn() {
    if (!email || !setEmail) {
      return showAlert('Form error', 'You must inform an e-mail and password.');
    }

    setIsLoading(true);

    auth()
    .signInWithEmailAndPassword(email, password)
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

        <Input
          mb={4}
          placeholder="E-mail"
          InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
          onChangeText={setEmail}
        />

        <Input
          mb={8}
          placeholder="Password"
          secureTextEntry
          InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
          onChangeText={setPassword}
        />

        <Button 
          title="Log in" 
          w="full" 
          onPress={handleSignIn} 
          isLoading={isLoading}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}