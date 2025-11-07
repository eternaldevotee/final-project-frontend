import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MotivatorComponent } from './motivator.component';

fdescribe('MotivatorComponent', () => {
  let component: MotivatorComponent;
  let fixture: ComponentFixture<MotivatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotivatorComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(MotivatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the first quote', () => {
    expect(component.currentQuote).toBe(component.quotes[0]);
  });

 

});
