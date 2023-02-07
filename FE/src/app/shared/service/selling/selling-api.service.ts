import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiConstant} from "../../constants/ApiConstant";

@Injectable({
  providedIn: 'root'
})
export class SellingApiService {

  api = ApiConstant.api;
  
  paymentAPI = 'http://localhost:8080/payoffline';

  loginAPI = 'http://localhost:8080/rest/security/login';

  constructor(private readonly http: HttpClient) { }

  //payment

  paymentOffline(
      note: any,
      userId: any,
      staffId: any,
      listAddToCart: any
    ):Observable<any>{
      return this.http.post(this.paymentAPI + `?note=${note}&cus=${userId}&staff=${staffId}`, listAddToCart);
  }

  //selling

  login(username: any, password: any):Observable<any>{
    return this.http.post(this.loginAPI+ `?username=${username}&password=${password}`, null);
  }

  getAllUser(status: any): Observable<any>{
    return this.http.get(`${ApiConstant.selling}/user/${status}`);
  }

  getAllProduct(status: any): Observable<any>{
    return this.http.get(`${ApiConstant.selling}/product/${status}`);
  }

  findProByCate(categoryId: any): Observable<any>{
    return this.http.get(`${ApiConstant.selling}/product/category/${categoryId}`)
  }

  getAllCategories(status: any): Observable<any>{
    return this.http.get(`${ApiConstant.selling}/category/${status}`);
}
getColorByProductId(productId: any): Observable<any>{
  return this.http.get(`${ApiConstant.selling}/product-detail/color/${productId}`);
}

getSizeByProductId(productId: any, color: any): Observable<any>{
  return this.http.get(`${ApiConstant.selling}/product-detail/size/${productId}/${color}`);
}

getByColorAndSize(color: any, size: any):Observable<any>{
  return this.http.get(`${ApiConstant.selling}/product-detail/one?size=${size}&color=${color}`);
}

  //end

  // delete code here
  // getAllCategories(): Observable<any>{
  //   return this.http.get(`${this.api}category`)
  // }

  // getProByCate(id: any): Observable<any>{
  //   return this.http.get(`${this.api}product/findByCate/${id}`)
  // }

  // getProductDetail(id: any): Observable<any>{
  //   return this.http.get(`${this.api}productDetail/getByProduct/${id}`)
  // }

  // paymentSelling(obj: any): Observable<any>{
  //   return this.http.post(`${this.api}selling/payment`,obj);
  // }

  resetQuantityInventory(lst: any):Observable<any>{
    return this.http.post(`${this.api}selling/resetQuantityInventory`,lst);
  }
}
