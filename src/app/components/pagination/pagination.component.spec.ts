import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the correct page when setPage is called with -1', () => {
    const currentPage = 5;
    const totalPages = 10;
    component.currentPage = currentPage;
    component.totalPages = totalPages;
    fixture.detectChanges();

    let emittedPage: number | undefined;
    component.pageSetted.subscribe((page: number) => {
      emittedPage = page;
    });

    const prevButton: HTMLElement = fixture.nativeElement.querySelector('.pagination-button:first-child');
    prevButton.click();

    expect(emittedPage).toBe(currentPage - 1);
  });

  it('should emit the correct page when setPage is called with 1', () => {
    const currentPage = 5;
    const totalPages = 10;
    component.currentPage = currentPage;
    component.totalPages = totalPages;
    fixture.detectChanges();

    let emittedPage: number | undefined;
    component.pageSetted.subscribe((page: number) => {
      emittedPage = page;
    });

    const nextButton: HTMLElement = fixture.nativeElement.querySelector('.pagination-button:last-child');
    nextButton.click();

    expect(emittedPage).toBe(currentPage + 1);
  });

  it('should disable the previous button when current page is 1', () => {
    component.currentPage = 1;
    component.totalPages = 10;
    fixture.detectChanges();

    const prevButton: HTMLButtonElement = fixture.nativeElement.querySelector('.pagination-button:first-child');
    expect(prevButton.disabled).toBeTrue();
  });

  it('should disable the next button when current page is equal to total pages', () => {
    const totalPages = 10;
    component.currentPage = totalPages;
    component.totalPages = totalPages;
    fixture.detectChanges();

    const nextButton: HTMLButtonElement = fixture.nativeElement.querySelector('.pagination-button:last-child');
    expect(nextButton.disabled).toBeTrue();
  });

  it('should display the correct page numbers', () => {
    const currentPage = 5;
    const totalPages = 10;
    component.currentPage = currentPage;
    component.totalPages = totalPages;
    fixture.detectChanges();
  
    const pageButtons: NodeListOf<Element> = fixture.nativeElement.querySelectorAll('.pagination-button:not(:first-child):not(:last-child)');
    expect(pageButtons.length - 1).toBe(Math.min(totalPages - currentPage, 3));
  
    pageButtons.forEach((button, index) => {
      const expectedPage = currentPage + index -1;
      expect(button.textContent).toContain(expectedPage);
    });
  });

});
