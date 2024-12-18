import React, {ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

const variants = {
  primary: 'bg-primary text-white px-4 py-2 rounded font-bold inline-block',
  secondary: 'bg-dark-green text-white px-4 py-2 rounded font-bold',
  link: 'text-blue-500 hover:underline',
}

type ButtonVariant = 'primary' | 'secondary' | 'link';

interface BaseProps {
  className?: string,
  variant?: ButtonVariant
}

type LinkAttrs = AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>;

interface LinkProps extends BaseProps, LinkAttrs {
  type?: never;
  href: string;
  onClick?: never;
}

interface ButtonProps extends BaseProps, ButtonAttrs {
  href?: never;
  onClick?: ButtonAttrs['onClick'];
}

type Props = LinkProps | ButtonProps

const ButtonOrLink: FC<Props> = 
({
  href,
  className,
  children,
  onClick,
  type,
  variant = 'primary',
}) => {
  
  if (href) {
    return (
      <Link
      href={href}
      className={cn(variants[variant], className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
    onClick={onClick}
    type={type}
    className={cn(variants[variant], className)}
    >
      {children}
    </button>
  );
};

export { ButtonOrLink }