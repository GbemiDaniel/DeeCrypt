import { type ComponentPropsWithoutRef, forwardRef } from "react";

/**
 * A lightweight, reusable navigation link wrapper.
 * - Renders a standard `<a>` tag for external or internal navigation.
 * - Framework-agnostic (no react-router dependency).
 * - Forwards className, children, and other props for flexibility.
 */
export const NavLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<"a">
>(({ children, className, href, ...props }, ref) => {
  // Render a non-interactive div if no href is provided.
  if (!href) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      // Ensure external links are opened securely.
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
});

NavLink.displayName = "NavLink";
