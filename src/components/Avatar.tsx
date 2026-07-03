import { useMemo, useState } from "react";
import { Camera } from "lucide-react";

import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  name: string;

  size?: AvatarSize;

  editable?: boolean;

  onChangePhoto?: () => void;

  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-base",
  lg: "h-20 w-20 text-xl",
  xl: "h-28 w-28 text-3xl",
};

export default function Avatar({
  src,
  name,
  size = "md",
  editable = false,
  onChangePhoto,
  className,
}: AvatarProps) {
  const [imageError, setImageError] =
    useState(false);

  const initials = useMemo(() => {
    const words = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (words.length === 0) return "?";

    if (words.length === 1)
      return words[0][0].toUpperCase();

    return (
      words[0][0] +
      words[1][0]
    ).toUpperCase();
  }, [name]);

  const showFallback =
    !src || imageError;

  return (
    <div
      className={cn(
        "relative inline-flex",
        className
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-full border-4 border-white shadow-md bg-navy-100 flex items-center justify-center font-semibold text-navy-500",
          sizeClasses[size]
        )}
      >
        {showFallback ? (
          initials
        ) : (
          <img
            src={src}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() =>
              setImageError(true)
            }
          />
        )}
      </div>

      {editable && (
        <button
          type="button"
          onClick={onChangePhoto}
          className="
          absolute
          bottom-0
          right-0
          h-9
          w-9
          rounded-full
          bg-gold-500
          flex
          items-center
          justify-center
          shadow-lg
          hover:scale-105
          transition
          "
        >
          <Icon
            icon={Camera}
            size={16}
          />
        </button>
      )}
    </div>
  );
}