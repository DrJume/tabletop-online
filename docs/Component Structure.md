# Component Structure

Die Vue-Komponenten werden unterteilt nach Views (InGame oder StartScreen). Komponenten innerhalb des Spiels werden nochmals unterteilt in direkte Spielkomponenten (z.B. Spielfiguren, Spieltisch, Karten, etc.) und Komponenten der Spielumgebung.

```tree
├── src
│   ├── components
│   │   ├── InGame // Komponenten der InGame-View
│   │   │   ├── PlayerBar // Anzeige aktueller Spieler im Raum
│   │   │   │   ├── index.vue
│   │   │   │   └── PlayerAvatar.vue
│   │   │   ├── Sidebar // Spielmenü
│   │   │   │   ├── PlayerList
│   │   │   │   │   ├── index.vue
│   │   │   │   │   └── PlayerItem.vue
│   │   │   │   ├── index.vue
│   │   │   │   └── SidebarItem.vue
│   │   │   └── Tabletop // Spielfläche
│   │   │       ├── GameComponents // Spielobjekte
│   │   │       │   ├── Dice.vue
│   │   │       │   ├── PlayingBoard.vue
│   │   │       │   ├── PlayingCard.vue
│   │   │       │   └── PlayingObject.vue
│   │   │       ├── ContextMenu.vue
│   │   │       ├── FloatingWindow.vue
│   │   │       ├── Hand.vue // Spielhand
│   │   │       └── index.vue
│   │   ├── Manual // Handbuch
│   │   │   └── index.vue
│   │   ├── StartScreen // Komponenten der StartScreen-View
│   │   │   ├── Menu
│   │   │   │   ├── index.vue
│   │   │   │   ├── MenuButton.vue
│   │   │   │   ├── MenuCreateRoom.vue
│   │   │   │   ├── MenuJoinRoom.vue
│   │   │   │   └── MenuUploadRoom.vue
│   │   │   └── Logo.vue
│   │   └── UI // allgemeine UI-Elemente
│   │       ├── TabletopButton.vue
│   │       ├── TabletopInput.vue
│   │       └── TabletopModal.vue
│   ├── views
│   │   ├── InGame.vue
│   │   └── StartScreen.vue
│   └── App.vue
```
