import appRootPath from 'app-root-path';
import fs from 'fs';
import path from 'path';
export interface I18nCodegenConfig {
  translationsFilePath: string;
  outputFilePath: string;
}

/**
 * Package's root dir
 */
export const rootProjectDir = appRootPath.path;

export const getConfigFilePath = () => {
  // Prefer i18nrc.cjs: consumers with "type": "module" need the .cjs extension.
  const cjsPath = path.join(rootProjectDir, 'i18nrc.cjs');
  if (fs.existsSync(cjsPath)) {
    return cjsPath;
  }
  return path.join(rootProjectDir, 'i18nrc.js');
};

export const loadConfigFile = (): I18nCodegenConfig => {
  const configPath = getConfigFilePath();

  try {
    delete require.cache[configPath];
    const config = require(configPath);

    if (!config) {
      throw new Error('i18n-code-generator: config file not found');
    }

    return config;
  } catch (err) {
    throw err;
  }
};
