export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__mark">
        <span
          className="logo"
          style={{ color: "var(--bone)", ["--logo-h" as string]: "min(42vw, 160px)" }}
        >
          <span>SG Metal</span>
          <span className="logo__row">
            Group
            <span className="patch" />
          </span>
        </span>
        <div className="loader__wipe">
          <span />
          <span />
          <span />
        </div>
        <div className="loader__count">000</div>
      </div>
    </div>
  );
}
