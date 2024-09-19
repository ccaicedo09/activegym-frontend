import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUpperNavComponent } from './dashboard-upper-nav.component';

describe('DashboardUpperNavComponent', () => {
  let component: DashboardUpperNavComponent;
  let fixture: ComponentFixture<DashboardUpperNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUpperNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUpperNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
