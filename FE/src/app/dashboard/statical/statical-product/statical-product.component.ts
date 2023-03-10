import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {StatiscalService} from '../../../shared/service/statiscal/statiscal.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'statical-product',
  templateUrl: './statical-product.component.html',
  styleUrls: ['./statical-product.component.scss']
})
export class StaticalProductComponent implements OnInit {

  newDate = new Date() ;
  listYear: any[] = [] ;
  listMonth = [ 1, 2, 3, 4, 5 ,6 , 7 , 8 , 9 ,10 , 11 ,12]
  day: number ;
  typeSearch: number = 3 ;
  listLabel: any[] = [] ;
  listSeries: any[] = [] ;
  max: any ;
  type: any = 3;
  listStatic: any[] = [] ;
  checkEmpty = false ;

  formShow = this.fb.group({
    startDate:  new Date( new Date().getFullYear(), new Date().getMonth() , new Date().getDate() - 9 ) ,
    endDate: new Date() ,
    type: 3 ,
    month: new Date().getMonth() + 1 ,
    year: new Date().getFullYear()  ,
  })

  form = this.fb.group({
    startDate:  new Date( new Date().getFullYear(), new Date().getMonth() , new Date().getDate() - 9 ) ,
    endDate: new Date() ,
    type: 3 ,
  })

  constructor( private fb: FormBuilder ,
               private staticalService: StatiscalService) {
  }

  ngOnInit(): void {
    this.getStatical() ;
    this.listDate() ;
  }

  getStatical(){
    this.staticalService.buyTheMostProduct( this.form.getRawValue() ).subscribe((value: any) => {
      this.listStatic = value
      if( this.listStatic.length != 0 ){
        this.checkEmpty = false ;
        this.addDateIntoList( value , this.listLabel , this.listSeries , this.max ) ;
      }else {
        this.checkEmpty = true ;
      }
      var data = {
        labels: this.listLabel,
        series: this.listSeries
      };

      new Chartist.Pie('#viewSevenProduct', data, {
        labelInterpolationFnc: function(value) {
          return value
        },
        chartPadding: 30,
        labelOffset: 70,
        labelDirection: 'explode',
      }  );
    })
  }

  onType( data: any ){
    this.type = data
  }

  listDate(){
    for( let i=0 ; i<= this.newDate.getFullYear() ; i++ ){
      var k = this.newDate.getFullYear() - i
      this.listYear.push(k);
      if( this.newDate.getFullYear() - 40 == k ){
        break ;
      }
    }
  }

  addDateIntoList( data: any , label: any[] , series: any[] , max: number ){
    max = data[0].totalPrice ;
    for( let x of data ){
      if( max <= x.totalPrice ){
        max = x.totalPrice ;
      }
      // @ts-ignore
      label.push(x.name)
      // @ts-ignore
      series.push(x.totalPrice) ;
    }
  }

  clear(){
    this.listSeries = [] ;
    this.listLabel  = [] ;
  }

  onSearch(){
    if( this.type == 2 ){
      this.findDay( this.formShow.getRawValue().month ) ;
      this.form.patchValue({
        startDate: new Date( this.formShow.getRawValue().year , this.formShow.getRawValue().month - 1, 1 ) ,
        endDate: new Date( this.formShow.getRawValue().year , this.formShow.getRawValue().month - 1 , this.day ) ,
        type: this.type
      })
    }
    if( this.type == 1 ){
      this.form.patchValue({
        startDate: new Date(  this.formShow.getRawValue().year , 0 ,1 ) ,
        endDate: new Date(  this.formShow.getRawValue().year , 11, 31) ,
      })
    }

    if( this.type == 3){
      this.form.patchValue({
        startDate: this.formShow.getRawValue().startDate ,
        endDate: this.formShow.getRawValue().endDate ,
      })
    }

    this.clear() ;
    this.getStatical() ;
  }

  findDay( data: any ){
     if( data == 1 || data == 3 || data == 5 || data == 7 || data == 8 || data == 10 || data == 12 ){
        this.day = 31
     }else if( data == 2) {
        if( data % 400 == 0 || ( data % 4 == 0 && data % 100 != 0 )){
          this.day = 29
        }else {
           this.day = 28
        }
     }else {
       this.day = 30
     }
  }
}
