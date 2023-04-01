import { Cell, Split, Stack } from "@auspices/eos";
import { FC } from "react";

interface MetadataProps {
  metadata: Record<string, string>;
}

export const Metadata: FC<MetadataProps> = ({ metadata }) => {
  return (
    <Stack>
      {Object.entries(metadata).map(([term, definition]) => {
        const isLink = definition.startsWith("http");
        const isEmail = /.+\@.+\..+/g.test(definition);

        return (
          <Split key={term}>
            <Cell height="100%" alignItems="flex-start" variant="small">
              {term}
            </Cell>

            <Cell
              height="100%"
              alignItems="flex-start"
              variant="small"
              {...(isEmail ? { as: "a", href: `mailto:${definition}` } : {})}
              {...(isLink ? { as: "a", href: definition } : {})}
            >
              {definition}
            </Cell>
          </Split>
        );
      })}
    </Stack>
  );
};
