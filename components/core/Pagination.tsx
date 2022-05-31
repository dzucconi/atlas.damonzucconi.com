import React, { useEffect } from "react";
import Link from "next/link";
import {
  Page as _Page,
  PageProps,
  Pagination as _Pagination,
  PaginationProps,
} from "@auspices/eos";
import { usePagination } from "../../lib/usePagination";

const Page: React.FC<PageProps & { slug?: string }> = (props) => {
  return (
    <Link
      href={{
        pathname: props.href,
        query: { page: props.pageNumber, per: props.per },
      }}
    >
      <_Page {...props} />
    </Link>
  );
};

export const Pagination: React.FC<PaginationProps & { slug?: string }> = ({
  total,
  ...rest
}) => {
  const { setTotal } = usePagination();

  useEffect(() => setTotal(total), [setTotal, total]);

  return <_Pagination Page={Page} total={total} {...rest} />;
};
