const Config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'wip',
      ],
    ],
    'no-unicode-emoji': [2, 'always'],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          build: {
            description: '📦️ Changes to the build system (vite, webpack) or dependencies (npm).',
            title: 'Build',
            emoji: '',
          },
          chore: {
            description:
              "🔧 Other changes that don't modify src or test files. (Ex: .gitignore, lint config)",
            title: 'Chores',
            emoji: '',
          },
          ci: {
            description: '👷 Changes to CI configuration files and scripts.',
            title: 'Continuous Integration',
            emoji: '👷',
          },
          docs: {
            description: '📝 Documentation, README.md, Code Comments.',
            title: 'Documentation',
            emoji: '📝',
          },
          feat: {
            description: '✨ A new feature.',
            title: 'Feature',
            emoji: '✨',
          },
          fix: {
            description: '🐛 A bug fix.',
            title: 'Bug Fix',
            emoji: '🐛',
          },
          perf: {
            description: '⚡️ A code change that improves performance/memory usage.',
            title: 'Performance Improvements',
            emoji: '⚡️',
          },
          refactor: {
            description:
              '♻️  Rewrites code without feature, performance or bug changes. Architectural improvements.',
            title: 'Refactoring',
            emoji: '♻️',
          },
          revert: {
            description: '⏪️ Reverts a previous commit.',
            title: 'Revert',
            emoji: '⏪️',
          },
          style: {
            description: '🎨 Improve structure/format of the code. Apply linting rules.',
            title: 'Code Style',
            emoji: '🎨',
          },
          test: {
            description: '✅ Adding missing tests or correcting existing tests.',
            title: 'Tests',
            emoji: '✅',
          },
          wip: {
            description: '💩 Unfinished changes that need to be committed. Use sparsely!',
            title: 'Work In Progress',
            emoji: '💩',
          },
        },
      },
      scope: {
        description: 'What is the scope of this change (e.g. component or file name)',
      },
    },
  },
  plugins: [
    {
      rules: {
        'no-unicode-emoji': ({ raw }) => {
          // check if commit message contains unicode emoji
          const emojiRegEx =
            /[\u2700-\u27BF]|(?:\uD83C[\uDDE6-\uDDFF]){2}|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u0023-\u0039]\uFE0F?\u20E3|\u3299|\u3297|\u303D|\u3030|\u24C2|\uD83C[\uDD70\uDD71]|\uD83C[\uDD7E\uDD7F]|\uD83C\uDD8E|\uD83C[\uDD91-\uDD9A]|\uD83C[\uDDE6-\uDDFF]|\uD83C[\uDE01\uDE02]|\uD83C\uDE1A|\uD83C\uDE2F|\uD83C[\uDE32-\uDE3A]|\uD83C[\uDE50\uDE51]|\u203C|\u2049|[\u25AA\u25AB]|\u25B6|\u25C0|[\u25FB-\u25FE]|\u00A9|\u00AE|\u2122|\u2139|\uD83C\uDC04|[\u2600-\u26FF]|\u2B05|\u2B06|\u2B07|\u2B1B|\u2B1C|\u2B50|\u2B55|\u231A|\u231B|\u2328|\u23CF|[\u23E9-\u23F3]|[\u23F8-\u23FA]|\uD83C\uDCCF|\u2934|\u2935|[\u2190-\u21FF]/

          return [
            !emojiRegEx.test(raw),
            `Use the colon notation instead of unicode emojis. Ex: ':poop:' instead of '💩'`,
          ]
        },
      },
    },
  ],
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = Config
