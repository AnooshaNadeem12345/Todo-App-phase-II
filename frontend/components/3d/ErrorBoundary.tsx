'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
          <p className="text-gray-400 mb-4">
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <p className="text-gray-500 text-sm">
            This may be due to WebGL not being supported in your browser or a 3D rendering issue.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;