import { Pipe, PipeTransform } from '@angular/core';
import {VolunteerService} from './volunteer.service';

@Pipe({
  name: 'calculate'
})
export class CalculatePipe implements PipeTransform {
  constructor(private volunteerService: VolunteerService) {}
  transform(value: number) {
    return this.volunteerService.pureFunctionBusinessRule(value);
  }
}
