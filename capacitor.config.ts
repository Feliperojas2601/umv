import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'umv',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }, 
  android: {
    allowMixedContent: true
  }
};

export default config;
