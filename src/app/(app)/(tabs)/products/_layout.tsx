import { Stack } from 'expo-router';

export default function FeedLayout() {
  return (
    <Stack
      initialRouteName="product"
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name='[id]'
        options={{
          headerShown: true, 
          headerTitle: '', 
          headerStyle: {
            backgroundColor: ''
          }
        }}
      />
    </Stack>
  );
}