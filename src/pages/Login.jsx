import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import AuthLayout from '@/components/auth/AuthLayout';
import FormInput from '@/components/ui/form-input';

import { authAPI, tokenHelper, userHelper } from '@/services/authAPI';

const Login = () => {
  const navigate = useNavigate();

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ CALL BACKEND
      const res = await authAPI.login(email, password);
    
      // EXPECTING THIS FROM BACKEND:
      // { token: "...", user: {...} }
      const { token, user } = res.data;

      // ✅ STORE AUTH DATA
      tokenHelper.setToken(token);
      userHelper.setUser(user);

      // ✅ NAVIGATE ONLY ON SUCCESS
      navigate('/admin');

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Please enter your details to sign in."
    >
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}

        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="name@telecom.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 rounded-xl"
        >
          {loading ? 'Signing in...' : 'Sign in'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

      </form>
    </AuthLayout>
  );
};

export default Login;
