import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonsComponent } from './components/persons/persons.component';
import { OthersComponent } from './components/others/others.component';

const routes: Routes = [
  {
    path: 'products',
    title: 'Products',
    component: ProductsComponent
    // loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'pico',
    title: 'Pico-preview',
    component: PicoPreviewComponent
    // loadComponent: () => import('./components/pico-preview/pico-preview.component').then(m => m.PicoPreviewComponent)
  },
  {
    path: 'persons',
    title: 'Persons',
    component: PersonsComponent
  },
  {
    path: 'others',
    title: 'Others',
    component: OthersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
