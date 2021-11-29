import { Injectable } from '@angular/core';

/**
 * DO NOT CHANGE THIS FUNCTION
 */
const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {

  pureFunctionBusinessRule(num: number) {
    return fibonacci(num);
  }

}
