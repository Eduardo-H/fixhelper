import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useTheme, HStack, VStack, Text, ScrollView, useToast, FormControl, WarningOutlineIcon } from 'native-base';
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from 'phosphor-react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { formatDate } from '../utils/firestoreDateFormat';
import { OrderFirestoreDTO } from '../DTOs/OrderFirestoreDTO';

import { useAlert } from '../hooks/useAlert';

import { Loading } from '../components/Loading';
import { Header } from '../components/Header';
import { OrderType } from '../components/Order';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Toast } from '../components/Toast';

interface RouteParams {
  orderId: string;
}

type OrderDetails = OrderType & {
  description: string;
  solution: string;
  closed: string;
}

interface CloseOrderFormData {
  solution: string;
}

const closeOrderFormSchema = yup.object({
  solution: yup.string().required('This field is required')
}).required();

export function Details() {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const navigation = useNavigation();
  const { colors } = useTheme();
  const toast = useToast();

  const { showAlert } = useAlert();

  const { control, handleSubmit, formState: { errors } } = useForm<CloseOrderFormData>({
    resolver: yupResolver(closeOrderFormSchema),
    defaultValues: { solution: '' }
  });

  function handleCloseOrder(data: CloseOrderFormData) {
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .update({
      solution: data.solution,
      status: 'closed',
      closed_at: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      toast.show({
        placement: 'top',
        render: () => {
          return (
            <Toast title="Order successfully closed" type="success" />
          )
        }
      });
      navigation.navigate('home');
    })
    .catch((error) => {
      return showAlert('Error', 'Unable to close this order.');
    });
  }

  useEffect(() => {
    firestore()
    .collection<OrderFirestoreDTO>('orders')
    .doc(orderId)
    .get()
    .then((doc) => {
      const { patrimony, description, status, created_at, closed_at, solution } = doc.data();

      const closed = closed_at ? formatDate(closed_at) : null;

      setOrder({
        id: doc.id,
        patrimony,
        description,
        status,
        solution,
        when: formatDate(created_at),
        closed        
      });

      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Order" px={4} />

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === 'closed'
          ? <CircleWavyCheck size={22} color={colors.green[300]} />
          : <Hourglass size={22} color={colors.secondary[700]} />
        }

        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          {order.status}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Patrimony"
          description={`Patrimony ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="Description"
          description={order.description}
          icon={ClipboardText}
          footer={`Registered at ${order.when}`}
        />

        <CardDetails
          title="Solution"
          description={order.solution}
          icon={CircleWavyCheck}
          footer={order.closed && `Closed at ${order.closed}`}
        >
          {
            order.status === 'open'
            && (
              <FormControl isRequired>
                <Controller
                  name="solution"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Input
                        placeholder="Description of the solution..."
                        h={24}
                        px={0}
                        textAlignVertical="top"
                        bg="gray.600"
                        multiline
                        _focus={{ bg: 'gray.600', borderWidth: 1, borderColor: 'primary.700', px: 2 }}
                        _invalid={{ bg: 'gray.600', borderWidth: 1, borderColor: 'red.500', px: 2 }}
                        isInvalid={errors.solution !== undefined}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                      <FormControl.ErrorMessage 
                        leftIcon={<WarningOutlineIcon size="xs" />} 
                        isInvalid={errors.solution !== undefined}
                      >
                        {errors.solution?.message}
                      </FormControl.ErrorMessage>
                    </>
                  )}
                />
              </FormControl>
            )
          }
        </CardDetails>

        {
          order.status === 'open' 
          && <Button title="Close order" mt={5} onPress={handleSubmit(handleCloseOrder)} />
        }
      </ScrollView>
    </VStack>
  );
}