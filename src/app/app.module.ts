import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { LoginComponent } from './login/login.component';
import { MessageService } from './message.service';
import { ProductsComponent } from './products/products.component';
import { ProductsService } from './services/products.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule, HttpClientModule,
    NgbModule
  ],
  providers: [HttpErrorHandler, MessageService, ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
