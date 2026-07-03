import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import { Card } from "@/components/Card";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;

  value: string | number;

  trend?: {
    direction: "up" | "down";
    value: string;
  };

  icon?: LucideIcon;

  className?: string;
}

export default function StatCard({
  label,
  value,
  trend,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between min-h-[180px]",
        className
      )}
    >
      {/* Top */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-mid-gray">
            {label}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-navy-500">
            {value}
          </h2>

        </div>

        {icon && (
          <div
            className="
            h-12
            w-12
            rounded-full
            bg-navy-100
            flex
            items-center
            justify-center
            "
          >
            <Icon
              icon={icon}
              tone="default"
              size={24}
            />
          </div>
        )}

      </div>

      {/* Bottom */}

      {trend && (

        <div className="mt-6 flex items-center gap-2">

          <Icon
            icon={
              trend.direction === "up"
                ? TrendingUp
                : TrendingDown
            }
            tone={
              trend.direction === "up"
                ? "secondary"
                : "accent"
            }
            size={16}
          />

          <span
            className={cn(
              "text-sm font-medium",
              trend.direction === "up"
                ? "text-success"
                : "text-destructive"
            )}
          >
            {trend.value}
          </span>

          <span className="text-sm text-mid-gray">
            compared to last period
          </span>

        </div>

      )}

    </Card>
  );
}