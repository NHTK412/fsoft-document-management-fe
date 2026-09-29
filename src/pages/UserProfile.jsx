import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  ProfileHeader,
  PersonalInfoCard,
} from "../components/profile";
import { userService } from "@/services";
import { useAuth } from "@/contexts";

export default function UserProfile() {
  const location = useLocation();
  const { user } = useAuth();

  const currentProject = location.state?.project;
  const projectName = currentProject?.title || currentProject?.name || "AI Knowledge Core";
  const projectRole = currentProject?.role || "Owner";

  // Profile state
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Member");
  const [initials, setInitials] = useState("NV");

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Hồ sơ cá nhân đã được lưu thành công!");

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const profRes = await userService.getProfile();

      if (profRes?.data) {
        const d = profRes.data;
        setProfile(d);
        setFullName(d.fullName || "");
        setTitle(d.title || "");
        setEmail(d.email || "");
        setPhone(d.phone || "");
        setRole(d.role || "Member");
        setInitials(d.initials || "NV");
      }
    } catch (err) {
      console.warn("Lỗi tải thông tin hồ sơ:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleDiscard = () => {
    if (confirm("Hủy bỏ các chỉnh sửa chưa lưu?")) {
      if (profile) {
        setFullName(profile.fullName || "");
        setTitle(profile.title || "");
        setPhone(profile.phone || "");
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await userService.updateProfile({ fullName, title, phone });
      setToastMessage("Hồ sơ cá nhân đã được cập nhật thành công!");
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
      await fetchProfile();
    } catch (err) {
      alert("Cập nhật hồ sơ thất bại: " + (err.message || "Lỗi không xác định"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar */}
      <ProjectSidebar activeMenu="" />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{ name: fullName || "Nguyễn Văn A", role, initials }}
        />

        {/* Profile Body Content */}
        <main className="flex-1 p-[24px_28px_28px_28px] flex flex-col gap-[16px] max-w-[1400px] w-full mx-auto relative">
          {saveToast && (
            <div className="fixed top-20 right-8 z-50 bg-[#064E3B] text-[#ECFDF5] border border-[#059669] px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
              <svg className="w-5 h-5 text-[#34D399]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Profile Header */}
          <ProfileHeader
            fullName={fullName}
            title={title}
            role={role}
            initials={initials}
            onDiscard={handleDiscard}
            onSave={handleSave}
            isSaving={isSaving}
          />

          {loading ? (
            <div className="w-full py-16 flex items-center justify-center text-slate-400">
              <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="w-full max-w-[960px]">
              <PersonalInfoCard
                fullName={fullName}
                title={title}
                email={email}
                phone={phone}
                role={role}
                initials={initials}
                onFullNameChange={setFullName}
                onTitleChange={setTitle}
                onPhoneChange={setPhone}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
