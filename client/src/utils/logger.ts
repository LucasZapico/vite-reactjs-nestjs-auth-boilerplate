import chalk from 'chalk';
import path from 'path';

// const { NODE_ENV } = process.env
const NODE_ENV = import.meta.env.MODE

const { group, groupEnd, log, error, warn } = console;

// dialog log cli colors
const errorStyle = chalk.bold.red;
const warnStyle = chalk.bold.hex('#FFA500');
const infoStyle = chalk.bold.blue;
const successStyle = chalk.bold.green;

// custom cli logs with colors
export const logInfo = (...args: any[]) => {
  if (NODE_ENV !== 'production') {
    group(infoStyle('INFO:'));
    args.forEach((arg) => {
      log(arg);
    });

    groupEnd();
  }
};

export const logWarn = (...args: any[]) => {
  if (NODE_ENV !== 'production') {
    group(warnStyle('WARNING:'));
    args.forEach((arg) => {
      warn(arg);
    });

    groupEnd();
  }
};

export const logError = (...args: any[]) => {
  if (NODE_ENV !== 'production') {
    group(errorStyle('ERROR:'));
    args.forEach((arg) => {
      error(arg);
    });

    groupEnd();
  }
};

export const logSuccess = (...args: any[]) => {
  if (NODE_ENV !== 'production') {
    group(successStyle('SUCCESS:'));
    args.forEach((arg) => {
      log(arg);
    });
    groupEnd();
  }
};
