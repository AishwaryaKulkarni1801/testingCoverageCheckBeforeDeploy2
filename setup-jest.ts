import 'jest-preset-angular/setup-jest';

// Global test setup and configuration
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance']
    };
  }
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  }
});

// Mock for Canvas API
HTMLCanvasElement.prototype.getContext = jest.fn();

// Mock for IntersectionObserver (often used by Angular Material)
(global as any).IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = '';
  thresholds = [];
};

// Mock for ResizeObserver (often used by Angular Material)
(global as any).ResizeObserver = class ResizeObserver {
  constructor(callback: any) {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Custom Jest matchers can be added here
// Example:
// expect.extend({
//   customMatcher(received, expected) {
//     // Your custom matcher logic
//   }
// });