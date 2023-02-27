import React, { FC, useEffect } from "react";
import Link, { LinkProps } from "next/link";
import {
  Page as _Page,
  PageProps as _PageProps,
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
  per,
  href,
  ...rest
}) => {
  const { current, head, leftSurrounding, rightSurrounding, tail, totalPages } =
    _usePagination({
      currentPage: page,
      per,
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
            <Page
              key={page.page}
              href={{
                pathname: href,
                query: { page: page.page, per },
              }}
              {...page}
            />
          );
        })}
      </Stack>

      {leftSurrounding.map((page) => {
        return (
          <Page
            key={page.page}
            href={{
              pathname: href,
              query: { page: page.page, per },
            }}
            display={["none", "none", "block"]}
            {...page}
          />
        );
      })}

      <Page
        href={{
          pathname: href,
          query: { page, per },
        }}
        {...current}
      />

      {rightSurrounding.map((page) => {
        return (
          <Page
            key={page.page}
            href={{
              pathname: href,
              query: { page: page.page, per },
            }}
            display={["none", "none", "block"]}
            {...page}
          />
        );
      })}

      <Stack direction="horizontal">
        {tail.map((page) => {
          return (
            <Page
              key={page.page}
              href={{
                pathname: href,
                query: { page: page.page, per },
              }}
              {...page}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

type PageProps = PaginationPage &
  Omit<_PageProps, "onClick" | "children"> & {
    onClick?(page: number): void;
    href: LinkProps["href"];
  };

const Page: FC<PageProps> = ({
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
