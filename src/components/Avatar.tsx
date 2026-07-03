import { useState } from "react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-24 h-24 text-2xl",
};

const getInitials = (name: string) => {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function Avatar({
  src,
  name,
  size = "md",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !src || imageError;

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center bg-navy-50 text-navy-500 font-semibold`}
    >
      {showFallback ? (
        <span>{getInitials(name)}</span>
      ) : (
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}