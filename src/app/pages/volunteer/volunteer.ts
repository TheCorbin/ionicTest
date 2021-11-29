import {Component, OnInit} from '@angular/core';

import {EmployeeData, ListGenerator} from '../../providers/tree-generator.service';
import {Names} from '../../providers/names';

const NUM_RANGE: [number, number] = [23, 28];

@Component({
  selector: 'page-volunteer',
  templateUrl: 'volunteer.html',
  styleUrls: ['./volunteer.scss'],
})
export class VolunteerPage implements OnInit {
  workshopList: EmployeeData[];
  coffeeList: EmployeeData[];

  constructor(private generator: ListGenerator) { }

  ngOnInit() {
    this.workshopList = this.generator.generate(Names, NUM_RANGE, 100);
    this.coffeeList = this.generator.generate(Names, NUM_RANGE, 100);
  }

  add(list: EmployeeData[], name: string) {
    list.unshift({ label: name, num: this.generator.generateNumber(NUM_RANGE) });
  }

  remove(list: EmployeeData[], node: EmployeeData) {
    list.splice(list.indexOf(node), 1);
  }
}
