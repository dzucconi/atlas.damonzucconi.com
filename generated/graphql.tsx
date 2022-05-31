import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Represents untyped JSON */
  JSON: any;
};

export type Attachment = {
  __typename?: 'Attachment';
  contentType: Scalars['String'];
  createdAt: Scalars['String'];
  fileSize?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  toString: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};


export type AttachmentCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type AttachmentFileSizeArgs = {
  precision?: InputMaybe<Scalars['Int']>;
};


export type AttachmentToStringArgs = {
  from?: InputMaybe<TruncateDirection>;
  length?: InputMaybe<Scalars['Int']>;
};


export type AttachmentUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};

export type Collection = {
  __typename?: 'Collection';
  collection: Collection;
  content: Content;
  contents: Array<Content>;
  counts: CollectionCounts;
  createdAt: Scalars['String'];
  href: Scalars['String'];
  id: Scalars['Int'];
  key?: Maybe<Scalars['String']>;
  metadata: Scalars['JSON'];
  name: Scalars['String'];
  sample: Array<Content>;
  slug: Scalars['String'];
  title: Scalars['String'];
  toString: Scalars['String'];
  updatedAt: Scalars['String'];
  value?: Maybe<Scalars['String']>;
  within: Array<Collection>;
};


export type CollectionCollectionArgs = {
  id: Scalars['ID'];
};


export type CollectionContentArgs = {
  id: Scalars['ID'];
};


export type CollectionContentsArgs = {
  metadata?: InputMaybe<Scalars['JSON']>;
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<ContentsSort>;
};


export type CollectionCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type CollectionHrefArgs = {
  absolute?: InputMaybe<Scalars['Boolean']>;
};


export type CollectionSampleArgs = {
  amount?: InputMaybe<Scalars['Int']>;
};


export type CollectionToStringArgs = {
  from?: InputMaybe<TruncateDirection>;
  length?: InputMaybe<Scalars['Int']>;
};


export type CollectionUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type CollectionValueArgs = {
  key?: InputMaybe<Scalars['String']>;
};


export type CollectionWithinArgs = {
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
};

export type CollectionCounts = {
  __typename?: 'CollectionCounts';
  contents: Scalars['Int'];
};

export type Content = {
  __typename?: 'Content';
  collection: Collection;
  createdAt: Scalars['String'];
  entity: Entity;
  href: Scalars['String'];
  id: Scalars['Int'];
  metadata: Scalars['JSON'];
  next?: Maybe<Content>;
  position: Scalars['Int'];
  previous?: Maybe<Content>;
  updatedAt: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};


export type ContentCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type ContentHrefArgs = {
  absolute?: InputMaybe<Scalars['Boolean']>;
};


export type ContentUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type ContentValueArgs = {
  key?: InputMaybe<Scalars['String']>;
};

export enum ContentsSort {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Entity = Attachment | Collection | Image | Link | Text;

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['Int'];
  name: Scalars['String'];
  resized: ResizedImage;
  sourceUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  toString: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};


export type ImageCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type ImageResizedArgs = {
  blur?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  scale?: InputMaybe<Scalars['Float']>;
  sharpen?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};


export type ImageToStringArgs = {
  from?: InputMaybe<TruncateDirection>;
  length?: InputMaybe<Scalars['Int']>;
};


export type ImageUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};

export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  toString: Scalars['String'];
  updatedAt: Scalars['String'];
  url: Scalars['String'];
};


export type LinkCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type LinkToStringArgs = {
  from?: InputMaybe<TruncateDirection>;
  length?: InputMaybe<Scalars['Int']>;
};


export type LinkUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};

export type Object = Collection;

export type ObjectQuery = {
  __typename?: 'ObjectQuery';
  object: Object;
};

export type ResizedImage = {
  __typename?: 'ResizedImage';
  height: Scalars['Int'];
  url: Scalars['String'];
  urls: RetinaImage;
  width: Scalars['Int'];
};

export type RetinaImage = {
  __typename?: 'RetinaImage';
  _1x: Scalars['String'];
  _2x: Scalars['String'];
  _3x: Scalars['String'];
};

export type Text = {
  __typename?: 'Text';
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  length: Scalars['Int'];
  name: Scalars['String'];
  toString: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type TextCreatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};


