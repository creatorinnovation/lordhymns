import React, { useState } from 'react';
import {
    Home,
    LayoutDashboard,
    User,
    Settings,
    Bell,
    Search,
    ChevronDown,
    LogOut,
} from 'lucide-react';
import { Link } from '@inertiajs/react';

// Sidebar Menu Items Configuration
const navItems = [
    //   { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', link: route('admin.dashboard'), icon: LayoutDashboard },
    { id: 'lyrics', label: 'Lyrics', link: route('songs.index'), icon: LayoutDashboard },
    { id: 'users', label: 'Users', link: '/dashboard/users', icon: User },
    { id: 'notifications', label: 'Alerts', link: 'dashboard', icon: Bell },
    { id: 'settings', label: 'Settings', link: 'dashboard', icon: Settings },
];

const AdminDashboardLayout = ({ children }) => {

    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <>
            <div className="flex h-full bg-slate-50 font-sans overflow-hidden">

                {/* --- DESKTOP SIDEBAR --- */}
                <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-indigo-600 mb-8">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                D
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-800">Dashboard</span>
                        </div>

                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <Link
                                        href={item.link}
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                            ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        <Icon size={20} className={isActive ? 'text-indigo-600' : 'group-hover:text-slate-900'} />
                                        <span className="font-medium text-sm">{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                        <Link href="/logout" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"><LogOut size={16} />Logout</Link>

                    </div>
                </aside>

                {/* --- MAIN CONTENT AREA --- */}
                <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">

                    {/* Mobile Header with Dropdown Menu */}
                    <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
                        <div className="font-bold text-indigo-600">MyBrand</div>

                        {/* Custom Select Dropdown for Mobile */}
                        <div className="relative w-48 z-2">
                            <select
                                value={activeTab}
                                onChange={(e) => setActiveTab(e.target.value)}
                                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
                            >
                                {navItems.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                <ChevronDown size={16} />
                            </div>
                        </div>
                    </header>

                    {/* Desktop Header (Search & Profile) */}
                    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Quick search..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64"
                            />
                        </div>
                        <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                    </header>

                    {children}

                    {/* Dynamic Content */}
                    {/* <div className="flex-1 overflow-y-auto p-4 md:p-4">
                        <div className="container mx-auto h-full flex items-center justify-center">
                            {children}
                        </div>
                    </div> */}
                </main>

            </div>
        </>
    )
}

export default AdminDashboardLayout


