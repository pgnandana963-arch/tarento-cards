import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;

  title: string;

  description?: string;

  action?: {
    label: string;
    onClick: () => void;
  };

  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-16 px-6",
        className
      )}
    >
      {/* Icon */}

      {icon && (
        <div
          className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-off-white
          "
        >
          <Icon
            icon={icon}
            tone="disabled"
            size={32}
          />
        </div>
      )}

      {/* Title */}

      <h2 className="text-2xl font-semibold text-navy-500">
        {title}
      </h2>

      {/* Description */}

      {description && (
        <p className="mt-3 max-w-md text-mid-gray leading-6">
          {description}
        </p>
      )}

      {/* Action */}

      {action && (
        <Button
          variant="primary"
          className="mt-8"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}