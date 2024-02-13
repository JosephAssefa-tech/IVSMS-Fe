import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {
  private mode: 'edit' | 'save' = 'save'; // Default mode is 'edit'
  constructor(private dialog: MatDialog) { }

  open(component: ComponentType<any>): void {
    this.dialog.open(component);
  }

  setMode(mode: 'edit' | 'save'): void {
    this.mode = mode; // Set the mode

  }

  getMode(): 'edit' | 'save' {
    return this.mode; // Return the current mode
  }
}
