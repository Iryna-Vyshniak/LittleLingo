import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'little.lingo',
  appName: 'LittleLingo',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  },
  server: { hostname: "littlelingo-api.onrender.com" }
};

export default config;
