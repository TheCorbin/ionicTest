import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EmployeeData} from '../../../providers/tree-generator.service';
import {VolunteerService} from '../volunteer.service';

@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss'],
})
export class VolunteerListComponent {

  @Input() data: EmployeeData[];
  @Input() department: string;

  @Output() remove = new EventEmitter<EmployeeData>();
  @Output() add = new EventEmitter<string>();

  label: string;

  constructor( private volunteerService: VolunteerService) {
  }

  handleKey() {
    if( this.label?.length ) {
      this.add.emit(this.label);
      this.label = '';
    }
  }

  calculate(num: number) {
    return this.volunteerService.pureFunctionBusinessRule(num);
  }

}
