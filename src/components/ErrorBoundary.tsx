import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorPage } from './ErrorPage';

interface Props {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public handleGuestMode = () => {
    try {
      sessionStorage.setItem('aispace_force_guest', 'true');
    } catch {}
    this.handleReset();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback && this.state.error) {
        return this.props.fallback(this.state.error, this.handleReset);
      }

      return (
        <ErrorPage
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          title="Unexpected Application Error"
          description="A component failed to render or encountered an unhandled exception. Use the recovery options below to restore the application state."
          onRetry={this.handleReset}
          onContinueAsGuest={this.handleGuestMode}
        />
      );
    }

    return this.props.children;
  }
}
