import React, { FC, SelectHTMLAttributes } from 'react';
import { cn } from '@/src/lib/utils';

const variants = {
    primary: 'border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
};

type DropdownVariant = 'primary'

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    variant?: DropdownVariant,
    options: { value: string; label: string }[],
    label?: string
}

const Dropdown: FC<DropdownProps> = ({ label, variant = 'primary', options, ...props }) => {
    return (
        <div className="flex flex-col gap-2">
            {label && <label className="font-medium text-gray-700">{label}</label>}
            
            <select className={cn(variants[variant])} {...props}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export { Dropdown }