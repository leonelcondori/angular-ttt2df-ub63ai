import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from './validator.service';

/**
 * @title Basic Inputs
 */
@Component({
  selector: 'input-overview-example',
  styleUrls: ['input-overview-example.css'],
  templateUrl: 'input-overview-example.html',
})
export class InputOverviewExample {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private validatorService: ValidatorService
  ) {
    this.form = this.formBuilder.group({
      rft: ['', []],
    });
  }

  ngOnInit() {
    this.validatorService.setValidators([
      { field: 'rft', regex: '', visible: true },
    ]);
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
