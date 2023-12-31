import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import awsLambdaFastify, { PromiseHandler } from '@fastify/aws-lambda';
import { Context, APIGatewayProxyEvent } from 'aws-lambda';
import { Logger } from '@nestjs/common';

let cachedNestApp;

async function bootstrap(): Promise<NestFastifyApplication> {
  // Create the app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // Use an env var to set the logger to nest or console
    new FastifyAdapter({ logger: (process.env.LOGGER || '0') == '1' }),
    {
      logger: !process.env.AWS_EXECUTION_ENV ? new Logger() : console,
    },
  );

  // Enable cors
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    exposedHeaders: '*',
    credentials: false,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  // Set the prefix as necessary
  app.setGlobalPrefix(process.env.API_PREFIX);

  await app.init();

  return app;
}

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<PromiseHandler> => {
  // If there's no cached app
  if (!cachedNestApp) {
    // Bootstrap
    const nestApp: NestFastifyApplication = await bootstrap();
    // Create an AWS Lambda Fastify cached app from the Nest app
    cachedNestApp = awsLambdaFastify(nestApp.getHttpAdapter().getHttpServer(), {
      decorateRequest: true,
    });
  }

  return cachedNestApp(event, context);
};
