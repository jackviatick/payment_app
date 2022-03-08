module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          assets: './app/assets',
          navigators: './app/navigators',
          screens: './app/screens',
          constant: './app/constant',
          services: './app/services',
        },
      },
    ],
  ],
};
