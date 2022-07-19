import { useTheme, Text, Button, IButtonProps } from 'native-base';

interface FilterProps extends IButtonProps {
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed';
}

export function Filter({
  title,
  isActive = false,
  type,
  ...rest
}: FilterProps) {
  const { colors } = useTheme();

  const filterColorType = type === 'open' ? colors.secondary[700]: colors.green[300];

  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={filterColorType}
      bg="gray.600"
      flex={1}
      size="sm"
      _pressed={{ bg: "gray.500" }}
      {...rest}
    >
      <Text color={isActive ? filterColorType : "gray.300"} fontSize="xs" textTransform="uppercase">
        {title}
      </Text>
    </Button>
  );
}