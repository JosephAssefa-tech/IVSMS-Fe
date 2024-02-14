import { Component, Inject } from '@angular/core';
import { VechileServiceService } from '../../../../services/vechile-service-type/vechile-service.service';
import { FactoryService } from '../../../../services/factory-service/factory.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ModalServiceService } from '../../../../services/modal/modal-service.service';
import { VechileManufactureService } from '../../../../services/vechile-manufacture/vechile-manufacture.service';
import { DepreciationComponent } from '../../../Depreciation/depreciation/depreciation.component';

@Component({
  selector: 'app-vechile-manufacture',
  templateUrl: './vechile-manufacture.component.html',
  styleUrl: './vechile-manufacture.component.css'
})
export class VechileManufactureComponent {
  mode: 'edit' | 'save' | undefined;
  myGroup!: FormGroup; // Add the definite assignment assertion here
  //displayedColumns: string[] = ['id', 'vehicleServiceTypeId', 'serviceYear','point','actions'];
  //deperciations: any[] = [];
  factories: any[] = [];
  vehicleServiceTypes: any[] = [];
  dataSource = new MatTableDataSource<any>();
  selectedRowData: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'save'; selectedrowData: any; id?: number ;descriptionAmh ?:string} = { mode: 'edit', selectedrowData: null },
    public dialogRef: MatDialogRef<VechileManufactureComponent>, 
    public serviceTypes:VechileServiceService, private modalService: ModalServiceService, private snackBar: MatSnackBar,private vechileManufacturerService:VechileManufactureService, private factoryService:FactoryService,private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
    this.myGroup = this.formBuilder.group({
      vehicleServiceTypeId: ['', Validators.required],
      factoryId: ['', Validators.required],
      point: ['', Validators.required],
      
   
    });
    this.mode = this.modalService.getMode();
    this.loadFactories();
    this.loadvehicleServiceTypes();
    //this.loadVechileServiceTypes();
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
     factoryId:rowData.factory.id || '',
      point:rowData.point || '',
      
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
    
    this.factories = response.data;
    console.log("this.factories");
   console.log(this.factories);
  });
}
loadvehicleServiceTypes()
{
  this.serviceTypes.getAll().subscribe((response: any) => {
    this.vehicleServiceTypes = response.data;
   // this.deperciations = response.data;
   // console.log(this.vechileServiceTypes)
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
     this.vechileManufacturerService.update(editedData).subscribe(
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
     this.vechileManufacturerService.post(formData).subscribe(
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
