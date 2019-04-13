import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatTabsModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBar, MatSnackBarModule, MatChip, MatChipsModule} from "@angular/material";
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OnboardPatientComponent } from './onboard-patient/onboard-patient.component';
import { InputPatientDetailsComponent } from './input-patient-details/input-patient-details.component';
import { PatientGraphComponent } from './patient-graph/patient-graph.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from './user-service.service';
import { HealthDetailService } from './health-detail-service.service';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    OnboardPatientComponent,
    InputPatientDetailsComponent,
    PatientGraphComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatTabsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatChipsModule
  ],
  providers: [ UserServiceService,HealthDetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
