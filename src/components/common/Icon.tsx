/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as RegularIcons from "@fortawesome/free-regular-svg-icons";
import * as BrandIcons from "@fortawesome/free-brands-svg-icons";

type IconName =
  | keyof typeof SolidIcons
  | keyof typeof RegularIcons
  | keyof typeof BrandIcons;

interface Props {
  name: IconName | string;
  className?: string;
}

export default function Icon({ name, className = "" }: Props) {
  const key = name as unknown as string;
  const icon =
    (SolidIcons as Record<string, unknown>)[key] ||
    (RegularIcons as Record<string, unknown>)[key] ||
    (BrandIcons as Record<string, unknown>)[key];

  if (!icon || icon === "none") {
    console.warn(`Icon "${name}" not found!`);
    return null;
  }

  return (
    <FontAwesomeIcon icon={icon as any} className={className} />
  );
}
