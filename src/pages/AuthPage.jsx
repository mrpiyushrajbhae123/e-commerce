import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    if (!supabase) {
      setMessage('Supabase is not configured. Add env vars to enable auth.');
      return;
    }

    const action = mode === 'signup'
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password });

    const { error } = await action;
    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(mode === 'signup' ? 'Signup successful. Check your email.' : 'Login successful.');
    navigate('/dashboard');
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-md rounded-xl border border-accent/20 bg-panel p-6">
      <h1 className="text-2xl text-accent">{mode === 'signup' ? 'Create account' : 'Login'}</h1>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-4 w-full rounded-lg border border-accent/20 bg-bg p-3" />
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-3 w-full rounded-lg border border-accent/20 bg-bg p-3" />
      <button className="mt-4 w-full rounded-lg bg-accent p-3 font-bold text-black">{mode === 'signup' ? 'Sign up' : 'Log in'}</button>
      <button type="button" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')} className="mt-3 text-sm text-muted">
        {mode === 'signup' ? 'Already have an account? Login' : 'Need an account? Sign up'}
      </button>
      {message && <p className="mt-3 text-sm text-muted">{message}</p>}
    </form>
  );
}
