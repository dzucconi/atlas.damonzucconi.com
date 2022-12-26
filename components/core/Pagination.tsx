import React, { FC, useEffect } from "react";
import Link, { LinkProps } from "next/link";
import {
  Page as _Page,
  PageProps,
  Pagination as _Pagination,
  PaginationPage,
  PaginationProps,
  Stack,
  usePagination as _usePagination,
} from "@auspices/eos";
import { usePagination } from "../../lib/usePagination";

export const Pagination: React.FC<PaginationProps & { href: string }> = ({
  total,
  page,
  href,
  ...rest
}) => {
  const { head, center, tail, totalPages } = _usePagination({
    currentPage: page,
    total,
  });
  const { setTotal } = usePagination();

  useEffect(() => setTotal(total), [setTotal, total]);

  if (totalPages <= 1) return null;

  return (
    <Stack direction="horizontal" {...rest}>
      <Stack direction="horizontal">
        {head.map((page) => {
          return (
            <DefaultPage
              key={page.page}
              {...page}
              href={{
                pathname: href,
                query: { page: page.page, per: rest.per },
              }}
            />
          );
        })}
      </Stack>

      {center.map((page) => {
        return (
          <DefaultPage
            key={page.page}
            {...page}
            href={{
              pathname: href,
              query: { page: page.page, per: rest.per },
            }}
          />
        );
      })}

      <Stack direction="horizontal">
        {tail.map((page) => {
          return (
            <DefaultPage
              key={page.page}
              {...page}
              href={{
                pathname: href,
                query: { page: page.page, per: rest.per },
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

type DefaultPageProps = PaginationPage &
  Omit<PageProps, "onClick" | "children"> & {
    onClick?(page: number): void;
    href: LinkProps["href"];
  };

const DefaultPage: FC<DefaultPageProps> = ({
  page,
  label,
  disabled,
  tabIndex,
  onClick,
  ...rest
}) => {
  const handleClick = () => {
    if (!onClick) return;

    onClick(page);
  };

  return (
    <_Page
      as={Link}
      key={page}
      onClick={handleClick}
      disabled={disabled}
      tabIndex={tabIndex}
      {...rest}
    >
      {label}
    </_Page>
  );
};
