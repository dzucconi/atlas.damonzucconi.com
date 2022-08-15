import { Box, Grid, File, BoxProps } from "@auspices/eos";
import { FC } from "react";
import { gql } from "urql";
import { InlineCollectionFragment } from "../../generated/graphql";
import { useClientSidePagination } from "../../lib/useClientSidePagination";
import { Thumbnail } from "../core/Thumbnail";

type InlineCollectionProps = BoxProps & {
  collection: InlineCollectionFragment;
};

export const InlineCollection: FC<InlineCollectionProps> = ({
  collection,
  ...rest
}) => {
  const { containerRef, elementRef, page, per } = useClientSidePagination({
    rows: 3,
  });

  return (
    <Box ref={containerRef} {...rest}>
      <Grid>
        {collection.contents.map((content, i) => {
          return (
            <Thumbnail
              key={content.id}
              contentId={content.id}
              collectionId={`${collection.id}`}
              entity={content.entity}
            />
          );
        })}

        <Box ref={elementRef} width="100%">
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
      </Grid>
    </Box>
  );
};

gql`
  fragment InlineCollection on Collection {
    id
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
