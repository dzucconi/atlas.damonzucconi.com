import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export const useClientSidePagination = ({ rows }: { rows: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  const [perRow, setPerRow] = useState(0);

  let {
    query: { page = 1, per = 0 },
  } = useRouter();

  page = parseInt(String(page), 10);
  per = parseInt(String(per), 10);

  useEffect(() => {
    if (!containerRef.current || !elementRef.current) {
      return;
    }

    const containerWidth = containerRef.current.offsetWidth;
    const elementWidth = elementRef.current.offsetWidth;
    setPerRow(Math.floor(containerWidth / elementWidth));
  }, []);

  return {
    per: per || perRow * rows,
    page: page || Math.ceil(perRow / rows),
    containerRef,
    elementRef,
  };
};
