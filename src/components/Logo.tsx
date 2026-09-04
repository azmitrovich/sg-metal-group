type Props = {
  className?: string;
  large?: boolean;
};

export function Logo({ className = "", large = false }: Props) {
  return (
    <a
      href="#top"
      className={`brand ${className}`.trim()}
      aria-label="SG Metal Group"
      style={large ? { ["--logo-h" as string]: "30px" } : undefined}
    >
      <span className="logo">
        <span>SG Metal</span>
        <span className="logo__row">
          Group
          <span className="patch" aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}
