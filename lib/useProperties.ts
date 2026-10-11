"use client";

import { useEffect, useState } from "react";
import { getPropertiesByIds } from "./api";
import type { Property } from "./types";

/** Load properties by id from a client component (saved list, viewing requests). */
export function useProperties(ids: string[]): Property[] | null {
  const key = ids.join(",");
  const [list, setList] = useState<Property[] | null>(null);
  useEffect(() => {
    let live = true;
    getPropertiesByIds(key ? key.split(",") : []).then((r) => live && setList(r));
    return () => {
      live = false;
    };
  }, [key]);
  return list;
}
