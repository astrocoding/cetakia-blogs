import Image from "next/image";

type ThemeLogoProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function ThemeLogo({ lightSrc, darkSrc, alt, width, height, className, priority = false }: ThemeLogoProps) {
  return (
    <span className="theme-logo" aria-label={alt}>
      <span className="theme-logo__slot theme-logo__slot--light" aria-hidden="true">
        <Image src={lightSrc} alt="" width={width} height={height} className={`${className ?? ""} theme-logo__asset`} priority={priority} />
      </span>
      <span className="theme-logo__slot theme-logo__slot--dark" aria-hidden="true">
        <Image src={darkSrc} alt="" width={width} height={height} className={`${className ?? ""} theme-logo__asset`} priority={priority} />
      </span>
    </span>
  );
}
