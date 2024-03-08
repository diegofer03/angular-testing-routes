import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products/products.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PeopleComponent } from './components/people/people.component';
import { PersonsComponent } from './components/persons/persons.component';
import { ProductComponent } from './products/product/product.component';
import { HighlightDirective } from './directives/highlight.directive';
import { OthersComponent } from './components/others/others.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from './pipes/reverse.pipe';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { RegisterFormComponent } from './auth/components/register-form/register-form.component';
import { LoginFormComponent } from './auth/components/login-form/login-form.component';
import { BannerComponent } from './components/banner/banner.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    PicoPreviewComponent,
    PeopleComponent,
    PersonsComponent,
    ProductComponent,
    HighlightDirective,
    OthersComponent,
    ReversePipe,
    ProductDetailComponent,
    RegisterFormComponent,
    LoginFormComponent,
    BannerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
