import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VechileModelComponent } from '../components/vechile-model/vechile-model/vechile-model.component';
import { TrainingComponent } from '../components/training/training/training.component';
import { FactoryComponent } from '../components/factories/factory/factory.component';
import { CountryComponent } from '../components/Countries/country/country.component';
import { DepreciationComponent } from '../components/Depreciation/depreciation/depreciation.component';
import { InflationComponent } from '../components/Inflation/inflation/inflation.component';
import { LookupsComponent } from '../components/lookupspage/lookups/lookups.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/vechile' },


    { path: 'vechile', component:VechileModelComponent},
    { path: 'go', component:VechileModelComponent},
    { path: 'training', component:TrainingComponent},

    {
      path: 'tabs',
      children: [
        { path: 'factory', component:FactoryComponent},
        { path: 'country', component:CountryComponent},
        { path: 'deperciation', component:DepreciationComponent},
        { path: 'inflation', component:InflationComponent},
     
      ]
    },

    { path: 'lookups', component:LookupsComponent},

 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
