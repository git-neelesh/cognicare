import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.templates',
  appName: 'echoes',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
