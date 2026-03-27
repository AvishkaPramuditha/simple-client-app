import React, { forwardRef } from 'react';
import { cn } from '../lib/utils';

const Input = forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-white transition-all duration-200 focus:border-blue-500/50 focus:bg-slate-900/80 hover:border-slate-600",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;
