// Production-safe logging utility
class Logger {
  static log(...args) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[LOG]', ...args);
    }
  }

  static error(...args) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ERROR]', ...args);
    } else {
      // In production, send errors to monitoring service
      // Example: Send to Sentry, LogRocket, etc.
      this.sendToMonitoring('error', args);
    }
  }

  static warn(...args) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[WARN]', ...args);
    } else {
      this.sendToMonitoring('warn', args);
    }
  }

  static info(...args) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[INFO]', ...args);
    }
  }

  static debug(...args) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[DEBUG]', ...args);
    }
  }

  static sendToMonitoring(level, args) {
    // In a real production app, you would send this to your monitoring service
    // Example implementations:
    
    // Sentry:
    // import * as Sentry from '@sentry/react';
    // Sentry.addBreadcrumb({ message: args.join(' '), level });

    // Custom API:
    // fetch('/api/logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ level, message: args.join(' '), timestamp: new Date().toISOString() })
    // });

    // For now, we'll use a minimal approach
    if (level === 'error') {
      // Still log errors in production for debugging, but in a controlled way
      console.error('Production Error:', args[0]?.message || args.join(' '));
    }
  }
}

export default Logger;
