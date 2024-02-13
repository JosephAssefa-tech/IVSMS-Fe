import { Component } from '@angular/core';
import { ModalServiceService } from '../../../services/modal/modal-service.service';
import { CountryComponent } from '../../Countries/country/country.component';
import { FactoryComponent } from '../../factories/factory/factory.component';
import { DepreciationComponent } from '../../Depreciation/depreciation/depreciation.component';
import { InflationComponent } from '../../Inflation/inflation/inflation.component';
import { CountryTableComponent } from '../../Countries/country-grid/country-table/country-table.component';
import { FactoriesTableComponent } from '../../factories/factories-grid/factories-table/factories-table.component';
import { CountryService } from '../../../services/country-service/country.service';

@Component({
  selector: 'app-lookups',
  templateUrl: './lookups.component.html',
  styleUrl: './lookups.component.css'
})
export class LookupsComponent {
  selectedTabIndex = -1;

  constructor(private countryService: CountryService, private modalService: ModalServiceService) {}

  tabChanged(index: number) {
    this.selectedTabIndex = index;
  }
  openModal() {
 
    switch (this.selectedTabIndex) {
      case 0:
        this.countryService.setMode('save');
        this.toggleForm(CountryComponent);
     
        break;
      case 1:
        this.toggleForm(FactoryComponent);
        break;
     
      case 2:
        this.toggleForm(DepreciationComponent);
        break;
      case 3:
        this.toggleForm(InflationComponent);
        break;
      case 4:
      
      default:
        break;
    }
  }

  private toggleForm(component: any) {
    this.modalService.open(component);
    // Toggle the form in the selected component
  }
}
