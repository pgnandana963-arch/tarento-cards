import type { ReactNode } from "react";

import { Card } from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];

  data: T[];

  isLoading?: boolean;

  emptyState?: ReactNode;

  className?: string;
}

export default function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyState,
  className,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <Card className="p-10 text-center">
        <p className="text-mid-gray">
          Loading...
        </p>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <>
        {emptyState ?? (
          <EmptyState
            title="Nothing to display"
            description="There are no records available."
          />
        )}
      </>
    );
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          {/* Header */}

          <thead>

            <tr className="bg-navy-500">

              {columns.map((column) => (

                <th
                  key={String(column.key)}
                  className="
                  px-6
                  py-4
                  text-left
                  text-sm
                  font-semibold
                  text-white
                  whitespace-nowrap
                  "
                >
                  {column.label}
                </th>

              ))}

            </tr>

          </thead>

          {/* Body */}

          <tbody>

            {data.map((row, rowIndex) => (

              <tr
                key={rowIndex}
                className={cn(
                  rowIndex % 2 === 0
                    ? "bg-white"
                    : "bg-off-white",
                  "hover:bg-navy-100 transition-colors"
                )}
              >

                {columns.map((column) => (

                  <td
                    key={String(column.key)}
                    className="
                    px-6
                    py-4
                    text-sm
                    text-navy-500
                    border-b
                    border-light-gray
                    "
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.key])}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </Card>
  );
}