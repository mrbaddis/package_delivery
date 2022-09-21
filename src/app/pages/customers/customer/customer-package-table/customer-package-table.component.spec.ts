import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPackageTableComponent } from './customer-package-table.component';

describe('CustomerPackageTableComponent', () => {
  let component: CustomerPackageTableComponent;
  let fixture: ComponentFixture<CustomerPackageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPackageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPackageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
