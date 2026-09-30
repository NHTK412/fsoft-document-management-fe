/**
 * Tiện ích định dạng ngày giờ chuẩn tiếng Việt, dễ đọc, thân thiện với người dùng
 */

/**
 * Định dạng ngày dạng: "29/09/2026" hoặc "29 thg 9, 2026"
 */
export function formatDate(dateInput, format = 'standard') {
  if (!dateInput) return '—';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);

    if (format === 'readable') {
      const day = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();
      return `${day} thg ${month}, ${year}`;
    }

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return String(dateInput);
  }
}

/**
 * Định dạng ngày giờ: "14:30 - 29/09/2026"
 */
export function formatDateTime(dateInput) {
  if (!dateInput) return '—';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${hours}:${minutes} - ${day}/${month}/${year}`;
  } catch {
    return String(dateInput);
  }
}

/**
 * Định dạng thời gian tương đối thân thiện: "Vừa xong", "5 phút trước", "2 giờ trước", "3 ngày trước"
 */
export function formatRelativeTime(dateInput) {
  if (!dateInput) return '—';
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return String(dateInput);

    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    if (diffMs < 0) return formatDate(d);

    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) return 'Vừa xong';
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return formatDate(d);
  } catch {
    return String(dateInput);
  }
}
