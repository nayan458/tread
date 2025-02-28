module.exports = {
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@api', './src/api'],
            ['@components', './src/components'],
            ['@services', './src/services'],
            ['@api/*', './src/api/*'],
            ['@assets/*', './src/assets/*'],
            ['@components/*', './src/components/*'],
            ['@context/*', './src/context/*'],
            ['@db/*', './src/db/*'],
            ['@features/*', './src/features/*'],
            ['@hooks/*', './src/hooks/*'],
            ['@layouts/*', './src/layouts/*'],
            ['@routes/*', './src/routes/*'],
            ['@services/*', './src/services/*'],
            ['@store/*', './src/store/*'],
            ['@utils/*', './src/utils/*'],
            ['@views/*', './src/views/*']
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  };
  