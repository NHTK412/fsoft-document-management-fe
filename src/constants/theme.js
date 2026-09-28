
export const COLORS = {

  primary: {
    50: '#EEF2FF',  // Nền icon, nền badge tím nhạt, nền hover nút phụ
    100: '#E0E7FF', // Viền badge, trạng thái hover thẻ
    200: '#C7D2FE', // Viền ô lựa chọn, stroke pill đã chọn
    400: '#818CF8', // Icon phụ trợ trên nền tối, thanh tiến trình
    500: '#6366F1', // Màu hover của nút chính
    600: '#4F46E5', // Màu thương hiệu chính (Primary Action, Active Nav, Avatar default)
    700: '#4338CA', // Trạng thái active/press của nút chính, text tiêu đề thẻ chọn
    800: '#3730A3', // Màu chữ trên nền pill primary-50
    900: '#312E81', // Nền badge số lượng trên nền menu tối
  },

  dark: {
    sidebar: '#0B0F19', // Nền Sidebar dự án, nền toàn trang System Admin Portal
    surface: '#0F172A', // Nền thẻ (Card), Header của trang Admin Portal
    card: '#1E293B',    // Nền khối con, hàng bảng trên trang Admin
    border: '#334155',  // Đường viền ngăn cách trên nền tối
  },

  neutral: {
    white: '#FFFFFF',   // Nền thẻ nội dung, nền Topbar, chữ trên nút chính
    slate50: '#F8FAFC', // Nền tổng thể toàn bộ trang (Canvas Background), nền input xám nhạt
    slate100: '#F1F5F9',// Nền tag phụ, nền icon box phụ
    slate200: '#E2E8F0',// Đường viền phân cách mặc định của toàn bộ thẻ card & Topbar
    slate300: '#CBD5E1',// Đường viền ô nhập liệu (Input stroke), viền nút thứ cấp
    slate400: '#94A3B8',// Chữ menu sidebar inactive, text chú thích nhỏ
    slate500: '#64748B',// Màu chữ icon inactive, placeholder tìm kiếm, breadcrumb
    slate600: '#475569',// Màu chữ phụ trên nền sáng, nhãn mô tả cấp 2
    slate800: '#1E293B',// Màu chữ nội dung (Body Text), giá trị trong input
    slate900: '#0F172A',// Màu chữ tiêu đề chính (Heading Text)
  },


  success: {
    50: '#ECFDF5',  // Nền badge "Owner", "Verified", "Hoạt động"
    100: '#DCFCE7', // Nền thẻ "Thiết bị hiện tại", badge trạng thái xanh lá
    200: '#BBF7D0', // Viền thẻ phiên hoạt động
    500: '#10B981', // Text vai trò "Admin", chấm trạng thái trực tuyến
    600: '#059669', // Text vai trò "Owner", text verified
    700: '#15803D', // Text trạng thái thành công đậm
  },

  danger: {
    50: '#FFF5F5',  // Nền khối Vùng nguy hiểm, nền nút Đăng xuất
    100: '#FED7D7', // Viền khối Vùng nguy hiểm
    200: '#FCA5A5', // Viền nút hành động nguy hiểm
    400: '#F87171', // Text trạng thái "Bị khóa", icon nguy hiểm
    500: '#EF4444', // Nút xóa vĩnh viễn, thẻ Super Admin Portal
    600: '#DC2626', // Nút hủy quyền, đăng xuất tất cả thiết bị
    800: '#991B1B', // Tiêu đề Vùng nguy hiểm
    900: '#7F1D1D', // Nền badge Super Admin trên theme tối
  },

  warning: {
    50: '#FEF3C7',  // Nền badge lưu ý
    400: '#FBBF24', // Icon cảnh báo hạ tầng, tiến trình lưu trữ
    500: '#F59E0B', // Icon Shield Portal Admin, huy hiệu cảnh báo
  },

  info: {
    50: '#E0F2FE',  // Nền icon lưu trữ MinIO
    400: '#38BDF8', // Thanh tiến trình dung lượng MinIO
    600: '#0284C7', // Icon và nhãn lưu trữ MinIO Storage
  },

  purple: {
    50: '#FAF5FF',  // Nền thẻ AI Gemini Model, icon Bot
    600: '#9333EA', // Text nhãn Gemini 1.5 Pro, AI Assistant
  },
};

