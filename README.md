# i18n-codegen

[![Build](https://github.com/lnmunhoz/i18n-codegen/workflows/CI/badge.svg)](https://github.com/lnmunhoz/i18n-codegen/actions?query=workflow%3ACI+branch%3Amaster) [![npm version](https://badge.fury.io/js/i18n-codegen.svg)](https://www.npmjs.com/package/i18n-codegen)

This is a CLI that helps to make type safe translations in your typescript projects.
Keep in mind this project is experimental, It assumes that you have a very specific structure for your translations.

## Setup

### Install

```
yarn add -D i18n-codegen
```

### Assumptions

In this early stage, this package assume you have your translations in a JSON file using nested format.

#### Example input `en_US.json`:

```json
{
  "home": {
    "title": "Title",
    "subtitle": "Subtitle"
  },
  "info": {
    "title": "More info",
    "features": {
      "first": "First Feature",
      "second": "Second Feature"
    }
  }
}
```

#### Generates:

```ts
export const I18nKeys = [
  'home.title',
  'home.subtitle',
  'info.title',
  'info.features.first',
  'info.features.second',
] as const;

export type I18nKey = typeof I18nKeys[number];
```

### Create a config file `i18nrc.cjs` in the root of the project.

```js
module.exports = {
  // Your main translation file
  translationsFilePath: './src/locales/en_US.json',
  // Output of the generated types
  outputFilePath: './src/generated/i18n-types.ts',
};
```

### Add a script to your package.json

The `--watch` mode is optional

```json
{
  "scripts": {
    "i18n": "i18n-codegen generate --watch"
  }
}
```

### Usage with `react-i18next`

Create a wrapper on top of `useTranslation` hook.

```ts
import {
  UseTranslationOptions,
  useTranslation as __useTranslation,
} from 'react-i18next';
import { I18nKey } from './generated/i18n-types';

export function useTranslation() {
  const { t: __t, i18n } = __useTranslation();
  const t = (key: I18nKey, options?: UseTranslationOptions) =>
    __t(key, options);

  return { t, i18n };
}
```

### Done!

Now you can enjoy type safety in your translation keys!

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from "./i18n/useTranslation";

export const MyComponent = () => {
  const { t } = useTranslation()

  return (
    <View>
      <Text>{t('home.title')}</Title>
    </View>
  )
}
```

## Roadmap

- ✅ Setup releases
- [ ] Lint file after generate with prettier settings
- [ ] Init command
- [ ] Validation of config file
- [ ] Generate react hook automatically

## Local Development

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
