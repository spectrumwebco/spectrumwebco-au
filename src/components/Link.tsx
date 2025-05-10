import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
  // Simple link component that replaces Next.js Link
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}