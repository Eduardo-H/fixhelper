import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton 
      bg="green.700"
      h={14}
      rounded="sm"
      _pressed={{ bg: "green.500" }}
      {...rest}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  );
}