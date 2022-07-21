import { useTheme, Box, Text } from 'native-base';

interface ToastProps {
  title: string;
  type: 'success' | 'error';
}

export function Toast({title, type}: ToastProps) {
  const { colors } = useTheme();

  const backgroundColor = type === 'success' ? colors.green[500] : colors.red[500];

  return (
    <Box bg={backgroundColor} px="4" py="2" rounded="sm" >
      <Text color="white">
        {title}
      </Text>
    </Box>
  );
}