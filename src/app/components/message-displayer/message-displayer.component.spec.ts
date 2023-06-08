import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageDisplayerComponent } from './message-displayer.component';

describe('MessageDisplayerComponent', () => {
  let component: MessageDisplayerComponent;
  let fixture: ComponentFixture<MessageDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageDisplayerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDisplayerComponent);
    component = fixture.componentInstance;
    component.message = 'Sorry, no restaurants were found!';
    component.description = 'Please try a different post code';
    component.imageUrl = 'assets/sad-face.png';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.message-displayer__title');
    expect(titleElement.textContent).toContain('Sorry, no restaurants were found!');
  });

  it('should render the description', () => {
    const descriptionElement: HTMLElement = fixture.nativeElement.querySelector('.message-displayer__description');
    expect(descriptionElement.textContent).toContain('Please try a different post code');
  });

  it('should render the image', () => {
    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('.message-displayer__image');
    expect(imageElement.src).toContain('assets/sad-face.png');
    expect(imageElement.alt).toBe('message displayer image');
  });
});
