import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingsFormComponent } from './general-settings-form.component';

describe('GeneralSettingsFormComponent', () => {
  let component: GeneralSettingsFormComponent;
  let fixture: ComponentFixture<GeneralSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
