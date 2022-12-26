import { Box, Grid, File, BoxProps, Stack, Cell, Split } from "@auspices/eos";
import Link from "next/link";
import { FC } from "react";
import { gql } from "urql";
import { InlineCollectionFragment } from "../../generated/graphql";
import { Thumbnail } from "../core/Thumbnail";

type InlineCollectionProps = BoxProps & {
  collection: InlineCollectionFragment;
};

export const InlineCollection: FC<InlineCollectionProps> = ({
  collection,
  ...rest
}) => {
  return (
    <Box border="1px solid" {...rest}>
      <Stack mt="-1px" mx="-1px">
        <Split>
          <Cell height="100%" alignItems="flex-start" variant="small">
            name
          </Cell>

          <Cell height="100%" alignItems="flex-start" variant="small">
            {collection.name}
          </Cell>
        </Split>

        {collection.metadata &&
          Object.entries(collection.metadata).map(([term, definition]) => (
            <Split key={term}>
              <Cell height="100%" alignItems="flex-start" variant="small">
                {term}
              </Cell>

              <Cell height="100%" alignItems="flex-start" variant="small">
                {definition as string}
              </Cell>
            </Split>
          ))}
      </Stack>

      <Grid p={4} pb={6}>
        {collection.contents.map((content) => {
          return (
            <Thumbnail
              key={content.id}
              contentId={content.id}
              collectionId={`${collection.id}`}
              entity={content.entity}
            />
          );
        })}

        {collection.counts.contents > 50 && (
          // FIXME:
          // @ts-ignore
          <Box width="100%" as={Link} href={`/${collection.slug}`}>
            <File>
              <Box
                border="1px solid"
                borderColor="hint"
                borderRadius={2}
                color="primary"
                py={2}
                px={3}
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height="100%"
              >
                View{" "}
                {collection.counts.contents - 25 <= 0
                  ? "all"
                  : `${collection.counts.contents - 25} more`}
              </Box>
            </File>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

gql`
  fragment InlineCollection on Collection {
    id
    slug
    name
    updatedAt(relative: true)
    metadata
    counts {
      contents
    }
    contents(page: 1, per: 50) {
      id
      entity {
        ...Thumbnail
      }
    }
  }
`;
