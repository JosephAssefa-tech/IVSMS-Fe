import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CountryService } from '../../../../services/country-service/country.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationDeialogComponent } from '../../../modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CountryComponent } from '../../country/country.component';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  displayedColumns: string[] = ['id', 'countryNameAmh', 'countryNameEng','countryCode','point','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(private dialog: MatDialog, private countryService: CountryService,  private snackBar: MatSnackBar, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
 this.switchToSaveMode();

    this.Countries();
}
switchToSaveMode() {
  console.log("Setting mode to 'edit'");
  this.countryService.setMode('edit');
  const currentMode = this.countryService.getMode();
console.log(`Current mode is '${currentMode}'`);

}
Countries()
{
  this.countryService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;

    console.log("loading country")
    console.log(this.dataSource)
  });

}

EditVechile(selectedrowData: any) {

console.log("modde value")
  console.log(selectedrowData)

  let mode = this.countryService.getMode(); // Get mode from service

  const dialogRef = this.dialog.open(CountryComponent, {
    width:'auto',
   data: { mode, selectedrowData ,id: selectedrowData.id,countryNameEng : selectedrowData.countryNameEng },
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
  
    }

  });
}
openDeleteConfirmationDialog(id:number)
{
  console.log(id)

this.openDeleteConfirmationDialg(id);
}
openDeleteConfirmationDialg(id: number): void {
  const dialogRef = this.dialog.open(DeleteConfirmationDeialogComponent, {
    width: '350px',
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (result === true) {
      // User clicked on 'Yes', perform delete action
      this.countryService.deletre(id).subscribe(
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
}
