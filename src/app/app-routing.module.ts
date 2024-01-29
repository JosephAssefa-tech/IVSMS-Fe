import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VechileModelComponent } from '../components/vechile-model/vechile-model/vechile-model.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/vechile' },
    { path: 'vechile', component:VechileModelComponent}
 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
