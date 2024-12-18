import React, { FC, InputHTMLAttributes } from 'react';
import { cn } from '@/src/lib/utils';

const variants = {
    primary: 'border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none',
    secondary: 'border border-gray-400 rounded-lg px-4 py-2 bg-gray-100 text-black focus:ring-2 focus:ring-gray-500 focus:outline-none',
    error: 'border border-red-500 rounded-md px-4 py-2 text-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none',
};

type InputVariant = 'primary' | 'error'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant,
    error?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    name?: string,
    label?: string
}

const Input : FC<InputProps> = ({label, name, variant = 'primary', error, onChange, value, ...props}) => {
    return (
        <div className="flex flex-col gap-2">
          {label && <label className="font-medium text-gray-700">{label}</label>}
    
          <input className={cn(variants[variant])} onChange={onChange} value={value} name={name} {...props} />
    
          {error && <span className="text-sm text-red-500">{error}</span>}
        </div>
    );
}

export { Input }