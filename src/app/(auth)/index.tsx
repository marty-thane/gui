import { Text, View, Button } from "react-native";
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome.</Text>
      <Button  title="to login" onPress = {() => router.push('/login')}></Button>
    </View>
  );
}
