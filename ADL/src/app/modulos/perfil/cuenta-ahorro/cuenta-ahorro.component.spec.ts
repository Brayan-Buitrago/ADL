import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaAhorroComponent } from './cuenta-ahorro.component';

describe('CuentaAhorroComponent', () => {
  let component: CuentaAhorroComponent;
  let fixture: ComponentFixture<CuentaAhorroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaAhorroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
