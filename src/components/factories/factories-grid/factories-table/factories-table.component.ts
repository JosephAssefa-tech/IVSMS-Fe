import { Component, ViewChild } from '@angular/core';
import { FactoryService } from '../../../../services/factory-service/factory.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DeleteConfirmationDeialogComponent } from '../../../modal/delete-confirmation-deialog/delete-confirmation-deialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FactoryComponent } from '../../factory/factory.component';
import { ModalServiceService } from '../../../../services/modal/modal-service.service';

@Component({
  selector: 'app-factories-table',
  templateUrl: './factories-table.component.html',
  styleUrl: './factories-table.component.css'
})
export class FactoriesTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'factoryNameAmh', 'factoryNameEng','code','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(  private dialog: MatDialog,private modalService:ModalServiceService,  private snackBar: MatSnackBar,private factoryService:FactoryService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
 

    this.LoadFactories();
}
LoadFactories()
{
  this.factoryService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    this.dataSource.paginator = this.paginator; // Bind the paginator
    
  });

}
  // Handle pagination event
  onPageChange(event: PageEvent): void {
    // You can add logic here if needed
    console.log(event);
  }
  EditVechile(selectedrowData: any) {

    this.modalService.setMode('edit');
  
    const dialogRef = this.dialog.open(FactoryComponent, {
      width: 'auto',
      // Pass the correct mode value retrieved from the service
      data: { mode: this.modalService.getMode(), selectedrowData, id: selectedrowData.id, countryNameEng: selectedrowData.countryNameEng },
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
      this.factoryService.deletre(id).subscribe(
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
