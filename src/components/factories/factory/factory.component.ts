import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { FactoryService } from '../../../services/factory-service/factory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrl: './factory.component.css'
})
export class FactoryComponent {
  mode: 'edit' | 'save' | undefined;
  selectedRowData: any;
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'factoryNameAmh', 'factoryNameEng','code','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'save'; selectedrowData: any; id?: number ;countryNameEng ?:string} = { mode: 'edit', selectedrowData: null },
    public dialogRef: MatDialogRef<FactoryComponent>,
      private snackBar: MatSnackBar,private factoryService:FactoryService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
    this.myGroup = this.formBuilder.group({
      factoryNameAmh: ['', Validators.required],
      factoryNameEng: ['', Validators.required],
      code: ['', Validators.required],
    });

    this.loadFactories();
    this.setFormValues();
}
private setFormValues(): void {
  // Set form values based on the data for editing
  if (this.data && this.data.selectedrowData) {

    const rowData = this.data.selectedrowData;
console.log("form factory name");
console.log(this.data.selectedrowData.countryNameEng)
    this.myGroup.setValue({
      factoryNameAmh: rowData.factoryNameAmh || '',
      factoryNameEng: rowData.factoryNameEng || '',
      code:rowData.code || '',


    });
  }
}
EditVechile(selectedrowData: any, mode: 'edit' | 'save' = 'edit') {


}
openDeleteConfirmationDialog(id:number)
{

}
loadFactories()
{
  this.factoryService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    console.log(this.factories)
  });
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
      this.factoryService.update(editedData).subscribe(
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
    } else {
      console.log("posting");
      // Adding a new record
      // Call your service's post method to save the new data
      this.factoryService.post(formData).subscribe(
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

