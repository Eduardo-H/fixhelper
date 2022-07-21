import { useTheme, Box, HStack, Text, VStack, Circle, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

export type OrderType = {
  id: string;
  patrimony: string;
  when: string;
  status: 'open' | 'closed';
}

interface OrderProps extends IPressableProps {
  data: OrderType;
}

export function Order({ data, ...rest }: OrderProps) {
  const { colors } = useTheme();

  const statusColor = data.status === 'open' ? colors.secondary[700]: colors.green[300];

  return (
    <Pressable _pressed={{ opacity: 0.8 }} {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="gray.100" fontSize="md" mb={1}>
            Patrimony {data.patrimony}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {
            data.status === 'closed'
            ? <CircleWavyCheck size={24} color={statusColor} />
            : <Hourglass size={24} color={statusColor} />
          }
        </Circle>
      </HStack>
    </Pressable>
  );
}