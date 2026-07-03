import { useMutation } from '@tanstack/react-query';
import type { AccessRequestPayload, AccessRequestResponse } from '../types/auth';

export async function requestEmployeeAccess(_data: AccessRequestPayload): Promise<AccessRequestResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        requestId: `req-${Math.random().toString(36).substring(2, 9)}`,
        status: 'pending',
      });
    }, 900);
  });
}

export function useRequestAccess() {
  return useMutation<AccessRequestResponse, Error, AccessRequestPayload>({
    mutationFn: requestEmployeeAccess,
  });
}