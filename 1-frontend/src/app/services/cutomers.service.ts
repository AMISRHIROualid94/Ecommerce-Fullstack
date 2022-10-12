import { Injectable } from '@angular/core';
import { Customer } from '../common/customer';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CutomersService {

  constructor(private httpClient : HttpClient) { }
  private baseUrl = 'http://localhost:8080/api/customers';

  getCustomers(email : string): Observable<GetResponseCustomer> {
    const customerUrl = `${this.baseUrl}/search/findByEmail?email=${email}`
    return this.httpClient.get<GetResponseCustomer>(customerUrl);
    }
}

interface GetResponseCustomer{
      firstName:string, 
      lastName:string,
      email:string,
      tempOrder:number
}