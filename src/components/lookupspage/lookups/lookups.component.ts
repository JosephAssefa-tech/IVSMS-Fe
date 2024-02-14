import { Component } from '@angular/core';
import { ModalServiceService } from '../../../services/modal/modal-service.service';
import { CountryComponent } from '../../Countries/country/country.component';
import { FactoryComponent } from '../../factories/factory/factory.component';
import { DepreciationComponent } from '../../Depreciation/depreciation/depreciation.component';
import { InflationComponent } from '../../Inflation/inflation/inflation.component';
import { CountryTableComponent } from '../../Countries/country-grid/country-table/country-table.component';
import { FactoriesTableComponent } from '../../factories/factories-grid/factories-table/factories-table.component';
import { CountryService } from '../../../services/country-service/country.service';
import { VechileServiceTypeComponent } from '../../service-types/service-type/vechile-service-type/vechile-service-type.component';
import { VechileManufactureComponent } from '../../vechile-manufacturer/vechile-manufactures/vechile-manufacture/vechile-manufacture.component';

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
        this.modalService.setMode('save');
        this.toggleForm(CountryComponent);
     
        break;
      case 1:
        this.modalService.setMode('save');
        this.toggleForm(FactoryComponent);
        break;
     
      case 2:
        this.modalService.setMode('save');
        this.toggleForm(DepreciationComponent);
        break;
      case 3:
        this.modalService.setMode('save');
        this.toggleForm(InflationComponent);
        break;
      case 4:
        this.modalService.setMode('save');
        this.toggleForm(VechileServiceTypeComponent);
        break;
     case 5:
          this.modalService.setMode('save');
          this.toggleForm(VechileManufactureComponent);
          break;
      default:
        this.modalService.setMode('save');
        this.toggleForm(CountryComponent);
        break;
    }
  }

  private toggleForm(component: any) {
    this.modalService.open(component);
    // Toggle the form in the selected component
  }
}
