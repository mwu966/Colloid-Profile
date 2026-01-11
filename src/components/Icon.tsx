import * as React from "react";

export type IconName =
  | "x"
  | "bluesky"
  | "mixi2"
  | "pixiv"
  | "xfolio"
  | "booth"
  | "melon"
  | "qiita"
  | "zenn"
  | "github";

type Props = {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
};

export function Icon({ name, size = 18, className, title }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : "presentation",
    focusable: "false" as const,
  };

  const strokeProps = {
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg {...common}>
      {title ? <title>{title}</title> : null}

      {name === "x" && <path {...strokeProps} d="M6 6L18 18M18 6L6 18" />}

      {name === "bluesky" && (
        <>
          <path {...strokeProps} d="M12 12C9 7 5 7 5 11C5 14 8 15 10 13" />
          <path {...strokeProps} d="M12 12C15 7 19 7 19 11C19 14 16 15 14 13" />
          <path {...strokeProps} d="M12 12C9 12 7 15 8 18C9 20 11 19 12 17" />
          <path {...strokeProps} d="M12 12C15 12 17 15 16 18C15 20 13 19 12 17" />
          <path {...strokeProps} d="M12 10L12 16" />
        </>
      )}

      {name === "mixi2" && (
        <>
          <path
            {...strokeProps}
            d="M7 9C7 7.9 7.9 7 9 7H16C17.1 7 18 7.9 18 9V12C18 13.1 17.1 14 16 14H13L10.5 16V14H9C7.9 14 7 13.1 7 12V9Z"
          />
          <path
            {...strokeProps}
            d="M6 11C6 9.9 6.9 9 8 9H14C15.1 9 16 9.9 16 11V14C16 15.1 15.1 16 14 16H11.5L9 18V16H8C6.9 16 6 15.1 6 14V11Z"
          />
        </>
      )}

      {name === "pixiv" && (
        <>
          <path {...strokeProps} d="M12 4L16 8L12 20L8 8L12 4Z" />
          <path {...strokeProps} d="M10.5 9.5L13.5 9.5" />
          <path {...strokeProps} d="M12 12L12 12" />
        </>
      )}

      {name === "xfolio" && (
        <>
          <path {...strokeProps} d="M6 7H18V17H6V7Z" />
          <path {...strokeProps} d="M8 15L11 12L13 14L16 11L18 13" />
          <path {...strokeProps} d="M18 6L18 4M17 5L19 5" />
        </>
      )}

      {name === "booth" && (
        <>
          <path {...strokeProps} d="M5 10L12 6L19 10" />
          <path {...strokeProps} d="M7 10V18H17V10" />
          <path {...strokeProps} d="M7 13H17" />
          <path {...strokeProps} d="M11 18V14H13V18" />
        </>
      )}

      {name === "melon" && (
        <>
          <path {...strokeProps} d="M12 4A8 8 0 1 1 12 20A8 8 0 1 1 12 4Z" />
          <path {...strokeProps} d="M12 6C9.5 8 9 12 12 20" />
          <path {...strokeProps} d="M12 6C14.5 8 15 12 12 20" />
          <path
            {...strokeProps}
            d="M13.5 4.5C15.8 3.6 17.8 5.4 17 7.6C15.2 7.4 14.1 6.1 13.5 4.5Z"
          />
        </>
      )}

      {name === "qiita" && (
        <>
          <path {...strokeProps} d="M12 6A6 6 0 1 1 12 18A6 6 0 1 1 12 6Z" />
          <path {...strokeProps} d="M14.5 15.5L18 19" />
        </>
      )}

      {name === "zenn" && <path {...strokeProps} d="M7 7H17L7 17H17" />}

      {name === "github" && (
        <>
          <path {...strokeProps} d="M10 8L6 12L10 16" />
          <path {...strokeProps} d="M14 8L18 12L14 16" />
        </>
      )}
    </svg>
  );
}
