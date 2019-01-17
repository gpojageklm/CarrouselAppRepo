import { Slide } from '../slide';

/** return fresh array of test slides */
export function getTestSlides(): Slide[] {
  return [

    {
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
    }

  ];
}
