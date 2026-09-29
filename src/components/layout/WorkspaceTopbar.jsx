import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { projectService, inviteService } from "@/services";
import { formatRole } from "@/utils/formatRole";

export default function WorkspaceTopbar({
  projectName = "AI Knowledge Core",
  role = "Owner",
  currentProjectId = null,
  user = { name: "Nguyễn Văn A", role: "Admin", initials: "NV" },
}) {
  const navigate = useNavigate();
  const params = useParams();
  const routeProjectId = params.id || params.projectId;

  // Active Project ID strictly resolved from prop, route param, or localStorage
  const activeProjectId = String(currentProjectId || routeProjectId || localStorage.getItem("kbase_current_project_id") || "");

  // Project Switcher States
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");

  // Notification / Invites States
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const [loadingInvites, setLoadingInvites] = useState(false);
  const [actionInProgressId, setActionInProgressId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const switcherRef = useRef(null);
  const notificationRef = useRef(null);

  // Fetch projects for switcher
  const fetchProjects = useCallback(async () => {
    try {
      setLoadingProjects(true);
      const res = await projectService.getAllProjects();
      if (res?.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.warn("Lỗi khi tải danh sách dự án:", err.message);
    } finally {
      setLoadingProjects(false);
    }
  }, []);

  // Fetch pending invites
  const fetchInvites = useCallback(async () => {
    try {
      setLoadingInvites(true);
      const res = await inviteService.getMyPendingInvites();
      if (res?.data) {
        setInvites(res.data);
      }
    } catch (err) {
      console.warn("Lỗi khi tải danh sách lời mời:", err.message);
    } finally {
      setLoadingInvites(false);
    }
  }, []);

  // Match current project from fetched projects list
  const matchedProject = projects.find((p) => String(p.id) === String(activeProjectId));

  // Resolved display name and role (prioritizes directly selected project from switcher)
  const displayProjectName =
    (selectedProject && String(selectedProject.id) === String(activeProjectId))
      ? (selectedProject.title || selectedProject.name)
      : (matchedProject?.title || matchedProject?.name || projectName);

  const displayRole =
    (selectedProject && String(selectedProject.id) === String(activeProjectId))
      ? (selectedProject.role || role)
      : (matchedProject?.role || role);

  // Initial load invites and projects
  useEffect(() => {
    fetchInvites();
    fetchProjects();
    // Poll for new invites every 60 seconds
    const interval = setInterval(fetchInvites, 60000);
    return () => clearInterval(interval);
  }, [fetchInvites, fetchProjects]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsSwitcherOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Open Switcher
  const toggleSwitcher = () => {
    const nextState = !isSwitcherOpen;
    setIsSwitcherOpen(nextState);
    if (nextState) {
      setIsNotificationOpen(false);
      fetchProjects();
    }
  };

  // Open Notification
  const toggleNotification = () => {
    const nextState = !isNotificationOpen;
    setIsNotificationOpen(nextState);
    if (nextState) {
      setIsSwitcherOpen(false);
      fetchInvites();
    }
  };

  // Switch to another project
  const handleSelectProject = (p) => {
    setIsSwitcherOpen(false);
    setSelectedProject(p);
    localStorage.setItem("kbase_current_project_id", String(p.id));
    navigate(`/projects/${p.id}/dashboard`, { state: { project: p } });
  };

  // Accept Invite
  const handleAcceptInvite = async (invite) => {
    try {
      setActionInProgressId(invite.id);
      await inviteService.acceptInvite(invite.id);
      setToastMessage(`Đã tham gia dự án "${invite.projectName}" thành công!`);
      setTimeout(() => setToastMessage(""), 3500);

      // Refresh list of invites
      await fetchInvites();
      setIsNotificationOpen(false);

      // Switch directly to accepted project
      if (invite.projectId) {
        localStorage.setItem("kbase_current_project_id", String(invite.projectId));
        navigate(`/projects/${invite.projectId}/dashboard`);
      }
    } catch (err) {
      alert("Chấp nhận lời mời thất bại: " + (err.message || "Lỗi không xác định"));
    } finally {
      setActionInProgressId(null);
    }
  };

  // Decline Invite
  const handleDeclineInvite = async (inviteId) => {
    if (!confirm("Bạn có chắc chắn muốn từ chối lời mời này?")) return;
    try {
      setActionInProgressId(inviteId);
      await inviteService.declineInvite(inviteId);
      await fetchInvites();
    } catch (err) {
      alert("Từ chối lời mời thất bại: " + (err.message || "Lỗi không xác định"));
    } finally {
      setActionInProgressId(null);
    }
  };

  // Filter projects by search
  const filteredProjects = projects.filter((p) => {
    const name = (p.name || p.title || "").toLowerCase();
    return name.includes(projectSearch.toLowerCase());
  });

  return (
    <header className="w-full h-[64px] shrink-0 flex items-center justify-between px-[24px] bg-white border-b border-[#E2E8F0] select-none relative z-40">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#064E3B] text-[#ECFDF5] border border-[#059669] px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-3">
          <svg className="w-4 h-4 text-[#34D399] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left: Project Switcher */}
      <div className="relative" ref={switcherRef}>
        <button
          type="button"
          onClick={toggleSwitcher}
          className="flex items-center gap-[10px] px-[12px] py-[6px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] hover:bg-[#F1F5F9] transition-colors cursor-pointer text-left group"
        >
          <div className="w-[24px] h-[24px] shrink-0 flex items-center justify-center bg-[#EEF2FF] rounded-[6px]">
            <svg className="w-[14px] h-[14px] text-[#4F46E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="16" height="16" x="4" y="4" rx="2" />
              <rect width="6" height="6" x="9" y="9" rx="1" />
              <path d="M15 2v2" /><path d="M15 20v2" /><path d="M2 15h2" /><path d="M2 9h2" /><path d="M20 15h2" /><path d="M20 9h2" /><path d="M9 2v2" /><path d="M9 20v2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#0F172A] whitespace-nowrap max-w-[180px] sm:max-w-[240px] truncate">
              {displayProjectName}
            </span>
          </div>
          <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-[6px] py-[2px] rounded-[4px] whitespace-nowrap">
            {formatRole(displayRole)}
          </span>
          <svg
            className={`w-[14px] h-[14px] text-[#94A3B8] transition-transform duration-200 ${
              isSwitcherOpen ? "rotate-180 text-[#4F46E5]" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Project Switcher Dropdown */}
        {isSwitcherOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 w-[300px] sm:w-[340px] bg-white border border-[#E2E8F0] rounded-[12px] shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2 py-1.5 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Dự án của bạn
              </span>
              <span className="text-xs font-medium text-slate-400">
                {projects.length} dự án
              </span>
            </div>

            {/* Quick search if > 3 projects */}
            {projects.length > 3 && (
              <div className="p-2 border-b border-slate-100">
                <input
                  type="text"
                  placeholder="Tìm nhanh dự án..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Projects List */}
            <div className="max-h-[260px] overflow-y-auto py-1 flex flex-col gap-0.5">
              {loadingProjects ? (
                <div className="py-6 flex items-center justify-center text-slate-400 text-xs gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  <span>Đang tải danh sách...</span>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  Không tìm thấy dự án nào phù hợp
                </div>
              ) : (
                filteredProjects.map((p) => {
                  const isCurrent = Boolean(activeProjectId && String(p.id) === activeProjectId);

                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleSelectProject(p)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-indigo-50 text-indigo-900 font-semibold"
                          : "hover:bg-slate-50 text-slate-700 font-normal"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 shrink-0 rounded-md flex items-center justify-center text-xs font-bold ${
                            isCurrent
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {(p.name || p.title || "P").substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs truncate max-w-[180px]">
                            {p.title || p.name}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">
                            {formatRole(p.role)}
                          </span>
                        </div>
                      </div>

                      {/* Single selection indicator */}
                      <div className="shrink-0 flex items-center ml-2">
                        {isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center bg-indigo-600 text-white shadow-2xs">
                            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300 hover:border-indigo-400 transition-colors" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom link to Projects Hub */}
            <div className="pt-2 mt-1 border-t border-slate-100">
              <Link
                to="/projects"
                onClick={() => setIsSwitcherOpen(false)}
                className="w-full py-1.5 px-2.5 flex items-center justify-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 rounded-md font-medium transition-colors"
              >
                <span>Xem tất cả không gian làm việc (Hub)</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Right: Actions and User */}
      <div className="flex items-center gap-[10px]">
        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            aria-label="Thông báo và lời mời"
            onClick={toggleNotification}
            className={`w-[36px] h-[36px] flex items-center justify-center bg-white border rounded-[8px] transition-colors cursor-pointer relative ${
              isNotificationOpen
                ? "border-indigo-500 bg-indigo-50/40 text-indigo-600"
                : "border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B]"
            }`}
          >
            <svg className="w-[16px] h-[16px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>

            {/* Badge Indicator */}
            {invites.length > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 min-w-[18px] h-[18px] bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                {invites.length}
              </span>
            )}
          </button>

          {/* Notifications / Invites Dropdown */}
          {isNotificationOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-[340px] sm:w-[380px] bg-white border border-[#E2E8F0] rounded-[12px] shadow-2xl p-0 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
              {/* Header */}
              <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Lời mời tham gia dự án
                  </span>
                  {invites.length > 0 && (
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                      {invites.length} mới
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={fetchInvites}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                  title="Làm mới"
                >
                  <svg className={`w-3.5 h-3.5 ${loadingInvites ? "animate-spin text-indigo-600" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 21h5v-5" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100">
                {loadingInvites && invites.length === 0 ? (
                  <div className="py-8 flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
                    <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <span>Đang kiểm tra lời mời...</span>
                  </div>
                ) : invites.length === 0 ? (
                  <div className="py-10 px-4 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2.5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      Không có lời mời nào
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 max-w-[220px]">
                      Khi bạn được mời tham gia vào các không gian dự án mới, lời mời sẽ hiển thị tại đây.
                    </span>
                  </div>
                ) : (
                  invites.map((inv) => {
                    const isProcessing = actionInProgressId === inv.id;

                    return (
                      <div key={inv.id} className="p-3.5 hover:bg-slate-50/50 transition-colors flex flex-col gap-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {inv.projectName}
                            </span>
                            <span className="text-[11px] text-slate-500 mt-0.5">
                              {inv.inviterName ? `Mời bởi: ${inv.inviterName}` : "Được mời tham gia dự án"}
                            </span>
                          </div>
                          <span className="shrink-0 px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-semibold rounded-md">
                            {formatRole(inv.role)}
                          </span>
                        </div>

                        {inv.projectDescription && (
                          <p className="text-[11px] text-slate-600 line-clamp-2 bg-slate-50 p-1.5 rounded">
                            {inv.projectDescription}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => handleDeclineInvite(inv.id)}
                            className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md font-medium transition-colors cursor-pointer disabled:opacity-50"
                          >
                            Từ chối
                          </button>
                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => handleAcceptInvite(inv)}
                            className="px-3 py-1 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                            <span>Chấp nhận</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <Link
          to="/profile"
          className="flex items-center gap-[8px] p-[4px_10px_4px_4px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[20px] cursor-pointer hover:bg-[#F1F5F9] transition-colors"
        >
          <div className="w-[26px] h-[26px] flex items-center justify-center bg-[#4F46E5] text-white rounded-full text-[10px] font-bold">
            {user.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-semibold text-[#0F172A] leading-tight whitespace-nowrap">
              {user.name}
            </span>
            <span className="text-[10px] font-medium text-[#10B981] leading-tight whitespace-nowrap">
              {formatRole(user.role)}
            </span>
          </div>
          <svg className="w-[12px] h-[12px] text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
