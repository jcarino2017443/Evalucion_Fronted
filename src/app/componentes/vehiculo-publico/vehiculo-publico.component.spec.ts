import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoPublicoComponent } from './vehiculo-publico.component';

describe('VehiculoPublicoComponent', () => {
  let component: VehiculoPublicoComponent;
  let fixture: ComponentFixture<VehiculoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculoPublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
