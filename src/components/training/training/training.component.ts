import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainingService } from '../../../services/training/training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent {
  @Input() item = ''; // decorate the property with @Input()

  @Output() newItemEvent = new EventEmitter<string>();


ab:string | undefined;


constructor(private trainingService:TrainingService)
{
  this.trainingService.saveForm();

}
addNewItem(value: string) {
  this.newItemEvent.emit(value);
}
ngOnInit()
{
  this.ab= this.trainingService.train;
  
}




Submit()
{
  console.log("save button clicked");
}
}
