import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PeopleComponent } from './components/people/people.component';
import { PersonsComponent } from './components/persons/persons.component';
import { ProductComponent } from './components/product/product.component';
import { HighlightDirective } from './directives/highlight.directive';
import { OthersComponent } from './components/others/others.component';
import { FormsModule } from '@angular/forms';
import { ReversePipe } from './pipes/reverse.pipe';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
