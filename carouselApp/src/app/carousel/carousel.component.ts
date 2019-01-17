import { Component, OnInit, ElementRef, Renderer2} from '@angular/core';
import { Slide } from '../model/slide';
import { CarouselService } from './services/carousel.service';
import {Constants} from '../constants/constants';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'qrc-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']

})

/**
 * main carousel container for holding slides and other child components
 */
export class CarouselComponent implements OnInit {

  slides: Slide[] = [];
  carouselHeader = Constants.LOGO_HEADER_TEXT;
  currentActiveSlide: Slide = null;
  currentActiveSlideIndex: number;
  toggleIntervalId: number;
  currentTheme = Constants.DEFAULT_THEME;
  switched = false;
  errorText: string;

  constructor(
    private carouselService: CarouselService,
    private element: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit() {
    this.setCarouselData();
    this.resetToggle();
  }

   /**
    * set slides data by subscribing to service
    * call method to set first slide as active slide by default.
    * @returns void
    */
   setCarouselData(): void {
    this.carouselService.getSlides().subscribe(slides => {
      this.slides = slides;
      this.setActivateSlide();
    },
      err => {
        this.errorText = Constants.SLIDE_ERROR_TEXT;
      });
  }


  /**
   * set first slide as active slide by default.
   */
  setActivateSlide() {
    this.currentActiveSlide = this.slides[0];
    this.currentActiveSlideIndex = 0;
  }

  /**
   * handler to set active slide on left arrow click
   */
  previousSlide() {
    this.resetToggle();
    if (this.currentActiveSlideIndex === 0) {
      this.slides[this.slides.length - 1].active = true;
      this.slides[this.currentActiveSlideIndex].active = false;
      this.currentActiveSlide = this.slides[this.slides.length - 1];
      this.currentActiveSlideIndex = this.slides.length - 1;
    } else {
      this.slides[this.currentActiveSlideIndex - 1].active = true;
      this.slides[this.currentActiveSlideIndex].active = false;
      this.currentActiveSlide = this.slides[this.currentActiveSlideIndex - 1];
      this.currentActiveSlideIndex--;
    }
    // Create a copy of the array after mutation for OnPush CGhange Detection
    this.slides = this.slides.slice();
  }

  /**
   * set next slide as activeSlide on click right arrow
   */
  nextSlide() {
    this.resetToggle();
    if (this.currentActiveSlideIndex === (this.slides.length - 1)) {
      this.slides[0].active = true;
      this.slides[this.currentActiveSlideIndex].active = false;
      this.currentActiveSlide = this.slides[0];
      this.currentActiveSlideIndex = 0;
    } else {
      this.slides[this.currentActiveSlideIndex + 1].active = true;
      this.slides[this.currentActiveSlideIndex].active = false;
      this.currentActiveSlide = this.slides[this.currentActiveSlideIndex + 1];
      this.currentActiveSlideIndex++;
    }
    // Create a copy of the array after mutation for OnPush CGhange Detection
    this.slides = this.slides.slice();
  }


  /**
    * @param activeSlideIndex-index of active slide emited by child component.
   */
  eventHandlerSlideChange(activeSlideIndex) {
    this.resetToggle();
    this.slides[activeSlideIndex].active = true;
    this.slides[this.currentActiveSlideIndex].active = false;
    this.currentActiveSlide = this.slides[activeSlideIndex];
    this.currentActiveSlideIndex = activeSlideIndex;
  }
  /**
   * toggle between light and dark background by adding and
   *  removing css classes to themecontainer
   */
  toggleBackgroundColor() {
    const themeContainer = this.element.nativeElement.getElementsByClassName('carousel-theme')[0];
      if (!this.switched) {
      this.renderer.removeClass(themeContainer, Constants.LIGHT_THEME);
      this.renderer.addClass(themeContainer, Constants.DARK_THEME);
      } else {
        this.renderer.removeClass(themeContainer, Constants.DARK_THEME);
        this.renderer.addClass(themeContainer,  Constants.LIGHT_THEME);
      }
      this.switched = !this.switched;
  }
  /**
   * toggle background after every 15 seconds
   */
  resetToggle() {
    clearInterval(this.toggleIntervalId);
    this.toggleIntervalId = <any> setInterval(() => {
      this.toggleBackgroundColor();
    }, Constants.DEFAULT_TOGGLE_TIME);
  }

}
