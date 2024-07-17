import { icons } from "lucide-react";

interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

export function Icon(props: IconProps) {
  const { name, color, size, className } = props;

  const LucideIcon = (icons as any)[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon className={className} color={color} size={size} />;
}
