import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { MarkupService } from '../markup.service';
import { RoomTypeService } from '../roomtype.service';


@Component({
  selector: 'app-roomtype-markup-view',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './roomtype-markup-view.component.html',
  styleUrl: './roomtype-markup-view.component.css'
})
export class RoomtypeMarkupViewComponent {

  roomTypes: string[] = [];
  markupValue: string = '';

  constructor( private markupService: MarkupService, private roomTypeService: RoomTypeService){
    this.getRoomTypeMarkup();
  }

  getRoomTypeMarkup(){
    this.markupService.getMarkupValue().subscribe(
      (response: string) => {
        this.markupValue = response;
      },
      (error) => {
        console.log('Error fetching Markup', error);
      }
    );

    this.roomTypeService.getRoomTypeNames().subscribe(
      (response: string[]) => {
        this.roomTypes = response;
      },
      (error) => {
        console.error('Error fetching roomType names', error);
      }
    );
  }

}
