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
  entityType?: InputMaybe<EntityTypes>;
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

export enum EntityTypes {
  Attachment = 'ATTACHMENT',
  Collection = 'COLLECTION',
  Image = 'IMAGE',
  Link = 'LINK',
  Text = 'TEXT'
}

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
  fit?: InputMaybe<ResizedImageFit>;
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

export type ObjectQuery = {
  __typename?: 'ObjectQuery';
  object: Collection;
};

export type ResizedImage = {
  __typename?: 'ResizedImage';
  height: Scalars['Int'];
  url: Scalars['String'];
  urls: RetinaImage;
  width: Scalars['Int'];
};

export enum ResizedImageFit {
  Cover = 'COVER',
  Inside = 'INSIDE'
}

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

type Inline_Attachment_Fragment = { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' };

type Inline_Collection_Fragment = { __typename?: 'Collection', id: number, slug: string, updatedAt: string, name: string, metadata: any, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, updatedAt: string, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment', id: number, contentType: string, fileSize?: string | null } | { __typename: 'Collection', id: number, title: string } | { __typename: 'Image', id: number, width: number, height: number, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } } | { __typename: 'Link', id: number, name: string } | { __typename: 'Text', id: number, body: string } }> } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, label: string, blurb: string, kind: 'Text' } }> };

type Inline_Image_Fragment = { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } };

type Inline_Link_Fragment = { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' };

type Inline_Text_Fragment = { __typename?: 'Text', id: number, body: string, label: string, kind: 'Text' };

export type InlineFragment = Inline_Attachment_Fragment | Inline_Collection_Fragment | Inline_Image_Fragment | Inline_Link_Fragment | Inline_Text_Fragment;

export type InlineCollectionFragment = { __typename?: 'Collection', id: number, slug: string, name: string, updatedAt: string, metadata: any, counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, updatedAt: string, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment', id: number, contentType: string, fileSize?: string | null } | { __typename: 'Collection', id: number, title: string } | { __typename: 'Image', id: number, width: number, height: number, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } } | { __typename: 'Link', id: number, name: string } | { __typename: 'Text', id: number, body: string } }> } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, label: string, blurb: string, kind: 'Text' } }> };

type Slide_Attachment_Fragment = { __typename: 'Attachment' };

type Slide_Collection_Fragment = { __typename: 'Collection', id: number, slug: string, name: string };

type Slide_Image_Fragment = { __typename: 'Image', id: number, name: string, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string } }, resized: { __typename?: 'ResizedImage', width: number, height: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } };

type Slide_Link_Fragment = { __typename: 'Link', id: number, name: string, url: string };

type Slide_Text_Fragment = { __typename: 'Text', id: number, name: string, body: string };

export type SlideFragment = Slide_Attachment_Fragment | Slide_Collection_Fragment | Slide_Image_Fragment | Slide_Link_Fragment | Slide_Text_Fragment;

export type ThumbnailCollectionFragment = { __typename?: 'Collection', id: number, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment', id: number, contentType: string, fileSize?: string | null } | { __typename: 'Collection', id: number, title: string } | { __typename: 'Image', id: number, width: number, height: number, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } } | { __typename: 'Link', id: number, name: string } | { __typename: 'Text', id: number, body: string } }> };

export type Meta_ImageFragment = { __typename?: 'Image', meta: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } } };

type Thumbnail_Attachment_Fragment = { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' };

type Thumbnail_Collection_Fragment = { __typename?: 'Collection', id: number, slug: string, updatedAt: string, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment', id: number, contentType: string, fileSize?: string | null } | { __typename: 'Collection', id: number, title: string } | { __typename: 'Image', id: number, width: number, height: number, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } } | { __typename: 'Link', id: number, name: string } | { __typename: 'Text', id: number, body: string } }> };

type Thumbnail_Image_Fragment = { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } };

type Thumbnail_Link_Fragment = { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' };

type Thumbnail_Text_Fragment = { __typename?: 'Text', id: number, label: string, blurb: string, kind: 'Text' };

export type ThumbnailFragment = Thumbnail_Attachment_Fragment | Thumbnail_Collection_Fragment | Thumbnail_Image_Fragment | Thumbnail_Link_Fragment | Thumbnail_Text_Fragment;

export type CollectionQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;


export type CollectionQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, key?: string | null, slug: string, title: string, metadata: any, counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, updatedAt: string, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment', id: number, contentType: string, fileSize?: string | null } | { __typename: 'Collection', id: number, title: string } | { __typename: 'Image', id: number, width: number, height: number, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } } | { __typename: 'Link', id: number, name: string } | { __typename: 'Text', id: number, body: string } }> } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, label: string, blurb: string, kind: 'Text' } }> } } };

export type CollectionContentQueryVariables = Exact<{
  collectionId: Scalars['ID'];
  id: Scalars['ID'];
}>;


export type CollectionContentQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, slug: string, title: string, content: { __typename?: 'Content', id: number, next?: { __typename?: 'Content', id: number } | null, previous?: { __typename?: 'Content', id: number } | null, entity: { __typename: 'Attachment', id: number, name: string } | { __typename: 'Collection', id: number, slug: string, name: string } | { __typename: 'Image', id: number, width: number, height: number, name: string, originalUrl: string, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, resized: { __typename?: 'ResizedImage', width: number, height: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } }, meta: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } } } | { __typename: 'Link', id: number, name: string, url: string } | { __typename: 'Text', id: number, body: string, name: string } } } } };

