import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts";

// Route chỉ dành riêng cho Admin (ROLE_ADMIN)
export const AdminRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white">
        <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ROLE_ADMIN") {
    return <Navigate to="/projects" replace />;
  }

  return children;
};

// Route dành cho người dùng thông thường: Admin bị chặn không cho vào project workspace!
export const UserRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 text-slate-700">
        <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu là ADMIN thì không nhảy vào project, mà bắt buộc chuyển về giao diện admin
  if (user.role === "ROLE_ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// Route cho Login / Register: Nếu đã đăng nhập thì chuyển hướng theo đúng role
export const AuthRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (token && user) {
    if (user.role === "ROLE_ADMIN") {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/projects" replace />;
  }

  return children;
};
