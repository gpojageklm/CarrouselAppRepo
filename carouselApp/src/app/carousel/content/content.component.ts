import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
import { Slide } from '../../model/slide';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'qrc-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

/**
 * Content component hold static data for each component.
 * display header,main content,more-info in template
 */
export class ContentComponent implements OnChanges {

  @Input() slides: Slide[] = [];

  currentActiveSlide: Slide = null;

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
    this.currentActiveSlide = this.slides.find((slide) => slide.active === true );
   }

}

