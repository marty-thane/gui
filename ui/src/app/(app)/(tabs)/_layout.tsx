import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false, 
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray'
      }}
    >
      <Tabs.Screen name="products" options={{ 
        title: 'Products', 
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="store" size={size} color={color}/> ) 
      }}
      />

      <Tabs.Screen name="profile" options={{ 
        title: 'Profile', 
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" size={size} color={color}/> ) 
      }}
      />
      <Tabs.Screen name="settings" options={{ 
        title: 'Settings', 
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="settings" size={size} color={color}/> ) 
      }}
      />
    </Tabs>
  );
}