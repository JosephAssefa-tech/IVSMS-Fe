import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Observable, startWith, map } from 'rxjs';
import { FactoryService } from '../../../../services/factory-service/factory.service';
import { VechileModelService } from '../../../../services/vechile-model-service/vechile-model.service';
import { DeleteConfirmationDeialogComponent } from '../../delete-confirmation-deialog/delete-confirmation-deialog.component';
import { Location } from '@angular/common';

interface UserData {
  name: string;
  age: number;
  city: string;
}

enum FuelType
{
    Gasoline = 0,
    DieselFuel = 1,
    NoFuel = 2,
    ElectricCharge = 3
}
@Component({
  selector: 'app-vechile-model-register',
  templateUrl: './vechile-model-register.component.html',
  styleUrl: './vechile-model-register.component.css'
})
 export class VechileModelRegisterComponent {
  @Input() rowData: any;
  @Output() closeModal = new EventEmitter();
  supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'Amharic' },
    // Add more languages as needed
  ];
  selectedRowData: any;

  
  selectedLanguage: string ;
  factories: any[] = [];
  filteredFactories: Observable<any[]> | undefined;

  vechileModels: any[] = [];
  myGroup!: FormGroup; // Add the definite assignment assertion here
  fuelTypes = FuelType;
  title = 'vechile-mgt-mui';
  displayedColumns: string[] = ['id', 'model', 'width','length','height','axleDistance','numberOfAxle','engineCapacity','numberOfCylinder','horsePower','grossWeight','netWeight','cargoCapacity','typeOfDrive','numberOfTyreF','numberOfTyreB','actions']; // Add your columns
  dataSource = new MatTableDataSource<any>();
  showTable: boolean = true;
  factoryIdControl = new FormControl();
  constructor(
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: { mode: 'edit' | 'save'; selectedrowData: any; id?: number } = { mode: 'edit', selectedrowData: null },
    public dialogRef: MatDialogRef<VechileModelRegisterComponent>,
    private translateService: TranslateService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private factoryService: FactoryService,
    private formBuilder: FormBuilder,
    private vechileModelService: VechileModelService
  ) {
    this.selectedLanguage = 'am'; // or whatever the code is for Amharic
    this.selectedLanguage = translateService.currentLang;
  }
  
  ngOnInit(): void {
 
  
    this.myGroup = this.formBuilder.group({
      model: ['', Validators.required],
      width: ['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      length:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      height:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      engineCapacity:['', [Validators.required,Validators.pattern(/^-?\d*\.?\d+$/)]],
      numberOfCylinder:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      horsePower:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      grossWeight:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      netWeight:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      cargoCapacity:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      numberOfSeat:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      fuelType:['', Validators.required],
      factoryId:['', Validators.required],
      axleDistance:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      numberOfAxle:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      typeOfDrive:['', Validators.required],
      tyreSizeF:['', Validators.required],
      tyreSizeB:['', Validators.required],
      numberOfTyreF:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]],
      numberOfTyreB:['', [Validators.required, Validators.pattern(/^-?\d*\.?\d+$/)]]
      // Add more form controls as needed
    });
   // this.loadVechileMOdels();
    this.filteredFactories = this.factoryIdControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterFactories(value))
    );
 
      // Set form values for editing
      this.setFormValues();
 
      this.loadFactories();
      if (this.data.mode === 'edit') {
        console.log(this.data.mode)
         } else {
           // Initialize the form with default values or empty data
           console.log(this.data.mode)
         }

         console.log("idd of the roww is below")
        // Access the id property if available
