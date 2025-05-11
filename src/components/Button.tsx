import clsx from 'clsx'
import { Link as RemixLink } from '@remix-run/react';

type ButtonProps = {
  invert?: boolean
} & (
  (Omit<React.ComponentPropsWithoutRef<typeof RemixLink>, 'href'> & { to: string; href?: undefined }) |
  (React.ComponentPropsWithoutRef<'button'> & { to?: undefined; href?: undefined })
)

export function Button({
  invert = false,
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    'inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition',
    invert
      ? 'bg-white text-neutral-950 hover:bg-neutral-200'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
  )

  let inner = <span className="relative top-px">{children}</span>

  if (props.to) {
    const { to, ...linkProps } = props as any;
    return (
      <RemixLink to={to} className={className} {...linkProps}>
        {inner}
      </RemixLink>
    );
  }

  const { to, href, ...buttonProps } = props as any;
  return (
    <button className={className} {...buttonProps}>
      {inner}
    </button>
  )
}
