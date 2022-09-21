/* tslint:disable */
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/
import { ErrorHandler } from './services/core/error.service';
import { LoopBackAuth } from './services/core/auth.service';
import { LoggerService } from './services/custom/logger.service';
import { SDKModels } from './services/custom/SDKModels';
import { InternalStorage, SDKStorage } from './storage/storage.swaps';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CookieBrowser } from './storage/cookie.browser';
import { StorageBrowser } from './storage/storage.browser';
import { RoleMappingApi } from './services/custom/RoleMapping';
import { RoleApi } from './services/custom/Role';
import { CourierUserApi } from './services/custom/CourierUser';
import { CourierApi } from './services/custom/Courier';
import { CourierSettingsApi } from './services/custom/CourierSettings';
import { CourierPackageApi } from './services/custom/CourierPackage';
import { InvoiceApi } from './services/custom/Invoice';
import { MailOptionApi } from './services/custom/MailOption';
import { PaymentApi } from './services/custom/Payment';
import { MailBankApi } from './services/custom/MailBank';
import { MailboxApi } from './services/custom/Mailbox';
import { UploadApi } from './services/custom/Upload';
import { NotificationApi } from './services/custom/Notification';
import { ReferralApi } from './services/custom/Referral';
import { RewardsAccountApi } from './services/custom/RewardsAccount';
import { RewardTransactionApi } from './services/custom/RewardTransaction';
import { RewardSettingsApi } from './services/custom/RewardSettings';
import { RewardPrizeApi } from './services/custom/RewardPrize';
import { RewardsClaimApi } from './services/custom/RewardsClaim';
import { LogApi } from './services/custom/Log';
import { CourierResolverApi } from './services/custom/CourierResolver';
import { MailLogApi } from './services/custom/MailLog';
import { ThemeSettingApi } from './services/custom/ThemeSetting';
import { StorageApi } from './services/custom/Storage';
import { SupportTicketApi } from './services/custom/SupportTicket';
import { PushNotificationApi } from './services/custom/PushNotification';
import { PushSubscriptionApi } from './services/custom/PushSubscription';
import { PushSubscriptionKeyApi } from './services/custom/PushSubscriptionKey';
import { IconPackApi } from './services/custom/IconPack';
/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [ ],
  exports:      [ ],
  providers:    [
    ErrorHandler
  ]
})
export class SDKBrowserModule {
  static forRoot(internalStorageProvider: any = {
    provide: InternalStorage,
    useClass: CookieBrowser
  }): ModuleWithProviders<any> {
    return {
      ngModule  : SDKBrowserModule,
      providers : [
        LoopBackAuth,
        LoggerService,
        SDKModels,
        RoleMappingApi,
        RoleApi,
        CourierUserApi,
        CourierApi,
        CourierSettingsApi,
        CourierPackageApi,
        InvoiceApi,
        MailOptionApi,
        PaymentApi,
        MailBankApi,
        MailboxApi,
        UploadApi,
        NotificationApi,
        ReferralApi,
        RewardsAccountApi,
        RewardTransactionApi,
        RewardSettingsApi,
        RewardPrizeApi,
        RewardsClaimApi,
        LogApi,
        CourierResolverApi,
        MailLogApi,
        ThemeSettingApi,
        StorageApi,
        SupportTicketApi,
        PushNotificationApi,
        PushSubscriptionApi,
        PushSubscriptionKeyApi,
        IconPackApi,
        internalStorageProvider,
        { provide: SDKStorage, useClass: StorageBrowser }
      ]
    };
  }
}
/**
* Have Fun!!!
* - Jon
**/
export * from './models/index';
export * from './services/index';
export * from './lb.config';
export * from './storage/storage.swaps';
export { CookieBrowser } from './storage/cookie.browser';
export { StorageBrowser } from './storage/storage.browser';

