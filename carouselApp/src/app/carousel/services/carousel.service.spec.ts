import { Slide } from '../model/slide';
import { CarouselService } from './carousel.service';
import { asyncData } from '../../../testing-global';

describe('SlidesService ', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let carouselService: CarouselService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    carouselService = new CarouselService(<any>httpClientSpy);
  });

  it('should return expected slides (HttpClient called once)', () => {
    const expectedSlides: Slide[] =
      [{
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

    httpClientSpy.get.and.returnValue(asyncData(expectedSlides));

    carouselService.getSlides().subscribe(
      slides => expect(slides).toEqual(expectedSlides, 'expected slides'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});

