import { Cell, Dropdown, Grid, PaneOption, Split, Stack } from "@auspices/eos";
import type { NextPage } from "next";
import { gql } from "urql";
import { BottomNav } from "../components/core/BottomNav";
import { Loading } from "../components/core/Loading";
import { Meta } from "../components/core/Meta";
import { Pagination } from "../components/core/Pagination";
import { Thumbnail } from "../components/core/Thumbnail";
import { useIndexQuery } from "../generated/graphql";
import { usePagination } from "../lib/usePagination";

const Home: NextPage = () => {
  const { page, per } = usePagination();

  const [{ fetching, error, data }] = useIndexQuery({
    variables: { id: "atlas", page, per },
  });

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const {
    root: { collection },
  } = data;

  return (
    <>
      <Meta title={collection.title} />

      <Stack spacing={4}>
        <Stack>
          <Dropdown label={collection.title} flex={1}>
            <PaneOption
              as="a"
              href={`https://glyph.labs.auspic.es/graph/${collection.key}`}
              target="_blank"
            >
              data
            </PaneOption>

            <PaneOption
              as="a"
              href={`https://auspic.es/xs/${collection.slug}`}
              target="_blank"
            >
              open in auspic.es
            </PaneOption>
          </Dropdown>

          <Pagination
            page={page}
            per={per}
            total={collection.counts.contents}
            href="/"
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
          {collection.contents.map((content) => {
            if (content.entity.kind === "Image")
              return (
                <Thumbnail
                  key={content.id}
                  contentId={content.id}
                  collectionId={collection.slug}
                  entity={content.entity}
                />
              );
          })}
        </Grid>
        <BottomNav>
          <Pagination
            page={page}
            per={per}
            total={collection.counts.contents}
            href="/"
          />
        </BottomNav>
      </Stack>
    </>
  );
};

export default Home;

gql`
  query IndexQuery($id: ID!, $page: Int, $per: Int) {
    root: object {
      ... on Collection {
        collection(id: $id) {
          id
          key
          slug
          title
          counts {
            contents
          }
          metadata
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
