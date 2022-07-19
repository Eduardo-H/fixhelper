import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  useTheme,
  HStack,
  IconButton,
  VStack,
  Text, 
  Heading,
  FlatList,
  Center
} from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';

import { Filter } from '../components/Filter';
import { Order, OrderType } from '../components/Order';
import { Button } from '../components/Button';

import Logo from '../assets/logo_secondary.svg';

export function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [orders, setOrders] = useState<OrderType[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleOpenOrderDetails(orderId: string) {
    navigation.navigate('details', { orderId });
  }

  function handleNewOrder() {
    navigation.navigate('new');
  }

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton 
          icon={<SignOut size={26} color={colors.gray[300]} />} 
          rounded="full"
          _pressed={{ bg: "gray.500" }}          
        />
      </HStack>
      
      <VStack flex={1} px={6}>
        <HStack w="full" mt={8} mb={4} justifyContent="space-between" alignItems="center">
          <Heading color="gray.100">
            My orders
          </Heading>

          <Text color="gray.200" fontSize="md">
            {orders.length}
          </Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter 
            title="Open" 
            type="open" 
            isActive={statusSelected === 'open'}
            onPress={() => setStatusSelected('open')}
          />

          <Filter 
            title="Closed" 
            type="closed" 
            isActive={statusSelected === 'closed'}
            onPress={() => setStatusSelected('closed')}
          />
        </HStack>

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Order data={item} onPress={() => handleOpenOrderDetails(item.id)} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={() => (
            <Center>
              <ChatTeardropText size={40} color={colors.gray[300]} />
              <Text color="gray.300" fontSize="xl" mt={3} textAlign="center">
                You have no {statusSelected} orders.
              </Text>
            </Center>
          )}
        />

        <Button title="New order" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
}