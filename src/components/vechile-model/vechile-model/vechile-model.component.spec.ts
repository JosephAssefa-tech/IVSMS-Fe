import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileModelComponent } from './vechile-model.component';

describe('VechileModelComponent', () => {
  let component: VechileModelComponent;
  let fixture: ComponentFixture<VechileModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VechileModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VechileModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
