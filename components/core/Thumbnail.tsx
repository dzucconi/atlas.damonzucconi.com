import { gql } from "urql";
import { Box, File, ResponsiveImage } from "@auspices/eos";
import { FC, useMemo } from "react";
import { ThumbnailFragment } from "../../generated/graphql";
import Link from "next/link";
import { usePagination } from "../../lib/usePagination";
import { FadeOut } from "./FadeOut";
import { ThumbnailCollection } from "../components/ThumbnailCollection";

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

  const meta = useMemo(() => {
    switch (entity.__typename) {
      case "Image":
        return `${entity.width}×${entity.height}`;
      case "Collection":
        return entity.updatedAt;
      default:
        return null;
    }
  }, [entity]);

  const href = useMemo(() => {
    switch (entity.__typename) {
      case "Collection":
        return `/${entity.slug}`;
      case "Link":
      case "Attachment":
        return entity.url;
      default:
        return {
          pathname: `/${collectionId}/x/${contentId}`,
          query: { page, per },
        };
    }
  }, [collectionId, contentId, entity, page, per]);

  return (
    // FIXME:
    // @ts-ignore
    <Box as={Link} href={href} width="100%" position="relative">
      <File position="static" name={entity.label} meta={meta} cursor="pointer">
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

            case "Link":
              return (
                <Box
                  border="1px solid"
                  borderColor="external"
                  borderRadius={4}
                  color="external"
                  fontSize={0}
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-end"
                >
                  <Box
                    px={4}
                    py={3}
                    borderTop="1px solid"
                    borderColor="external"
                  >
                    {entity.label}
                  </Box>
                </Box>
              );

            case "Text":
              return (
                <Box
                  fontSize={0}
                  border="1px solid"
                  borderColor="hint"
                  borderRadius={2}
                  color="primary"
                  py={2}
                  px={3}
                  position="relative"
                  display="flex"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  width="100%"
                  height="100%"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {entity.blurb.length > 500 ? (
                    <FadeOut>{entity.blurb}</FadeOut>
                  ) : (
                    <>{entity.blurb}</>
                  )}
                </Box>
              );

            case "Attachment":
              return (
                <Box
                  border="1px solid"
                  borderColor="secondary"
                  borderRadius={4}
                  color="primary"
                  fontSize={0}
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                >
                  <Box
                    px={4}
                    py={3}
                    borderBottom="1px solid"
                    borderColor="secondary"
                    color="secondary"
                  >
                    {entity.contentType} ({entity.fileSize})
                  </Box>
                </Box>
              );

            case "Collection":
              return (
                <Box
                  border="1px solid"
                  borderColor="border"
                  borderRadius={4}
                  color="primary"
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  py={3}
                  px={4}
                >
                  <Box>{entity.label}</Box>

                  <Box color="tertiary" mb={3}>
                    {entity.counts.contents || "∅"}
                  </Box>

                  <ThumbnailCollection collection={entity} />
                </Box>
              );

            default:
              return <div>{entity.__typename}</div>;
          }
        })()}
      </File>
    </Box>
  );
};

gql`
  fragment Thumbnail on Entity {
    kind: __typename
    ... on Text {
      id
      label: toString(length: 35, from: TAIL)
      blurb: toString(length: 800)
    }
    ... on Attachment {
      id
      label: toString(length: 35, from: CENTER)
      url
      fileSize
      contentType
    }
    ... on Link {
      id
      label: toString(length: 30, from: CENTER)
      url
    }
    ... on Collection {
      ...ThumbnailCollection
      id
      slug
      label: toString(length: 35, from: CENTER)
      updatedAt(relative: true)
      counts {
        contents
      }
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
