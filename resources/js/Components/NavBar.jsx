import React, { useState, useEffect, useCallback, useContext } from 'react';

import {
    LayoutDashboard,
    Moon,
    Sun,
    Music,
    Menu,
    X,
    ChevronRight,
    ChevronLeft, // नया आइकन
    ChevronDown,
    ChevronUp,
    User,
    CreditCard,
    ShieldCheck,
    LogOut,
} from 'lucide-react';

import Logo from './Logo';
import { Link } from '@inertiajs/react';
// import Modal from '../components/Modal';

// --- Data Structures ---
const menuItems = [
    { name: 'Home', href: '/', isSubMenu: false },
    {
        name: 'Courses',
        href: '#courses',
        isSubMenu: true,
        submenu: [
            {
                name: 'Instruments', href: '#instruments', isSubMenu: true, submenu: [
                    { name: 'Acoustic Guitar', href: '#guitar', isSubMenu: false },
                    { name: 'Classical Piano', href: '#piano', isSubMenu: false },
                    { name: 'Violin Mastery', href: '#violin', isSubMenu: false },
                    { name: 'Drums & Percussion', href: '#drums', isSubMenu: false },
                ]
            },
            {
                name: 'Production & Theory', href: '#production', isSubMenu: true, submenu: [
                    { name: 'Music Production', href: '#production', isSubMenu: false },
                    { name: 'Advanced Theory', href: '#theory', isSubMenu: false },
                    { name: 'Sound Design', href: '#sound-design', isSubMenu: false },
                ]
            },
            { name: 'Vocal Training', href: '#vocals', isSubMenu: false },
        ]
    },
    { name: 'Faculty', href: '#faculty', isSubMenu: false },
    { name: 'Exam Boards', href: '#exam-boards', isSubMenu: false }, // नया मेनू आइटम
    { name: 'About', href: '#about', isSubMenu: false },
    { name: 'Gospel Songs', href: route('gospel-songs'), isSubMenu: false },
    { name: 'Contact', href: '#contact', isSubMenu: false },
];

