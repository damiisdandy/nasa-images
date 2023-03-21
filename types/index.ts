
export type ItemLink = {
  href: string;
  rel: string;
  render: string;
}

export type ItemData = {
  album: string[],
  center: string;
  date_created: string;
  description: string;
  keywords: string[];
  location: string;
  media_type: string;
  nasa_id: string;
  photographer: string;
  title: string;
}

export type Item = {
  data: ItemData[];
  href: string;
  links: ItemLink[]
}

export type CollectionLink = {
  href: string;
  prompt: string;
  rel: string;
}

export type Metadata = {
  total_hits: number;
}

export type Collection = {
  href: string;
  items: Item[]
  links: CollectionLink[];
  version: string;
}

export type APIRoot = {
  collection: Collection
}