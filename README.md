# Mobile

## Jak spustit

Pomocí dockeru:
```bash
docker compose up --build
```

## Úvod

## Expo Go

## Komponenty

## Styly

## Expo Router

Expo Router je knihovna pro navigaci v aplikacích vytvořených s Expo a React Native.

Umožňuje implementovat souborově orientovanou navigaci (file-based routing), což znamená, že struktura složek v projektu odpovídá struktuře navigace v aplikaci.

Je to novější přístup k navigaci v Expo/React Native aplikacích, který usnadňuje organizaci a strukturování aplikace.

Dynamic routing: Expo Router podporuje dynamické routování, což umožňuje například vytváření dynamických URL pro jednotlivé obrazovky.

Nested layouts: Umožňuje definovat více vrstev rozhraní pro různé sekce aplikace, např. Root Layout, App Layout, Tab Layout, atd.

Link 

Navigace pomocí odkazu
Link je komponenta, která umožňuje navigovat mezi stránkami v aplikaci pomocí odkazu, podobně jako v běžném webovém vývoji.
Funguje stejně jako <a> tag v HTML

useRouter

Navigace probíhá na základě nějaké akce v kódu, například při kliknutí na tlačítko, odeslání formuláře nebo jiné interakci uživatele.

Metody pro navigaci pomocí useRouter

router.push('/profile');

Tato metoda naviguje uživatele na danou cestu a přidává ji do historie, což znamená, že se můžeš vrátit zpět na předchozí stránku (např. kliknutím na tlačítko zpět).

router.replace('/profile');

Místo toho, aby se stránka přidala do historie, replace nahrazuje aktuální stránku. Tato metoda se hodí, pokud nechceš, aby uživatel mohl zpětně přejít na předchozí stránku (např. po přihlášení, aby se nezobrazovala přihlašovací obrazovka).

router.back();

Tato metoda přesměruje uživatele zpět na předchozí stránku v historii prohlížeče. 

router.reload();

Obnoví aktuální stránku (pokud chceš znovu načíst stránku, např. při nějaké změně stavu, která vyžaduje refresh).