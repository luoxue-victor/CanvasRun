module.exports = function (api) {
  return {
    'presets': [
      [
        'minify',
        {
          removeConsole: false,
        }
      ],
      [
        '@babel/preset-env',
        {
          targets: {
            chrome: 59,
            edge: 13,
            firefox: 50,
            safari: 8,
          },
          forceAllTransforms: api.env('production'),
        },
      ],
      [
        '@babel/preset-typescript',
        {
          'allExtensions': true
        }
      ]
    ],
    'plugins': [
      '@babel/plugin-transform-typescript', 
      'transform-class-properties', 
      '@babel/proposal-object-rest-spread'
    ]
  }
}