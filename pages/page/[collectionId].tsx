import { Dropdown, PaneOption, Stack } from "@auspices/eos";
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

const Page: NextPage = () => {
  const {
    query: { collectionId, page: _page = 1, per: _per = 100 },
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
    root: {
      collection: { key, slug, title, counts, contents },
    },
  } = data;

  return (
    <>
      <Meta title={title} />

      <Stack spacing={8}>
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
            href={`/page/${collectionId}`}
          />
        </Stack>

        <Stack spacing={8}>
          {contents.map((content) => {
            return (
              <Stack key={content.id} spacing={5}>
                <Inline entity={content.entity} />

                {content.metadata && (
                  <DefinitionList
                    mx="auto"
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
          total={counts.contents}
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
