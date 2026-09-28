import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const isPasswordMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log('Register attempt:', formData);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-14 bg-white">
      <div className="w-full max-w-[440px] flex flex-col gap-5">

        {/* Form Header */}
        <div className="space-y-1.5">
          <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">
            Tạo tài khoản KBase
          </h2>
          <p className="text-[14px] leading-[21px] text-slate-500">
            Đăng ký nhanh chóng để khám phá hệ thống quản trị tri thức hỗ trợ AI.
          </p>
        </div>

        {/* Social Signup Row */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex-1 h-[42px] flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-btn transition-colors cursor-pointer text-[13px] font-medium text-slate-800"
          >
            {/* Google Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.4 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.6 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Google</span>
          </button>
        </div>

        {/* Divider Row */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-slate-200" />
          <span className="text-[12px] text-slate-400 font-normal">hoặc đăng ký bằng email</span>
          <div className="flex-1 h-[1px] bg-slate-200" />
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Full Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-slate-700">Họ và tên</label>
            <div className="h-[40px] px-3 bg-white border border-slate-300 rounded-btn flex items-center gap-2.5 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-slate-400 shrink-0"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className="w-full text-[13px] text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-slate-700">Email công việc / cá nhân</label>
            <div className="h-[40px] px-3 bg-white border border-slate-300 rounded-btn flex items-center gap-2.5 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-slate-400 shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full text-[13px] text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-slate-700">Mật khẩu</label>
            <div className="h-[40px] px-3 bg-white border border-slate-300 rounded-btn flex items-center justify-between gap-2.5 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100 transition-all">
              <div className="flex items-center gap-2.5 flex-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-slate-400 shrink-0"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full text-[13px] text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            <div className="flex flex-col gap-1 pt-1">
              <div className="flex items-center gap-1.5 w-full">
                <div className="flex-1 h-1 bg-emerald-500 rounded-sm" />
                <div className="flex-1 h-1 bg-emerald-500 rounded-sm" />
                <div className="flex-1 h-1 bg-emerald-500 rounded-sm" />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-500">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Mật khẩu mạnh (tối thiểu 8 ký tự, gồm số &amp; ký tự đặc biệt)</span>
              </div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-semibold text-slate-700">Xác nhận mật khẩu</label>
            <div className={`h-[40px] px-3 bg-white border rounded-btn flex items-center justify-between gap-2.5 transition-all ${isPasswordMatch ? 'border-emerald-500 ring-1 ring-emerald-500/20' : 'border-slate-300 focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-100'
              }`}>
              <div className="flex items-center gap-2.5 flex-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-4 h-4 shrink-0 ${isPasswordMatch ? 'text-emerald-500' : 'text-slate-400'}`}
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full text-[13px] text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-1.5">
                {isPasswordMatch && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-emerald-500">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 rounded text-primary-600 border-slate-300 focus:ring-primary-500 accent-indigo-600 cursor-pointer"
            />
            <span className="text-[12px] leading-[18px] text-slate-600">
              Tôi đồng ý với Điều khoản dịch vụ và Chính sách quyền riêng tư của KBase.
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-[44px] mt-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 active:bg-primary-700 text-white rounded-btn text-[14px] font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Tạo tài khoản miễn phí</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>

        {/* Switch to Login Link */}
        <div className="flex items-center justify-center gap-1.5 text-[13px] pt-1">
          <span className="text-slate-500">Đã có tài khoản KBase?</span>
          <Link
            to="/"
            className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </div>

      </div>
    </div>
  );
};
