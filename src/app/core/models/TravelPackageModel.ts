// export interface TravelPackageModel {
//   packageID: number;
//   title : string;
//   description : string;
//   detaileddescription : string;
//   duration : string;
//   price : number;
//   includedServices : string[];
//   imageSrc : string;
//   id: string;
//   location : string;
// }

export interface TravelPackageModel {
  packageID: string;
  userID :  string;
  title: string;
  description: string;
  detailedDescription: string;
  duration: string;
  price: number;
  includedServices: string[];
  imageSrc: string;
  location: string;
}
