import { Button, View, Text } from 'react-native';
import { useAuth } from '@/context/auth'; // Now this exists!
import { useRouter } from 'expo-router';

export default function Login() {
  const { login } = useAuth(); // ← Hook is now defined
  const router  = useRouter();

  const handleLogin = () => {
    login(); 
    router.replace('/profile');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Demo Login</Text>
      <Button 
        title="Press to 'Login'" 
        onPress={handleLogin} 
      />
      <Button title="try" onPress={() => router.push('/profile')}></Button>
    </View>
  );
}