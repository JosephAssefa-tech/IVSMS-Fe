import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { InflationService } from '../../../services/inflation-service/inflation.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalServiceService } from '../../../services/modal/modal-service.service';

@Component({
  selector: 'app-inflation',
  templateUrl: './inflation.component.html',
  styleUrl: './inflation.component.css'
})
export class InflationComponent {
  selectedRowData: any;
  mode: 'edit' | 'save' | undefined;
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'serviceYear', 'point','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'save'; selectedrowData: any; id?: number ;countryNameEng ?:string} = { mode: 'edit', selectedrowData: null },
    public dialogRef: MatDialogRef<InflationComponent>,private modalService: ModalServiceService,
    
    private snackBar: MatSnackBar,private inflationService:InflationService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
    this.myGroup = this.formBuilder.group({
      serviceYear: ['', Validators.required],
      point: ['', Validators.required],
   
    });
    this.mode = this.modalService.getMode();
    this.loadInflations();
    this.switchToSaveMode();
    this.setFormValues();
}
switchToSaveMode() {
  this.modalService.setMode('save');
}
private setFormValues(): void {
  // Set form values based on the data for editing
  if (this.data && this.data.selectedrowData) {

    const rowData = this.data.selectedrowData;

    this.myGroup.setValue({
      serviceYear: rowData.serviceYear || '',
      point: rowData.point || '',
    

    });
  }
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
onNoClick(): void {
  this.dialogRef.close(false);
}
saveVechileModel() {
  if (this.myGroup.valid) {
   console.log("Saving");
 //   // Get the form values
    const formData = this.myGroup.value;

   if (this.mode === 'edit') {
     console.log("editing");

     // Include the 'id' property in the formData
     formData.id = this.data.id;
    //formData.factoryName=this.data.factoryName;

     // Editing an existing record
     const editedData = { ...this.selectedRowData, ...formData };

     // Call your service's update method to update the data
     this.inflationService.update(editedData).subscribe(
       (response: any) => {
         //this.onAddDataSuccess();
         // Handle success, e.g., show a success notification
         console.log('Data updated successfully:', response);
         this.snackBar.open('Data updated successfully', 'Close', {
           duration: 3000, // Duration in milliseconds
         });
         this.dialogRef.close(false);
         // Update the table with the latest data
        
       },
       (error: any) => {
         this.snackBar.open('Error updating data', 'Close', {
           duration: 3000, // Duration in milliseconds
           panelClass: ['error-snackbar'], // Add a custom CSS class for error styling (optional)
         });
         console.error('Update failed:', error);
       }
     );

     // Clear selectedRowData after updating
     this.myGroup.reset();
     this.selectedRowData = null;
   } else{
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
 } else {
   // Handle invalid form, e.g., show an error notification
   console.error('Invalid form data');
  } 
}
}