import { useState } from 'react';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';

type AuthMode = 'login' | 'signup';

type Props = {
  mode: AuthMode;
  onBack: () => void;
  onSuccess: () => void;
};

export function AuthPanel({ mode, onBack, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const title = mode === 'login' ? 'Log in' : 'Sign up';
  const googleTitle = mode === 'login' ? 'Sign in with Google' : 'Sign up with Google';

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    if (!isSupabaseConfigured) {
      setMessage('Supabase ещё не настроен. Добавь ключи в .env.');
      setBusy(false);
      return;
    }

    const request =
      mode === 'signup'
        ? supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: window.location.origin },
          })
        : supabase.auth.signInWithPassword({ email, password });

    const { error } = await request;
    setBusy(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (mode === 'signup') {
      setMessage('Аккаунт создан. Проверь почту, если Supabase попросит подтверждение.');
      window.setTimeout(onSuccess, 500);
      return;
    }

    onSuccess();
  }

  async function signInWithGoogle() {
    if (!isSupabaseConfigured) {
      setMessage('Supabase ещё не настроен. Добавь ключи в .env.');
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });

    if (error) setMessage(error.message);
  }

  return (
    <main className="neuro-shell onboarding">
      <section className="auth-page">
        <button className="text-button" onClick={onBack} type="button">
          ← Back
        </button>
        <div className="auth-card">
          <p className="eyebrow">Neuro access</p>
          <h1>{title}</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
              type="email"
              value={email}
            />
            <input
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              type="password"
              value={password}
            />
            <button className="primary-action" disabled={busy} type="submit">
              {busy ? 'Loading...' : title}
            </button>
          </form>
          {message && <p className="auth-message">{message}</p>}
        </div>
        <button className="google-button" onClick={signInWithGoogle} type="button">
          <GoogleIcon />
          <span>{googleTitle}</span>
        </button>
      </section>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="google-icon" viewBox="0 0 24 24">
      <path
        d="M21.6 12.23c0-.74-.07-1.45-.19-2.13H12v4.03h5.38a4.6 4.6 0 0 1-2 3.02v2.62h3.24c1.9-1.75 2.98-4.33 2.98-7.54Z"
        fill="currentColor"
      />
      <path
        d="M12 22c2.7 0 4.96-.89 6.62-2.42l-3.24-2.62c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.59-4.12H3.07v2.7A10 10 0 0 0 12 22Z"
        fill="currentColor"
      />
      <path
        d="M6.41 13.8a6 6 0 0 1 0-3.6V7.5H3.07a10 10 0 0 0 0 9l3.34-2.7Z"
        fill="currentColor"
      />
      <path
        d="M12 6.09c1.47 0 2.79.5 3.83 1.5l2.86-2.87C16.96 3.12 14.7 2.14 12 2.14A10 10 0 0 0 3.07 7.5l3.34 2.7C7.2 7.84 9.4 6.1 12 6.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type { AuthMode };
