import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerViewRenderComponent } from './customer-view-render.component';

describe('CustomerViewRenderComponent', () => {
  let component: CustomerViewRenderComponent;
  let fixture: ComponentFixture<CustomerViewRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerViewRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerViewRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
