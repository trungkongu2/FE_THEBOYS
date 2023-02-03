import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../../constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailApiService {

constructor(
  private readonly http: HttpClient
) { }

createProductDetail(data: any){
  return this.http.post(ApiConstant.productDetail,data);
}

getProductDetailById(data: any): Observable<any>{
  return this.http.get(`${ApiConstant.productDetail}/product/${data}`);
}

getColorByProductId(productId: any): Observable<any>{
  return this.http.get(`${ApiConstant.productDetail2}/color/${productId}`);
}

getSizeByProductId(productId: any, color: any): Observable<any>{
  return this.http.get(`${ApiConstant.productDetail2}/size/${productId}/${color}`);
}

getByColorAndSize(color: any, size: any):Observable<any>{
  return this.http.get(`${ApiConstant.productDetail2}/one?size=${size}&color=${color}`);
}

getOneProductDetail(id: any): Observable<any>{
  return this.http.get(`${ApiConstant.productDetail}/${id}`);
}
updateProductDetail(data: any){
  return this.http.put(`${ApiConstant.productDetail}/${data.id}`,data);
}
dowloadExcel(){
    return this.http.get(`${ApiConstant.productDetail}/file-excel`, { responseType: 'blob' });
}
}
