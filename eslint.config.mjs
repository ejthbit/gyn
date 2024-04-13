import react from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'

export default [
    {
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 2020,
                sourceType: 'module',
                allowImportExportEverywhere: true,
            },
        },
        plugins: {
            react,
            eslintPluginPrettierRecommended,
            reactHooks,
            importPlugin,
        },
        rules: {
            'no-unused-vars': 'error',
            'react/no-unused-prop-types': 'warn',
            'no-console': 'warn',
            'react/jsx-filename-extension': 'off',
            'react/no-array-index-key': 'warn',
            'react/jsx-indent': 'off',
            'react/prop-types': 'warn',
            indent: 'off',
            semi: 'off',
            'comma-dangle': 'off',
            'importPlugin/named': 'off',
            'react/jsx-indent-props': 'off',
            'importPlugin/no-unresolved': 'warn',
            'prefer-default-export': 'off',
            'react/no-children-prop': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'],
                },
            ],
        },
        settings: {
            'import/resolver': {
                node: {
                    paths: ['.', 'src'],
                    extensions: ['.js', '.jsx'],
                },
                alias: {
                    map: [
                        ['@utilities', './src/utils'],
                        ['@components', './src/components'],
                        ['@assets', './src/assets'],
                    ],
                    extensions: ['.js', '.jsx'],
                },
            },
        },
    },
]
