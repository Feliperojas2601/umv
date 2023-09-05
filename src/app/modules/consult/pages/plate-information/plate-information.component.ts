import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plate-information',
  templateUrl: './plate-information.component.html',
  styleUrls: ['./plate-information.component.scss'],
})
export class PlateInformationComponent  implements OnInit {

  public selectedSegment: string = 'data';

  constructor() { }

  ngOnInit() {}

}
