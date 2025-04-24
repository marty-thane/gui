# React Native

Následující dokument slouží jako opora pro výuku v předmětu KI/GUI.

## Jak spustit

1. Naklonujte si repozitář:
   ```bash
   git clone https://github.com/marty-thane/gui
   ```
2. Přejděte do nově vzniklého adresáře:
   ```bash
   cd gui/src/
   ```
3. Nainstalujte závislosti:
   ```bash
   npm install
   ```
4. Spusťte aplikaci pomocí Expo:
   ```bash
   npx expo start
   ```

## Komponenty

Přehled komponent naleznete [zde](https://reactnative.dev/docs/components-and-apis).

### Definice

Můžeme definovat vlastní komponenty:

```tsx
import { Text, TouchableOpacity } from 'react-native';

const MyButton = () => {
  return (
    <TouchableOpacity>
      <Text>Já jsem tlačítko.</Text>
    </TouchableOpacity>
  );
};
```

Tyto komponenty potom lze použít v kódu:

```tsx
<MyButton/>
```

### Argumenty

Naše komponenta může přijímat argumenty (*props*):

```tsx
import { Text, TouchableOpacity, Linking } from 'react-native';

const MyButton = ({ label, link }) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(link)}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};
```

Opět ukázka použití:

```tsx
<MyButton label="Jdi na Google" link="https://google.cz" />
```

### Stavy

Komponenty mohou mít stavy (*states*), které slouží jako jejich interní paměť.

```tsx
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const MyButton = () => {
  const [clickCount, setClickCount] = useState(0);

  const handlePress = () => {
    setClickCount(prevClick => prevClick + 1);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>Kliknul jsi mě {clickCount}x.</Text>
    </TouchableOpacity>
  );
};
```

### Úkol č. 1

Napište komponentu, která bude tvořena [textovým polem](https://reactnative.dev/docs/textinput) a tlačítkem. Po zadání vašeho jména a kliknutí na tlačítko vás komponenta pozdraví.

<details>
<summary>Zobrazit řešení</summary>

```tsx
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity } from 'react-native';

const Greeting = () => {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  const handlePress = () => {
    setSubmittedName(name);
  };

  return (
    <>
      <TextInput
        placeholder="Jak se jmenuješ?"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity onPress={handlePress}>
        <Text>Potvrdit</Text>
      </TouchableOpacity>
      {submittedName !== '' && (
        <Text>Ahoj, {submittedName}!</Text>
      )}
    </>
  );
};
```

</details>

## Styly

### Možnosti stylování

#### 1. Inline styly

Přímé stylování aplikované přímo na komponenty

Užitečné pro dynamické nebo podmíněné stylování.

```tsx
// Úprava tlačítka pomocí inline stylů:
<TouchableOpacity style={{backgroundColor: 'blue'}} onPress={handlePress}>
   <Text style={{color: 'white'}}>Potvrdit</Text>
</TouchableOpacity>
```

#### 2. StyleSheet.create()

Doporučený přístup pro většinu potřeb stylování

Vytváří optimalizovaný objekt stylu

Poskytuje výkonnostní výhody a kontrolu typu.


```tsx
// import StyleSheet
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

// úprava tlačítka pomocí Stylesheet
<TouchableOpacity style={styles.button} onPress={handlePress}>
   <Text style={{color: 'white'}}>Potvrdit</Text>
</TouchableOpacity>

// úprava stylu pozdravu
<Text style={styles.greeting}>Ahoj, {submittedName}!</Text>

// úprava stylu containeru
<View style={styles.container}>
   <Greeting />
</View>

// vytvoření stylů
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    padding: 20
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10
  },
  greeting: {
    margin: 20,
    fontSize: 24
  }
})
```

#### 3. Externí knihovny

Knihovny třetích stran, jako jsou styled-components a NativeWind

Umožňuje syntaxi podobnou CSS v JavaScriptu

Poskytuje pokročilé možnosti tvorby témat.


##### styled-components

Instalace knihovny
```bash
npm install styled-components
```

```tsx
// import knihovny
import styled from 'styled-components/native';

// úprava inputu
<StyledTextInput
 placeholder="Jak se jmenuješ?"
 value={name}
 onChangeText={setName}
/>

// vytvoření stylů inputu
const StyledTextInput = styled.TextInput`
  border-width: 1px;
  border-radius: 10px;
  width: 80%;
  margin: 20px;
  padding: 15px
`;
```

#### Kombinace stylů
```tsx
// úprava stylů tlačítka
<TouchableOpacity style={[styles.button, {backgroundColor: 'green'}]} onPress={handlePress}>
 <Text style={{color: 'white'}}>Potvrdit</Text>
</TouchableOpacity>
```

#### Dynamické stylování

```tsx
// import useColorScheme
import { Text, TextInput, TouchableOpacity, View, StyleSheet, useColorScheme } from 'react-native';

// detekce zda je aktivní darkmode
const isDarkMode = useColorScheme() === 'dark'

// úprava inputu
<StyledTextInput
 placeholder="Jak se jmenuješ?"
 placeholderTextColor={isDarkMode ? 'white' : 'black'}
 style={isDarkMode ? styles.darkTextInput : styles.lightTextInput}
 value={name}
 onChangeText={setName}
/>

// úprava pozdravu
<Text style={[styles.greeting, isDarkMode ? styles.darkGreeting : styles.lightGreeting]}>Ahoj, {submittedName}!</Text>

// úprava containeru
<View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
   <Greeting />
</View>

// styly pro dark a light mode
lightContainer: {
    backgroundColor: '#f9fafb', // Světlé pozadí
  },
  darkContainer: {
    backgroundColor: '#2d2d2d', // Tmavé pozadí
  },
  darkGreeting: {
    color: 'white'
  },
  lightGreeting: {
    color: 'black'
  },
  darkTextInput: {
    color: 'white',
    borderColor: 'white'
  },
  lightTextInput: {
    color: 'black',
    borderColor: 'black'
  }
```

## Navigace

Expo Router je knihovna pro navigaci v aplikacích vytvořených s Expo a React Native.

- Umožňuje implementovat souborově orientovanou navigaci (file-based routing), což znamená, že struktura složek v projektu odpovídá struktuře navigace v aplikaci.

- Je to novější přístup k navigaci v Expo/React Native aplikacích, který usnadňuje organizaci a strukturování aplikace.

- Dynamic routing: Expo Router podporuje dynamické routování, což umožňuje například vytváření dynamických URL pro jednotlivé obrazovky.

- Nested layouts: Umožňuje definovat více vrstev rozhraní pro různé sekce aplikace, např. Root Layout, App Layout, Tab Layout, atd.

### Link 

- Navigace pomocí odkazu

- Link je komponenta, která umožňuje navigovat mezi stránkami v aplikaci pomocí odkazu, podobně jako v běžném webovém vývoji. Funguje stejně jako `<a>` tag v HTML

### useRouter

- Navigace probíhá na základě nějaké akce v kódu, například při kliknutí na tlačítko, odeslání formuláře nebo jiné interakci uživatele.

### Metody pro navigaci pomocí useRouter

``` tsx
router.push('/profile');
```

Tato metoda naviguje uživatele na danou cestu a přidává ji do historie, což znamená, že se můžeš vrátit zpět na předchozí stránku (např. kliknutím na tlačítko zpět).

``` tsx
router.replace('/profile');
```

Místo toho, aby se stránka přidala do historie, replace nahrazuje aktuální stránku. Tato metoda se hodí, pokud nechceš, aby uživatel mohl zpětně přejít na předchozí stránku (např. po přihlášení, aby se nezobrazovala přihlašovací obrazovka).

``` tsx
router.back();
```

Tato metoda přesměruje uživatele zpět na předchozí stránku v historii prohlížeče. 

``` tsx
router.reload();
```

Obnoví aktuální stránku (pokud chceš znovu načíst stránku, např. při nějaké změně stavu, která vyžaduje refresh).

### Navigační komponenty

`<Slot />`

Komponenta `<Slot />` dynamicky vykresluje různé komponenty nebo obrazovky na základě aktuální routy, aniž byste museli ručně specifikovat každou z nich. Ačkoli `<Slot />` zjednodušuje routování, postrádá vestavěné navigační prvky jako je tlačítko zpět nebo přechodové animace.

`<Stack />`

Pro aplikace, které vyžadují větší kontrolu nad navigačními přechody, je řešením komponenta `<Stack />` z Expo Router. `<Stack />` nabízí vestavěné navigační prvky (např. tlačítko zpět), což zlepšuje uživatelský zážitek, a samozřejmě také přechodové animace, které jsme již probírali.


### app/_layout.tsx

``` tsx
import { Slot } from "expo-router";
import { AuthProvider } from "@/context/auth";

export default function RootLayout() {
  return(
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
```

### app/(auth)/_layout.tsx

``` tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
    return(
        <Stack 
          screenOptions={{headerTitle: ''}}
        />
    )
}
```

### app/(auth)/index.tsx

``` tsx
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
```

### app/(auth)/login.tsx

``` tsx
import { Button, View, Text } from 'react-native';
import { useAuth } from '@/context/auth'; // Now this exists!
import { useRouter } from 'expo-router';

export default function LoginScreen() {
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
      <Button title="try" onPress={() => router.replace('/profile')}></Button>
    </View>
  );
}
```

### context/auth.tsx

``` tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  user: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(false);

  const login = () => setUser(true);
  const logout = () => setUser(false);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### app/(app)/_layout.tsx

``` tsx
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
```

### app/(app)/(tabs)/_layout.tsx

``` tsx
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
```

### app/(app)/(tabs)/profile.tsx

``` tsx
import { Text, View, Button } from 'react-native';
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>My profile</Text>
        <Button title="logout" onPress={handleLogout}></Button>
        </View>
        </>
    )
}
```

### app/(app)/(tabs)/settings.tsx

``` tsx
import { Text, View } from 'react-native';

