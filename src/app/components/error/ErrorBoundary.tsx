import React, { type ReactNode, type ErrorInfo } from 'react';
import ErrorFallback from './ErrorFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onError?: (error: Error, info: ErrorInfo) => void;
  isFullScreen?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
