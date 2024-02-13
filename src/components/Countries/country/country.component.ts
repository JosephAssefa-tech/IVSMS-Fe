import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CountryService } from '../../../services/country-service/country.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalServiceService } from '../../../services/modal/modal-service.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {
  mode: 'edit' | 'save' | undefined;
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'countryNameAmh', 'countryNameEng','countryCode','point','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  selectedRowData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'save'; selectedrowData: any; id?: number ;countryNameEng ?:string} = { mode: 'edit', selectedrowData: null },
    public dialogRef: MatDialogRef<CountryComponent>,
    private countryService: CountryService, private modalService: ModalServiceService,  private snackBar: MatSnackBar, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {

 
  
    this.myGroup = this.formBuilder.group({
      countryNameEng: ['', Validators.required],
      countryNameAmh: ['', Validators.required],
      point: ['', Validators.required],
      countryCode: ['', Validators.required],
    });
    console.log("logging mode");

this.mode = this.modalService.getMode();
console.log(this.mode);
    this.Countries();
    this.setFormValues();
    this.switchToSaveMode();
}
switchToSaveMode() {
  this.modalService.setMode('save');
}
private setFormValues(): void {
  // Set form values based on the data for editing
  if (this.data && this.data.selectedrowData) {

    const rowData = this.data.selectedrowData;
console.log("form factory name");
console.log(this.data.selectedrowData.countryNameEng)
    this.myGroup.setValue({
      countryNameEng: rowData.countryNameEng || '',
      countryNameAmh: rowData.countryNameAmh || '',
      point:rowData.point || '',
      countryCode:rowData.countryCode || '',

    });
  }
}
Countries()
{
  this.countryService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    console.log(this.factories)
  });

}

UpdateCountries()
{}
EditVechile(selectedrowData: any, mode: 'edit' | 'save' = 'edit') {


}
openDeleteConfirmationDialog(id:number)
{

}
saveVechileModel() {
  if (this.myGroup.valid) {
 
 //   // Get the form values
    const formData = this.myGroup.value;
let dat= this.modalService.getMode();
console.log("what is value of mode")
console.log(dat);
   if (this.mode === 'edit') {
   

     // Include the 'id' property in the formData
     formData.id = this.data.id;
    //formData.factoryName=this.data.factoryName;

     // Editing an existing record
     const editedData = { ...this.selectedRowData, ...formData };

     // Call your service's update method to update the data
     this.countryService.update(editedData).subscribe(
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
     this.countryService.post(formData).subscribe(
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
