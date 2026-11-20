/* eslint-disable no-console */
import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Replace with an error-monitoring service in production.
    console.error('Rendering error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section role="alert">
          <h2>Something went wrong</h2>
          <p>Please reload the page to try again.</p>
          <button onClick={() => window.location.reload()}>Reload page</button>
        </section>
      )
    }

    return this.props.children
  }
}
