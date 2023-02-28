import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CraftingComponent } from './pages/crafting/crafting.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StashComponent } from './pages/stash/stash.component';

const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "stash", component: StashComponent},
  {path: "signup", component: SignupComponent},
  {path: "crafting", component: CraftingComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
