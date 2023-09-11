module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@packages": "./src/packages",
          "@screens": "./src/screens",
        },
      },
    ],
  ],
};
