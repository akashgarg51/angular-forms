import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { Observable } from "rxjs/Rx";

@Component({
    selector: 'data-driven',
    templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent {
    myForm: FormGroup
    
    genders = ['male', 'female'];
    constructor(private formBuilder: FormBuilder) {
 /*     this.myForm = new FormGroup({
          'userData': new FormGroup({
             'username': new FormControl('Max', Validators.required),
              'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])
          }),
          'password': new FormControl('', Validators.required),
          'gender': new FormControl('male'),
          'hobbies': new FormArray([
             new FormControl('Cooking', Validators.required)
              ])
      });  */
        
      this.myForm = formBuilder.group({
              'userData': formBuilder.group({
             'username': ['Max', [Validators.required, this.exampleValidator]],
              'email': ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]]
          }),
          'password': ['', Validators.required],
          'gender': ['male'],
          'hobbies': formBuilder.array([
             ['Cooking', Validators.required, this.asyncExampleValidator]
              ])
          });
    }
    
    onAddHobby() {
        (<FormArray>this.myForm.controls['hobbies']).push(new FormControl('', Validators.required, this.asyncExampleValidator));
    }
    
    onSubmit() {
        console.log(this.myForm);
    }
    
    exampleValidator(control: FormControl): {[s: string]: boolean} {
        if(control.value === 'Example') {   // To check if input field has a value 'Example'
           return {example: true};    // it means validation will fail, because if we are returning something, it means validation fails    
        }
        return null;  // it means validation is successful
    }
    
    asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>(
           (resolve, reject) => {
                setTimeout(() => {
                    if(control.value === 'Example'){
                       resolve({'invalid': true});      // resolve anything other then null, then validation will fail for sure
                    } else {
                       resolve(null);    
                    }
                }, 1500);
           }
            );
        return promise;
    }
    
}
