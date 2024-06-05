import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomtypeMarkupViewComponent } from './roomtype-markup-view.component';
import { MarkupService } from '../markup.service';
import { RoomTypeService } from '../roomtype.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

describe('RoomtypeMarkupViewComponent', () => {
  let component: RoomtypeMarkupViewComponent;
  let fixture: ComponentFixture<RoomtypeMarkupViewComponent>;
  let markupService: MarkupService;
  let roomTypeService: RoomTypeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, HttpClientModule],
      providers: [MarkupService, RoomTypeService],
    }).compileComponents();

    markupService = TestBed.inject(MarkupService);
    roomTypeService = TestBed.inject(RoomTypeService);
    fixture = TestBed.createComponent(RoomtypeMarkupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch markup value from MarkupService', () => {
    const mockMarkupValue = '10';

    component.markupValue = mockMarkupValue;
    fixture.detectChanges();

    expect(component.markupValue).toEqual(mockMarkupValue);
  });

  it('should fetch room types from RoomTypeService', () => {
    const mockRoomTypes = ['Single', 'Double'];

    component.roomTypes = mockRoomTypes;
    fixture.detectChanges();

    expect(component.roomTypes).toEqual(mockRoomTypes);
  });

    it('should display markup value and room types in the template', () => {
      const markupValue = '10';
      const roomTypes = ['Single', 'Double'];
      
      component.markupValue = markupValue;
      component.roomTypes = roomTypes;
      fixture.detectChanges();

      const cardTitle = fixture.nativeElement.querySelector('.mat-card-title');
      const listItems = fixture.nativeElement.querySelectorAll('.list-items li');

      expect(cardTitle.textContent).toContain(`MarkUp Value: ${markupValue} %`);
      expect(listItems.length).toEqual(roomTypes.length);
      expect(listItems[0].textContent).toContain(roomTypes[0]);
      expect(listItems[1].textContent).toContain(roomTypes[1]);
    });
});
