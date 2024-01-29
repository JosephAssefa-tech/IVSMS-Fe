import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { VechileModelService } from '../services/vechile-model-service/vechile-model.service';
import { FactoryService } from '../services/factory-service/factory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDeialogComponent } from '../components/modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { TranslateService } from '@ngx-translate/core';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  supportedLanguages = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'Amharic' },
    // Add more languages as needed
  ];

  selectedLanguage: string ;
  factories: any[] = [];
  vechileModels: any[] = [];
  myGroup!: FormGroup; // Add the definite assignment assertion here
  fuelTypes = FuelType;
  title = 'vechile-mgt-mui';
  displayedColumns: string[] = ['id', 'model', 'width','length','height','axleDistance','numberOfAxle','engineCapacity','numberOfCylinder','horsePower','grossWeight','netWeight','cargoCapacity','typeOfDrive','numberOfTyreF','numberOfTyreB','actions']; // Add your columns
  dataSource = new MatTableDataSource<any>();


  constructor(private translateService: TranslateService,private dialog: MatDialog, private snackBar: MatSnackBar, private factoryService:FactoryService,private formBuilder: FormBuilder, private vechileModelService: VechileModelService)
  {
    this.selectedLanguage = translateService.currentLang;
  
  }
  ngOnInit(): void {
    this.loadFactories();
    this.loadVechileMOdels();

    this.myGroup = this.formBuilder.group({
      model: ['', Validators.required], // Example with required validation
      width: ['', Validators.required],
      length:['', Validators.required],
      height:['', Validators.required],
      engineCapacity:['', Validators.required],
      numberOfCylinder:['', Validators.required],
      horsePower:['', Validators.required],
      grossWeight:['', Validators.required],
      netWeight:['', Validators.required],
      cargoCapacity:['', Validators.required],
      numberOfSeat:['', Validators.required],
      fuelType:['', Validators.required],
      factoryId:['', Validators.required],
      axleDistance:['', Validators.required],
      numberOfAxle:['', Validators.required],
      typeOfDrive:['', Validators.required],
      tyreSizeF:['', Validators.required],
      tyreSizeB:['', Validators.required],
      numberOfTyreF:['', Validators.required],
      numberOfTyreB:['', Validators.required],
      // Add more form controls as needed
    });

}
changeLanguage() {
  this.translateService.use(this.selectedLanguage);
}
switchLanguage() {
  this.translateService.use(this.translateService.currentLang === 'en' ? 'fr' : 'en');
}
EditVechile()
{

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
saveVechileModel() {
  // Check if the form is valid
  if (this.myGroup.valid) {
    // Get the form values
    const formData = this.myGroup.value;

    // Call your service's post method to save the data
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
  } else {
    // Handle invalid form, e.g., show an error notification
    console.error('Invalid form data');
  }
}

  
}
