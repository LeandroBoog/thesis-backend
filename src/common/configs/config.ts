import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  cors: {
    enabled: false,
    origin: 'http://localhost:8080',
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
  emailConfirmation: {
    expiresIn: '24h',
  },
};

export default (): Config => config;
