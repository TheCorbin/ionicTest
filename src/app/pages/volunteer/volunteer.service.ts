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

  /**
   * This is a SIMULATED EXPENSIVE BUSINESS RULE.
   * DO NOT CHANGE THIS METHOD !!
   * @param num
   */
  pureFunctionBusinessRule(num: number) {
    // DO NOT CHANGE THIS METHOD !!
    return fibonacci(num);
  }

}
