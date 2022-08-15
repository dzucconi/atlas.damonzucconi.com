import { memo, FC } from "react";
import styled from "styled-components";
import { gql } from "graphql-tag";
import { AspectRatioBox, Box, BoxProps, Image, space } from "@auspices/eos";
import { FadeOut } from "../core/FadeOut";
import { ThumbnailCollectionFragment } from "../../generated/graphql";

export type ThumbnailCollectionProps = BoxProps & {
  collection: ThumbnailCollectionFragment;
};

export const ThumbnailCollection: FC<ThumbnailCollectionProps> = memo(
  ({ collection, ...rest }) => {
    return (
      <FadeOut {...rest}>
        <Grid height="100%">
          {collection.contents.map(({ entity }) => {
            return (
              <AspectRatioBox
                key={entity.id}
                aspectWidth={1}
                aspectHeight={1}
                maxWidth="100%"
              >
                {(() => {
                  switch (entity.__typename) {
                    case "Image":
                      return (
                        <Image
                          srcs={[
                            entity.placeholder.urls._1x,
                            entity.placeholder.urls._2x,
                          ]}
                          width="100%"
                          height="100%"
                          bg="tertiary"
                          alt=""
                        />
                      );
                    case "Text":
                      return (
                        <Box
                          width="100%"
                          height="100%"
                          border="1px solid"
                          borderColor="hint"
                          p={2}
                          overflow="hidden"
                        >
                          <FadeOut
                            lineHeight="0px"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            <Box
                              as="span"
                              color="secondary"
                              bg="secondary"
                              fontSize="4px"
                              lineHeight={1}
                            >
                              {entity.body}
                            </Box>
                          </FadeOut>
                        </Box>
                      );
                    case "Link":
                      return (
                        <Box
                          border="1px solid"
                          borderColor="external"
                          width="100%"
                          height="100%"
                          display="flex"
                        >
                          <Box
                            borderTop="1px solid"
                            borderColor="external"
                            alignSelf="flex-end"
                            width="100%"
                            lineHeight="0px"
                            p={2}
                          >
                            <Box
                              as="span"
                              color="external"
                              bg="external"
                              fontSize="4px"
                              lineHeight={1}
                              verticalAlign="middle"
                            >
                              {entity.name}
                            </Box>
                          </Box>
                        </Box>
                      );
                    case "Attachment":
                      return (
                        <Box
                          border="1px solid"
                          borderColor="secondary"
                          width="100%"
                          height="100%"
                        >
                          <Box
                            borderBottom="1px solid"
                            borderColor="secondary"
                            width="100%"
                            lineHeight="0px"
                            p={2}
                          >
                            <Box
                              as="span"
                              color="secondary"
                              bg="secondary"
                              fontSize="4px"
                              lineHeight={1}
                              verticalAlign="middle"
                            >
                              {entity.contentType} ({entity.fileSize})
                            </Box>
                          </Box>
                        </Box>
                      );
                    case "Collection":
                      return (
                        <Box
                          border="1px solid"
                          borderColor="border"
                          borderRadius={2}
                          width="100%"
                          height="100%"
                          p={2}
                          lineHeight="0px"
                        >
                          <Box
                            as="span"
                            color="primary"
                            bg="primary"
                            fontSize="4px"
                            lineHeight={1}
                          >
                            {entity.title}
                          </Box>
                        </Box>
                      );
                    default:
                      return null;
                  }
                })()}
              </AspectRatioBox>
            );
          })}
        </Grid>
      </FadeOut>
    );
  }
);

ThumbnailCollection.displayName = "ThumbnailCollection";

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: ${space(2)};
  grid-row-gap: ${space(2)};
`;

gql`
  fragment ThumbnailCollection on Collection {
    id
    contents(per: $per) {
      id
      entity {
        __typename
        ... on Image {
          id
          width
          height
          placeholder: resized(width: 125, height: 125, fit: COVER) {
            urls {
              _1x
              _2x
            }
          }
        }
        ... on Text {
          id
          body: toString(length: 200)
        }
        ... on Link {
          id
          name: toString(length: 30, from: CENTER)
        }
        ... on Collection {
          id
          title
        }
        ... on Attachment {
          id
          contentType
          fileSize
        }
      }
    }
  }
`;
