import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyStateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.empty-state__title');
    expect(titleElement.textContent).toContain('Sorry, no restaurants where found!');
  });

  it('should render the description', () => {
    const descriptionElement: HTMLElement = fixture.nativeElement.querySelector('.empty-state__description');
    expect(descriptionElement.textContent).toContain('Please try a different post code');
  });

  it('should render the image', () => {
    const imageElement: HTMLImageElement = fixture.nativeElement.querySelector('.empty-state__image');
    expect(imageElement.src).toContain('assets/sad-face.png');
    expect(imageElement.alt).toBe('sad face emoji');
  });
});
