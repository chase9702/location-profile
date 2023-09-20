module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/proposal-class-properties', // handle class property
        '@babel/proposal-object-rest-spread', // handle ... variable spread
        '@babel/transform-runtime',
        "@babel/plugin-syntax-dynamic-import",
        ['import', {'libraryName': 'antd', 'libraryDirectory': 'es', 'style': true}]
    ]
};
