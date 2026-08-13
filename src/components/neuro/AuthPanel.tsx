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
          Sign in with Google
        </button>
      </section>
    </main>
  );
}

export type { AuthMode };
