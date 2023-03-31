import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import serverEnvConfig from "client.env.config";


@Injectable()
export class ProductsService {


  paginatedProductsListUrl = serverEnvConfig.ANGULR_API_GETPAGINATEDPRODUCTS;  // URL to web api
  paginationLimit = serverEnvConfig.ANGULR_API_GETPAGINATEDPRODUCTS_LIMIT; //number of products per page
  getProductDetailsByIdsUrl = serverEnvConfig.ANGULR_API_GETPRODUCTDETAILS_FOR_IDS;  // URL to web api

  private handleError: HandleError;
  http: HttpClient;

  static getRecommendedProducts: any;


  constructor( http: HttpClient, httpErrorHandler: HttpErrorHandler) {

    this.http = http;
    this.handleError = httpErrorHandler.createHandleError('CoolStoreProductsService');
  }

  fetchPaginatedProductsList(page:string): Observable<any> {
    return this.http.get<any>(this.paginatedProductsListUrl+"?page="+page + "&limit="+this.paginationLimit )
      .pipe(
        catchError(this.handleError('fetchPaginatedProductsList', ''))
      );
  }

  loginUser() {

  }

  logoutUser() {

  }

  /** getProductDetailsByIds  from the server */
  getProductDetailsByIds(productIds: string): Observable<any[]> {
    return this.http.get<any[]>(this.getProductDetailsByIdsUrl+"?productIds=" + productIds)
      .pipe(
        catchError(this.handleError('[[CoolStoreProductsService]-[getProductDetailsByIdsUrl]', []))
      );
  }

}
