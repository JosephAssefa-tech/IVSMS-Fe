import { Component } from '@angular/core';
import { FactoryService } from '../../../../services/factory-service/factory.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-factories-table',
  templateUrl: './factories-table.component.html',
  styleUrl: './factories-table.component.css'
})
export class FactoriesTableComponent {
  myGroup!: FormGroup; // Add the definite assignment assertion here
  displayedColumns: string[] = ['id', 'factoryNameAmh', 'factoryNameEng','code','actions'];
  factories: any[] = [];
  dataSource = new MatTableDataSource<any>();
  constructor(   private snackBar: MatSnackBar,private factoryService:FactoryService, private formBuilder: FormBuilder)
  {
    
  }
  ngOnInit(): void {
 
  
 

    this.LoadFactories();
}
LoadFactories()
{
  this.factoryService.getAll().subscribe((response: any) => {
    this.dataSource = response.data;
    console.log(this.factories)
  });

}
EditVechile(selectedrowData: any, mode: 'edit' | 'save' = 'edit') {


}
openDeleteConfirmationDialog(id:number)
{

}
}
