import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipsMapComponent } from './ships-map.component';

describe('ShipsMapComponent', () => {
  let component: ShipsMapComponent;
  let fixture: ComponentFixture<ShipsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipsMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
