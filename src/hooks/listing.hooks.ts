/* eslint-disable @typescript-eslint/no-explicit-any */
import { addListing } from "@/Services/ListingServices";
import { IAddListingResponse } from "@/types/listing.types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
