# Tabletop Online 2D
Belegarbeit _Programmierung von Benutzeroberflächen (PBO)_ an der HTW Dresden im Wintersemester 2021/22

> **Tabletop Online 2D** ist eine Web-App mit der man Karten- (WIP) und Brettspiele zusammen mit Freunden in einer simulierten Sandbox spielen kann. Du kannst zwischen Presets wählen oder deine eigenen Spiel-Assets hochladen und komplett nach eigenen Regeln spielen. Lade deine Freunde zu deinem geteilten Raum ein und das Spiel kann beginnen!

**Node.js version:** `16`

**Commit style:** [Conventional Commits](https://github.com/DrJume/tabletop-online/blob/main/docs/Conventional%20Commits.md)

## Documentation
- [Design](https://github.com/DrJume/tabletop-online/blob/dev/docs/Design.md)
- [Game Assets](https://github.com/DrJume/tabletop-online/blob/dev/docs/Game%20Assets.md)
- [Dev Log](https://github.com/DrJume/tabletop-online/blob/dev/docs/Dev%20Log.md)
- [Project Structure](https://github.com/DrJume/tabletop-online/blob/dev/docs/Project%20Structure.md)
- [Current Todos](https://github.com/DrJume/tabletop-online/blob/dev/TODO.todo)
- [Mockups](https://www.figma.com/file/QvCJYXvBnFTH5O0j9478dD/TabletopOnline?node-id=5%3A7)

## Project Setup

> Install pnpm <br>
> - https://pnpm.io/installation (Recommended) <br>
> - `npm install -g pnpm`

```sh
pnpm install
```

### Lint and fix files

```sh
pnpm lint
```
### Compile and Hot-Reload for Development

**Frontend:**
```sh
pnpm dev
```

**Backend:**
```sh
cd backend/
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```

### Run in production

```sh
cd backend/
pnpm dev
```

## Tool Installation

**`node`:**

- run `pnpm env use -g lts` to get the latest `Node.js` LTS version and `npm`
