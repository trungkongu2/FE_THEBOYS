import { Injectable } from '@angular/core';
import {SellingApiService} from "./selling-api.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellingService {

  constructor(private sellingApiService: SellingApiService) { }

//   paymentOffline(
//     address: any,
//     ward: any,
//     district: any,
//     province: any,
//     service: any,
//     note: any,
//     decrease: any,
//     discountId: any,
//     userId: any
//   ){
//     return this.sellingApiService.paymentOffline(address, ward, district, province, service, note, decrease, discountId, userId);
// }


login(username: any, password: any){
  return this.sellingApiService.login(username, password);
}

  getColorByProductId(productId: any){
    return this.sellingApiService.getColorByProductId(productId);
  }
  
  getSizeByProductId(productId: any, color: any){
    return this.sellingApiService.getSizeByProductId(productId, color);
  }

  getByColorAndSize(color: any, size: any){
    return this.sellingApiService.getByColorAndSize(color, size);
  }

  getAllUser(status: any){
    return this.sellingApiService.getAllUser(status);
  }

  getAllProduct(status: any){
    return this.sellingApiService.getAllProduct(status);
  }

  findProByCate(categoryId: any){
    return this.sellingApiService.findProByCate(categoryId);
  }

  getAllCategories(status: any){
    return this.sellingApiService.getAllCategories(status);
  }

  // delete code here
  // getAllCategories(){
  //   return this.sellingApiService.getAllCategories();
  // }

  // getProByCate(id: any){
  //   return this.sellingApiService.getProByCate(id);
  // }

  // getProductDetail(id: any){
  //   return this.sellingApiService.getProductDetail(id);
  // }

  // paymentSelling(obj:any){
  //   return this.sellingApiService.paymentSelling(obj);
  // }

  resetQuantityInventory(lst:any){
    return this.sellingApiService.resetQuantityInventory(lst);
  }
}
