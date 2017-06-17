import { Component } from '@angular/core';
import { NgForm } from "@angular/forms"

@Component({
  selector: 'template-driven',
  templateUrl: 'template-driven.component.html',
  styles: [`
     .ng-invalid {
         border: 1px solid red;
      }
      `]
})
export class TemplateDrivenComponent {
        user = {
           username: 'akash',
           email: '',
           password: ''    
        };
    
        onSubmit(form: NgForm) {
           console.log(this.user);    
        };
}
