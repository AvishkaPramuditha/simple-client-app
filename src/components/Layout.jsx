import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Shield, UserPlus, UserCheck, ScanFace, Settings, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const Layout = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard', icon: Activity },
        { path: '/enroll', label: 'Enroll', icon: UserPlus },
        { path: '/verify', label: 'Verify', icon: UserCheck },
        { path: '/identify', label: 'Identify', icon: ScanFace },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Shield className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-lg text-white tracking-tight">Nexus Enterprise</span>
                        </Link>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={cn(
                                                "px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-all duration-200",
                                                isActive
                                                    ? "bg-slate-800 text-white shadow-sm"
                                                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                                            )}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <Link to="/settings" className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                                <Settings className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation (Basic) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950 border-t border-slate-800">
                <div className="flex justify-around p-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "flex flex-col items-center p-2 rounded-lg",
                                    isActive ? "text-blue-500" : "text-slate-500"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-[10px] mt-1">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </div>

            <main className="relative z-10 pt-20 pb-20 px-4 max-w-7xl mx-auto">
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default Layout;
