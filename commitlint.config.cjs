module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // subject rules
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],

    // header rules
    'header-max-length': [2, 'always', 72],

    // type rules (allowed commit types)
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'refactor', 'chore', 'docs', 'test', 'perf', 'ci', 'build', 'style']
    ],
  },
}
