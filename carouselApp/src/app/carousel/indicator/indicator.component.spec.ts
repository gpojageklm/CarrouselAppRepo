import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { IndicatorComponent } from './indicator.component';
import { Slide } from '../../model/slide';


describe('IndicatorComponent', () => {

  let component: IndicatorComponent;
  let fixture: ComponentFixture<IndicatorComponent>;
  let indicatorOlElem: DebugElement;
  let indicatorliElem: DebugElement;
  const renderIndicator = () => {
    const el = fixture.nativeElement.querySelector('div');
    return el ? el : null;
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [IndicatorComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(IndicatorComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    indicatorOlElem = fixture.debugElement.query(By.css('ol'));
    indicatorliElem = fixture.debugElement.query(By.css('indiv-indicator'));

  });

  it('should render indlicator orderList when slide exists', fakeAsync(() => {
    const comp = new IndicatorComponent();
    const expectedSlides: Slide[] =
    [   {
      id: 1,
      imageUrl: 'test.png',
      sideBoxHeader: '236 bestemmingen',
      sideBoxContent: 'Looking for sun, sea and n',
      sideBoxInfoText: 'more info >',
      srcset: '../../assets/images/carousel/soci1.png 310w',
      default: '../../assets/images/carousel/soci2.png',
      alt: 'home_icon',
      sizes: '(max-width: 320px) 310px,(max-width: 768px) 768px,490px',
     active: true
  }];
    component.slides = expectedSlides;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(renderIndicator()).toBeTruthy();

}));

});
