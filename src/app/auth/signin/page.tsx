'use client';

import { authService } from '@/services/auth.service';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const GoogleIcon = () => (
  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,2.448-2.578,4.303-5.09,4.303c-2.841,0-5.145-2.304-5.145-5.145s2.304-5.145,5.145-5.145c1.457,0,2.775,0.605,3.712,1.577l1.914-1.914c-1.357-1.357-3.232-2.196-5.299-2.196c-4.114,0-7.455,3.341-7.455,7.455s3.341,7.455,7.455,7.455c4.114,0,7.455-3.341,7.455-7.455v-1.909h-5.418C13.4,11.242,12.545,11.597,12.545,12.151z" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.login(formData);
      router.push('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message || 'An error occurred during login',
        );
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    authService.initiateGoogleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(16,16,16)] ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Or{' '}
            <Link
              href="/auth/register"
              className="font-medium text-[rgb(239,252,118)] hover:text-[rgb(220,232,108)]"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-900/30 p-4 border border-red-700/50">
              <div className="text-sm text-red-400">{error}</div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[rgb(16,16,16)] text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full text-white border-white/30 hover:bg-white/10"
              >
                <GoogleIcon />
                Sign in with Google
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
