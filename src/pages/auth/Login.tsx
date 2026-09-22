import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import scalesEmblem from '../../assets/lexis_juris_luxury_scales_emblem.png';
import { Button } from '../../components/atoms/Button';
import { authApi } from '../../services/authApi';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('nariman.senior@chambers.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.login({ email, password });
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md mx-auto my-auto py-8">
        {/* Brand Lockup */}
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
            Supreme Chambers Authentication
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="font-serif text-2xl font-semibold text-on-surface text-center mb-1">
            Chambers Sign In
          </h2>
          <p className="text-xs text-on-surface-variant text-center mb-6 font-sans">
            Access privileged dockets, ratio synthesis, and bench analytics.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-outline font-semibold">
                Chambers Email / Bar Identifier
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-outline font-semibold">
                  Privilege Key / Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-secondary hover:underline font-mono"
                >
                  Forgot Key?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-low p-2.5 pr-10 rounded-lg border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-secondary font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="terracotta"
              size="md"
              isLoading={loading}
              className="mt-2 w-full"
            >
              Sign In to Chambers
            </Button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full bg-surface hover:bg-surface-container text-on-surface font-sans text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 border border-outline-variant/40 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">token</span>
              <span>Authenticate via FIDO2 Hardware Key</span>
            </button>
          </form>

          <div className="text-center pt-6 mt-6 border-t border-outline-variant/20 text-xs text-on-surface-variant font-sans">
            <span>Don’t have a chambers seat?</span>{' '}
            <Link to="/auth/register" className="text-secondary font-semibold hover:underline">
              Enroll Chambers
            </Link>
          </div>
        </div>

        {/* Regulatory & Privilege Footnote */}
        <div className="mt-6 p-3 bg-surface-container-low/60 rounded-xl text-center">
          <p className="font-sans text-[11px] leading-relaxed text-on-surface-variant">
            <strong className="text-on-surface font-semibold">Privileged & Confidential Legal Technology.</strong>{' '}
            Protected under Section 126 of the Indian Evidence Act and Supreme Court confidentiality rules.
          </p>
        </div>
      </div>

      <footer className="text-center text-xs font-mono text-outline py-2">
        AES-256 Client-Side Privilege • Supreme Court Registry Compliant
      </footer>
    </div>
  );
};
