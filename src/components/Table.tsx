import type { ReactNode } from "react";
import EmptyState from "./EmptyState";

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
}

export default function Table<T>({
  columns,
  data,
  isLoading = false,
  emptyState,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <>
        {emptyState ?? (
          <EmptyState
            title="No data available"
            description="There is nothing to display."
          />
        )}
      </>
    );
  }

  return (
    <div className="overflow-x-auto rounded-card border border-light-gray">
      <table className="min-w-full border-collapse">
        <thead className="bg-navy-500 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left font-semibold"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex % 2 === 0
                  ? "bg-white"
                  : "bg-off-white"
              }
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-4 py-3 border-t border-light-gray"
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
  );
}