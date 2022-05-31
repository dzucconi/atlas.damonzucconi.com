import { Dropdown, Grid, PaneOption, Stack } from "@auspices/eos";
import type { NextPage } from "next";
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
  } = useRouter();

  const { per, page } = usePagination();

  const [{ fetching, error, data }] = useCollectionQuery({
    variables: { id: `${collectionId}`, per, page },
  });

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const {
    root: {
      collection: { key, slug, title, counts, contents },
    },
  } = data;

  return (
    <>
      <Meta title={title} />

      <Stack spacing={4}>
        <Stack>
          <Dropdown label={title} flex={1} zIndex={2}>
            <PaneOption
              as="a"
              href={`https://glyph.labs.auspic.es/graph/${key}`}
              target="_blank"
            >
              data
            </PaneOption>

            <PaneOption
              as="a"
              href={`https://auspic.es/xs/${slug}`}
              target="_blank"
            >
              open in Auspic.es
            </PaneOption>
          </Dropdown>

          <Pagination
            page={page}
            per={per}
            total={counts.contents}
            href={`/${collectionId}`}
          />
        </Stack>

        <Grid>
          {contents.map((content) => {
            if (content.entity.kind === "Image")
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
