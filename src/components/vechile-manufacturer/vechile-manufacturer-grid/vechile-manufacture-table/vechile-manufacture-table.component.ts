import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { FactoryService } from '../../../../services/factory-service/factory.service';
import { ModalServiceService } from '../../../../services/modal/modal-service.service';
import { VechileManufactureService } from '../../../../services/vechile-manufacture/vechile-manufacture.service';
import { VechileServiceService } from '../../../../services/vechile-service-type/vechile-service.service';
import { DepreciationComponent } from '../../../Depreciation/depreciation/depreciation.component';
import { PageEvent } from '@angular/material/paginator';
import { DeleteConfirmationDeialogComponent } from '../../../modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { VechileManufactureComponent } from '../../vechile-manufactures/vechile-manufacture/vechile-manufacture.component';

@Component({
  selector: 'app-vechile-manufacture-table',
  templateUrl: './vechile-manufacture-table.component.html',
  styleUrl: './vechile-manufacture-table.component.css'
})
export class VechileManufactureTableComponent {
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'factoryId', 'vehicleServiceTypeId','point','actions'];
  deperciations: any[] = [];
  serviceType: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private dialog: MatDialog,private modalService: ModalServiceService, private serviceTypes:VechileServiceService,private vechileManufactureService: VechileManufactureService,  private snackBar: MatSnackBar, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {

this.loadVechileManufactures();
  //  this.loadDeperciation();
   // this.loadServiceTypes();
}
loadVechileManufactures()
{
  this.vechileManufactureService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    this.deperciations = response.data;
    console.log(this.dataSource)
  });
}
// loadServiceTypes()
// {
//   this.serviceTypes.getAll().subscribe((response: any) => {

//     this.serviceType = response.data;
//     console.log(this.dataSource)
//   });

// }
EditVechile(selectedrowData: any) {

  this.modalService.setMode('edit');

  const dialogRef = this.dialog.open(VechileManufactureComponent, {
    width: '400px',
    // Pass the correct mode value retrieved from the service
    data: { mode: this.modalService.getMode(), selectedrowData, id: selectedrowData.id},
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
  
    }

  });
}

// loadDeperciation()
// {
 
//   this.deperciationService.getAll().subscribe((response: any) => {
//     this.dataSource = response.data;
//     this.deperciations = response.data;
//     console.log(this.dataSource)
//   });
// }
  // Handle pagination event 
  onPageChange(event: PageEvent): void {
    // You can add logic here if needed
    console.log(event);
  }
  openDeleteConfirmationDialog(id:number)
{
  console.log(id)

this.openDeleteConfirmationDialg(id);
}
openDeleteConfirmationDialg(id: number): void {
  const dialogRef = this.dialog.open(DeleteConfirmationDeialogComponent, {
    width: '350px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      // User clicked on 'Yes', perform delete action
      this.vechileManufactureService.deletre(id).subscribe(
        (response) => {
          console.error('Deleted successfully');

          // Update dataSource by removing the deleted item
          this.dataSource.data = this.dataSource.data.filter(
            (item) => item.id !== id
          );
        },
        (error) => {
          console.error('Error deleting:', error);
        }
      );
    }
    // Handle 'No' or close actions if needed
  });
}
}

