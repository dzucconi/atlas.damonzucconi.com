import { Box, Grid, File, BoxProps } from "@auspices/eos";
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
    <Box {...rest}>
      <Grid>
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

        <Link passHref href={`/${collection.slug}`}>
          <Box width="100%" as="a">
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
        </Link>
      </Grid>
    </Box>
  );
};

gql`
  fragment InlineCollection on Collection {
    id
    slug
    updatedAt(relative: true)
    counts {
      contents
    }
    contents(page: 1, per: 10) {
      id
      entity {
        ...Thumbnail
      }
    }
  }
`;