console.log(this.data.id);

}
getButtonLabel(): string {
  return this.data.mode === 'edit' ? this.vechileModelService.getEditLabel() : this.vechileModelService.getSaveLabel();
}
private setFormValues(): void {
  // Set form values based on the data for editing
  if (this.data && this.data.selectedrowData) {
   
    const rowData = this.data.selectedrowData;
    console.log( rowData.fuelType)
    this.myGroup.setValue({
      model: rowData.model || '',
      width: rowData.width || '',
      length: rowData.length || '',
      height: rowData.height || '',
      engineCapacity:rowData.engineCapacity || '',
      numberOfCylinder:rowData.numberOfCylinder || '',
      horsePower:rowData.horsePower || '',
      grossWeight:rowData.grossWeight || '',
      netWeight:rowData.netWeight || '',
      cargoCapacity:rowData.cargoCapacity || '',
      numberOfSeat:rowData.numberOfSeat || '',
      fuelType:rowData.fuelType || '',
      factoryId:rowData.factoryId || '',
      axleDistance:rowData.axleDistance || '',
      numberOfAxle:rowData.numberOfAxle || '',
      typeOfDrive:rowData.typeOfDrive || '',
      tyreSizeF:rowData.tyreSizeF || '',
      tyreSizeB:rowData.tyreSizeB || '',
      numberOfTyreF:rowData.numberOfTyreF || '',
      numberOfTyreB:rowData.numberOfTyreB || '',

    });
  }
}
private _filterFactories(value: string): any[] {
  const filterValue = value.toLowerCase();
  return this.factories.filter(factory => factory.factoryName.toLowerCase().includes(filterValue));
}
onNoClick(): void {
  this.dialogRef.close(false);
}
  popup(): void {
    const dialogRef = this.dialog.open(VechileModelRegisterComponent, {
      width: '1200px',
      height:'600px'
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // User clicked on 'Yes', perform delete action
        // this.vechileModelService.deletre(id).subscribe(
        //   (response) => {
        //     console.error('Deleted successfully');
  
        //     // Update dataSource by removing the deleted item
        //     this.dataSource.data = this.dataSource.data.filter(
        //       (item) => item.id !== id
        //     );
        //   },
        //   (error) => {
        //     console.error('Error deleting:', error);
        //   }
        // );
      }
      // Handle 'No' or close actions if needed
    });
  }

displayFn(factory: any): string {
  return factory && factory.factoryName ? factory.factoryName : '';
}
toggleTableVisibility() {
  this.showTable = !this.showTable;
}
changeLanguage() {
  this.translateService.use(this.selectedLanguage);
}
switchLanguage() {
  this.translateService.use(this.translateService.currentLang === 'en' ? 'fr' : 'en');
}
EditVechile(rowData:any)
{
  this.selectedRowData = rowData;

  console.log("selected row values")
  console.log( this.selectedRowData.factoryId,)
  // Set form values based on selected row data
  this.myGroup.patchValue({
    model: rowData.model,
    width: rowData.width,
    length:rowData.length,
      height:rowData.height,
      engineCapacity:rowData.engineCapacity,
      numberOfCylinder:rowData.numberOfCylinder,
      horsePower:rowData.horsePower,
      grossWeight:rowData.grossWeight,
      netWeight:rowData.netWeight,
      cargoCapacity:rowData.cargoCapacity,
      numberOfSeat:rowData.numberOfSeat,
      fuelType:rowData.fuelType,
      factoryId:rowData.factoryId,
      axleDistance:rowData.axleDistance,
      numberOfAxle:rowData.numberOfAxle,
      typeOfDrive:rowData.typeOfDrive,
      tyreSizeF:rowData.tyreSizeF,
      tyreSizeB:rowData.tyreSizeB,
      numberOfTyreF:rowData.numberOfTyreF,
      numberOfTyreB:rowData.numberOfTyreB,
  });

  // Optionally, you can store the ID of the edited row for updating later
 // this.editingRowId = rowData.id; // Assuming you have an 'id' property in your row data


}

openDeleteConfirmationDialog(id: number): void {

  this.openDeleteConfirmationDialg(id);
}  

openDeleteConfirmationDialg(id: number): void {
  const dialogRef = this.dialog.open(DeleteConfirmationDeialogComponent, {
    width: '350px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      // User clicked on 'Yes', perform delete action
      this.vechileModelService.deletre(id).subscribe(
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

loadVechileMOdels()
{
 
    this.vechileModelService.getAll().subscribe((reponse: any) => {
      this.dataSource.data = reponse.data;
     console.log(this.vechileModels)
      // Do something with the factories
    });

}
loadFactories()
{
  this.factoryService.getAll().subscribe((response: any) => {
    this.factories = response.data;
  });
}
formReset()
{
  this.myGroup.reset();
}
onAddDataSuccess() {
  // Perform necessary logic...

  // Reload the page
  window.location.reload();
}
saveVechileModel() {
  if (this.myGroup.valid) {
    // Get the form values
    const formData = this.myGroup.value;

    if (this.data.mode === 'edit') {
      console.log("editing");

      // Include the 'id' property in the formData
      formData.id = this.data.id;

      // Editing an existing record
      const editedData = { ...this.selectedRowData, ...formData };

      // Call your service's update method to update the data
      this.vechileModelService.update(editedData).subscribe(
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
    } else if (this.data.mode === 'save') {
      console.log("posting");
      // Adding a new record
      // Call your service's post method to save the new data
      this.vechileModelService.post(formData).subscribe(
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
