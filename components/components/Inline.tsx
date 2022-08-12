import { gql } from "urql";
import { Box, BoxProps, File, HTML, ResponsiveImage } from "@auspices/eos";
import { FC, useMemo } from "react";
import { InlineFragment } from "../../generated/graphql";
import { FadeOut } from "../core/FadeOut";
import Link from "next/link";
import { simpleFormat } from "../../lib/simpleFormat";

type InlineProps = BoxProps & {
  entity: InlineFragment;
};

export const Inline: FC<InlineProps> = ({ entity, ...rest }) => {
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

  return (
    <Box width="100%" position="relative" {...rest}>
      {(() => {
        switch (entity.__typename) {
          case "Image":
            return (
              <Box display="flex" justifyContent="center">
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
                  indicator
                  loading="lazy"
                />
              </Box>
            );

          case "Link":
            return (
              <Box display="flex" justifyContent="center">
                <Box
                  border="1px solid"
                  borderColor="external"
                  borderRadius={4}
                  color="external"
                  px={4}
                  py={3}
                  textAlign="center"
                  as="a"
                  href={entity.url}
                  target="_blank"
                >
                  {entity.url}
                </Box>
              </Box>
            );

          case "Text":
            return (
              <HTML
                html={simpleFormat(entity.body)}
                maxWidth="65ch"
                px={3}
                mx="auto"
                fontSize={4}
              />
            );

          case "Attachment":
            return (
              <Box display="flex">
                <File name={entity.label} maxWidth={300} mx="auto">
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
                </File>
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

                <Box color="tertiary">{entity.counts.contents || "∅"}</Box>
              </Box>
            );

          default:
            return <div>{entity.__typename}</div>;
        }
      })()}
    </Box>
  );
};

gql`
  fragment Inline on Entity {
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
      fileSize
      contentType
    }
    ... on Link {
      id
      label: toString(length: 30, from: CENTER)
      url
    }
    ... on Collection {
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
      thumb: resized(width: 1200, height: 1200, quality: 85) {
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
