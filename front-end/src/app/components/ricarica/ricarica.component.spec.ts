import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ricaricaComponent } from './ricarica.component';

describe('ricaricaComponent', () => {
  let component: ricaricaComponent;
  let fixture: ComponentFixture<ricaricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ricaricaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ricaricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
