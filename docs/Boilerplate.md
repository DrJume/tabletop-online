# Boilerplate Vue.js (vue-cli)

## First steps

### Install vue-cli

> Check for new version!

```bash
pnpm install -g @vue/cli
```

### Initialize project

```bash
vue create --bare <project-name>
```

*(creates a folder)*


1. **Preset:** Manually select features
2. **Features:** (minimal requirements)

   ✓ Choose Vue version *(needed for Vue 3)*

   ✓ Babel

   ✓ CSS Pre-processors

   ✓ Linter / Formatter
3. **Vue version:** 3.x
4. **CSS pre-processor:** Sass/SCSS ==(with dart-sass)==
5. **Linter / Formatter:** ESLint + Prettier
6. **Lint features:**

   ✓ Lint on save

   (✓ Lint and fix on commit) does not currently work with pnpm
7. **Placing config:** In dedicated config files

### Configure

1. Create `.prettierrc.yaml`:

   ```yaml
   semi: false
   ```


---

## Editor

> Visual Studio Code

### **Extensions**

* Prettier: **disabled**
* Vetur: **disabled**
* Volar
* ESLint

  → activate lint on save


:::info
Sometimes ESLint needs a restart.

**⌘⇧P / Ctrl+Shift+P:** Reload Window

:::

## Browser Extensions

* [Vue.js devtools (beta)](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en)
  * [Activate custom console formatter](https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html)


