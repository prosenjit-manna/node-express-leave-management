const Sentry = require('@sentry/node');
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { Express } from 'express';

export function sentryInit({ app }: { app: Express }) {
  Sentry.init({
    dsn: 'https://e22fe7bb261bf9b6633e2abc87b06cc8@o126649.ingest.us.sentry.io/4507033077088256',
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({ app }),
      nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });

  // The request handler must be the first middleware on the app
  app.use(Sentry.Handlers.requestHandler());

  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());

  // The error handler must be registered before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
}

export function captureError(e: any) {
  Sentry.captureException(e);
}
