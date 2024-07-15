import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'ionic_ui_templates',
  webDir: 'src',
  plugins: {
    "Camera": {
      "sync": true
    }
  }
};

export default config;
