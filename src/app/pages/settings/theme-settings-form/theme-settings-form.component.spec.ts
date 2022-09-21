import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSettingsFormComponent } from './theme-settings-form.component';

describe('ThemeSettingsFormComponent', () => {
  let component: ThemeSettingsFormComponent;
  let fixture: ComponentFixture<ThemeSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
