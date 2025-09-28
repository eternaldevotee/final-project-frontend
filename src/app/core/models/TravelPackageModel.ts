export interface TravelPackageModel {
  PackageID: number;
  Title : string;
  Description : string;
  DetailedDescription : string;
  Duration : string;
  Price : number;
  IncludedServices : string[];
  ImageSrc : string;
  id: string;
  Location : string;
}