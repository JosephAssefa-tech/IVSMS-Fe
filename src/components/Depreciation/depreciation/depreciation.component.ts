import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeperciationService } from '../../../services/deperciation-service/deperciation.service';
import { VechileServiceService } from '../../../services/vechile-service-type/vechile-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalServiceService } from '../../../services/modal/modal-service.service';

@Component({
  selector: 'app-depreciation',
  templateUrl: './depreciation.component.html',
  styleUrl: './depreciation.component.css'
})
export class DepreciationComponent {
  mode: 'edit' | 'save' | undefined;
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'vehicleServiceTypeId', 'serviceYear','point','actions'];
  deperciations: any[] = [];
  serviceType: any[] = [];
  dataSource = new MatTableDataSource<any>();
  selectedRowData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'save'; selectedrowData: any; id?: number ;descriptionAmh ?:string} = { mode: 'edit', selectedrowData: null },
    public dialogRef: MatDialogRef<DepreciationComponent>, 
    private serviceTypes:VechileServiceService, private modalService: ModalServiceService, private snackBar: MatSnackBar,private deperciationService:DeperciationService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
    this.myGroup = this.formBuilder.group({
      vehicleServiceTypeId: ['', Validators.required],
      serviceYear: ['', Validators.required],
      point: ['', Validators.required],
      
   
    });
    this.mode = this.modalService.getMode();
    this.loadDeperciation();
    this.loadServiceTypes();
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

      vehicleServiceTypeId: rowData.vehicleServiceType.id || '',
    
     
     // descriptionEng: rowData.vehicleServiceType.descriptionEng || '',
      serviceYear:rowData.serviceYear || '',
      point:rowData.point || '',
      
    });
  }
}
onNoClick(): void {
  this.dialogRef.close(false);
}
loadServiceTypes()
{
  this.serviceTypes.getAll().subscribe((response: any) => {

    this.serviceType = response.data;
    console.log(this.dataSource)
  });

  

}


EditVechile(selectedrowData: any, mode: 'edit' | 'save' = 'edit') {


}
openDeleteConfirmationDialog(id:number)
{

}
loadDeperciation()
{
 
  this.deperciationService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    this.deperciations = response.data;
    console.log(this.dataSource)
  });
}
saveVechileModel() {
  if (this.myGroup.valid) {

    const formData = this.myGroup.value;
    if (this.mode === 'edit') {
   

     // Include the 'id' property in the formData
     formData.id = this.data.id;
    //formData.factoryName=this.data.factoryName;

     // Editing an existing record
     const editedData = { ...this.selectedRowData, ...formData };

     // Call your service's update method to update the data
     this.deperciationService.update(editedData).subscribe(
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
     this.deperciationService.post(formData).subscribe(
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

}}