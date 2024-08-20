import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { PaginatedProductsList } from '../models/product.model';
import serverEnvConfig from "client.env.config";
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  isUserAuthenticated:boolean=false;
  searchedProduct: any;
  errorMessage:any;

  private messageService:MessageService;

  testBrowser: boolean = true;
  products = new PaginatedProductsList();
  paginationLimit = serverEnvConfig.ANGULR_API_GETPAGINATEDPRODUCTS_LIMIT; //number of products per page

  page = 1;


  constructor(private router: Router,
    @Inject(MessageService) messageService:MessageService,
    @Inject(PLATFORM_ID) platformId:string, private productsService:ProductsService ) {
    this.isUserAuthenticated = false;
    this.testBrowser = isPlatformBrowser(platformId);

    this.messageService = messageService;
  }
  ngOnInit(): void {

    if (this.testBrowser) {
      this.fetchPaginatedProductsList("0");
      let user = this.fetchUser();
      if(!user.loggedIn){
        this.router.navigateByUrl("/login");
      }

    }


  }


  logout() {
      this.isUserAuthenticated = false;
      if(localStorage !==undefined){
        localStorage.setItem("currentuser", null);
      }
      this.write("currentuser", {email: "", loggedIn :false})
      this.router.navigateByUrl("/login");

  }

  fetchUser() {
    let currUser;
    if(localStorage !==undefined){
      currUser = JSON.parse(localStorage.getItem("currentuser"));
    }

    return currUser;
  }

  private write(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }


  fetchPaginatedProductsList(page:string) {

    this.productsService.fetchPaginatedProductsList(page)
      .subscribe(products => {
        this.products = products;
        this.errorMessage = JSON.parse(this.messageService.get());

      });


  }

  searchById(id:string) {
    this.productsService.getProductDetailsByIds(id)
    .subscribe(product => {
      this.searchedProduct = product[0];
      console.log("this.currentProduct ", this.searchedProduct)
    }
    );

  }


  loadPage(event:any){
    if(this.page != event) {
      this.page = event;
      this.fetchPaginatedProductsList(event);
      console.log("this.products", this.products)
    }
  }

}
