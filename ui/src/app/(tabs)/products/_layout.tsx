import { Stack } from 'expo-router';

export default function FeedLayout() {
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
            backgroundColor: 'white'
          }
        }}
      />
    </Stack>
  );
}