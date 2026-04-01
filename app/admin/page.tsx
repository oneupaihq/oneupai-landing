import { redirect } from 'next/navigation';

export default function AdminPage() {
  // For now, redirect to blog admin, but you could create a dashboard here
  // that shows links to /admin/blog, /admin/calendar, /admin/chat, etc.
  redirect('/admin/blog');
}
