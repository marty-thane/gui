import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="products" options={{ title: 'Products', tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="home" size={size} color={color} /> ) }} />
        
      <Tabs.Screen name="profile" options={{ title: 'Feed' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
    </Tabs>
  );
}