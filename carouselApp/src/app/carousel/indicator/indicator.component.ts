import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Slide } from '../../model/slide';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'qrc-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * Indicator component to display rounded indicators at bottom of slides
 * handles input to set activated slide
 * emits activated slide to parent on click
 */
export class IndicatorComponent implements OnChanges {

  @Input() slides: Slide[] = [];
  @Output() slideChanged = new EventEmitter();
  currentActiveSlide: Slide = null;
  currentActiveSlideIndex: number;

  constructor() { }

  /**
   * @param   changes-SimpleChange Object with list of changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.slides) {
      return;
    }
    if (!Array.isArray(changes.slides.currentValue)) {
      return;
    }
    this.slides = changes.slides.currentValue;
    this.setActivateSlide();
  }

  /**
   * set activated slide based on change detection.
   */
  setActivateSlide() {
    if (this.slides) {
      for (let i = 0; i < this.slides.length; i++) {
        if (this.slides[i].active) {
          this.currentActiveSlide = this.slides[i];
          this.currentActiveSlideIndex = i;
        }
      }
    }
  }

  /**
   * handle click event for indicator and set activeSlide
   * emits activeSlideIndex to parent component
   * @param  slideIndex-Index of indicator (slide) clicked on view
   */
  selectSlide(slideIndex) {
    if (this.currentActiveSlideIndex !== slideIndex) {
    this.slides[slideIndex].active = true;
    this.slides[this.currentActiveSlideIndex].active = false;
    this.currentActiveSlideIndex = slideIndex;
    this.slideChanged.emit(this.currentActiveSlideIndex);
    }
  }
}
