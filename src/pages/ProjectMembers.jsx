import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  MembersHeader,
  MembersTabs,
  MembersTable,
  InviteMemberModal,
  ChangeRoleModal,
  MemberSearch,
} from "../components/members";
import { memberService, projectService } from "@/services";
import { useAuth } from "@/contexts";

export default function ProjectMembers() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { user } = useAuth();

  const [project, setProject] = useState(location.state?.project || null);
  const storedProjectId = localStorage.getItem("kbase_current_project_id");
  const rawId = params.id || project?.id || storedProjectId;
  const projectId = rawId && !isNaN(Number(rawId)) ? Number(rawId) : null;

  useEffect(() => {
    if (!projectId) {
      navigate("/projects", { replace: true });
    } else {
      localStorage.setItem("kbase_current_project_id", String(projectId));
    }
  }, [projectId, navigate]);

  const [members, setMembers] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current"); // "current" | "pending"
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedMemberForRole, setSelectedMemberForRole] = useState(null);

  // Load project details if needed
  useEffect(() => {
    if (location.state?.project && String(location.state.project.id) === String(projectId)) {
      setProject(location.state.project);
    } else if (projectId) {
      projectService.getProjectById(projectId)
        .then((res) => {
          if (res?.data) setProject(res.data);
        })
        .catch((e) => console.warn("Lỗi tải thông tin dự án:", e.message));
    }
  }, [projectId, location.state]);

  // Load members and pending invites
  const fetchData = useCallback(async () => {
    if (!projectId) return;
    try {
      setLoading(true);
      const [membersRes, invitesRes] = await Promise.allSettled([
        memberService.getMembers(projectId, searchQuery.trim() || undefined),
        memberService.getPendingInvites(projectId),
      ]);

      if (membersRes.status === "fulfilled" && membersRes.value?.data) {
        setMembers(membersRes.value.data);
      }
      if (invitesRes.status === "fulfilled" && invitesRes.value?.data) {
        setPendingInvites(invitesRes.value.data);
      }
    } catch (err) {
      console.warn("Lỗi khi tải dữ liệu thành viên:", err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = async ({ email, role }) => {
    try {
      await memberService.inviteMember(projectId, email, role);
      setIsInviteModalOpen(false);
      await fetchData();
      alert("Đã gửi lời mời tham gia thành công!");
    } catch (err) {
      alert("Gửi lời mời thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handleOpenChangeRole = (member) => {
    setSelectedMemberForRole(member);
  };

  const handleSaveRole = async (memberId, newRole) => {
    try {
      await memberService.updateMemberRole(projectId, memberId, newRole);
      setSelectedMemberForRole(null);
      await fetchData();
    } catch (err) {
      alert("Cập nhật vai trò thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa thành viên này khỏi dự án?")) return;
    try {
      await memberService.removeMember(projectId, memberId);
      await fetchData();
    } catch (err) {
      alert("Xóa thành viên thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handleResendInvite = async (inviteId) => {
    try {
      await memberService.resendInvite(projectId, inviteId);
      alert("Đã gửi lại email lời mời thành công!");
    } catch (err) {
      alert("Gửi lại lời mời thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const handleCancelInvite = async (inviteId) => {
    if (!confirm("Bạn có chắc muốn hủy lời mời này?")) return;
    try {
      await memberService.cancelInvite(projectId, inviteId);
      await fetchData();
    } catch (err) {
      alert("Hủy lời mời thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const projectName = project?.title || project?.name || "AI Knowledge Core";
  const projectRole = project?.role || "Owner";

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar */}
      <ProjectSidebar activeMenu="members" projectId={projectId} />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          currentProjectId={projectId}
          projectName={projectName}
          role={projectRole}
          user={{
            name: user?.fullName || "Nguyễn Văn A",
            role: user?.role || "Admin",
            initials: user?.initials || "NV",
          }}
        />

        {/* Members Body Content */}
        <main className="flex-1 p-6 sm:p-8 lg:p-9 xl:p-10 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
          {/* Header */}
          <MembersHeader onInviteClick={handleOpenInviteModal} />

          {/* Search Toolbar */}
          <MemberSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Tìm theo tên thành viên, email hoặc vai trò trong dự án..."
          />

          {/* Tabs Row */}
          <MembersTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentCount={members.length}
            pendingCount={pendingInvites.length}
          />

          {/* Members Table */}
          {loading ? (
            <div className="w-full py-16 flex items-center justify-center text-slate-400">
              <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <MembersTable
              activeTab={activeTab}
              members={members}
              pendingInvites={pendingInvites}
              onChangeRole={handleOpenChangeRole}
              onRemoveMember={handleRemoveMember}
              onResendInvite={handleResendInvite}
              onCancelInvite={handleCancelInvite}
            />
          )}
        </main>
      </div>

      {/* Invite Member Modal */}
      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleSendInvite}
      />

      {/* Change Role Modal */}
      <ChangeRoleModal
        isOpen={!!selectedMemberForRole}
        member={selectedMemberForRole}
        onClose={() => setSelectedMemberForRole(null)}
        onSaveRole={handleSaveRole}
      />
    </div>
  );
}
