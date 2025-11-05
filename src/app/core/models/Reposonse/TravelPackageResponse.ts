
export interface TravelPackageResponse {
  packageID: string;
  userID: string;
  title: string;
  description: string;
  detailedDescription: string;
  duration: string;
  price: number;
  includedServices: string[];
  imageSrc: string;
  location: string;
}
