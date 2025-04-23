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

## Navigace
