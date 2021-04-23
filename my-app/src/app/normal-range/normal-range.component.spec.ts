import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalRangeComponent } from './normal-range.component';

describe('NormalRangeComponent', () => {
  let component: NormalRangeComponent;
  let fixture: ComponentFixture<NormalRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
