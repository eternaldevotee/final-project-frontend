import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from '../Components/carousel/carousel.component';
import { HomeComponent } from './home.component';
import { CardComponent } from '../Components/card/card.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
