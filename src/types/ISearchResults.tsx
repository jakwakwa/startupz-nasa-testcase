export interface ISearchResults {
  [x: string]: any;
  length: any;
  photographer: string;
  nasa_id: string;
  title: string;
  location: string;
  description: string;
  date_created: string;
}

export interface IAssetData {
  data: ISearchResults[] | [];
}
