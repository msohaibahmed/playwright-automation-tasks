module.exports = async (config) => {
    console.log('Global teardown: Running after all tests');
  
    // Close the shared browser instance
    await global.__BROWSER__.close();
  };
  