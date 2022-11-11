import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ValidatorService {
  private validatorSubject: Subject<any[]> = new Subject<any[]>();

  constructor() {}

  setValidators(validators: any[]) {
    this.validatorSubject.next(validators);
  }

  validators() {
    return this.validatorSubject.asObservable();
  }
}
