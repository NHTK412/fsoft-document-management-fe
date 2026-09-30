import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatRole } from '@/utils/formatRole';
import { useAuth } from '@/contexts';
import UserHeaderDropdown from '@/components/common/UserHeaderDropdown';

export const HubTopbar = ({
  userName = 'Nguyễn Văn A',
  userInitials = 'NV',
  invites = [],
  loadingInvites = false,
  onAcceptInvite,
  onDeclineInvite,
  fetchInvites,
  onOpenInvitesTab,
}) => {
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [actionInProgressId, setActionInProgressId] = useState(null);
  const notificationRef = useRef(null);

  // Close notification popover on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleNotification = () => {
    const nextState = !isNotificationOpen;
    setIsNotificationOpen(nextState);
    if (nextState && fetchInvites) {
      fetchInvites();
    }
  };

  const handleAccept = async (invite) => {
    if (!onAcceptInvite) return;
    try {
      setActionInProgressId(invite.id);
      await onAcceptInvite(invite);
    } finally {
      setActionInProgressId(null);
    }
  };

  const handleDecline = async (inviteId) => {
    if (!onDeclineInvite) return;
    try {
      setActionInProgressId(inviteId);
      await onDeclineInvite(inviteId);
    } finally {
      setActionInProgressId(null);
    }
  };

  return (
    <header className="w-full h-[64px] shrink-0 px-6 lg:px-8 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-20">
      {/* Brand Left */}
      <div className="flex items-center gap-3">
        <Link to="/projects" className="flex items-center gap-3">
          <div className="w-9 h-9 shrink-0 flex items-center justify-center bg-primary-600 rounded-lg shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-white"
            >
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              <path d="M20 3v4" />
              <path d="M22 5h-4" />
            </svg>
          </div>
          <span className="text-[20px] font-bold text-slate-900 tracking-tight">KBase</span>
        </Link>

        <div className="w-[1px] h-5 bg-slate-200 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 text-slate-500"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span className="text-[12px] font-medium text-slate-600">Không gian làm việc</span>
        </div>
      </div>

      {/* Topbar Actions Right */}
      <div className="flex items-center gap-3">
        {/* Bell Button with Invites Notification */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={toggleNotification}
            className={`w-9 h-9 flex items-center justify-center bg-white hover:bg-slate-50 border rounded-btn text-slate-500 transition-colors cursor-pointer relative ${
              isNotificationOpen ? 'border-primary-500 bg-primary-50/40 text-primary-600' : 'border-slate-200'
            }`}
            aria-label="Thông báo và lời mời"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-slate-500"
            >
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

          {/* Invites Dropdown */}
          {isNotificationOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-[340px] sm:w-[380px] bg-white border border-slate-200 rounded-[12px] shadow-2xl p-0 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden">
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
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Làm mới"
                >
                  <svg
                    className={`w-3.5 h-3.5 ${loadingInvites ? 'animate-spin text-primary-600' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
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
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                    <span>Đang kiểm tra lời mời...</span>
                  </div>
                ) : invites.length === 0 ? (
                  <div className="py-8 px-4 text-center">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p className="text-xs font-medium text-slate-600">Bạn không có lời mời nào đang chờ xử lý</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Khi có người mời vào dự án, thông báo sẽ hiển thị tại đây.</p>
                  </div>
                ) : (
                  invites.map((inv) => (
                    <div key={inv.id} className="p-3.5 hover:bg-slate-50/80 transition-colors flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {inv.projectName || 'Dự án'}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            Người mời: <span className="font-semibold text-slate-700">{inv.inviterName || inv.inviterEmail}</span>
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary-50 text-primary-700 border border-primary-200/60 shrink-0">
                          {formatRole(inv.role)}
                        </span>
                      </div>

                      {inv.projectDescription && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 italic">
                          "{inv.projectDescription}"
                        </p>
                      )}

                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-50">
                        <button
                          type="button"
                          disabled={actionInProgressId === inv.id}
                          onClick={() => handleDecline(inv.id)}
                          className="px-2.5 py-1 text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 rounded font-medium transition-colors cursor-pointer"
                        >
                          Từ chối
                        </button>
                        <button
                          type="button"
                          disabled={actionInProgressId === inv.id}
                          onClick={() => handleAccept(inv)}
                          className="px-3 py-1 text-xs bg-primary-600 hover:bg-primary-700 text-white rounded font-medium transition-colors shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          {actionInProgressId === inv.id ? (
                            <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : null}
                          <span>Chấp nhận</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsNotificationOpen(false);
                    onOpenInvitesTab?.();
                  }}
                  className="w-full py-1.5 px-2.5 flex items-center justify-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 hover:bg-primary-50/50 rounded-md font-medium transition-colors cursor-pointer"
                >
                  <span>Xem chi tiết danh sách lời mời trên Hub</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Portal Button */}
        {user?.role === 'ROLE_ADMIN' && (
          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 text-indigo-700 border border-indigo-200 rounded-full text-xs font-semibold transition-all no-underline shadow-2xs"
          >
            <svg className="w-3.5 h-3.5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            <span>Trang Quản Trị</span>
          </Link>
        )}

        {/* User Profile Dropdown on Hover */}
        <UserHeaderDropdown />
      </div>
    </header>
  );
};
