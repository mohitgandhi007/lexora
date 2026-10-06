import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import scalesEmblem from '../../assets/lexis_juris_luxury_scales_emblem.png';
import { Button } from '../../components/atoms/Button';
import { authApi } from '../../services/authApi';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [barRoll, setBarRoll] = useState('');
  const [email, setEmail] = useState('');
  const [chamberName, setChamberName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register({ fullName, barRoll, email, chamberName });
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
            Chambers Enrollment & Verification
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm">
          <h2 className="font-serif text-2xl font-semibold text-on-surface text-center mb-1">
            Enroll Chambers Seat
          </h2>
          <p className="text-xs text-on-surface-variant text-center mb-6 font-sans">
            Dedicated tenant sandbox with Bar Council credential verification.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-outline font-semibold">
                Advocate Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Senior Advocate / Counsel"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-outline font-semibold">
                Bar Council Enrollment Number
              </label>
              <input
                type="text"
                required
                placeholder="e.g. D/1420/2012"
                value={barRoll}
                onChange={(e) => setBarRoll(e.target.value)}
                className="w-full bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-secondary font-mono"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-outline font-semibold">
                Chambers / Office Designation
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chambers of Senior Counsel"
                value={chamberName}
                onChange={(e) => setChamberName(e.target.value)}
                className="w-full bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/50 text-sm text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-mono uppercase text-outline font-semibold">
                Official Email
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

            <Button
              type="submit"
              variant="terracotta"
              size="md"
              isLoading={loading}
              className="mt-3 w-full"
            >
              Verify & Provision Chambers Sandbox
            </Button>
          </form>

          <div className="text-center pt-6 mt-6 border-t border-outline-variant/20 text-xs text-on-surface-variant font-sans">
            <span>Already have a seat?</span>{' '}
            <Link to="/auth/login" className="text-secondary font-semibold hover:underline">
              Sign In
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
