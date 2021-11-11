# Conventional Commits

## Message

```
<type>[(<scope>)]: [<gitmoji>] <description>

[<Body>]

[<Footer>]
```

> use the imperative, present tense: **"change"** not *"changed"* nor *"changes"*


### Type

| Type     | Explanation                                                                                     | Gitmojis |
| -------- | ----------------------------------------------------------------------------------------------- | -------- |
| build    | Changes to the **build system** (vite, webpack) or **dependencies** (npm).                      | ⬆️➕       |
| chore    | **Other** changes that don't modify src or test files. <br> (e.g. .gitignore, lint config)      | 🔧🔨🙈🔖🍱    |
| ci       | Changes to CI configuration files and scripts.                                                  | 💚👷       |
| docs     | Documentation, README.md, Code Comments.                                                        | 📝💡       |
| feat     | A new feature.                                                                                  | ✨💥       |
| fix      | A bug fix.                                                                                      | 🐛🚑️🩹🔒️     |
| perf     | Code change that improves performance/memory usage.                                             | ⚡️        |
| refactor | **Rewrite** code without feature, performance or bug changes. \n Architectural improvements.    | ♻️🏗️⚰️✏️🚚    |
| revert   | Reverts a previous commit.                                                                      | ⏪️        |
| style    | Improve structure/format **of the code**. Apply linting rules. <br> **`No`**`CSS / UI changes.` | 🎨        |
| test     | Adding missing tests or correcting existing tests.                                              | ✅🧪       |
| wip      | Unfinished changes that need to be committed. Use sparsely!                                     | 🚧💩       |


**Revert**

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.


The content of the commit message body should contain:

* information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`
* a clear description of the reason for reverting the commit message


### Scope (optional)

The scope could be anything specifying the place or sub-type of the commit change.


**For example:**

* feat(router): …
* refactor(types): …


### Gitmoji (lol)

1. Search a fitting gitmoji on [https://gitmoji.dev](https://gitmoji.dev/)
2. Paste as text. (e.g. `:sparkles:`)


### Description

* don't capitalize the first letter
* no dot (.) at the end


### Body (optional)

Explain the motivation for the change in the commit message body.

This commit message should explain *why* you are making the change. You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.


### Footer (optional)

The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub issues, Jira tickets, and other PRs that this commit closes or is related to.


For example:

```
BREAKING CHANGE: <breaking change summary>

<breaking change description + migration instructions>


Fixes #<issue number>
```

<hr>

## VSCode Extension

`vivaxy.vscode-conventional-commits`

→ <https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits>

## Inspiration

**Examples**

* <https://github.com/vuejs/vue-next/commits/master>


**Sources**

* <https://github.com/posva/pinia/blob/v2/.github/commit-convention.md>
* <https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit>


