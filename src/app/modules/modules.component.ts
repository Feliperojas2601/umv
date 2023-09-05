import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
})
export class ModulesComponent  implements OnInit {

  constructor( 
    private ionMenuController: MenuController,
    private router: Router
  ) { }

  ngOnInit() {}

  navigateTo(path: string): void {
    this.ionMenuController.close();
    this.router.navigate([path]);
  }

}
