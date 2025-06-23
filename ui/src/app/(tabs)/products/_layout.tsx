import { Stack } from 'expo-router';
import { useTheme } from '../../ThemeContext';

export default function FeedLayout() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  
  const backgroundColor = resolvedTheme === 'dark' ? '#000' : '#fff';
  const textColor = resolvedTheme === 'dark' ? '#fff' : '#000';
  return (
    <Stack
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name='[productId]'
        options={{
          headerShown: true, 
          headerTitle: '', 
          headerStyle: {
            backgroundColor: backgroundColor,
          },
          headerTintColor: textColor,
        }}
      />
    </Stack>
  );
}