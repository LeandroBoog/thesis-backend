import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: true,
    origin: /ias\.tu-bs\.de$/,
  },
  swagger: {
    enabled: true,
    title: 'Nestjs FTW',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  security: {
    expiresIn: '30m',
    bcryptSaltOrRound: 10,
  },
  auth: {
    jwtToken: process.env.TOKEN || 'your-token',
  },
};

export default (): Config => config;
