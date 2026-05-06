import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DropdownItem {
  to: string;
  label: string;
}

interface SidebarDropdownProps {
  icon: LucideIcon;
  label: string;
  items: DropdownItem[];
  collapsed: boolean;
  activePath?: string;
}

export const SidebarDropdown = ({ icon: Icon, label, items, collapsed }: SidebarDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = items.some((item) => location.pathname === item.to);

  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  return (
    <div className="space-y-1">
      <button
        onClick={() => !collapsed && setIsOpen(!isOpen)}
        title={collapsed ? label : ''}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive && !isOpen
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
        } ${collapsed ? 'justify-center px-0' : ''}`}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="font-medium truncate">{label}</span>}
        </div>
        {!collapsed && (
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && !collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-12 space-y-1"
          >
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.to ? 'text-indigo-600' : 'text-slate-500 hover:text-indigo-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
