import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VolunteerPage} from './volunteer';

const routes: Routes = [
  {
    path: '',
    component: VolunteerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteerPageRoutingModule {
}

