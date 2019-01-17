import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ContentComponent } from './content.component';
import { Slide } from '../../model/slide';


describe('ContentComponent', () => {

  let component: ContentComponent;
  let fixture: ComponentFixture<ContentComponent>;
  const conditionalContentWrapper = () => {
    const el = fixture.nativeElement.querySelector('.content-wrapper');
    return el ? el : null;
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ContentComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(ContentComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  });

  it('should display content Details for active slide', fakeAsync(() => {
    const expectedSlides: Slide[] =
    [   {
      id: 1,
      imageUrl: 'test.png',
      sideBoxHeader: '236 bestemmingen',
      sideBoxContent: 'Looking for sun, sea and n',
      sideBoxInfoText: 'more info >',
      srcset: '../../assets/images/carousel/soci1.png 310w',
      default: '../../assets/images/carousel/soci1.png',
      alt: 'home_icon',
      sizes: '(max-width: 320px) 310px,(max-width: 768px) 768px,490px',
     active: true
  }];
    component.slides = expectedSlides;
    component.currentActiveSlide = expectedSlides[0];
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(conditionalContentWrapper()).toBeTruthy();

}));

});
