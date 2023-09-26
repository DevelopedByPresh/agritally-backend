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

    this.transports = [
      new transports.File({
        filename: 'logs/dev/combined.log',
      }),

      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.errors({ stack: true }),
          format.splat(),
          format.printf(
            ({ timestamp, level, message, meta }) =>
              `${timestamp} [${level}]: ${message} ${formatMeta(meta)}`,
          ),
        ),
      }),
    ];

    this.logger = createLogger({
      level: 'debug', // You can set your desired default log level here
      levels: this.levels,
      transports: this.transports,
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

module.exports = {
  logger: new Logger(),
};
