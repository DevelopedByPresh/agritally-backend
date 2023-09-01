const { addColors, createLogger, format, transports } = require('winston');

function formatMeta(metadata) {
  if (!metadata) return '';
  return ` ~ ${JSON.stringify(metadata, null, 2)}`;
}

class Logger {
  constructor() {
    this.colors = {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'blue',
      debug: 'magenta',
    };

    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    };

    this.otherTransport = [
      new transports.File({
        filename: 'logs/dev/combined.log',
        silent: false, // Set it to false for development
      }),

      new transports.Console({
        silent: false, // Set it to false for development
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.errors({ stack: true }),
          format.splat(),
          format.printf(({ timestamp, level, message, meta }) =>
            `${timestamp} [${level}]: ${message} ${formatMeta(meta)}`
          ),
        ),
      }),
    ];

    this.prodTransport = [
      new transports.File({
        filename: 'logs/prod/error.log',
        level: 'error',
        format: format.combine(
          format.align(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf(({ level, timestamp, message, meta }) =>
            `${timestamp} [${level}]: ${message} ${formatMeta(meta)}`
          ),
        ),
      }),
    ];

    this.logger = createLogger({
      level: 'debug', // Adjust the level as needed
      levels: this.levels,
      transports: this.otherTransport, // Use otherTransport for both development and production
    });

    addColors(this.colors);
  }

  error(message, meta) {
    this.logger.error(message, { meta });
  }

  warn(message, meta) {
    this.logger.warn(message, { meta });
  }

  info(message, meta) {
    this.logger.info(message, { meta });
  }

  http(message, meta) {
    this.logger.http(message, { meta });
  }

  debug(message, meta) {
    this.logger.debug(message, { meta });
  }
}

const logger = new Logger();

module.exports = logger;
