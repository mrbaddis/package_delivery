import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSettingsFormComponent } from './mail-settings-form.component';

describe('MailSettingsFormComponent', () => {
  let component: MailSettingsFormComponent;
  let fixture: ComponentFixture<MailSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
