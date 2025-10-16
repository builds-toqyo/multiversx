import { Buffer } from 'buffer'

// Browser polyfills for Node.js modules
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window.global || window
  // @ts-ignore
  window.Buffer = window.Buffer || Buffer
  // @ts-ignore
  window.process = window.process || {
    env: {},
    version: 'v16.0.0',
    versions: { node: '16.0.0' },
    nextTick: (fn: Function, ...args: any[]) => setTimeout(() => fn(...args), 0),
    browser: true,
    cwd: () => '/',
    platform: 'browser',
    argv: [],
    binding: () => {},
    umask: () => 0,
  }
}

export {}
