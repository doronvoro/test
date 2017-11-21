import { Component ,  } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Router  } from '@angular/router';


import {SpinnerModule} from 'primeng/primeng';

//import { DataTableModule, SharedModule, ButtonModule, DialogModule } from 'primeng/primeng';//PrimeNg

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

 
  constructor( private router: Router) {
    

  }


  items: MenuItem[];
  


      

      ngOnInit() {

       
 
        this.items = [
          {
              label: 'סקיל',
               command: () => {this.router.navigate(['skil'])}
          },
          {
            label: 'יעדיים',
             command: () => {this.router.navigate(['yaad'])}
        },
      ];


      }

}
