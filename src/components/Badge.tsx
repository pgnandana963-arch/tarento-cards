interface BadgeProps {
  status: "active" | "inactive" | "pending";
}

const badgeVariants = {
  active: {
    bg: "bg-success-light",
    text: "text-success",
    label: "Active",
  },
  inactive: {
    bg: "bg-light-gray",
    text: "text-mid-gray",
    label: "Inactive",
  },
  pending: {
    bg: "bg-warning-light",
    text: "text-warning",
    label: "Pending",
  },
};

export default function Badge({ status }: BadgeProps) {
  const variant = badgeVariants[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${variant.bg}
        ${variant.text}
      `}
    >
      {variant.label}
    </span>
  );
}