import { Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ContentChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { Directive } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';

@Directive({
  selector: '[appIdNumber]',
})
export class IdNumberDirective {
  @ContentChild(NgControl) ngControl: NgControl;
  private validators: any[] = [];

  constructor(
    private view: ViewContainerRef,
    private template: TemplateRef<any>,
    private validatorService: ValidatorService
  ) {
    this.validatorService.validators().subscribe((validators) => {
      this.validators = validators;
      this.resolveValidatorAndView();
    });
  }

  ngAfterContentInit() {
    this.resolveValidatorAndView();
  }

  resolveValidatorAndView() {
    const control = this.ngControl.control;
    const controlName = this.ngControl.name;

    if (!controlName) return;

    const validator = this.validators.find((v) => v.field === controlName);

    if (!validator) return;

    if (!validator.visible) {
      control.setValidators([]);
      this.view.clear();
      return;
    }

    if (validator.regex) {
      // TODO change to -> control.addValidators([...])
      control.setValidators([Validators.pattern(validator.regex)]);
    }
  }
}
