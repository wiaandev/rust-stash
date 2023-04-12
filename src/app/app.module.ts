import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { StashComponent } from './pages/stash/stash.component';
import { ButtonComponent } from './components/button/button.component';
import { SignupComponent } from './pages/signup/signup.component';
import { QuickFilterComponent } from './components/quick-filter/quick-filter.component';
import { CraftingComponent } from './pages/crafting/crafting.component';
import { CraftBlockComponent } from './components/craft-block/craft-block.component';
import { UpdateModalComponent } from './components/update-modal/update-modal.component';
import {LocationsComponent } from './pages/locations/locations.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { SkeletonLoaderComponent } from './components/skeleton-loader/skeleton-loader.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AboutComponent } from './pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    StashComponent,
    ButtonComponent,
    SignupComponent,
    QuickFilterComponent,
    CraftingComponent,
    CraftBlockComponent,
    UpdateModalComponent,
    LocationsComponent,
    NotFoundComponent,
    AuthModalComponent,
    SkeletonLoaderComponent,
    LoaderComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
