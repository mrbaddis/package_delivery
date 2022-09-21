import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInvoiceTableComponent } from './customer-invoice-table.component';

describe('CustomerInvoiceTableComponent', () => {
  let component: CustomerInvoiceTableComponent;
  let fixture: ComponentFixture<CustomerInvoiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInvoiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInvoiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
