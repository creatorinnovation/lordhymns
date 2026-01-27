import MainLayout from '@/Layouts/MainLayout'
import React from 'react'
import {
    TrendingUp,
    Users,
    DollarSign,
    Briefcase
} from 'lucide-react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';


const AdminDashboard = () => {
    // Stats for Dashboard Cards
    const stats = [
        { label: 'Total Songs', value: '000', grow: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Active Users', value: '2', grow: '+18.2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        // { label: 'New Projects', value: '43', grow: '-4.1%', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
        // { label: 'Sales Growth', value: '24%', grow: '+5.4%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ];
    return (
        <>
            <MainLayout>
                <AdminDashboardLayout>
                    <div className='py-10 px-10'>
                        {/* GRID OF HOVER CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-indigo-200 cursor-pointer overflow-hidden"
                                    >
                                        {/* Decorative Background Blob */}
                                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bg} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

                                        <div className="relative flex flex-col gap-4">
                                            <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                                <Icon size={24} />
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <span className={`text-xs font-bold ${stat.grow.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                                                    {stat.grow}
                                                </span>
                                                <span className="text-xs text-slate-400 font-medium">vs last month</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </AdminDashboardLayout>
            </MainLayout>
        </>
    )
}

export default AdminDashboard