import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Validates two form controls within a form group whether they
 * have same value or not.
 */
function ValidateEqual(control1, control2: string) {
    return (group: FormGroup) => {
        const ctrl1 = group.controls[control1];
        const ctrl2 = group.controls[control2];

        return ctrl1.value === ctrl2.value
            ? ctrl2.setErrors(null)
            : ctrl2.setErrors({ notEqual: true });
    };
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: [ './signup.component.scss' ],
})
export class SignupComponent {
    signup: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.signup = this.formBuilder.group(
            {
                email: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.email,
                    ]),
                ],
                password: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                    ]),
                ],
                confirmPassword: [
                    '',
                    Validators.compose([
                        Validators.required,
                        Validators.minLength(8),
                    ]),
                ],
            },
            {
                validators: ValidateEqual('password', 'confirmPassword'),
            },
        );
    }
}
