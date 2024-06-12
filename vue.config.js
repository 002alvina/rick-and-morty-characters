module.exports = {
    transpileDependencies: [
      // Вставьте сюда зависимости, которые нужно транспилировать, если есть
    ],
    publicPath: process.env.NODE_ENV === 'production'
      ? '/rick-and-morty-characters/'
      : '/'
  }
  