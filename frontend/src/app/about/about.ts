import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  navigateToContact() {
    window.open("mailto: srivastavasaksham243@gmail.com")
   }

}
