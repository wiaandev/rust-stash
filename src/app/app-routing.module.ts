import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CraftingComponent } from './pages/crafting/crafting.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StashComponent } from './pages/stash/stash.component';

const routes: Routes = [
  {path: "", component: LandingComponent},
  {path: "stash", component: StashComponent},
  {path: "signup", component: SignupComponent},
  {path: "crafting", component: CraftingComponent},
  {path: "locations", component: LocationsComponent},
  {path: "**", component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
