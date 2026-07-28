import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'
import { BaseButton } from '../atoms/Buttons/BaseButton'

interface Props {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error!, this.handleReset)
      }

      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-75 p-6 bg-slate-900 border border-slate-800 rounded-xl text-center my-6">
          <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 rounded-full mb-4 text-xl font-bold">
            !
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-slate-400 max-w-md mb-4">
            {this.state.error?.message ||
              'An unexpected error occurred while loading this section.'}
          </p>
          <BaseButton
            type="button"
            onClick={this.handleReset}
            label="Try again"
          />
        </div>
      )
    }

    return this.props.children
  }
}
