import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmationDeialogComponent } from './delete-confirmation-deialog.component';

describe('DeleteConfirmationDeialogComponent', () => {
  let component: DeleteConfirmationDeialogComponent;
  let fixture: ComponentFixture<DeleteConfirmationDeialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmationDeialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteConfirmationDeialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
