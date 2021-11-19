# tabletop-online
Belegarbeit _Programmierung von Benutzeroberflächen (PBO)_ an der HTW Dresden im Wintersemester 2021/22

> **Tabletop Online 2D** is a simulator web app for playing board and card games together with your friends. Invite them to a shared room and start playing! <br>
> You can use the presets or upload your own game assets and play by your own rules - because it's a sandbox! <br>
> Connect with your friends via voice or video chat or even play it next to each other.

## Development

**Environment:**

- Node version: 16
  - Install pnpm via shell script: https://pnpm.io/installation
  - Run `pnpm env use -g lts` to get the latest Node LTS version and npm


- Package Manager helper: https://github.com/antfu/ni
- [Conventional Commits](https://github.com/DrJume/tabletop-online/blob/main/docs/Conventional%20Commits.md)

### Project setup
```
pnpm install
```

#### Compiles and hot-reloads for development
```
pnpm run serve
```

#### Compiles and minifies for production
```
pnpm run build
```

#### Lints and fixes files
```
pnpm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
