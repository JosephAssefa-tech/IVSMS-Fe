import { Component, ViewChild } from '@angular/core';
import { VechileServiceService } from '../../../../services/vechile-service-type/vechile-service.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ModalServiceService } from '../../../../services/modal/modal-service.service';
import { CountryComponent } from '../../../Countries/country/country.component';
import { DeleteConfirmationDeialogComponent } from '../../../modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { VechileServiceTypeComponent } from '../../service-type/vechile-service-type/vechile-service-type.component';

@Component({
  selector: 'app-service-type-table',
  templateUrl: './service-type-table.component.html',
  styleUrl: './service-type-table.component.css'
})
export class ServiceTypeTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isUpdateEnabled: boolean | undefined;
  displayedColumns: string[] = ['id', 'descriptionAmh', 'code','point','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(private dialog: MatDialog,private modalService: ModalServiceService, private serviceType: VechileServiceService,  private snackBar: MatSnackBar, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
 this.switchToSaveMode();

    this.ServiceTypes();
}
switchToSaveMode() {
  console.log("Setting mode to 'edit'");
  this.modalService.setMode('edit');
  const currentMode = this.modalService.getMode();
console.log(`Current mode is '${currentMode}'`);

}
ServiceTypes()
{
  this.serviceType.getAll().subscribe((response: any) => {
    this.dataSource.data = response.data;
    this.dataSource.paginator = this.paginator; // Bind the paginator
 
  });

}
  // Handle pagination event
  onPageChange(event: PageEvent): void {
    // You can add logic here if needed
    console.log(event);
  }

EditVechile(selectedrowData: any) {

  this.modalService.setMode('edit');

  const dialogRef = this.dialog.open(VechileServiceTypeComponent, {
    width: 'auto',
    // Pass the correct mode value retrieved from the service
    data: { mode: this.modalService.getMode(), selectedrowData, id: selectedrowData.id, countryNameEng: selectedrowData.countryNameEng },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
  
    }

  });
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
      this.serviceType.deletre(id).subscribe(
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
