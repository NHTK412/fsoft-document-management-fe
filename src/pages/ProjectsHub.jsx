import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HubTopbar,
  ProjectCard,
  CreateProjectCard,
  ProjectsFilterBar,
  CreateProjectModal,
} from '@/components/hub';

// Danh sách dữ liệu dự án mẫu theo đúng bản thiết kế
const INITIAL_PROJECTS = [
  {
    id: 'kb-ai-core',
    title: 'AI Knowledge Core & LLM Pipeline',
    desc: 'Cơ sở tri thức kiến trúc AI, pipeline chunking vector embeddings, cấu hình Milvus DB và prompt templates.',
    role: 'Owner',
    iconBg: '#EEF2FF',
    iconColor: '#4F46E5',
    updatedAt: '10 phút trước',
    docsCount: '248 tệp',
    membersCount: '12 thành viên',
    avatars: ['#4F46E5', '#059669', '#D97706', '#7C3AED'],
    extraMembers: 8,
  },
  {
    id: 'kb-devops',
    title: 'Kiến trúc Cloud & Cụm Kubernetes',
    desc: 'Tài liệu hạ tầng K8s cụm Alpha, quy trình CI/CD GitHub Actions, cấu hình cụm lưu trữ MinIO S3 bảo mật cao.',
    role: 'Owner',
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
    updatedAt: '2 giờ trước',
    docsCount: '135 tệp',
    membersCount: '8 thành viên',
    avatars: ['#0284C7', '#4F46E5', '#DC2626'],
    extraMembers: 5,
  },
  {
    id: 'kb-mobile-app',
    title: 'KBase Mobile App (iOS & Android)',
    desc: 'Đặc tả kỹ thuật ứng dụng di động React Native, thiết kế UI hệ thống trên Figma và tài liệu API đồng bộ offline.',
    role: 'Member',
    iconBg: '#F3E8FF',
    iconColor: '#9333EA',
    updatedAt: 'Hôm qua',
    docsCount: '94 tệp',
    membersCount: '15 thành viên',
    avatars: ['#9333EA', '#059669', '#2563EB', '#D97706'],
    extraMembers: 11,
  },
  {
    id: 'kb-backend',
    title: 'Backend Microservices Go & NestJS',
    desc: 'Đặc tả kỹ thuật API Gateway, luồng xác thực JWT/OAuth2, cơ sở dữ liệu PostgreSQL và cơ chế hàng đợi Kafka.',
    role: 'Member',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    updatedAt: '3 ngày trước',
    docsCount: '312 tệp',
    membersCount: '20 thành viên',
    avatars: ['#D97706', '#4F46E5', '#0284C7', '#059669'],
    extraMembers: 16,
  },
  {
    id: 'kb-design',
    title: 'Thiết kế UI/UX & Design System v2',
    desc: 'Quy chuẩn thiết kế giao diện KBase, bộ thư viện UI components, tokens màu sắc, kiểu chữ và quy trình handover.',
    role: 'Owner',
    iconBg: '#FCE7F3',
    iconColor: '#DB2777',
    updatedAt: '5 ngày trước',
    docsCount: '68 tệp',
    membersCount: '6 thành viên',
    avatars: ['#DB2777', '#4F46E5', '#059669'],
    extraMembers: 3,
  },
];

export default function ProjectsHub() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Đếm số lượng theo quyền
  const counts = {
    all: projects.length,
    owner: projects.filter((p) => p.role.toLowerCase() === 'owner').length,
    shared: projects.filter((p) => p.role.toLowerCase() === 'member').length,
  };

  // Lọc theo tab & ô tìm kiếm
  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'owner' && p.role.toLowerCase() !== 'owner') return false;
    if (activeTab === 'shared' && p.role.toLowerCase() !== 'member') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectProject = (project) => {
    navigate(`/projects/${project.id}/dashboard`, { state: { project } });
  };

  const handleCreateProjectSubmit = (newProjectData) => {
    const newProject = {
      id: `kb-${Date.now()}`,
      title: newProjectData.name,
      desc: newProjectData.description || 'Không gian tài liệu dự án mới tạo.',
      role: 'Owner',
      iconBg: '#EEF2FF',
      iconColor: '#4F46E5',
      updatedAt: 'Vừa xong',
      docsCount: '0 tệp',
      membersCount: `${(newProjectData.inviteEmails?.length || 0) + 1} thành viên`,
      avatars: ['#4F46E5'],
      extraMembers: 0,
    };

    setProjects([newProject, ...projects]);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 font-sans">
      {/* 1. Global Topbar */}
      <HubTopbar userName="Nguyễn Văn A" userInitials="NV" />

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

        {/* Filter & Search Toolbar */}
        <ProjectsFilterBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
        />

        {/* Projects Grid */}
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
