import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { asyncData } from '../../testing-global';
import { getTestSlides } from '../model/testing/testSlide';

import { CarouselComponent } from './carousel.component';
import { CarouselService } from './services/carousel.service';
import { CarouselModule } from './carousel.module';
import {Slide} from '../model/slide';

let comp: CarouselComponent;
let fixture: ComponentFixture<CarouselComponent>;

describe('CarouselComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CarouselModule]
    });
  });

  compileAndCreate();
  tests();
});

/** Add TestBed providers, compile, and create CarouselComponent */
function compileAndCreate() {
  beforeEach(async(() => {
    const slideServiceSpy = jasmine.createSpyObj('CarouselService', ['getSlides']);

    TestBed.configureTestingModule({
      providers: [
        { provide: CarouselService, useValue: slideServiceSpy }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(CarouselComponent);
        comp = fixture.componentInstance;

        // getSlides spy returns observable of test slides
        slideServiceSpy.getSlides.and.returnValue(asyncData(getTestSlides()));
      });
  }));
}

function tests() {

  it('should NOT have slides before ngOnInit', () => {
    expect(comp.slides.length).toBe(0,
      'should not have slides before ngOnInit');
  });

  it('should NOT have slides immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.slides.length).toBe(0,
      'should not have slides until service promise resolves');
  });


  it('should set first slide as active slide on click > arrow initially', () => {
    const expectedSlides: Slide[] =
      [{
        id: 1,
        imageUrl: 'test.png',
        sideBoxHeader: '236 bestemmingen',
        sideBoxContent: 'Looking for sun, sea and n',
        sideBoxInfoText: 'more info >',
        srcset: '../../assets/images/carousel/socia1.png 310w',
        default: '../../assets/images/carousel/socia1.png',
        alt: 'home_icon',
        sizes: '(max-width: 320px) 310px,(max-width: 768px) 768px,490px',
        active: true
      }, {
        id: 2,
        imageUrl: 'test2.png',
        sideBoxHeader: '236 bestemmingen',
        sideBoxContent: 'Looking for sun, sea and n',
        sideBoxInfoText: 'more info >',
        srcset: '../../assets/images/carousel/socia2.png 310w',
        default: '../../assets/images/carousel/socia2.png',
        alt: 'home_icon',
        sizes: '(max-width: 320px) 310px,(max-width: 768px) 768px,490px',
        active: false
      }];
    comp.slides = [];
    comp.slides = expectedSlides;
    comp.setActivateSlide();
    fixture.detectChanges();
    comp.nextSlide();
    expect(comp.currentActiveSlide).toBe(expectedSlides[1]);
  });

}

