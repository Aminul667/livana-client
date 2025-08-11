/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const toBool = (v?: string | null) => (v == null ? undefined : v === "true");
const toNum = (v?: string | null) =>
  v == null || v === "" ? undefined : Number(v);
const toStr = (v?: string | null) =>
  v == null || v.trim() === "" ? undefined : v;

export const useListingFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = useMemo(() => {
    const sp = searchParams;
    return {
      // price range
      minMonthlyRent: toNum(sp.get("minMonthlyRent")),
      maxMonthlyRent: toNum(sp.get("maxMonthlyRent")),
      // toggles
      hasParking: toBool(sp.get("hasParking")),
      hasBalcony: toBool(sp.get("hasBalcony")),
      // text search
      searchTerm: toStr(sp.get("searchTerm")),
      // select
      minBathrooms: toNum(sp.get("minBathrooms")),
      propertyType: toStr(sp.get("propertyType")),
    };
  }, [searchParams]);

  const setParam = useCallback(
    (key: string, value: string | number | boolean | undefined | null) => {
      const sp = new URLSearchParams(searchParams.toString());
      if (value === undefined || value === null || value === "") sp.delete(key);
      else sp.set(key, String(value));
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setRange = useCallback(
    (
      minKey: string,
      maxKey: string,
      [min, max]: [number | undefined, number | undefined]
    ) => {
      const sp = new URLSearchParams(searchParams.toString());
      // min
      if (min == null || min === 0) sp.delete(minKey);
      else sp.set(minKey, String(min));
      // max
      if (max == null) sp.delete(maxKey);
      else sp.set(maxKey, String(max));
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const toggleBoolean = useCallback(
    (key: string) => {
      const current = searchParams.get(key);
      const next = current === "true" ? undefined : true; // undefined -> true, true -> undefined
      setParam(key, next as any);
    },
    [searchParams, setParam]
  );

  const resetAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return { params, setParam, setRange, toggleBoolean, resetAll };
};
