import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-mesh-soft px-6">
          <div className="glass-panel max-w-lg rounded-[32px] p-8 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">System Recovery</p>
            <h1 className="mt-4 font-display text-4xl text-slate-900">A rendering issue interrupted the dashboard.</h1>
            <p className="mt-4 text-slate-600">Refresh the page to relaunch the EventSphere experience.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
