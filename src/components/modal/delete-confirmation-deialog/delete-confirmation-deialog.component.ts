import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-deialog',
  templateUrl: './delete-confirmation-deialog.component.html',
  styleUrl: './delete-confirmation-deialog.component.css'
})
export class DeleteConfirmationDeialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmationDeialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
