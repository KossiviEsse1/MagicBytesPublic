import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UploadDetailsComponent } from './upload-details/upload-details.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'decrypterTool', component: UploadDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
