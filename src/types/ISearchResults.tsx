export interface ISearchResults {
  data: {
    photographer: string;
    nasa_id: string;
    title: string;
    location: string;
    description: string;
    date_created: string;
  }[];
  links: { href: string | undefined }[];
}
