import settings from './settings.json';

export default function useConfig() {
  const getLocalConfig = configKey => {
    if (configKey && typeof configKey === 'string') {
      if (settings && typeof settings[configKey] !== 'undefined') {
        return settings[configKey];
      } else {
        return null;
      }
    }
    return settings;
  };

  return { getLocalConfig };
}
