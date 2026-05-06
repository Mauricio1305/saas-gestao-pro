import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  active: boolean;
  collapsed: boolean;
}

export const SidebarItem = ({ icon: Icon, label, to, active, collapsed }: SidebarItemProps) => (
  <Link 
    to={to} 
    title={collapsed ? label : ''}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
    } ${collapsed ? 'justify-center px-0' : ''}`}
  >
    <Icon className="w-5 h-5 shrink-0" />
    {!collapsed && <span className="font-medium truncate">{label}</span>}
  </Link>
);
