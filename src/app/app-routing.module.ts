import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardPatientComponent } from './onboard-patient/onboard-patient.component';
import { PatientGraphComponent } from './patient-graph/patient-graph.component';
import { InputPatientDetailsComponent } from './input-patient-details/input-patient-details.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path:'onboard', component:OnboardPatientComponent},
  {path:'search', component:PatientGraphComponent},
  {path:'input', component:InputPatientDetailsComponent,runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