// 3. Desktop Nav Item with Multi-Level Dropdown - unchanged
const DesktopNavItem = ({ item }) => {
    if (!item.isSubMenu || !item.submenu) {
        return (
            <Link href={item.href} className="text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                {item.name}
            </Link>
        );
    }

    return (
        <div className="relative group/level1">
            <Link
                href={item.href}
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
            >
                {item.name}
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/level1:rotate-180" />
            </Link>
            <div className="absolute left-0 top-full mt-0 pt-4 hidden group-hover/level1:block w-56 bg-white dark:bg-zinc-800 shadow-xl rounded-xl z-50 border border-zinc-100 dark:border-zinc-700 p-2 animate-in fade-in zoom-in-95 duration-200">
                {item.submenu.map((subItem) => (
                    <div key={subItem.name} className={`relative ${subItem.isSubMenu ? 'group/level2' : ''}`}>
                        <Link
                            href={subItem.href}
                            className="flex items-center justify-between px-3 py-2 text-zinc-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors w-full text-left text-sm"
                        >
                            {subItem.name}
                            {subItem.isSubMenu && <ChevronRight className="w-4 h-4 ml-2 text-zinc-400 group-hover/level2:text-blue-500 transition-colors" />}
                        </Link>
                        {subItem.isSubMenu && subItem.submenu && (
                            <div className="absolute left-full top-0 ml-2 hidden group-hover/level2:block w-56 bg-white dark:bg-zinc-800 shadow-xl rounded-xl z-60 border border-zinc-100 dark:border-zinc-700 p-2 animate-in fade-in zoom-in-95 duration-200">
                                {subItem.submenu.map((nestedItem) => (
                                    <Link
                                        key={nestedItem.name}
                                        href={nestedItem.href}
                                        className="block px-3 py-2 text-zinc-700 dark:text-zinc-200 hover:bg-blue-50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors text-sm"
                                    >
                                        {nestedItem.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

// 4. Mobile Drawer Item with Multi-Level Dropdown (Click-based) - unchanged
const MobileDrawerItem = ({ item, level = 1, onLinkClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!item.isSubMenu || !item.submenu) {
        return (
            <Link
                href={item.href}
                onClick={onLinkClick}
                className={`block px-4 py-3 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium text-left ${level > 1 ? 'ml-4 text-sm' : 'text-lg'}`}
            >
                {item.name}
            </Link>
        );
    }

    return (
        <div className={`space-y-1 ${level > 1 ? 'border-l border-zinc-200 dark:border-zinc-700 ml-4 pl-2' : ''}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors w-full text-left font-medium ${level > 1 ? 'text-sm' : 'text-lg'}`}
            >
                {item.name}
                {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
            </button>

            {isOpen && (
                <div className="pl-2 space-y-1">
                    {item.submenu.map((subItem) => (
                        <MobileDrawerItem
                            key={subItem.name}
                            item={subItem}
                            level={level + 1}
                            onLinkClick={onLinkClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Navbar = () => {

    const [theme, setTheme] = useState('light');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [authModal, setAuthModal] = useState({ isOpen: false, type: 'login' });

    // Initialize theme from LocalStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Toggle Theme Function
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const openAuth = (type) => setAuthModal({ isOpen: true, type });
    const closeAuth = () => setAuthModal({ ...authModal, isOpen: false });
    const switchAuthMode = () => setAuthModal(prev => ({ ...prev, type: prev.type === 'login' ? 'register' : 'login' }));

    const handleMobileLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="sticky top-0 left-0 w-full z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-0">
                    <div className="flex justify-between h-20 items-center">

                        {/* Logo */}
                        <Logo color="text-zinc-900" />

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {menuItems.map((item) => (
                                <DesktopNavItem key={item.name} item={item} />
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
                                aria-label="थीम बदलें"
                            >
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </button>

                            {/* if (loading) return <div>Loading...</div>; // एरर से बचने के लिए

                            return (
                            <div>{user?.name || "Guest"}</div>
                            ); */}

                            
                                    {/* HOVER DROPDOWN START */}
                                    {/* <div className="relative group">
                                        <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-50 transition-all">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                                                AD
                                            </div>
                                            <div className="flex flex-col items-start">
                                                <span className="text-sm font-semibold text-slate-900 leading-none">Admin</span>
                                                <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Role</span>
                                            </div>
                                            <ChevronDown size={14} className="text-slate-400 group-hover:rotate-180 transition-transform duration-300" />
                                        </button> */}

                                        {/* Dropdown Menu - Appears on Hover */}
                                        {/* <div className="absolute right-0 top-full pt-2 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-100">
                                            <div className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                                                <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                                                    <p className="text-xs text-slate-500">Signed in as</p>
                                                    <p className="text-sm font-medium text-slate-900 truncate">email</p>
                                                </div>

                                                <div className="p-2">

                                                    
                                                        <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                                                            <LayoutDashboard size={16} />
                                                            Dashboard
                                                        </Link>

                                                    <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                                                        <User size={16} />
                                                        Profile Settings
                                                    </Link>
                                                    <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                                                        <CreditCard size={16} />
                                                        Billing & Plans
                                                    </Link>
                                                    <Link to="/" className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                                                        <ShieldCheck size={16} />
                                                        Security
                                                    </Link>
                                                </div>

                                                <div className="p-2 border-t border-slate-100">
                                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors" >
                                                        <LogOut size={16} />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* HOVER DROPDOWN END */}

                                    {/* <span>नमस्ते, <strong>{user.user.name}</strong> ({user.user.role})</span>
                                    <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                        Logout
                                    </button> */}
                                
                                    <button onClick={() => openAuth('login')} className="px-5 py-2 text-zinc-700 dark:text-zinc-200 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                                        Login
                                    </button>
                                    <button onClick={() => openAuth('register')} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg shadow-blue-600/30 transition-all hover:scale-105">
                                        Register
                                    </button>
                                

                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center gap-4">
                            <button onClick={toggleTheme} className="p-2 text-zinc-600 dark:text-zinc-300" aria-label="थीम बदलें">
                                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            </button>
                            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-zinc-800 dark:text-white" aria-label="मेनू खोलें">
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav >

            {/* --- Mobile App-style Drawer --- */}
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 z-90 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Sliding Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-zinc-900 shadow-2xl z-100 transform transition-transform duration-300 ease-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                    {/* <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white">
                            <Music className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-lg text-zinc-900 dark:text-white">Lord Hymns</span>
                    </div> */}
                    <Logo />
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                        aria-label="ड्रॉअर बंद करें"
                    >
                        <X className="w-6 h-6 text-zinc-500 dark:text-zinc-400" />
                    </button>
                </div>

                {/* Drawer Links Container */}
                <div className="flex-1 overflow-y-auto py-4">
                    <div className="flex flex-col px-4 space-y-2">
                        {menuItems.map((item) => (
                            <MobileDrawerItem
                                key={item.name}
                                item={item}
                                onLinkClick={handleMobileLinkClick}
                            />
                        ))}
                    </div>
                </div>

                {/* Drawer Footer (Auth) */}
                <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shrink-0">
                    <div className="space-y-3">
                        <button
                            onClick={() => { openAuth('login'); setIsMenuOpen(false); }}
                            className="w-full py-3 text-center rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-white font-semibold hover:bg-white dark:hover:bg-zinc-800 transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { openAuth('register'); setIsMenuOpen(false); }}
                            className="w-full py-3 text-center rounded-xl bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                        >
                            Register Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Login/Register Modal */}
            {/* <AuthModal
                isOpen={authModal.isOpen}
                onClose={closeAuth}
                type={authModal.type}
                switchToOther={switchAuthMode}
            /> */}
            {/* <Modal
                isOpen={authModal.isOpen}
                onClose={closeAuth}
                type={authModal.type}
                switchToOther={switchAuthMode}
            /> */}

        </>
    );
};

export default Navbar;
