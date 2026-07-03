import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

import Button from "./Button";
import Icon from "./Icon";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon = Inbox,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">

      <Icon
        icon={icon}
        tone="disabled"
        size={48}
      />

      <h3 className="mt-4 text-xl font-semibold text-navy-500">
        {title}
      </h3>

      {description && (
        <p className="mt-2 max-w-sm text-sm text-mid-gray">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          <Button
            variant="primary"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}

    </div>
  );
}