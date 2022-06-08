import { Image, Box } from "@auspices/eos";
import { FC, useEffect, useRef } from "react";
import { gql } from "urql";
import { SlideFragment } from "../../../generated/graphql";

interface SlideProps {
  entity: SlideFragment;
  onReady: () => void;
}

export const Slide: FC<SlideProps> = ({ entity, onReady }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const img = imageRef.current;

    if (img.complete) {
      onReady();
      return;
    }

    img.onload = onReady;
    img.onerror = onReady;
  }, [onReady]);

  switch (entity.__typename) {
    case "Image":
      return (
        <Box
          key={entity.resized.urls._1x}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          backgroundColor="black"
          style={{
            backgroundImage: `url(${entity.placeholder.urls._1x})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <Image
            ref={imageRef}
            placeholder={entity.placeholder.urls._1x}
            srcs={[
              entity.resized.urls._1x,
              entity.resized.urls._2x,
              entity.resized.urls._3x,
            ]}
            width="100%"
            height="100%"
            alt={entity.name}
            style={{ objectFit: "contain" }}
          />
        </Box>
      );

    default:
      return <div>TODO: {entity.__typename}</div>;
  }
};

export const SLIDE_FRAGMENT = gql`
  fragment Slide on Entity {
    __typename
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
      id
      name
      placeholder: resized(width: 50, height: 50, blur: 10) {
        urls {
          _1x
        }
      }
      resized(width: 2000, height: 2000) {
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
`;

export default Slide;
