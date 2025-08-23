import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showresulits } from './showresulits';

describe('Showresulits', () => {
  let component: Showresulits;
  let fixture: ComponentFixture<Showresulits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Showresulits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Showresulits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
