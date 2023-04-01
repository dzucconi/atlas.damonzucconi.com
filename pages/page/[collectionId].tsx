import { Cell, Dropdown, PaneOption, Split, Stack } from "@auspices/eos";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql } from "urql";
import { DefinitionList } from "../../components/core/DefinitionList";
import { Inline } from "../../components/components/Inline";
import { Loading } from "../../components/core/Loading";
import { Meta } from "../../components/core/Meta";
import { Pagination } from "../../components/core/Pagination";
import { usePageQuery } from "../../generated/graphql";
import { Metadata } from "../../components/core/Metadata";

const Page: NextPage = () => {
  const {
    query: { collectionId, page: _page = 1, per: _per = 50 },
    isReady,
  } = useRouter();

  const per = parseInt(_per as string, 10);
  const page = parseInt(_page as string, 10);

  const [{ fetching, error, data }] = usePageQuery({
    variables: {
      id: `${collectionId}`,
      per,
      page,
    },
    pause: !isReady,
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

      <Stack spacing={8}>
        <Stack>
          <Dropdown label={collection.title} flex={1} zIndex={2}>
            {collection.key && (
              <PaneOption
                as="a"
                href={`https://glyph.labs.auspic.es/graph/${collection.key}`}
                target="_blank"
              >
                data
              </PaneOption>
            )}

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
            href={`/page/${collectionId}`}
          />

          {collection.metadata && <Metadata metadata={collection.metadata} />}
        </Stack>

        <Stack spacing={8}>
          {collection.contents.map((content) => {
            return (
              <Stack key={content.id} spacing={4}>
                <Inline entity={content.entity} />

                {content.metadata && (
                  <DefinitionList
                    maxWidth="65ch"
                    mx={[4, 4, 0]}
                    definitions={Object.entries(content.metadata).map(
                      ([term, definition]) => ({
                        term,
                        definition: `${definition}`,
                      })
                    )}
                  />
                )}
              </Stack>
            );
          })}
        </Stack>

        <Pagination
          page={page}
          per={per}
          total={collection.counts.contents}
          href={`/page/${collectionId}`}
        />
      </Stack>
    </>
  );
};

export default Page;

gql`
  query PageQuery($id: ID!, $page: Int, $per: Int) {
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
            metadata
            entity {
              ...Inline
            }
          }
        }
      }
    }
  }
`;
