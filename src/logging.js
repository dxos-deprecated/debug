//
// Copyright 2020 Wireline, Inc.
//

import debug from 'debug';

debug.log = console.log.bind(console);

export const log = (...args) => {
  console.log(args.map(arg => arg.toString()).join(' '));
};

export const logError = str => {
  if (typeof str.message === 'string') {
    str = `Error: ${str.message.replace('\n', '')}`;
  } else if (str instanceof Error) {
    str = String(str);
  } else if (typeof str === 'object') {
    str = JSON.stringify(str);
  } else if (typeof str === 'string') {
    str = str.replace('\n', '');
  }

  console.error(`\n${str}`);
};

/**
 * Creates debug and error logs.
 *
 * @param {string} name
 * @return {{ log: debug, error: debug }}
 */
// TODO(burdon): Rename.
export function logs(name) {
  const log = debug(name);
  log.log = console.log.bind(console);

  const error = debug(`${name}:error`);
  error.log = console.error.bind(console);

  return {
    log,

    error: (err, ...rest) => {
      if (err instanceof Error) {
        const { name, message } = err;
        error(`${name}: ${message}`);

        // TODO(burdon): source-map support?
        // https://www.npmjs.com/package/stacktracey
        // https://www.npmjs.com/package/source-map-support
        console.error(err);
      } else {
        error(err, ...rest);
      }
    }
  };
}
