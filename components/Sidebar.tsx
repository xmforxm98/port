import React from "react";
import { Button } from "./ui/button";
import { Plus, MessageSquare, User, Briefcase, Laptop, BookOpen, Menu as MenuIcon, X } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { useAuth } from "./auth/AuthContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { cn } from "../lib/utils"; // Assuming you have a `cn` utility

interface SidebarContentProps {
  onNewChat: () => void;
  onSelectOption: (option: string) => void;
  currentSection: string | null;
  collapsed: boolean;
}

export function SidebarContent({ onNewChat, onSelectOption, currentSection, collapsed }: SidebarContentProps) {
  const { user } = useAuth();
  
  const mainSections = [
    { id: "chat", label: "Chat", icon: <MessageSquare size={16} /> },
    { id: "about", label: "About Me", icon: <User size={16} /> },
    { id: "projects", label: "My Projects", icon: <Briefcase size={16} /> },
    { id: "side-projects", label: "Side Projects", icon: <Laptop size={16} /> },
    { id: "blog", label: "Designer Blog", icon: <BookOpen size={16} /> },
  ];

  const NavItem = ({ section, isSelected, onClick, collapsed }: any) => (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full flex justify-start items-center gap-3 p-3 rounded-lg text-sm",
        isSelected ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground",
        collapsed ? "px-3" : "px-4"
      )}
    >
      {section.icon}
      {!collapsed && <span className="truncate">{section.label}</span>}
    </Button>
  );

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <div className="flex items-center h-16 px-4 border-b border-white/10 shrink-0">
        {!collapsed && (
          <div className="flex-1 font-medium">
            <div className="text-primary text-sm">YONGWOO KIM</div>
            <div className="text-muted-foreground text-xs">Data-driven Designer</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
        <Button
          variant="ghost"
          onClick={onNewChat}
          className="w-full flex justify-start items-center gap-3 p-3 rounded-lg text-sm text-white hover:bg-accent/50 hover:text-white"
        >
          <Plus size={16} />
          {!collapsed && <span className="truncate">New conversation</span>}
        </Button>
        
        <div className="text-xs font-medium text-muted-foreground mt-4 mb-2 px-3 uppercase tracking-wider">
          {!collapsed ? "Menu" : "•"}
        </div>
        
        {mainSections.map((section) => (
          <NavItem 
            key={section.id}
            section={section}
            isSelected={currentSection === section.id}
            onClick={() => onSelectOption(section.id)}
            collapsed={collapsed}
          />
        ))}
      </nav>
      
      {/* Profile */}
      <div className="p-3 border-t border-white/10 shrink-0">
        {user ? (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              {user.avatar ? (
                <ImageWithFallback src={user.avatar} alt={user.name!} />
              ) : (
                <div className="bg-primary text-primary-foreground flex items-center justify-center h-full w-full text-xs">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </Avatar>
            {!collapsed && (
              <div className="flex-1 truncate">
                <div className="font-medium text-sm">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}