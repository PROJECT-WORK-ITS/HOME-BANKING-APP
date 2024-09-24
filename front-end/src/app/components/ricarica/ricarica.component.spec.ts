import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicaricaComponent } from './ricarica.component';

describe('ricaricaComponent', () => {
  let component: RicaricaComponent;
  let fixture: ComponentFixture<RicaricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RicaricaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RicaricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
