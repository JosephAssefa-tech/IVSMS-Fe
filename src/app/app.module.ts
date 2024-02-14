import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { VechileModelComponent } from '../components/vechile-model/vechile-model/vechile-model.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteConfirmationDeialogComponent } from '../components/modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatGridListModule } from '@angular/material/grid-list';
import { VechileModelRegisterComponent } from '../components/modal/model-registration/vechile-model-register/vechile-model-register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TrainingComponent } from '../components/training/training/training.component';
import { FactoryComponent } from '../components/factories/factory/factory.component';
import { LookupsComponent } from '../components/lookupspage/lookups/lookups.component';
import { DepreciationComponent } from '../components/Depreciation/depreciation/depreciation.component';
import { InflationComponent } from '../components/Inflation/inflation/inflation.component';
import { CountryComponent } from '../components/Countries/country/country.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CountryTableComponent } from '../components/Countries/country-grid/country-table/country-table.component';
import { DeperciationTableComponent } from '../components/Depreciation/deperciation-grid/deperciation-table/deperciation-table.component';
import { FactoriesTableComponent } from '../components/factories/factories-grid/factories-table/factories-table.component';
import { InflationTableComponent } from '../components/Inflation/inflation-grid/inflation-table/inflation-table.component';
import { ServiceTypeTableComponent } from '../components/service-types/service-type-grid/service-type-table/service-type-table.component';
import { VechileServiceTypeComponent } from '../components/service-types/service-type/vechile-service-type/vechile-service-type.component';
import { VechileManufactureTableComponent } from '../components/vechile-manufacturer/vechile-manufacturer-grid/vechile-manufacture-table/vechile-manufacture-table.component';
import { VechileManufactureComponent } from '../components/vechile-manufacturer/vechile-manufactures/vechile-manufacture/vechile-manufacture.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    VechileModelComponent,
    DeleteConfirmationDeialogComponent,
    VechileModelRegisterComponent ,
    TrainingComponent,
    FactoryComponent,
    LookupsComponent,
    DepreciationComponent,
    InflationComponent,
    CountryComponent,
    VechileServiceTypeComponent,
    CountryTableComponent,
    DeperciationTableComponent,
    FactoriesTableComponent,
    InflationTableComponent,
    CountryTableComponent,
    ServiceTypeTableComponent,
    VechileManufactureComponent,
    VechileManufactureTableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatGridListModule,
    HttpClientModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

  ],
  providers: [
    provideClientHydration(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
