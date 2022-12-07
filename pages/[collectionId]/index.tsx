import { Cell, Dropdown, Grid, PaneOption, Split, Stack } from "@auspices/eos";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql } from "urql";
import { BottomNav } from "../../components/core/BottomNav";
import { Loading } from "../../components/core/Loading";
import { Meta } from "../../components/core/Meta";
import { Pagination } from "../../components/core/Pagination";
import { Thumbnail } from "../../components/core/Thumbnail";
import { useCollectionQuery } from "../../generated/graphql";
import { usePagination } from "../../lib/usePagination";

const Collection: NextPage = () => {
  const {
    query: { collectionId },
    isReady,
  } = useRouter();

  const { per, page } = usePagination();

  const [{ fetching, error, data }] = useCollectionQuery({
    variables: { id: `${collectionId}`, per, page },
    pause: !isReady,
  });

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const {
    root: {
      collection,
      collection: { key, slug, title, counts, contents },
    },
  } = data;

  return (
    <>
      <Meta title={title} />

      <Stack spacing={4}>
        <Stack>
          <Dropdown label={title} flex={1} zIndex={2}>
            {key && (
              <PaneOption
                as="a"
                href={`https://glyph.labs.auspic.es/graph/${key}`}
                target="_blank"
              >
                data
              </PaneOption>
            )}

            <PaneOption
              as="a"
              href={`https://auspic.es/xs/${slug}`}
              target="_blank"
            >
              open in auspic.es
            </PaneOption>
          </Dropdown>

          <Pagination
            page={page}
            per={per}
            total={counts.contents}
            href={`/${collectionId}`}
          />

          {collection.metadata && (
            <Stack>
              {Object.entries(collection.metadata).map(([term, definition]) => (
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
          )}
        </Stack>

        <Grid>
          {contents.map((content) => {
            return (
              <Thumbnail
                key={content.id}
                contentId={content.id}
                collectionId={`${collectionId}`}
                entity={content.entity}
              />
            );
          })}
        </Grid>

        <BottomNav>
          <Pagination
            page={page}
            per={per}
            total={counts.contents}
            href={`/${collectionId}`}
          />
        </BottomNav>
      </Stack>
    </>
  );
};

export default Collection;

gql`
  query CollectionQuery($id: ID!, $page: Int, $per: Int) {
    root: object {
      ... on Collection {
        collection(id: $id) {
          id
          key
          slug
          title
          metadata
          counts {
            contents
          }
          contents(page: $page, per: $per) {
            id
            entity {
              ...Thumbnail
            }
          }
        }
      }
    }
  }
`;