export const TYPOGRAPHY = {
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  sizes: {
    display: { size: '24px', weight: 700, lineHeight: '32px' },       // H1, Tiêu đề lớn (Login, Admin Portal)
    pageTitle: { size: '22px', weight: 700, lineHeight: '28px' },     // Tiêu đề trang (Settings, Members, Hub)
    sectionTitle: { size: '16px', weight: 600, lineHeight: '24px' },  // Tiêu đề thẻ Card, tên bảng dữ liệu
    sectionTitleSm: { size: '15px', weight: 600, lineHeight: '22px' },// Tiêu đề phụ của thẻ
    subtitle: { size: '13px', weight: 400, lineHeight: '18px' },      // Mô tả phụ ngay dưới tiêu đề
    body: { size: '13px', weight: 400, lineHeight: '20px' },          // Giá trị nhập form, nội dung văn bản
    navItem: { size: '13px', weight: 500, lineHeight: '20px' },       // Danh mục menu điều hướng
    tableHeader: { size: '11px', weight: 600, lineHeight: '16px' },   // Tiêu đề cột bảng (Viết hoa toàn bộ)
    badge: { size: '11px', weight: 600, lineHeight: '14px' },         // Huy hiệu trạng thái, đếm số lượng
    badgeSm: { size: '10px', weight: 600, lineHeight: '14px' },       // Huy hiệu siêu nhỏ
    shortcutKey: { size: '10px', weight: 600, lineHeight: '14px' },   // Phím tắt (VD: ⌘ K)
  },
};

export const LAYOUT = {
  screen: {
    desktopWidth: 1440,
    desktopHeight: 1024,
    gapX: 80,
    gapY: 140,
  },
  sidebar: {
    width: 260,
    bgColor: '#0B0F19',
    padding: '24px 16px',
  },
  topbar: {
    height: 64,
    padding: '0 24px',
    bgColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  contentArea: {
    width: 1180,
    usableWidth: 1124,
    padding: '24px 28px',
  },
  spacing: {
    xs: '4px',   // Khoảng cách nhãn - input, dòng text chặt chẽ
    sm: '6px',   // Khoảng cách icon - chữ trong badge/pill
    md: '8px',   // Khoảng cách button nhỏ, linked items
    lg: '12px',  // Khoảng cách giữa các form input
    xl: '16px',  // Khoảng cách tiêu chuẩn giữa các Card lớn
    '2xl': '20px', // Đệm tiêu chuẩn trong card (Padding: 20px)
    '3xl': '24px', // Khoảng cách cột form chính (Column gap)
    '4xl': '28px', // Khoảng cách lưới lớn
  },
  radius: {
    card: '12px',
    button: '8px',
    buttonSm: '6px',
    pill: '9999px',
  },
};

export const COMPONENT_SPECS = {
  buttons: {
    primary: {
      height: '38px',
      radius: '8px',
      bg: '#4F46E5',
      text: '#FFFFFF',
      fontSize: '13px',
      fontWeight: 700,
    },
    secondary: {
      height: '38px',
      radius: '8px',
      bg: '#FFFFFF',
      border: '1px solid #CBD5E1',
      text: '#475569',
      fontSize: '13px',
      fontWeight: 500,
    },
    destructive: {
      height: '38px',
      radius: '8px',
      bg: '#EF4444',
      text: '#FFFFFF',
      fontSize: '13px',
      fontWeight: 700,
    },
    dangerOutline: {
      height: '34px',
      radius: '6px',
      bg: '#FFFFFF',
      border: '1px solid #FCA5A5',
      text: '#DC2626',
      fontSize: '12px',
      fontWeight: 600,
    },
    iconButton: {
      height: '34px',
      width: '34px',
      radius: '6px',
      border: '1px solid #E2E8F0',
      text: '#64748B',
    },
  },
  cards: {
    radius: '12px',
    padding: '20px',
    light: {
      bg: '#FFFFFF',
      border: '1px solid #E2E8F0',
    },
    dark: {
      bg: '#0F172A',
      border: '1px solid #1E293B',
    },
  },
  inputs: {
    searchWidth: '280px',
    searchHeight: '36px',
    searchRadius: '8px',
    searchBg: '#F8FAFC',
  },
};

export const ROLE_PERMISSIONS = {
  PROJECTS_HUB: {
    SUPER_ADMIN: 'Xem tất cả',
    PROJECT_OWNER: 'Xem dự án sở hữu/tham gia',
    MEMBER: 'Xem dự án được mời',
  },
  CREATE_PROJECT: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: true,
    MEMBER: true, // Trở thành Owner của dự án mới
  },
  DOCUMENTS_VIEW_DOWNLOAD: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: true,
    MEMBER: true,
  },
  DOCUMENTS_DELETE: {
    SUPER_ADMIN: 'ALL', // Toàn quyền
    PROJECT_OWNER: 'PROJECT', // Toàn quyền trong dự án
    MEMBER: 'SELF_ONLY', // Chỉ tệp do mình upload
  },
  AI_CHATBOT: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: true,
    MEMBER: true,
  },
  MEMBERS_MANAGEMENT: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: true,
    MEMBER: false,
  },
  PROJECT_SETTINGS: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: true,
    MEMBER: false,
  },
  DANGER_ZONE: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: true,
    MEMBER: false,
  },
  SYSTEM_ADMIN_PORTAL: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: false,
    MEMBER: false,
  },
  USER_PROFILE: {
    SUPER_ADMIN: true,
    PROJECT_OWNER: true,
    MEMBER: true,
  },
};

export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
  PROJECT_OWNER: 'Project Owner',
  MEMBER: 'Member / User',
};

export default {
  COLORS,
  TYPOGRAPHY,
  LAYOUT,
  COMPONENT_SPECS,
  ROLE_PERMISSIONS,
  ROLES,
};
