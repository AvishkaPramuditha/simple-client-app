import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, UserCheck, ScanFace, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const FeatureCard = ({ title, description, icon: Icon, to, color }) => (
    <Link to={to} className="block group">
        <Card hover className="h-full flex flex-col justify-between relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-32 rounded-full blur-[80px] opacity-20 -mr-16 -mt-16 group-hover:opacity-30 transition-opacity ${color}`} />

            <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>

            <div className="relative z-10 mt-6 flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </Card>
    </Link>
);

const Home = () => {
    const { apiKey } = useAuth();
    const hasKey = !!apiKey;

    return (
        <div className="space-y-8 py-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                    Nexus Enterprise
                </h1>
                <p className="text-slate-400 text-lg">
                    Secure Employee Portal & Visitor Management System
                </p>

                {!hasKey && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 px-4 py-2 rounded-lg inline-block text-sm">
                        Please configure your API Key in Settings to get started. // Wait, default key is set, so this might not show unless user clears it.
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
                <FeatureCard
                    title="Enroll User"
                    description="Register a new identity with anti-spoofing protection and create a secure biometric template."
                    icon={UserPlus}
                    to="/enroll"
                    color="bg-blue-500"
                />
                <FeatureCard
                    title="Verify Identity"
                    description="Authenticate a user by validating their face against their claimed identity (1:1 Matching)."
                    icon={UserCheck}
                    to="/verify"
                    color="bg-green-500"
                />
                <FeatureCard
                    title="Identify Face"
                    description="Search the entire database to find the identity of an unknown person (1:N Matching)."
                    icon={ScanFace}
                    to="/identify"
                    color="bg-purple-500"
                />
            </div>
        </div>
    );
};

export default Home;
