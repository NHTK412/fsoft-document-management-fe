import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  ProfileHeader,
  PersonalInfoCard,
  AppearanceCard,
  ActiveSessionsCard,
} from "../components/profile";

const INITIAL_PROFILE = {
  fullName: "Nguyễn Văn A",
  title: "Senior Lead Architect / Alpha Team",
  email: "nguyenvana@kbase.dev",
  phone: "+84 987 654 321",
  role: "Project Admin",
  initials: "NV",
  theme: "dark",
  language: "vi",
  timezone: "GMT+7",
};

const INITIAL_SESSIONS = [
  {
    id: 1,
    deviceName: "Windows PC - Google Chrome 124 (Máy trạm văn phòng)",
    location: "Hà Nội, Việt Nam",
    ip: "14.232.84.10",
    isCurrent: true,
    deviceType: "desktop",
  },
  {
    id: 2,
    deviceName: "MacBook Pro M2 - Safari 17.4 (Thiết bị cá nhân)",
    location: "TP. Hồ Chí Minh, Việt Nam",
    ip: "113.161.42.19",
    lastActive: "Hoạt động 2 giờ trước",
    isCurrent: false,
    deviceType: "desktop",
  },
  {
    id: 3,
    deviceName: "iPhone 15 Pro - KBase App Mobile (iOS 17.4)",
    location: "Hà Nội, Việt Nam",
    ip: "14.232.84.10",
    lastActive: "Hoạt động hôm qua lúc 19:42",
    isCurrent: false,
    deviceType: "mobile",
  },
];

export default function UserProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  // Project state for topbar
  const currentProject = location.state?.project;
  const projectName = currentProject?.title || "AI Knowledge Core";
  const projectRole = currentProject?.role || "Owner";

  // Profile state
  const [fullName, setFullName] = useState(INITIAL_PROFILE.fullName);
  const [title, setTitle] = useState(INITIAL_PROFILE.title);
  const [phone, setPhone] = useState(INITIAL_PROFILE.phone);
  const [theme, setTheme] = useState(INITIAL_PROFILE.theme);
  const [language, setLanguage] = useState(INITIAL_PROFILE.language);
  const [timezone, setTimezone] = useState(INITIAL_PROFILE.timezone);

  // Sessions state
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  // Feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Discard handler
  const handleDiscard = () => {
    if (confirm("Hủy bỏ các chỉnh sửa chưa lưu?")) {
      setFullName(INITIAL_PROFILE.fullName);
      setTitle(INITIAL_PROFILE.title);
      setPhone(INITIAL_PROFILE.phone);
      setTheme(INITIAL_PROFILE.theme);
      setLanguage(INITIAL_PROFILE.language);
      setTimezone(INITIAL_PROFILE.timezone);
    }
  };

  // Save handler
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }, 500);
  };

  // Session handlers
  const handleRevokeSession = (sessionId) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const handleRevokeAllOther = () => {
    if (confirm("Bạn có chắc muốn đăng xuất khỏi tất cả các thiết bị khác?")) {
      setSessions((prev) => prev.filter((s) => s.isCurrent));
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar (No project menu active) */}
      <ProjectSidebar activeMenu="" />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{ name: fullName, role: "Admin", initials: INITIAL_PROFILE.initials }}
        />

        {/* Profile Body Content */}
        <main className="flex-1 p-[24px_28px_28px_28px] flex flex-col gap-[16px] max-w-[1400px] w-full mx-auto relative">
          {/* Toast Notification */}
          {saveToast && (
            <div className="fixed top-20 right-8 z-50 bg-[#064E3B] text-[#ECFDF5] border border-[#059669] px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
              <svg className="w-5 h-5 text-[#34D399]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[13px] font-semibold">
                Hồ sơ cá nhân đã được lưu thành công!
              </span>
            </div>
          )}

          {/* Header */}
          <ProfileHeader
            userName={fullName}
            onDiscard={handleDiscard}
            onSave={handleSave}
            isSaving={isSaving}
          />

          {/* Profile Content Stream */}
          <div className="w-full flex flex-col gap-[16px]">
            {/* Card 1: Personal Info */}
            <PersonalInfoCard
              fullName={fullName}
              setFullName={setFullName}
              title={title}
              setTitle={setTitle}
              email={INITIAL_PROFILE.email}
              phone={phone}
              setPhone={setPhone}
              role={INITIAL_PROFILE.role}
              initials={INITIAL_PROFILE.initials}
            />

            {/* Card 2: Appearance & Preferences */}
            <AppearanceCard
              theme={theme}
              setTheme={setTheme}
              language={language}
              setLanguage={setLanguage}
              timezone={timezone}
              setTimezone={setTimezone}
            />

            {/* Card 3: Active Sessions */}
            <ActiveSessionsCard
              sessions={sessions}
              onRevokeSession={handleRevokeSession}
              onRevokeAllOther={handleRevokeAllOther}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
