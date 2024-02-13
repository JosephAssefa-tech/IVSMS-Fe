
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { VechileModelService } from '../../../services/vechile-model-service/vechile-model.service';
import { FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { FactoryService } from '../../../services/factory-service/factory.service';
import { DeleteConfirmationDeialogComponent } from '../../modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import { VechileModelRegisterComponent } from '../../modal/model-registration/vechile-model-register/vechile-model-register.component';
import { ExcelFileUploadService } from '../../../services/file-upload-service/excel-file-upload.service';
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
export interface VechileFilterRequest {

  model: string;
  fuelType: string; // Adjust the type according to your API
  factoryId: string; // Adjust the type according to your API
  createdFrom: Date | null;
  createdTo: Date | null;
}

@Component({
  selector: 'app-vechile-model',
  templateUrl: './vechile-model.component.html',
  styleUrl: './vechile-model.component.css'
})
export class VechileModelComponent {
  items = ['item1', 'item2', 'item3', 'item4'];

  
  supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'Amharic' },
    // Add more languages as needed
  ];
  selectedRowData: any;
  selectedLanguage = 'am'; // or whatever the code is for Amharic
  file: File | null = null;
  uploading: boolean = false;

  factories: any[] = [];
  filteredFactories: Observable<any[]> | undefined;
  isLoading: boolean = true; // Add this property
  vechileModels: any[] = [];
  myGroup!: FormGroup; // Add the definite assignment assertion here
  fuelTypes = FuelType;
  title = 'vechile-mgt-mui';
  displayedColumns: string[] = ['id', 'model', 'factory','width','length','height','axleDistance','numberOfAxle','engineCapacity','numberOfCylinder','horsePower','grossWeight','netWeight','cargoCapacity','typeOfDrive','numberOfTyreF','numberOfTyreB','actions']; // Add your columns
  dataSource = new MatTableDataSource<any>();



  showTable: boolean = true;
  factoryIdControl = new FormControl();
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());


  currentItem = 'sfsdfsfsfsfsf';


  constructor(private excelFileUploadService: ExcelFileUploadService,private translateService: TranslateService,private dialog: MatDialog, private snackBar: MatSnackBar, private factoryService:FactoryService,private formBuilder: FormBuilder, private vechileModelService: VechileModelService)
  {
   
    this.selectedLanguage = translateService.currentLang;
  
  }
  addItem(newItem: string) {
    this.items.push(newItem);
console.log("list of items")
    console.log(this.items)
  }
  ngOnInit(): void {
    this.loadFactories();
    this.loadVechileMOdels();
    this.filteredFactories = this.factoryIdControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterFactories(value))
    );
 
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

}
onFileChange(event: any): void {
  const files = event.target.files;
  if (files && files.length > 0) {
    this.file = files[0];
    this.parseExcel();
  }
}
parseExcel(): void {
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    /* read workbook */
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data: any[] = XLSX.utils.sheet_to_json(ws, { header: 1 });
    console.log('Excel Data:', data);

    // Set uploading flag to true
    this.uploading = true;

    // Send data to API using service
    this.excelFileUploadService.uploadExcelData(data)
      .subscribe(
        response => {
          console.log('Data sent to API:', response);
          // Handle success response

          // Set uploading flag to false on successful upload
          this.uploading = false;
        },
        error => {
          console.error('Error sending data to API:', error);
          // Handle error

          // Set uploading flag to false on error
          this.uploading = false;
        }
      );
  };

  reader.readAsBinaryString(this.file!);
}



private _filterFactories(value: string): any[] {
  const filterValue = value.toLowerCase();
  return this.factories.filter(factory => factory.factoryName.toLowerCase().includes(filterValue));
}
onSubmit() {
  const filterRequest: VechileFilterRequest = {
    model: this.myGroup.get('model')?.value ?? '',
    fuelType: this.myGroup.get('fuelType')?.value ?? '',
    factoryId: this.myGroup.get('factoryId')?.value ?? '',
    createdFrom: this.myGroup.get('createdFrom')?.value ?? '',
    createdTo: this.myGroup.get('createdTo')?.value ?? '',
    
  };

  this.vechileModelService.filterVechiles(filterRequest).subscribe(response => {
    console.log("filter responseee");
    console.log(response);
  
    if (response && response.data) {
      // Convert the single object into an array
      const dataArray = [response.data];
  
      // Update the dataSource with the new array
      this.dataSource.data = dataArray;
    } else {
      // If there is no valid response or data, display an empty table
      this.dataSource.data = [];
    }
  });
  
}

  popup(mode: 'edit' | 'save'): void {
    const dialogRef = this.dialog.open(VechileModelRegisterComponent, {
      width:'auto',
      height:'auto',
      data: { mode },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
   
      }
   
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
EditVechile(selectedrowData: any, mode: 'edit' | 'save' = 'edit') {
  const dialogRef = this.dialog.open(VechileModelRegisterComponent, {
    width:'auto',
    data: { mode, selectedrowData ,id: selectedrowData.id,factoryName: selectedrowData.factory.factoryName},
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
  
    }

  });

}
seFormValues(rowData:any):void{
this.selectedRowData=rowData;
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

loadVechileMOdels() {
  this.isLoading = true; // Set loading to true before making the request

  this.vechileModelService.getAll().subscribe(
    (response: any) => {

      console.log("fileeee")
      this.dataSource.data = response.data;
     
      console.log(response.data);
      this.isLoading = false; // Set loading to false once data is fetched
    },
    (error) => {
      console.error('Error fetching data', error);
      this.isLoading = false; // Set loading to false in case of an error
    }
  );
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

saveVechileModel() {
  if (this.myGroup.valid) {
    // Get the form values
    const formData = this.myGroup.value;

    if (this.selectedRowData) {
      // Editing an existing record
      const editedData = { ...this.selectedRowData, ...formData };

      // Call your service's update method to update the data
      this.vechileModelService.update(editedData ).subscribe(
        (response: any) => {
          // Handle success, e.g., show a success notification
          console.log('Data updated successfully:', response);
          this.snackBar.open('Data updated successfully', 'Close', {
            duration: 3000, // Duration in milliseconds
          });

          // Update the table with the latest data
          this.loadVechileMOdels();
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
          this.loadVechileMOdels();

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