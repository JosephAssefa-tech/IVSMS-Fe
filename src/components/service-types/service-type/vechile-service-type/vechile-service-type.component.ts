import { Component, Inject } from '@angular/core';
import { VechileServiceService } from '../../../../services/vechile-service-type/vechile-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ModalServiceService } from '../../../../services/modal/modal-service.service';

@Component({
  selector: 'app-vechile-service-type',
  templateUrl: './vechile-service-type.component.html',
  styleUrl: './vechile-service-type.component.css'
})
export class VechileServiceTypeComponent {
  mode: 'edit' | 'save' | undefined;
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'descriptionAmh', 'code','point','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  selectedRowData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'save'; selectedrowData: any; id?: number ;countryNameEng ?:string} = { mode: 'edit', selectedrowData: null },
    public dialogRef: MatDialogRef<VechileServiceTypeComponent>,
    private vechileService: VechileServiceService, private modalService: ModalServiceService,  private snackBar: MatSnackBar, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {

 
  
    this.myGroup = this.formBuilder.group({
      descriptionEng: ['', Validators.required],
      descriptionAmh: ['', Validators.required],
      point: ['', Validators.required],
      code: ['', Validators.required],
    });


this.mode = this.modalService.getMode();

    //this.ServiceTypes();
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

    this.myGroup.setValue({
      descriptionEng: rowData.descriptionEng || '',
      descriptionAmh: rowData.descriptionAmh || '',
      point:rowData.point || '',
      code:rowData.code || '',

    });
  }
}
// Countries()
// {
//   this.countryService.getAll().subscribe((response: any) => {
//     this.dataSource = response.data;
//     console.log(this.factories)
//   });

// }

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

   if (this.mode === 'edit') {
   

     // Include the 'id' property in the formData
     formData.id = this.data.id;
    //formData.factoryName=this.data.factoryName;

     // Editing an existing record
     const editedData = { ...this.selectedRowData, ...formData };

     // Call your service's update method to update the data
     this.vechileService.update(editedData).subscribe(
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
     this.vechileService.post(formData).subscribe(
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
