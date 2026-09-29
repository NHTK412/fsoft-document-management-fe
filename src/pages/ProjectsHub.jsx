import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HubTopbar,
  ProjectCard,
  CreateProjectCard,
  ProjectsFilterBar,
  CreateProjectModal,
} from '@/components/hub';
import { projectService } from '@/services';
import { useAuth } from '@/contexts';

export default function ProjectsHub() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Đếm số lượng theo quyền
  const counts = {
    all: projects.length,
    owner: projects.filter((p) => (p.role || '').toLowerCase() === 'owner').length,
    shared: projects.filter((p) => (p.role || '').toLowerCase() !== 'owner').length,
  };

  // Lọc theo tab & ô tìm kiếm
  const filteredProjects = projects.filter((p) => {
    const roleLower = (p.role || '').toLowerCase();
    if (activeTab === 'owner' && roleLower !== 'owner') return false;
    if (activeTab === 'shared' && roleLower === 'owner') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const title = (p.title || p.name || '').toLowerCase();
      const desc = (p.desc || p.description || '').toLowerCase();
      return title.includes(q) || desc.includes(q);
    }
    return true;
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
      {/* 1. Global Topbar */}
      <HubTopbar userName={userFullName} userInitials={userInitials} />

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

        {/* Projects Grid */}
        {loading ? (
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
