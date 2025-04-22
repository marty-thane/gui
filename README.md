# React Native

Následující dokument slouží jako opora pro výuku v předmětu KI/GUI.

## Jak spustit

1. Naklonujte si repozitář:
   ```bash
   git clone https://github.com/marty-thane/gui
   ```
2. Přesuňte se do nově vzniklého adresáře:
   ```bash
   cd gui/
   ```
3. Spusťte pomocí Dockeru:
   ```bash
   docker compose up
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

### Efekty

Efekty používáme pro synchronizaci se systémy mimo React.

<!-- tady ukazka kodu, asi aktualizace document title -->

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

<!-- jeste nejake komponenty, asi scrollview  -->

## Styly

## Navigace
