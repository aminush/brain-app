import React from 'react';

type State = {
  message: string;
};

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { message: '' };

  static getDerivedStateFromError(error: Error) {
    return { message: error.message };
  }

  render() {
    if (!this.state.message) return this.props.children;

    return (
      <main className="error-screen">
        <section>
          <p className="eyebrow">Ошибка запуска</p>
          <h1>Приложение не открылось</h1>
          <p>{this.state.message}</p>
        </section>
      </main>
    );
  }
}
