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

O komponentách můžeme přemýšlet jako o funkcích.

<!-- zde asi tabulka základních komponent -->

### Definice

Můžeme definovat vlastní komponenty:

```tsx
import { Text, TouchableOpacity } from 'react-native';

const MyButton = ({ label }) => {
    return (
        <TouchableOpacity>
          <Text>{label}</Text>
        </TouchableOpacity>
    );
};
```

Tyto komponenty potom lze použít v kódu:

```tsx
<MyButton label="Ahoj světe" />
```

### Properties

Všimněme si, že naše komponenta přijímá argumenty (*props*). Ty můžeme rozšířit:

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

### States

Komponenty mohou mít stavy (*states*), které slouží jako jejich interní paměť.

```tsx
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

const MyButton = ({ label }) => {
    const [clickCount, setClickCount] = useState(0);

    const handlePress = () => {
        setClickCount(clickCount => clickCount + 1);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
          <Text>Kliknul jsi mě {label}x.</Text>
        </TouchableOpacity>
    );
};
```

## Styly

## Navigace
