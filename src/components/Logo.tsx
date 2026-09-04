type LogoProps = {
  className?: string;
};

export function Logo({ className = "" }: LogoProps) {
  return (
    <a href="#top" className={`logo ${className}`.trim()} aria-label="SG Metal Group">
      <span>SG Metal</span>
      <span className="logo__row">
        Group
        <span className="logo__bar" aria-hidden="true" />
      </span>
    </a>
  );
}
