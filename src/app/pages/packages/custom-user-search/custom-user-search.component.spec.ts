import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomUserSearchComponent } from './custom-user-search.component';

describe('CustomUserSearchComponent', () => {
  let component: CustomUserSearchComponent;
  let fixture: ComponentFixture<CustomUserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomUserSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
