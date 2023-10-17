import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTabSwitcherComponent } from './main-tab-switcher.component';

describe('MainTabSwitcherComponent', () => {
  let component: MainTabSwitcherComponent;
  let fixture: ComponentFixture<MainTabSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTabSwitcherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTabSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
