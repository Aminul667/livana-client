/* eslint-disable @typescript-eslint/no-explicit-any */
import { addListing, getAllListing } from "@/Services/ListingServices";
import { IAddListingResponse } from "@/types/listing.types";
import {
  keepPreviousData,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useMemo } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useAddListing = (
  options?: UseMutationOptions<any, Error, FieldValues>
) => {
  return useMutation<IAddListingResponse, Error, FormData>({
    mutationKey: ["add-listing"],
    mutationFn: addListing,
    onError: (error) => {
      const axiosError = error as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || error.message;
      toast.error(message);
    },
    ...options,
  });
};

type ParamValue = string | number | boolean | undefined | null;
export type ListingsParams = Record<string, ParamValue>;
type AnyObj = Record<string, any>;

// Helper: convert mixed param values to Record<string, string> for axios { params }
const toStringParams = (p: ListingsParams) => {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(p)) {
    if (v === undefined || v === null || v === "") continue;
    out[k] = String(v);
  }
  return out;
};

export const useGetAllListing = <TData = AnyObj>(
  params: ListingsParams = {}
) => {
  const stringParams = useMemo(() => toStringParams(params), [params]);

  return useQuery({
    queryKey: ["listings", stringParams], // cache per filter set
    queryFn: () => getAllListing(stringParams),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
    placeholderData: keepPreviousData,
    // If your API returns { data, meta }, unwrap here; otherwise return raw
    select: (res: AnyObj) => res?.data ?? res,
  });
};
