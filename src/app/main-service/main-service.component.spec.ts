import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainServiceComponent } from './main-service.component';

describe('MainServiceComponent', () => {
  let component: MainServiceComponent;
  let fixture: ComponentFixture<MainServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
