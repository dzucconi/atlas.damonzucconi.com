import {
  Box,
  Button,
  Caret,
  Dropdown,
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
import { buildGetStaticProps, client, withUrql } from "../../../lib/urql";
import { usePagination } from "../../../lib/usePagination";

const Show: FC = () => {
  const {
    query: { collectionId, id },
  } = useRouter();

  const [{ data, fetching, error }] = useCollectionContentQuery({
    variables: { collectionId: `${collectionId}`, id: `${id}` },
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
        content: { entity, next, previous },
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

      <Stack spacing={4}>
        <Stack>
          <Stack direction={["vertical", "vertical", "horizontal"]}>
            <Box width={["100%", "100%", "auto"]}>
              <Link
                href={{ pathname: `/${collectionId}`, query: { page, per } }}
                passHref
              >
                <Button as="a" width="100%">
                  <Caret direction="left" mr={3} />

                  {title}
                </Button>
              </Link>
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

                  default:
                    return <PaneOption>TODO</PaneOption>;
                }
              })()}
            </Dropdown>
          </Stack>

          <Stack direction="horizontal">
            {previous && (
              <Box flex={1}>
                <Link
                  href={{
                    pathname: `/${collectionId}/x/${previous.id}`,
                    query: { page, per },
                  }}
                >
                  <Button width="100%" as="a">
                    previous
                  </Button>
                </Link>
              </Box>
            )}

            {next && (
              <Box flex={1}>
                <Link
                  href={{
                    pathname: `/${collectionId}/x/${next.id}`,
                    query: { page, per },
                  }}
                >
                  <Button width="100%" as="a">
                    next
                  </Button>
                </Link>
              </Box>
            )}
          </Stack>
        </Stack>

        <Box display="flex" justifyContent="center">
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
            entity {
              __typename
              ... on Attachment {
                id
                name
              }
              ... on Text {
                id
                name
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

export const getStaticProps = buildGetStaticProps((ctx) => [
  COLLECTION_CONTENT_QUERY,
  { id: ctx.params?.id, collectionId: ctx.params?.collectionId },
]);

export const getStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
