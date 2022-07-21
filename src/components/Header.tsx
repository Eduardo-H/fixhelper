import { useNavigation } from '@react-navigation/native';
import { useTheme, Heading, HStack, IconButton, StyledProps, Box } from 'native-base';
import { CaretLeft } from 'phosphor-react-native';

interface HeaderProps extends StyledProps {
  title: string;
}

export function Header({ title, ...rest }: HeaderProps) {
  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pt={12}
      pb={6}
      {...rest}
    >
      <IconButton 
        icon={<CaretLeft size={24} color={colors.gray[200]} />}
        rounded="full"
        ml={-2}
        _pressed={{ bg: "gray.500" }}
        onPress={handleGoBack}
      />

      <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1}>
        {title}
      </Heading>

      <Box w={12} />
    </HStack>
  );
}