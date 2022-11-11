import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgControl, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';

@Directive({
  selector: '[appIdNumber]',
})
export class IdNumberDirective {
  hasSetvalidator = false;

  constructor(
    private ngControl: NgControl,
    private validatorService: ValidatorService
  ) {}

  ngOnInit() {
    this.validatorService
      .validators()
      .subscribe((validators) => this.resolveValidator(validators));
  }

  resolveValidator(validators: any[]) {
    const control = this.ngControl.control;
    const controlName = this.ngControl.name;

    const validator = validators.find((v) => v.field === controlName);

    if (!validator) {
      control.setValidators([]);
      return;
    }

    if (validator.visible && validator.regex) {
      // TODO change to -> control.addValidators([...])
      control.setValidators([Validators.pattern(validator.regex)]);
    }
  }
}
