import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SettingsControlsComponent} from './components/settings-controls/settings-controls.component';
import {TransactionsChildComponent} from './components/transactions-child/transactions-child.component';
import {TransactionsListComponent} from './components/transactions-list/transactions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionsListComponent,
    TransactionsChildComponent,
    SettingsControlsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
