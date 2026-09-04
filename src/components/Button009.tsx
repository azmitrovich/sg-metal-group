import type { ReactNode } from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit";
};

export function Button009({ href, onClick, children, type = "button" }: Props) {
  const inner = (
    <>
      <span className="button-009__bg" aria-hidden="true" />
      <span className="button-009__inner">
        <svg className="button-009__icon is--left" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="button-009__text">{children}</span>
        <svg className="button-009__icon is--right" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <a className="button-009" href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button className="button-009" type={type} onClick={onClick}>
      {inner}
    </button>
  );
}
