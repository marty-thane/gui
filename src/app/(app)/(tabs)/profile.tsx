import { Text, Button } from 'react-native';
import { useAuth } from '@/context/auth';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout()
        router.navigate('/login')
    }

    return(
        <>
        <Text>My profile</Text>
        <Button title="logout" onPress={handleLogout}></Button>
        </>
    )
}