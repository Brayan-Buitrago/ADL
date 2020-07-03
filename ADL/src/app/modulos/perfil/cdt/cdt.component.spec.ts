import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdtComponent } from './cdt.component';

describe('CdtComponent', () => {
  let component: CdtComponent;
  let fixture: ComponentFixture<CdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
