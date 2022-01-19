export const log = {
  options: {
    debug: false,
  },
  ...console,

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(...args: any[]) {
    if (!this.options.debug) return
    console.debug(...args)
  },
}
