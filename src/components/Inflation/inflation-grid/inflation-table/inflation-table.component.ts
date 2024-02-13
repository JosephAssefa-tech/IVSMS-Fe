import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { InflationService } from '../../../../services/inflation-service/inflation.service';

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
  constructor(   private snackBar: MatSnackBar,private inflationService:InflationService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
    this.myGroup = this.formBuilder.group({
      serviceYear: ['', Validators.required],
      point: ['', Validators.required],
   
    });

    this.loadInflations();
}
EditVechile(selectedrowData: any, mode: 'edit' | 'save' = 'edit') {


}
openDeleteConfirmationDialog(id:number)
{

}
loadInflations()
{
  this.inflationService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    console.log(this.factories)
  });
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

