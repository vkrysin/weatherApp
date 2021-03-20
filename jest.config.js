module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
    '!src/main.js',
    '!src/router/index.js'
  ],
  coverageReporters: [
    'lcov',
    'html',
    'text-summary'
  ]
}
