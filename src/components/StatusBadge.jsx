import React from 'react';
import { cn } from '../lib/utils';
import { CheckCircle, XCircle, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusBadge = ({ status, type = 'default', text, className }) => {
    const styles = {
        success: 'bg-green-500/10 text-green-400 border-green-500/20',
        error: 'bg-red-500/10 text-red-400 border-red-500/20',
        warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
        default: 'bg-slate-800 text-slate-300 border-slate-700',
    };

    const icons = {
        success: CheckCircle,
        error: XCircle,
        warning: AlertTriangle,
        check: ShieldCheck,
        alert: ShieldAlert
    };

    const Icon = icons[type] || icons.success;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium",
                status ? styles[status] : styles.default,
                className
            )}
        >
            <Icon className="w-4 h-4" />
            <span>{text}</span>
        </motion.div>
    );
};

export default StatusBadge;
