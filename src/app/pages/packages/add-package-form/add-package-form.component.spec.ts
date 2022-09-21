import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackageFormComponent } from './add-package-form.component';

describe('AddPackageFormComponent', () => {
  let component: AddPackageFormComponent;
  let fixture: ComponentFixture<AddPackageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPackageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
