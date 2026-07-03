import { useQuery } from "@tanstack/react-query";

import { getMyVisitStats } from "../api/employee.api";

export type VisitRange = "7d" | "30d" | "90d";

export function useCardVisits(range: VisitRange) {
  const visitsQuery = useQuery({
    queryKey: ["employee-visits", range],

    queryFn: () => getMyVisitStats(range),
  });

  return {
    visits: visitsQuery.data ?? [],

    isLoading: visitsQuery.isLoading,

    error: visitsQuery.error,

    refetch: visitsQuery.refetch,
  };
}