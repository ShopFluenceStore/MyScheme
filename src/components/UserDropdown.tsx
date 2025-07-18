"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  LayoutDashboard,
  Settings,
  LogOut,
  FileText,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

const UserDropdown: React.FC = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (status !== "authenticated") return null;

  const user = session?.user || {};
  const userInitial = user?.name?.charAt(0).toUpperCase() || 'U';
  const userEmail = user?.email || '';
  const userName = user?.name || 'User';

  const menuItems = [
    { 
      icon: <UserCircle className="w-4 h-4" />, 
      label: 'Profile', 
      href: '/profile' 
    },
    { 
      icon: <LayoutDashboard className="w-4 h-4" />, 
      label: 'Dashboard', 
      href: '/dashboard' 
    },
    { 
      icon: <FileText className="w-4 h-4" />, 
      label: 'My Schemes', 
      href: '/my-schemes' 
    },
    { 
      icon: <Settings className="w-4 h-4" />, 
      label: 'Settings', 
      href: '/settings' 
    },
    { 
      icon: <HelpCircle className="w-4 h-4" />, 
      label: 'Help & Support', 
      href: '/help' 
    },
  ];

  return (
    <div className="relative z-30" ref={dropdownRef}>
      {/* User Button */}
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-medium">
          {user.image ? (
            <Image
              src={user.image}
              alt={userName}
              width={32}
              height={32}
              className="rounded-full object-cover w-full h-full"
            />
          ) : (
            userInitial
          )}
        </div>
        <span className="hidden md:inline text-sm font-medium text-[var(--text)]">
          {userName.split(' ')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-[var(--bg-primary)] rounded-lg shadow-lg border border-[var(--border)] overflow-hidden"
          >
            {/* User Info */}
            <div className="p-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-lg font-medium">
                  {userInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text)] truncate">{userName}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text)] hover:bg-[var(--bg-secondary)] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-[var(--text-secondary)]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-[var(--border)]">
              <button
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
