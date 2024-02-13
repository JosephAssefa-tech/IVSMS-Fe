import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DeperciationService } from '../../../../services/deperciation-service/deperciation.service';
import { VechileServiceService } from '../../../../services/vechile-service-type/vechile-service.service';

@Component({
  selector: 'app-deperciation-table',
  templateUrl: './deperciation-table.component.html',
  styleUrl: './deperciation-table.component.css'
})
export class DeperciationTableComponent {
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'vehicleServiceTypeId', 'serviceYear','point','actions'];
  deperciations: any[] = [];
  serviceType: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor( private serviceTypes:VechileServiceService,  private snackBar: MatSnackBar,private deperciationService:DeperciationService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {


    this.loadDeperciation();
    this.loadServiceTypes();
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
}
