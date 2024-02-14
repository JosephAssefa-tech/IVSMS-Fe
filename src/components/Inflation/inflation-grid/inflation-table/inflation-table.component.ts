import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { InflationService } from '../../../../services/inflation-service/inflation.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteConfirmationDeialogComponent } from '../../../modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalServiceService } from '../../../../services/modal/modal-service.service';
import { InflationComponent } from '../../inflation/inflation.component';

@Component({
  selector: 'app-inflation-table',
  templateUrl: './inflation-table.component.html',
  styleUrl: './inflation-table.component.css'
})
export class InflationTableComponent {
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'serviceYear', 'point','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(private dialog: MatDialog,private modalService: ModalServiceService,   private snackBar: MatSnackBar,private inflationService:InflationService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
    this.switchToSaveMode();
    this.myGroup = this.formBuilder.group({
      serviceYear: ['', Validators.required],
      point: ['', Validators.required],
   
    });

    this.loadInflations();
}
switchToSaveMode() {
  console.log("Setting mode to 'edit'");
  this.modalService.setMode('edit');
  const currentMode = this.modalService.getMode();
console.log(`Current mode is '${currentMode}'`);

}
EditVechile(selectedrowData: any) {

  this.modalService.setMode('edit');

  const dialogRef = this.dialog.open(InflationComponent, {
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
      this.inflationService.deletre(id).subscribe(
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
loadInflations()
{
  this.inflationService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    console.log(this.factories)
  });
}
  // Handle pagination event
  onPageChange(event: PageEvent): void {
    // You can add logic here if needed
    console.log(event);
  }
saveVechileModel() {
  if (this.myGroup.valid) {
   console.log("Saving");
 //   // Get the form values
    const formData = this.myGroup.value;

 //   if (this.data.mode === 'edit') {
 //     console.log("editing");

 //     // Include the 'id' property in the formData
 //     formData.id = this.data.id;
 //    //formData.factoryName=this.data.factoryName;

 //     // Editing an existing record
 //     const editedData = { ...this.selectedRowData, ...formData };

 //     // Call your service's update method to update the data
 //     this.vechileModelService.update(editedData).subscribe(
 //       (response: any) => {
 //         //this.onAddDataSuccess();
 //         // Handle success, e.g., show a success notification
 //         console.log('Data updated successfully:', response);
 //         this.snackBar.open('Data updated successfully', 'Close', {
 //           duration: 3000, // Duration in milliseconds
 //         });
 //         this.dialogRef.close(false);
 //         // Update the table with the latest data
        
 //       },
 //       (error: any) => {
 //         this.snackBar.open('Error updating data', 'Close', {
 //           duration: 3000, // Duration in milliseconds
 //           panelClass: ['error-snackbar'], // Add a custom CSS class for error styling (optional)
 //         });
 //         console.error('Update failed:', error);
 //       }
 //     );

 //     // Clear selectedRowData after updating
 //     this.myGroup.reset();
 //     this.selectedRowData = null;
 //   } else if (this.data.mode === 'save') {
     console.log("posting");
     // Adding a new record
     // Call your service's post method to save the new data
     this.inflationService.post(formData).subscribe(
       (response: any) => {
         
         // Handle success, e.g., show a success notification
         console.log('Data saved successfully:', response);
         this.snackBar.open('Data saved successfully', 'Close', {
           duration: 3000, // Duration in milliseconds
         });

         // Update the table with the newly added record
        

         this.myGroup.reset();
       },
       (error: any) => {
         this.snackBar.open('Error saving data', 'Close', {
           duration: 3000, // Duration in milliseconds
           panelClass: ['error-snackbar'], // Add a custom CSS class for error styling (optional)
         });
         console.error('Save failed:', error);
       }
     );
   }
 // } else {
 //   // Handle invalid form, e.g., show an error notification
 //   console.error('Invalid form data');
  } 
}

