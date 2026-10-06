import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import scalesEmblem from '../../assets/lexis_juris_luxury_scales_emblem.png';
import { Button } from '../../components/atoms/Button';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md mx-auto my-auto py-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-3">
            <img
              src={scalesEmblem}
              alt="Lexora Insignia"
              className="h-10 w-10 rounded shadow-sm object-contain"
            />
            <span className="font-serif text-2xl font-bold tracking-[0.18em] text-on-surface uppercase">
              LEXORA
            </span>
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-secondary font-semibold">
            Privilege Recovery Protocol
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="font-serif text-2xl font-semibold text-on-surface text-center mb-1">
            Recover Chambers Access
          </h2>
          <p className="text-xs text-on-surface-variant text-center mb-6 font-sans">
            Enter your chambers email to receive an encrypted 2FA verification link.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Chambers Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="counsel@chambers.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-secondary"
                />
              </div>

              <Button type="submit" variant="terracotta" size="md" className="mt-2 w-full">
                Transmit Recovery Token
              </Button>
            </form>
          ) : (
            <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="material-symbols-outlined text-[32px] text-emerald-700 mb-2">
                mark_email_read
              </span>
              <h4 className="font-serif text-base font-semibold text-emerald-950 mb-1">
                Encrypted Link Dispatched
              </h4>
              <p className="text-xs text-emerald-900 leading-relaxed">
                A one-time cryptographic authorization token has been sent to{' '}
                <strong className="font-mono">{email}</strong>.
              </p>
            </div>
          )}

          <div className="text-center pt-6 mt-6 border-t border-outline-variant/20 text-xs text-on-surface-variant font-sans">
            <Link to="/auth/login" className="text-secondary font-semibold hover:underline">
              Return to Chambers Sign In
            </Link>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs font-mono text-outline py-2">
        AES-256 Client-Side Privilege • Supreme Court Registry Compliant
      </footer>
    </div>
  );
};
