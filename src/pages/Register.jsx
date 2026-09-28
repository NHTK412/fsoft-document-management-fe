import React from 'react';
import { RegisterBanner, RegisterForm } from '@/components/auth';

export default function Register() {
  const handleRegister = (formData) => {
    console.log('Register attempt:', formData);
    // TODO: Xử lý gọi API đăng ký tại đây
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 font-sans p-0 sm:p-4">
      <div className="w-full max-w-[1440px] min-h-[900px] flex flex-col lg:flex-row bg-slate-50 shadow-2xl overflow-hidden rounded-none lg:rounded-2xl border border-slate-200">
        <RegisterBanner />
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </div>
  );
}