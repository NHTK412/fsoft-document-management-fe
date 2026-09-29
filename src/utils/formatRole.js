/**
 * Chuyển đổi mã vai trò (Owner, Admin, Member, Viewer, User, ROLE_USER, ROLE_OWNER, ...) sang nhãn tiếng Việt chuẩn
 */
export function formatRole(role) {
  if (!role) return "Thành viên";
  const r = role.toString().trim().toUpperCase();

  if (r === "OWNER" || r === "ROLE_OWNER") {
    return "Chủ sở hữu";
  }
  if (r === "ADMIN" || r === "ROLE_ADMIN") {
    return "Quản trị viên";
  }
  if (r === "VIEWER" || r === "ROLE_VIEWER") {
    return "Người xem";
  }
  if (r === "MEMBER" || r === "ROLE_MEMBER") {
    return "Thành viên";
  }
  if (r === "USER" || r === "ROLE_USER") {
    return "Người dùng";
  }

  // Fallback nếu có tiền tố khác
  if (r.includes("OWNER")) return "Chủ sở hữu";
  if (r.includes("ADMIN")) return "Quản trị viên";
  if (r.includes("VIEWER")) return "Người xem";
  if (r.includes("MEMBER")) return "Thành viên";
  if (r.includes("USER")) return "Người dùng";

  return role;
}

export default formatRole;
