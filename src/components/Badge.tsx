import { cn } from "@/lib/utils";

type BadgeStatus =
  | "active"
  | "inactive"
  | "pending"
  | "admin"
  | "employee";

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
}

const badgeConfig = {
  active: {
    label: "Active",
    className:
      "bg-success-light text-success border border-success/20",
  },

  inactive: {
    label: "Inactive",
    className:
      "bg-off-white text-mid-gray border border-light-gray",
  },

  pending: {
    label: "Pending",
    className:
      "bg-warning-light text-warning border border-warning/20",
  },

  admin: {
    label: "Admin",
    className:
      "bg-navy-100 text-navy-500 border border-navy-200",
  },

  employee: {
    label: "Employee",
    className:
      "bg-teal-50 text-teal-600 border border-teal-200",
  },
};

export default function Badge({
  status,
  className,
}: BadgeProps) {
  const config = badgeConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}