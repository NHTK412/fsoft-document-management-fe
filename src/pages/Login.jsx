import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginBanner, LoginForm } from '@/components/auth';
import { useAuth } from '@/contexts';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setError('');
    setIsLoading(true);
    try {
      const res = await login(credentials);
      if (res?.success || res?.code === 200) {
        if (res?.data?.user?.role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/projects');
        }
      }
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email hoặc mật khẩu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 font-sans p-0 sm:p-4">
      <div className="w-full max-w-[1440px] min-h-[900px] flex flex-col lg:flex-row bg-slate-50 shadow-2xl overflow-hidden rounded-none lg:rounded-2xl border border-slate-200">
        <LoginBanner />
        <div className="flex-1 flex flex-col justify-center items-center bg-white relative">
          {error && (
            <div className="w-full max-w-[440px] mb-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[13px] flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}