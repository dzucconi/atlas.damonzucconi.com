import { gql } from "urql";
import { Box, File, ResponsiveImage } from "@auspices/eos";
import { FC } from "react";
import { ThumbnailFragment } from "../../generated/graphql";
import Link from "next/link";
import { usePagination } from "../../lib/usePagination";

type ThumbnailProps = {
  collectionId: string;
  contentId: number;
  entity: ThumbnailFragment;
};

export const Thumbnail: FC<ThumbnailProps> = ({
  collectionId,
  contentId,
  entity,
}) => {
  const { page, per } = usePagination();

  return (
    <Link
      href={{
        pathname: `/${collectionId}/x/${contentId}`,
        query: { page, per },
      }}
      passHref
    >
      <Box as="a" width="100%" position="relative">
        <File
          position="static"
          name={entity.label}
          meta={(() => {
            switch (entity.__typename) {
              case "Image":
                return `${entity.width}×${entity.height}`;
              default:
                return "TODO";
            }
          })()}
          cursor="pointer"
        >
          {(() => {
            switch (entity.__typename) {
              case "Image":
                return (
                  <ResponsiveImage
                    placeholder={entity.placeholder.urls.src}
                    srcs={[
                      entity.thumb.srcs._1x,
                      entity.thumb.srcs._2x,
                      entity.thumb.srcs._3x,
                    ]}
                    aspectWidth={entity.thumb.width}
                    aspectHeight={entity.thumb.height}
                    maxWidth={entity.thumb.width}
                    maxHeight={entity.thumb.height}
                    alt={entity.label}
                    loading="lazy"
                  />
                );

              default:
                return <div>TODO</div>;
            }
          })()}
        </File>
      </Box>
    </Link>
  );
};

gql`
  fragment Thumbnail on Entity {
    kind: __typename
    ... on Text {
      id
      label: toString(length: 35, from: TAIL)
      body
    }
    ... on Attachment {
      id
      label: toString(length: 35, from: CENTER)
      url
    }
    ... on Link {
      id
      label: toString(length: 35, from: CENTER)
      url
    }
    ... on Collection {
      id
      slug
      label: toString(length: 35, from: CENTER)
    }
    ... on Image {
      id
      width
      height
      label: toString(length: 35, from: CENTER)
      url
      placeholder: resized(width: 50, height: 50, blur: 10) {
        urls {
          src: _1x
        }
      }
      thumb: resized(width: 300, height: 300, quality: 85) {
        width
        height
        srcs: urls {
          _1x
          _2x
          _3x
        }
      }
    }
  }
`;
