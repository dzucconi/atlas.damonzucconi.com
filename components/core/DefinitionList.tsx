import { Box, BoxProps, Cell, Stack } from "@auspices/eos";
import Link from "next/link";
import { AnchorHTMLAttributes, FC } from "react";

type Definition = {
  term: string;
  definition?: string | number | null | Definition[];
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type DefinitionListProps = BoxProps & {
  definitions: Definition[];
  nested?: boolean;
};

export const DefinitionList: FC<DefinitionListProps> = ({
  definitions,
  nested,
  ...rest
}) => {
  return (
    <Box as="dl" {...rest}>
      <Stack width={nested ? undefined : "fit-content"}>
        {definitions.map(({ term, definition, href, ...link }, index) => {
          if (!definition) return null;

          const isNested = typeof definition === "object";
          const isExternal = href && href.startsWith("http");
          const isInternal = href && href.startsWith("/");

          return (
            <Stack direction="horizontal" key={index}>
              <Cell variant="small" as="dt">
                {term}
              </Cell>

              <Box as="dd" flex="1">
                {(() => {
                  if (isNested) {
                    return (
                      <DefinitionList
                        nested
                        width="100%"
                        definitions={definition}
                      />
                    );
                  }

                  if (isExternal) {
                    return (
                      <Cell variant="small" as="a" href={href} {...link}>
                        {definition}
                      </Cell>
                    );
                  }

                  if (isInternal) {
                    return (
                      // FIXME:
                      // @ts-ignore
                      <Cell variant="small" as={Link} href={href}>
                        {definition}
                      </Cell>
                    );
                  }

                  return <Cell variant="small">{definition}</Cell>;
                })()}
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};
