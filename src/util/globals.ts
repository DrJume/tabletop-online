export const backendURL = `${location.protocol === 'http:' ? 'ws' : 'wss'}://${location.hostname}:${
  ['localhost', '127.0.0.1'].includes(location.hostname) ? '8080' : location.port
}`
