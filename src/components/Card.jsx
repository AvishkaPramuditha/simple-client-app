import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-xl",
                hover && "hover:bg-slate-800/40 transition-colors duration-300",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
