import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeDashboardComponent } from './emplyee-dashboard.component';

describe('EmplyeeDashboardComponent', () => {
  let component: EmplyeeDashboardComponent;
  let fixture: ComponentFixture<EmplyeeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmplyeeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmplyeeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
