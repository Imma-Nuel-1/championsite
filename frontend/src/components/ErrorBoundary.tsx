// 🗑️ **REVIEW COMMENT**: ErrorBoundary component is NOT imported or used anywhere in the codebase.
// ❌ **UNUSED COMPONENT** - This file is completely unused.
//
// RECOMMENDATIONS:
// 1. Either delete this file completely, OR
// 2. Integrate it into your App.tsx to catch React errors:
//    Example: Wrap your Routes in <ErrorBoundary> component
// 3. Consider using it in main.tsx around the entire app
//
// If keeping it, you should wrap your main app component like:
// <ErrorBoundary><App /></ErrorBoundary>

import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20 dark:from-gray-900 dark:via-gray-800 dark:to-primary-900/20 flex items-center justify-center relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative text-center max-w-md mx-auto px-6">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                <FaExclamationTriangle className="text-white text-3xl" />
              </div>

              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Oops! Something went wrong
              </h1>

              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We're sorry for the inconvenience. Something unexpected
                happened, but don't worry - we're on it!
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={this.handleRefresh}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold group"
              >
                <FaRedo className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full btn-secondary btn-lg group"
              >
                <FaHome className="mr-2 group-hover:scale-110 transition-transform" />
                Go Home
              </button>
            </div>

            {this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  Show Error Details
                </summary>
                <pre className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-red-600 dark:text-red-400 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional component version for simple error states
interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
}

export const ErrorMessage = ({
  title = "Something went wrong",
  message = "We're having trouble loading this content.",
  onRetry,
  onGoHome,
}: ErrorMessageProps) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
        <FaExclamationTriangle className="text-white text-xl" />
      </div>

      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        {message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold group"
          >
            <FaRedo className="mr-2 group-hover:rotate-180 transition-transform duration-300" />
            Try Again
          </button>
        )}

        {onGoHome && (
          <button onClick={onGoHome} className="btn-secondary group">
            <FaHome className="mr-2 group-hover:scale-110 transition-transform" />
            Go Home
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundary;
