import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YaadComponent } from './yaad.component';

describe('YaadComponent', () => {
  let component: YaadComponent;
  let fixture: ComponentFixture<YaadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YaadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YaadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
