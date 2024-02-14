import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeperciationService } from '../../../../services/deperciation-service/deperciation.service';
import { VechileServiceService } from '../../../../services/vechile-service-type/vechile-service.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteConfirmationDeialogComponent } from '../../../modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalServiceService } from '../../../../services/modal/modal-service.service';
import { DepreciationComponent } from '../../depreciation/depreciation.component';

@Component({
  selector: 'app-deperciation-table',
  templateUrl: './deperciation-table.component.html',
  styleUrl: './deperciation-table.component.css'
})
export class DeperciationTableComponent {
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'vehicleServiceTypeId', 'serviceYear','point','actions'];
  deperciations: any[] = [];
  serviceType: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private dialog: MatDialog,private modalService: ModalServiceService, private serviceTypes:VechileServiceService,  private snackBar: MatSnackBar,private deperciationService:DeperciationService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {


    this.loadDeperciation();
    this.loadServiceTypes();
}
loadServiceTypes()
{
  this.serviceTypes.getAll().subscribe((response: any) => {

    this.serviceType = response.data;
    console.log(this.dataSource)
  });

}
EditVechile(selectedrowData: any) {

  this.modalService.setMode('edit');

  const dialogRef = this.dialog.open(DepreciationComponent, {
    width: 'auto',
    // Pass the correct mode value retrieved from the service
    data: { mode: this.modalService.getMode(), selectedrowData, id: selectedrowData.id},
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
  
    }

  });
}

loadDeperciation()
{
 
  this.deperciationService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    this.deperciations = response.data;
    console.log(this.dataSource)
  });
}
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
      this.deperciationService.deletre(id).subscribe(
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
