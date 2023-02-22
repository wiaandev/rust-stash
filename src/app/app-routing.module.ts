import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { StashComponent } from './pages/stash/stash.component';

const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "stash", component: StashComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
