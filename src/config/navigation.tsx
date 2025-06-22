import { MessageSquare, User, Briefcase, Laptop, BookOpen } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const navItems: NavItem[] = [
  { id: "chat", label: "Chat", icon: <MessageSquare size={20} />, href: "/" },
  { id: "about", label: "About Me", icon: <User size={20} />, href: "/about" },
  { id: "projects", label: "Projects", icon: <Briefcase size={20} />, href: "/projects" },
  { id: "side-projects", label: "Gallery", icon: <Laptop size={20} />, href: "/side-projects" },
  { id: "blog", label: "Blog", icon: <BookOpen size={20} />, href: "/blog" },
]; 