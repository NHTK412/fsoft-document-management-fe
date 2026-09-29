import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HubTopbar,
  ProjectCard,
  CreateProjectCard,
  ProjectsFilterBar,
  CreateProjectModal,
} from '@/components/hub';
import { projectService, inviteService } from '@/services';
import { useAuth } from '@/contexts';
import { formatRole } from '@/utils/formatRole';

export default function ProjectsHub() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingInvites, setLoadingInvites] = useState(false);
  const [actionInProgressId, setActionInProgressId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Fetch projects from Backend API
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await projectService.getAllProjects();
      if (res?.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error('Lỗi khi tải danh sách dự án:', err);
      setError(err.message || 'Không thể tải danh sách dự án!');
    } finally {
      setLoading(false);
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
      console.error('Lỗi khi tải lời mời dự án:', err);
    } finally {
      setLoadingInvites(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    fetchInvites();
  }, [fetchProjects, fetchInvites]);

  // Handle Accept Invite
  const handleAcceptInvite = async (invite) => {
    try {
      setActionInProgressId(invite.id);
      await inviteService.acceptInvite(invite.id);
      setToastMessage(`Đã tham gia dự án "${invite.projectName}" thành công!`);
      setTimeout(() => setToastMessage(''), 4000);

      // Refresh both invites and projects
      await fetchInvites();
      await fetchProjects();
    } catch (err) {
      alert('Chấp nhận lời mời thất bại: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setActionInProgressId(null);
    }
  };

  // Handle Decline Invite
  const handleDeclineInvite = async (inviteId) => {
    if (!confirm('Bạn có chắc chắn muốn từ chối lời mời này?')) return;
    try {
      setActionInProgressId(inviteId);
      await inviteService.declineInvite(inviteId);
      setToastMessage('Đã từ chối lời mời tham gia dự án.');
      setTimeout(() => setToastMessage(''), 3000);

      await fetchInvites();
    } catch (err) {
      alert('Từ chối lời mời thất bại: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setActionInProgressId(null);
    }
  };

  // Đếm số lượng theo quyền & lời mời
  const counts = {
    all: projects.length,
    owner: projects.filter((p) => (p.role || '').toUpperCase().includes('OWNER')).length,
    shared: projects.filter((p) => !(p.role || '').toUpperCase().includes('OWNER')).length,
    invites: invites.length,
  };

  // Lọc theo tab & ô tìm kiếm
  const filteredProjects = projects.filter((p) => {
    const isOwnerRole = (p.role || '').toUpperCase().includes('OWNER');
    if (activeTab === 'owner' && !isOwnerRole) return false;
    if (activeTab === 'shared' && isOwnerRole) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = (p.title || p.name || '').toLowerCase();
      const desc = (p.desc || p.description || '').toLowerCase();
      return title.includes(q) || desc.includes(q);
    }
    return true;
  });

  // Filtered invites for search
  const filteredInvites = invites.filter((inv) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const name = (inv.projectName || '').toLowerCase();
    const inviter = (inv.inviterName || inv.inviterEmail || '').toLowerCase();
    const desc = (inv.projectDescription || '').toLowerCase();
    return name.includes(q) || inviter.includes(q) || desc.includes(q);
  });

  const handleSelectProject = (project) => {
    navigate(`/projects/${project.id}/dashboard`, { state: { project } });
  };

  const handleCreateProjectSubmit = async (newProjectData) => {
    try {
      const inviteEmailsStr = Array.isArray(newProjectData.inviteEmails)
        ? newProjectData.inviteEmails.map((e) => (typeof e === 'string' ? e.trim() : '')).filter(Boolean).join(',')
        : (newProjectData.inviteEmails?.trim() || '');

      const payload = {
        name: newProjectData.name,
        title: newProjectData.name,
        description: newProjectData.description || 'Không gian tài liệu dự án mới tạo.',
        maxFileSize: newProjectData.maxFileSize || '50 MB',
        allowedFormats: newProjectData.allowedFormats || ['pdf', 'docx', 'xlsx'],
        inviteEmails: inviteEmailsStr || null,
      };
      await projectService.createProject(payload);
      setIsModalOpen(false);
      await fetchProjects();
    } catch (err) {
      alert('Tạo dự án thất bại: ' + (err.message || 'Lỗi không xác định'));
    }
  };

  const userFullName = user?.fullName || 'Người dùng';
  const userInitials = user?.initials || (user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'KB');

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#064E3B] text-[#ECFDF5] border border-[#059669] px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
          <svg className="w-5 h-5 text-[#34D399]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* 1. Global Topbar */}
      <HubTopbar
        userName={userFullName}
        userInitials={userInitials}
        invites={invites}
        loadingInvites={loadingInvites}
        onAcceptInvite={handleAcceptInvite}
        onDeclineInvite={handleDeclineInvite}
        fetchInvites={fetchInvites}
        onOpenInvitesTab={() => setActiveTab('invites')}
      />

      {/* 2. Main Body Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-8 flex flex-col gap-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-[26px] font-bold text-slate-900 tracking-tight">
              Không gian Dự án của bạn
            </h1>
            <p className="text-[14px] text-slate-500">
              Quản lý tập trung tài liệu kỹ thuật, thành viên và cơ sở tri thức AI cho từng dự án.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="h-[42px] px-4.5 flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white rounded-btn text-[14px] font-semibold transition-all shadow-sm hover:shadow cursor-pointer shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Tạo Dự Án Mới</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-[14px] flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchProjects} className="font-semibold underline hover:text-red-800">
              Thử lại
            </button>
          </div>
        )}

        {/* Filter & Search Toolbar */}
        <ProjectsFilterBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
        />

        {/* Tab: Invites Content */}
        {activeTab === 'invites' ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-bold text-slate-800">
                Lời mời tham gia dự án đang chờ xử lý ({invites.length})
              </h2>
              <button
                type="button"
                onClick={fetchInvites}
                className="text-xs text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <svg className={`w-3.5 h-3.5 ${loadingInvites ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                  <path d="M16 21h5v-5" />
                </svg>
                <span>Làm mới danh sách</span>
              </button>
            </div>

            {loadingInvites && invites.length === 0 ? (
              <div className="w-full py-16 flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-[14px]">Đang kiểm tra danh sách lời mời...</p>
              </div>
            ) : filteredInvites.length === 0 ? (
              <div className="w-full py-16 px-6 bg-white border border-slate-200 rounded-[12px] flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <h3 className="text-[16px] font-bold text-slate-800">
                  {searchQuery ? 'Không tìm thấy lời mời nào phù hợp' : 'Không có lời mời nào'}
                </h3>
                <p className="text-[13px] text-slate-500 max-w-sm mt-1">
                  {searchQuery
                    ? 'Hãy thử tìm kiếm với từ khóa khác.'
                    : 'Hiện tại bạn chưa có lời mời tham gia dự án nào đang chờ xử lý. Các lời mời gửi đến email của bạn sẽ hiển thị tại đây.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredInvites.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-[12px] shadow-xs hover:shadow-md transition-all gap-4"
                  >
                    {/* Top Row: Icon, Project Name & Role Tag */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                          </svg>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shrink-0">
                          {formatRole(inv.role)}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-[16px] font-bold text-slate-900 line-clamp-1">
                          {inv.projectName || 'Dự án không có tên'}
                        </h3>
                        <p className="text-[12px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <span>Người mời:</span>
                          <span className="font-semibold text-slate-700">
                            {inv.inviterName || inv.inviterEmail || 'Chủ dự án'}
                          </span>
                        </p>
                      </div>

                      <p className="text-[13px] leading-[19px] text-slate-500 line-clamp-2">
                        {inv.projectDescription || 'Dự án cộng tác quản lý tài liệu và hỏi đáp AI.'}
                      </p>
                    </div>

                    {/* Expiry & Actions */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>
                          {inv.sentDate ? `Gửi ngày: ${inv.sentDate}` : 'Đang chờ xác nhận'}
                        </span>
                        <span>
                          {inv.expiresAt ? `Hạn: ${new Date(inv.expiresAt).toLocaleDateString('vi-VN')}` : 'Hết hạn sau 7 ngày'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          disabled={actionInProgressId === inv.id}
                          onClick={() => handleDeclineInvite(inv.id)}
                          className="flex-1 h-9 px-3 text-[13px] font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 rounded-lg transition-colors cursor-pointer"
                        >
                          Từ chối
                        </button>
                        <button
                          type="button"
                          disabled={actionInProgressId === inv.id}
                          onClick={() => handleAcceptInvite(inv)}
                          className="flex-1 h-9 px-3 text-[13px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {actionInProgressId === inv.id ? (
                            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                          <span>Chấp nhận</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Projects Grid */
          loading ? (
            <div className="w-full py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-[14px]">Đang tải danh sách dự án...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => handleSelectProject(project)}
                />
              ))}

              {/* Quick Add Project Card */}
              <CreateProjectCard onClick={() => setIsModalOpen(true)} />
            </div>
          )
        )}

      </main>

      {/* 3. Modal Dialog Card Tạo Dự Án Mới */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProjectSubmit}
      />
    </div>
  );
}
