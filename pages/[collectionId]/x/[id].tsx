import {
  Box,
  Button,
  Caret,
  Cell,
  Dropdown,
  HTML,
  PaneOption,
  ResponsiveImage,
  Stack,
  Truncate,
} from "@auspices/eos";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { gql } from "urql";
import { Loading } from "../../../components/core/Loading";
import { Meta, META_IMAGE_FRAGMENT } from "../../../components/core/Meta";
import { useCollectionContentQuery } from "../../../generated/graphql";
import { simpleFormat } from "../../../lib/simpleFormat";
import { withUrql } from "../../../lib/urql";
import { usePagination } from "../../../lib/usePagination";
import { Metadata } from "../../../components/core/Metadata";

const Show: FC = () => {
  const {
    query: { collectionId, id },
    isReady,
  } = useRouter();

  const [{ data, fetching, error }] = useCollectionContentQuery({
    variables: { collectionId: `${collectionId}`, id: `${id}` },
    pause: !isReady,
  });

  const { page, per } = usePagination();

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const {
    root: {
      collection: {
        title,
        content: { metadata, entity, next, previous },
      },
    },
  } = data;

  return (
    <>
      <Meta
        title={title}
        {...(entity.__typename === "Image"
          ? { image: entity.meta.urls.src }
          : {})}
      />

      <Stack spacing={0} flex={1}>
        <Stack>
          <Stack direction={["vertical", "vertical", "horizontal"]}>
            <Box width={["100%", "100%", "auto"]}>
              {/* FIXME: */}
              {/* @ts-ignore */}
              <Button
                as={Link}
                href={{ pathname: `/${collectionId}`, query: { page, per } }}
                width="100%"
              >
                <Caret direction="left" mr={3} />

                {title}
              </Button>
            </Box>

            <Dropdown
              label={({ open, ...rest }) => (
                <Button width="100%" {...rest}>
                  <Truncate title={entity.name}>{entity.name}</Truncate>

                  <Caret ml={3} direction={open ? "up" : "down"} />
                </Button>
              )}
              flex={1}
              zIndex={2}
            >
              {(() => {
                switch (entity.__typename) {
                  case "Image":
                    return (
                      <PaneOption
                        as="a"
                        href={entity.originalUrl}
                        target="_blank"
                      >
                        original (@{entity.width}×{entity.height})
                      </PaneOption>
                    );

                  case "Text":
                    return (
                      <PaneOption
                        as="a"
                        href={`https://www.google.com/search?q=${entity.body}`}
                        target="_blank"
                      >
                        search for {entity.name}
                      </PaneOption>
                    );

                  default:
                    return null;
                }
              })()}
            </Dropdown>
          </Stack>

          <Stack direction="horizontal">
            <Box flex={1}>
              {previous ? (
                // FIXME:
                // @ts-ignore
                <Button
                  as={Link}
                  href={{
                    pathname: `/${collectionId}/x/${previous.id}`,
                    query: { page, per },
                  }}
                  width="100%"
                >
                  ←
                </Button>
              ) : (
                <Button width="100%" disabled>
                  ←
                </Button>
              )}
            </Box>

            <Box flex={1}>
              {next ? (
                // FIXME:
                // @ts-ignore
                <Button
                  as={Link}
                  href={{
                    pathname: `/${collectionId}/x/${next.id}`,
                    query: { page, per },
                  }}
                  width="100%"
                >
                  →
                </Button>
              ) : (
                <Button width="100%" disabled>
                  →
                </Button>
              )}
            </Box>
          </Stack>

          <Metadata metadata={metadata} />
        </Stack>

        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent={["flex-start", "flex-start", "center"]}
          flexDirection="column"
          flex={1}
        >
          {(() => {
            switch (entity.__typename) {
              case "Image":
                return (
                  <Box
                    display="flex"
                    width="100%"
                    justifyContent="center"
                    as="a"
                    href={entity.originalUrl}
                    target="_blank"
                  >
                    <ResponsiveImage
                      key={entity.resized.urls._1x}
                      placeholder={entity.placeholder.urls.src}
                      srcs={[
                        entity.resized.urls._1x,
                        entity.resized.urls._2x,
                        entity.resized.urls._3x,
                      ]}
                      aspectWidth={entity.resized.width}
                      aspectHeight={entity.resized.height}
                      maxWidth={entity.resized.width}
                      maxHeight={entity.resized.height}
                      alt={entity.name}
                      indicator
                    />
                  </Box>
                );

              case "Text":
                return (
                  <Cell borderWidth={0} width="100%">
                    <HTML html={simpleFormat(entity.body)} />
                  </Cell>
                );

              default:
                return <div>TODO</div>;
            }
          })()}
        </Box>
      </Stack>
    </>
  );
};

const COLLECTION_CONTENT_QUERY = gql`
  query CollectionContentQuery($collectionId: ID!, $id: ID!) {
    root: object {
      ... on Collection {
        collection(id: $collectionId) {
          id
          slug
          title
          content(id: $id) {
            id
            next {
              id
            }
            previous {
              id
            }
            metadata
            entity {
              __typename
              ... on Attachment {
                id
                name
              }
              ... on Text {
                id
                name: toString(length: 35, from: TAIL)
                body
              }
              ... on Link {
                id
                name
                url
              }
              ... on Collection {
                id
                slug
                name
              }
              ... on Image {
                ...Meta_image
                id
                name: toString(length: 35, from: CENTER)
                originalUrl: url
                width
                height
                placeholder: resized(width: 50, height: 50, blur: 10) {
                  urls {
                    src: _1x
                  }
                }
                resized(width: 900, height: 900, quality: 85) {
                  width
                  height
                  urls {
                    _1x
                    _2x
                    _3x
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${META_IMAGE_FRAGMENT}
`;

export default withUrql(Show);
