import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
