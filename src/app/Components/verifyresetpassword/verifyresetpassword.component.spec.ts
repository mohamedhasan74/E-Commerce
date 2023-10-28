import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyresetpasswordComponent } from './verifyresetpassword.component';

describe('VerifyresetpasswordComponent', () => {
  let component: VerifyresetpasswordComponent;
  let fixture: ComponentFixture<VerifyresetpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyresetpasswordComponent]
    });
    fixture = TestBed.createComponent(VerifyresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