export type TextToStringArgs = {
  from?: InputMaybe<TruncateDirection>;
  length?: InputMaybe<Scalars['Int']>;
};


export type TextUpdatedAtArgs = {
  format?: InputMaybe<Scalars['String']>;
  relative?: InputMaybe<Scalars['Boolean']>;
};

export enum TruncateDirection {
  Center = 'CENTER',
  Head = 'HEAD',
  Tail = 'TAIL'
}

export type Meta_ImageFragment = { __typename?: 'Image', meta: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } } };

type Thumbnail_Attachment_Fragment = { __typename?: 'Attachment', id: number, url: string, label: string, kind: 'Attachment' };

type Thumbnail_Collection_Fragment = { __typename?: 'Collection', id: number, slug: string, label: string, kind: 'Collection' };

type Thumbnail_Image_Fragment = { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } };

type Thumbnail_Link_Fragment = { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' };

type Thumbnail_Text_Fragment = { __typename?: 'Text', id: number, body: string, label: string, kind: 'Text' };

export type ThumbnailFragment = Thumbnail_Attachment_Fragment | Thumbnail_Collection_Fragment | Thumbnail_Image_Fragment | Thumbnail_Link_Fragment | Thumbnail_Text_Fragment;

export type CollectionQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;


export type CollectionQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, key?: string | null, slug: string, title: string, counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename?: 'Attachment', id: number, url: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, label: string, kind: 'Collection' } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, body: string, label: string, kind: 'Text' } }> } } };

export type CollectionContentQueryVariables = Exact<{
  collectionId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type CollectionContentQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, slug: string, title: string, content: { __typename?: 'Content', id: number, next?: { __typename?: 'Content', id: number } | null, previous?: { __typename?: 'Content', id: number } | null, entity: { __typename: 'Attachment', id: number, name: string } | { __typename: 'Collection', id: number, slug: string, name: string } | { __typename: 'Image', id: number, width: number, height: number, name: string, originalUrl: string, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, resized: { __typename?: 'ResizedImage', width: number, height: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } }, meta: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } } } | { __typename: 'Link', id: number, name: string, url: string } | { __typename: 'Text', id: number, name: string, body: string } } } } };

export type IndexQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;


export type IndexQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, key?: string | null, slug: string, title: string, counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename?: 'Attachment', id: number, url: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, label: string, kind: 'Collection' } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, body: string, label: string, kind: 'Text' } }> } } };

export const Meta_ImageFragmentDoc = gql`
    fragment Meta_image on Image {
  meta: resized(width: 1200, height: 630) {
    urls {
      src: _1x
    }
  }
}
    `;
export const ThumbnailFragmentDoc = gql`
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
export const CollectionQueryDocument = gql`
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
    ${ThumbnailFragmentDoc}`;

export function useCollectionQuery(options: Omit<Urql.UseQueryArgs<CollectionQueryVariables>, 'query'>) {
  return Urql.useQuery<CollectionQuery>({ query: CollectionQueryDocument, ...options });
};
export const CollectionContentQueryDocument = gql`
    query CollectionContentQuery($collectionId: ID!, $id: ID!) {
  root: object {
    ... on Collection {
      collection(id: $collectionId) {
        id
        slug
        title
        content(id: $id) {
          id
          next {
            id
          }
          previous {
            id
          }
          entity {
            __typename
            ... on Attachment {
              id
              name
            }
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
              ...Meta_image
              id
              name: toString(length: 35, from: CENTER)
              originalUrl: url
              width
              height
              placeholder: resized(width: 50, height: 50, blur: 10) {
                urls {
                  src: _1x
                }
              }
              resized(width: 900, height: 900, quality: 85) {
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
        }
      }
    }
  }
}
    ${Meta_ImageFragmentDoc}`;

export function useCollectionContentQuery(options: Omit<Urql.UseQueryArgs<CollectionContentQueryVariables>, 'query'>) {
  return Urql.useQuery<CollectionContentQuery>({ query: CollectionContentQueryDocument, ...options });
};
export const IndexQueryDocument = gql`
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
    ${ThumbnailFragmentDoc}`;

export function useIndexQuery(options: Omit<Urql.UseQueryArgs<IndexQueryVariables>, 'query'>) {
  return Urql.useQuery<IndexQuery>({ query: IndexQueryDocument, ...options });
};