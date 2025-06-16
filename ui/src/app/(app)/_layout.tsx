import { Redirect } from 'expo-router';
import { useAuth } from '@/context/auth';
import { Slot } from 'expo-router';

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}