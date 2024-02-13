import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private dialog: MatDialog) { }

  open(component: ComponentType<any>): void {
    this.dialog.open(component);
  }
}
