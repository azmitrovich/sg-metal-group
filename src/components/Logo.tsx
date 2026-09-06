type Props = {
  className?: string;
  large?: boolean;
  /** Surface behind the logo: dark (default) or light */
  variant?: "dark" | "light";
};

const base = import.meta.env.BASE_URL;

export function Logo({ className = "", large = false, variant = "dark" }: Props) {
  return (
    <a
      href="#top"
      className={`brand brand--${variant} ${className}`.trim()}
      aria-label="SG Metal Group"
      style={large ? { ["--logo-h" as string]: "56px" } : undefined}
    >
      <img
        className="logo-img logo-img--on-dark"
        src={`${base}logo-on-dark-bg.png`}
        alt=""
        width={558}
        height={640}
        decoding="async"
      />
      <img
        className="logo-img logo-img--on-light"
        src={`${base}logo-on-light-bg.png`}
        alt=""
        width={558}
        height={640}
        decoding="async"
      />
    </a>
  );
}