import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getMyProfile,
  updateMyProfile,
} from "../api/employee.api";

import type { EmployeeProfile } from "../types/employee.types";

const QUERY_KEY = ["employee-profile"];

export function useEmployeeProfile() {
  const queryClient = useQueryClient();

  // Fetch profile
  const profileQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getMyProfile,
  });

  // Save profile
  const updateProfileMutation = useMutation({
    mutationFn: (data: EmployeeProfile) => updateMyProfile(data),

    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(QUERY_KEY, updatedProfile);
    },
  });

  return {
    profile: profileQuery.data,

    isLoading: profileQuery.isLoading,

    error: profileQuery.error,

    refetch: profileQuery.refetch,

    updateProfile: updateProfileMutation.mutate,

    updateProfileAsync: updateProfileMutation.mutateAsync,

    isSaving: updateProfileMutation.isPending,
  };
}