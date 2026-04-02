"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();
  
  // Don't show sidebar on landing page
  if (pathname === '/') return null;

  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/dashboard' },
    { name: 'Negotiations', icon: '📝', path: '/negotiations' },
    { name: 'Suppliers', icon: '🏢', path: '/suppliers' },
    { name: 'Analytics', icon: '📈', path: '/analytics' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <aside className="w-72 h-screen bg-surface-container flex flex-col z-40 transition-all duration-300 ease-in-out">
      {/* Brand / Logo Section */}
      <div className="p-8 pb-12">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
            <span className="text-xl font-bold">P</span>
          </div>
          <h1 className="text-2xl font-bold font-display tracking-tighter text-foreground group-hover:text-primary transition-colors">
            Procure<span className="text-primary italic">AI</span>
          </h1>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`
                flex items-center gap-4 px-6 py-3 text-sm font-medium rounded-sm transition-all duration-200
                ${isActive 
                  ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                  : 'text-foreground/40 hover:bg-white/5 hover:text-foreground/80'}
              `}
            >
              <span className={`text-lg ${isActive ? 'opacity-100' : 'opacity-40 grayscale group-hover:grayscale-0'}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      {/* User / Profile Section */}
      <div className="p-6 bg-surface-container-high/30">
        <div className="flex items-center gap-4 px-4 py-3 surface-card cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-xs font-bold font-display">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground font-display leading-none mb-1">John Doe</span>
            <span className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold">Chief Procurement</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
