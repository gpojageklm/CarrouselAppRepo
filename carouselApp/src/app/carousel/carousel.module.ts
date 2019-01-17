import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselComponent } from './carousel.component';
import { ContentComponent } from './content/content.component';
import { TopbarComponent } from './topBar/topbar.component';
import { IndicatorComponent } from './indicator/indicator.component';
import { CarouselService } from './services/carousel.service';

@NgModule({
  declarations: [
    CarouselComponent,
    ContentComponent,
    TopbarComponent,
    IndicatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarouselComponent
  ],
  providers: [
    CarouselService
  ]
})
export class CarouselModule { }
