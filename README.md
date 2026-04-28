## 🏪 Bevezetés
- Car Cards egy autós kártyagyűjtő webalkalmazás. A játékosok packokat nyithatnak, autókat gyűjthetnek, és cserélhetnek egymással a beépített piactéren. A felhasználók ajánlatokat küldhetnek, amelyeket elfogadhatnak vagy elutasíthatnak. Az értesítések segítenek nyomon követni a tranzakciókat. A cél a legnagyobb és legértékesebb gyűjtemény összeállítása.

## 📁 Projekt szerkezet

```markdown
├── dist/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── HamburgerMenu.jsx
│   │   ├── IncomingOfferCard.jsx
│   │   ├── ListingCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MainLayout.jsx
│   │   ├── MainMenuButton.jsx
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationBell.jsx
│   │   ├── OfferCard.jsx
│   │   ├── SettingsModal.jsx
│   │   └── TextBox.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MainPage.jsx
│   │   ├── MarketPage.jsx
│   │   ├── MyCardsPage.jsx
│   │   ├── OpenpacksPage.jsx
│   │   └── RegistrationPage.jsx
│   ├── styles/
│   │   └── common.css
│   ├── api.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## ⬇️ Telepítés
```markdown
git clone https://github.com/poszasz/frontend_vizsga.git
```
 
#### Jelenleg elérhető netlify-on
| 🚀 Netlify | Netlify Deployed Page | [Megtekintés](https://mycarcards.netlify.app/) |

| Felhasználó teszt | Felhasználó : teszt@gmail.com | Jelszó: teszt |

## Dokumentáció
| 🎞️ Figma | Dizájnt készítő alkalmazás |[Megtekintés](https://www.figma.com/design/gprgQnoreBm3k01eIOZELb/Car_cards?t=Azo15AE7nCumdZ2U-1) |

### HomePage.jsx

![image](https://snipboard.io/WF9A2y.jpg)
![image](https://snipboard.io/7xMnkT.jpg)
![image](https://snipboard.io/KiQGUN.jpg)

### MainPage.jsx

- Itt látható a Market, Open Packs és a My Cards gombok

![image](https://snipboard.io/2gSmnK.jpg)


### MarketPage.jsx

- Itt érjük el a market felületet, ahol te és más felhasználók tudnak kártyákat cserélni
- Tudunk szűrni a összes listingre, a sajátunkra és másokéra
- Tudunk postot létrehozni, ahol más felhasználóktudnak ajánlatot tenni a feltett kártyára
![image](https://snipboard.io/jtJP1O.jpg)


### OpenPacksPage.jsx

- Itt lehetősé nyílik új kárytákat nyitni
- Nyitás utána, megjelenik az előző nyitott kártya

![image](https://snipboard.io/evWFMZ.jpg)![image](https://snipboard.io/LawKg2.jpg)

### MyCardsPage.jsx

- Itt megjelennek a már begyűjtött kártyákat
- A kártyákra kattintva, megjelennek az autónak a részletesebb leírása

![image](https://snipboard.io/op8vyq.jpg)![image](https://snipboard.io/8hG9Cl.jpg)

### SettingsModal.jsx

- Itt lehetősé nyílik a felhasználó adatainak módosítására (felhasználónév, email cím, jelszó)
- Fiók törlésének lehetősége

![image](https://snipboard.io/10oBVr.jpg)![image](https://snipboard.io/pkvIzl.jpg) ![image](https://snipboard.io/uzZl6N.jpg)


## 📇 Fejlesztési lehetőségek

```markdown
- Kártya bázis bővítése
- Felhasználó barátabb felület.
- Több fajta kártya ritkaság
- Több kereskedési lehetőség
- Látványosabb kártya nyitás
- Szebb design 
```
