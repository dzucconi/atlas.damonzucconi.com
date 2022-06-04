import { gql } from "urql";
import { useRouter } from "next/router";
import { useSlidesQuery } from "../../generated/graphql";
import { Loading } from "../../components/core/Loading";
import { Box, Clickable } from "@auspices/eos";
import { useCursor } from "use-cursor";
import styled, { css, keyframes } from "styled-components";
import { Slide } from "./components/slide";
import { wait } from "../../lib/wait";
import { useEffect, useState } from "react";

const SLIDE_DURATION = 5000;

const Slides = () => {
  const {
    query: { collectionId },
  } = useRouter();

  const [{ data, fetching, error }] = useSlidesQuery({
    variables: { id: `${collectionId}` },
  });

  const [active, setActive] = useState(false);

  const max = data?.root.collection.counts.contents || 0;

  const { index, handleNext, setCursor } = useCursor({
    max,
  });

  const handleReady = () => {
    setActive(true);
  };

  useEffect(() => {
    if (!active) return;

    const step = async () => {
      await wait(SLIDE_DURATION);

      setActive(false);

      handleNext();
    };

    step();
  }, [active, handleNext]);

  if (error) {
    throw error;
  }

  if (fetching || !data) {
    return <Loading />;
  }

  const current = data.root.collection.contents[index].entity;

  return (
    <>
      <Box
        position="fixed"
        top={0}
        right={0}
        left={0}
        display="flex"
        justifyContent="space-between"
        px={5}
        pt={6}
        pb={7}
        zIndex={1}
        style={{
          background:
            "linear-gradient(180deg,rgba(38, 38, 38, .8) 0%, rgba(38, 38, 38, 0) 100%)",
        }}
      >
        {new Array(max).fill(0).map((_, i) => {
          return (
            <Indicator
              key={i}
              onClick={() => setCursor(i)}
              title={`Figure ${i + 1}`}
              width="100%"
              height={3}
              mx={2}
              active={active && index === i}
              past={index > i}
              borderRadius={1}
            >
              {active && index === i && (
                <Box width="100%" height="100%" bg="white" />
              )}
            </Indicator>
          );
        })}
      </Box>

      <Slide entity={current} onReady={handleReady} />
    </>
  );
};

export default Slides;

gql`
  query SlidesQuery($id: ID!, $page: Int, $per: Int) {
    root: object {
      ... on Collection {
        collection(id: $id) {
          id
          slug
          title
          counts {
            contents
          }
          contents(page: $page, per: $per) {
            id
            entity {
              ...Slide
            }
          }
        }
      }
    }
  }
`;

const Indicator = styled(Clickable)<{ active: boolean; past: boolean }>`
  background-color: rgba(255, 255, 255, 0.5);
  overflow: hidden;

  ${({ active, past }) => {
    if (active) {
      return css`
        > div {
          animation: ${fill} ${SLIDE_DURATION}ms linear;
        }
      `;
    }

    if (past) {
      return css`
        background-color: white;
      `;
    }
  }}
`;

const fill = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0%) }
`;