export type IndexQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;


export type IndexQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, key?: string | null, slug: string, title: string, metadata: any, counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, updatedAt: string, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment', id: number, contentType: string, fileSize?: string | null } | { __typename: 'Collection', id: number, title: string } | { __typename: 'Image', id: number, width: number, height: number, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } } | { __typename: 'Link', id: number, name: string } | { __typename: 'Text', id: number, body: string } }> } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, label: string, blurb: string, kind: 'Text' } }> } } };

export type PageQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;


export type PageQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, key?: string | null, slug: string, title: string, metadata: any, counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, metadata: any, entity: { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, updatedAt: string, name: string, metadata: any, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename?: 'Attachment', id: number, url: string, fileSize?: string | null, contentType: string, label: string, kind: 'Attachment' } | { __typename?: 'Collection', id: number, slug: string, updatedAt: string, label: string, kind: 'Collection', counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment', id: number, contentType: string, fileSize?: string | null } | { __typename: 'Collection', id: number, title: string } | { __typename: 'Image', id: number, width: number, height: number, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string, _2x: string } } } | { __typename: 'Link', id: number, name: string } | { __typename: 'Text', id: number, body: string } }> } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, label: string, blurb: string, kind: 'Text' } }> } | { __typename?: 'Image', id: number, width: number, height: number, url: string, label: string, kind: 'Image', placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', src: string } }, thumb: { __typename?: 'ResizedImage', width: number, height: number, srcs: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename?: 'Link', id: number, url: string, label: string, kind: 'Link' } | { __typename?: 'Text', id: number, body: string, label: string, kind: 'Text' } }> } } };

export type SlidesQueryVariables = Exact<{
  id: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
  per?: InputMaybe<Scalars['Int']>;
}>;


export type SlidesQuery = { __typename?: 'ObjectQuery', root: { __typename?: 'Collection', collection: { __typename?: 'Collection', id: number, slug: string, title: string, counts: { __typename?: 'CollectionCounts', contents: number }, contents: Array<{ __typename?: 'Content', id: number, entity: { __typename: 'Attachment' } | { __typename: 'Collection', id: number, slug: string, name: string } | { __typename: 'Image', id: number, name: string, placeholder: { __typename?: 'ResizedImage', urls: { __typename?: 'RetinaImage', _1x: string } }, resized: { __typename?: 'ResizedImage', width: number, height: number, urls: { __typename?: 'RetinaImage', _1x: string, _2x: string, _3x: string } } } | { __typename: 'Link', id: number, name: string, url: string } | { __typename: 'Text', id: number, name: string, body: string } }> } } };

export const ThumbnailCollectionFragmentDoc = gql`
    fragment ThumbnailCollection on Collection {
  id
  contents(per: $per) {
    id
    entity {
      __typename
      ... on Image {
        id
        width
        height
        placeholder: resized(width: 125, height: 125, fit: COVER) {
          urls {
            _1x
            _2x
          }
        }
      }
      ... on Text {
        id
        body: toString(length: 200)
      }
      ... on Link {
        id
        name: toString(length: 30, from: CENTER)
      }
      ... on Collection {
        id
        title
      }
      ... on Attachment {
        id
        contentType
        fileSize
      }
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
    ${ThumbnailCollectionFragmentDoc}`;
export const InlineCollectionFragmentDoc = gql`
    fragment InlineCollection on Collection {
  id
  slug
  name
  updatedAt(relative: true)
  metadata
  counts {
    contents
  }
  contents(page: 1, per: 50) {
    id
    entity {
      ...Thumbnail
    }
  }
}
    ${ThumbnailFragmentDoc}`;
export const InlineFragmentDoc = gql`
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
    ...InlineCollection
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
    ${InlineCollectionFragmentDoc}`;
export const SlideFragmentDoc = gql`
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
export const Meta_ImageFragmentDoc = gql`
    fragment Meta_image on Image {
  meta: resized(width: 1200, height: 630) {
    urls {
      src: _1x
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
        metadata
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
  return Urql.useQuery<CollectionQuery, CollectionQueryVariables>({ query: CollectionQueryDocument, ...options });
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
              name: toString(length: 35, from: TAIL)
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
  return Urql.useQuery<CollectionContentQuery, CollectionContentQueryVariables>({ query: CollectionContentQueryDocument, ...options });
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
    ${ThumbnailFragmentDoc}`;

export function useIndexQuery(options: Omit<Urql.UseQueryArgs<IndexQueryVariables>, 'query'>) {
  return Urql.useQuery<IndexQuery, IndexQueryVariables>({ query: IndexQueryDocument, ...options });
};
export const PageQueryDocument = gql`
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
    ${InlineFragmentDoc}`;

export function usePageQuery(options: Omit<Urql.UseQueryArgs<PageQueryVariables>, 'query'>) {
  return Urql.useQuery<PageQuery, PageQueryVariables>({ query: PageQueryDocument, ...options });
};
export const SlidesQueryDocument = gql`
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
    ${SlideFragmentDoc}`;

export function useSlidesQuery(options: Omit<Urql.UseQueryArgs<SlidesQueryVariables>, 'query'>) {
  return Urql.useQuery<SlidesQuery, SlidesQueryVariables>({ query: SlidesQueryDocument, ...options });
};