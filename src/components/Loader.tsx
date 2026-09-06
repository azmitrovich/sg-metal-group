const base = import.meta.env.BASE_URL;

export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader__mark">
        <img
          className="logo-img logo-img--loader"
          src={`${base}logo-on-dark-bg.png`}
          alt=""
          width={558}
          height={640}
          decoding="async"
        />
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