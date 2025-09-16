import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {


  constructor(private rest: HttpClient) { }

  strUrl : string = "http://localhost:3000/";


  getAllData():Observable<any>{
    return this.rest.get(`${this.strUrl}TravelPackage`);
    //return this.rest.post(`${this.strUrl}User`,signup);
  }
  //  filteredResults = [
  // { name: 'Carrot', color: 'orange' },
  // { name: 'Potato', color: 'brown' },
  // { name: 'Tomato', color: 'red' },
  // { name: 'Beans', color: 'green' }
  // ];

  // getAllResults(){
  //   return this.filteredResults;
  // }
}
