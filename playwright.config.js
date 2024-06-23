module.exports = {
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  testDir: './tests',
  use: {
    browserName: 'chromium',
    baseURL: 'http://www.automationpractice.pl/index.php',
    launchOptions: {
      headless: false,
      args: ['--start-fullscreen']
    },
    viewport: null,
  },
  timeout: 6000,
};
