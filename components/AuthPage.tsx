import React, { useState } from 'react';
import { ApolloLogo } from './ApolloLogo';
import { UserIcon } from './icons/UserIcon';
import { EmailIcon } from './icons/EmailIcon';
import { LockIcon } from './icons/LockIcon';

interface AuthPageProps {
  onLoginSuccess: (email: string) => void;
}

const AuthInput: React.FC<{
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
}> = ({ id, type, value, onChange, placeholder, icon }) => (
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            {icon}
        </div>
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
            className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 pr-4 pl-12 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-apollo-orange focus:border-apollo-orange transition"
        />
    </div>
);

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const users = JSON.parse(localStorage.getItem('cleftixUsers') || '{}');
      if (users[email] && users[email].password === password) {
        onLoginSuccess(email);
      } else {
        setError('Invalid email or password.');
      }
    } else {
      if (!name.trim()) {
        setError('Name is required.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      const users = JSON.parse(localStorage.getItem('cleftixUsers') || '{}');
      if (users[email]) {
        setError('An account with this email already exists.');
        return;
      }
      users[email] = { password, name };
      localStorage.setItem('cleftixUsers', JSON.stringify(users));
      onLoginSuccess(email);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] w-full flex items-center justify-center p-4 bg-gray-100">
       <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-fade-in">
          <div className="flex justify-center mb-6">
            <ApolloLogo theme="light" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-600 text-center mb-8">{isLogin ? 'Login to access the AI screener' : 'Join to start your screening'}</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
             {error && <p className="text-red-700 bg-red-100 p-3 rounded-lg text-sm text-center border border-red-200">{error}</p>}
             
             {!isLogin && (
                <AuthInput
                    id="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full Name"
                    icon={<UserIcon className="w-5 h-5 text-gray-400" />}
                />
             )}
            
            <AuthInput
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                icon={<EmailIcon className="w-5 h-5 text-gray-400" />}
            />
             
            <AuthInput
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                icon={<LockIcon className="w-5 h-5 text-gray-400" />}
            />

             {!isLogin && (
                <AuthInput
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    icon={<LockIcon className="w-5 h-5 text-gray-400" />}
                />
             )}
             
             <button type="submit" className="w-full py-3 bg-apollo-orange text-white text-lg font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apollo-orange">
                {isLogin ? 'Login' : 'Sign Up'}
             </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
             {isLogin ? "Don't have an account? " : "Already have an account? "}
             <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-semibold text-apollo-orange hover:text-orange-600 hover:underline focus:outline-none">
                {isLogin ? 'Sign Up' : 'Login'}
             </button>
          </p>
       </div>
    </div>
  );
};