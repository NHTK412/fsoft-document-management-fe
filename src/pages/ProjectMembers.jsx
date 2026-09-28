import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ProjectSidebar from "../components/layout/ProjectSidebar.jsx";
import WorkspaceTopbar from "../components/layout/WorkspaceTopbar.jsx";
import {
  MembersHeader,
  MembersTabs,
  MembersTable,
  InviteMemberModal,
  ChangeRoleModal,
} from "../components/members";

const INITIAL_MEMBERS = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "alex@kbase.ai",
    initial: "N",
    avatarBg: "#4F46E5",
    role: "Project Owner",
    joinedDate: "12/01/2026",
    contributions: "14 tệp",
  },
  {
    id: 2,
    name: "Trần Minh Tâm",
    email: "tam.tran@kbase.ai",
    initial: "T",
    avatarBg: "#2563EB",
    role: "Project Owner",
    joinedDate: "15/01/2026",
    contributions: "12 tệp",
  },
  {
    id: 3,
    name: "Lê Hoàng Nam",
    email: "nam.le@kbase.ai",
    initial: "L",
    avatarBg: "#D97706",
    role: "Member",
    joinedDate: "02/02/2026",
    contributions: "8 tệp",
  },
  {
    id: 4,
    name: "Hoàng Yến",
    email: "yen.hoang@kbase.ai",
    initial: "H",
    avatarBg: "#EC4899",
    role: "Member",
    joinedDate: "10/02/2026",
    contributions: "4 tệp",
  },
];

const INITIAL_PENDING_INVITES = [
  {
    id: 101,
    email: "ha.nguyen@fpt.com",
    role: "Member",
    sentDate: "24/02/2026",
    expiresIn: "5 ngày",
  },
  {
    id: 102,
    email: "quang.le@ai-research.org",
    role: "Member",
    sentDate: "26/02/2026",
    expiresIn: "6 ngày",
  },
  {
    id: 103,
    email: "thuy.duong@partner.io",
    role: "Viewer",
    sentDate: "27/02/2026",
    expiresIn: "7 ngày",
  },
];

export default function ProjectMembers() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Project state
  const currentProject = location.state?.project;
  const projectName = currentProject?.title || "AI Knowledge Core";
  const projectRole = currentProject?.role || "Owner";

  // Members & Invitations State
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [pendingInvites, setPendingInvites] = useState(INITIAL_PENDING_INVITES);
  const [activeTab, setActiveTab] = useState("current"); // "current" | "pending"

  // Modals state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedMemberForRole, setSelectedMemberForRole] = useState(null);

  // Handlers
  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = ({ email, role }) => {
    const newInvite = {
      id: Date.now(),
      email,
      role,
      sentDate: new Date().toLocaleDateString("vi-VN"),
      expiresIn: "7 ngày",
    };
    setPendingInvites((prev) => [newInvite, ...prev]);
  };

  const handleOpenChangeRole = (member) => {
    setSelectedMemberForRole(member);
  };

  const handleSaveRole = (memberId, newRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
    );
  };

  const handleRemoveMember = (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const handleResendInvite = (inviteId) => {
    alert("Đã gửi lại email lời mời thành công!");
  };

  const handleCancelInvite = (inviteId) => {
    setPendingInvites((prev) => prev.filter((i) => i.id !== inviteId));
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#F8FAFC] text-[#0F172A] font-[Inter,system-ui,sans-serif]">
      {/* 1. Left Sidebar */}
      <ProjectSidebar activeMenu="members" />

      {/* 2. Main Workspace Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Topbar */}
        <WorkspaceTopbar
          projectName={projectName}
          role={projectRole}
          user={{ name: "Nguyễn Văn A", role: "Admin", initials: "NV" }}
          showSearch={true}
          searchPlaceholder="Tìm kiếm tệp, hỏi AI..."
          onUploadClick={() => navigate("/documents")}
          onAskAIClick={() => navigate("/chat")}
        />

        {/* Members Body Content */}
        <main className="flex-1 p-[24px_28px_28px_28px] flex flex-col gap-[20px] max-w-[1400px] w-full mx-auto">
          {/* Header */}
          <MembersHeader onInviteClick={handleOpenInviteModal} />

          {/* Tabs Row */}
          <MembersTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentCount={members.length}
            pendingCount={pendingInvites.length}
          />

          {/* Members Table */}
          <MembersTable
            activeTab={activeTab}
            members={members}
            pendingInvites={pendingInvites}
            onChangeRole={handleOpenChangeRole}
            onRemoveMember={handleRemoveMember}
            onResendInvite={handleResendInvite}
            onCancelInvite={handleCancelInvite}
          />
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