export default function SettingsScreen() {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>My settings</Text>
        </View>
    )
}
```

### app/(app)/(tabs)/products/_layout.tsx

``` tsx
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
            backgroundColor: 'white'
          }
        }}
      />
    </Stack>
  );
}
```

### app/(app)/(tabs)/products/product.tsx

``` tsx
import { Link } from 'expo-router';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const mockProducts = [
  { id: '1', name: 'Wireless Headphones', price: '$99' },
  { id: '2', name: 'Smart Watch', price: '$199' },
  { id: '3', name: 'Bluetooth Speaker', price: '$59' },
];

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      {mockProducts.map((product) => (
        <Link 
          key={product.id} 
          href={`/products/${product.id}`} 
          asChild
        >
          <Pressable style={styles.productCard}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productCard: { 
    padding: 15, 
    backgroundColor: '#f0f0f0', 
    borderRadius: 8, 
    marginBottom: 10 
  },
  productName: { fontSize: 18 },
  productPrice: { color: 'green' }
});
```

### app/(app)/(tabs)/products/[id].tsx

``` tsx
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const mockProducts = [
  { id: '1', name: 'Wireless Headphones', price: '$99', description: 'Premium noise-cancelling headphones with 30hr battery' },
  { id: '2', name: 'Smart Watch', price: '$199', description: 'Fitness tracking and notifications on your wrist' },
  { id: '3', name: 'Bluetooth Speaker', price: '$59', description: 'Portable speaker with 10hr playtime' },
];

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.id}</Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', marginBottom: 20 },
  description: { fontSize: 16, lineHeight: 24 }
});
```
