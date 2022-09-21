/* tslint:disable */
import { Injectable } from '@angular/core';
import { RoleMapping } from '../../models/RoleMapping';
import { Role } from '../../models/Role';
import { CourierUser } from '../../models/CourierUser';
import { Courier } from '../../models/Courier';
import { CourierSettings } from '../../models/CourierSettings';
import { CourierPackage } from '../../models/CourierPackage';
import { Invoice } from '../../models/Invoice';
import { MailOption } from '../../models/MailOption';
import { Payment } from '../../models/Payment';
import { MailBank } from '../../models/MailBank';
import { Mailbox } from '../../models/Mailbox';
import { Upload } from '../../models/Upload';
import { Notification } from '../../models/Notification';
import { Referral } from '../../models/Referral';
import { RewardsAccount } from '../../models/RewardsAccount';
import { RewardTransaction } from '../../models/RewardTransaction';
import { RewardSettings } from '../../models/RewardSettings';
import { RewardPrize } from '../../models/RewardPrize';
import { RewardsClaim } from '../../models/RewardsClaim';
import { Log } from '../../models/Log';
import { CourierResolver } from '../../models/CourierResolver';
import { MailLog } from '../../models/MailLog';
import { ThemeSetting } from '../../models/ThemeSetting';
import { Storage } from '../../models/Storage';
import { SupportTicket } from '../../models/SupportTicket';
import { PushNotification } from '../../models/PushNotification';
import { PushSubscription } from '../../models/PushSubscription';
import { PushSubscriptionKey } from '../../models/PushSubscriptionKey';
import { IconPack } from '../../models/IconPack';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    RoleMapping: RoleMapping,
    Role: Role,
    CourierUser: CourierUser,
    Courier: Courier,
    CourierSettings: CourierSettings,
    CourierPackage: CourierPackage,
    Invoice: Invoice,
    MailOption: MailOption,
    Payment: Payment,
    MailBank: MailBank,
    Mailbox: Mailbox,
    Upload: Upload,
    Notification: Notification,
    Referral: Referral,
    RewardsAccount: RewardsAccount,
    RewardTransaction: RewardTransaction,
    RewardSettings: RewardSettings,
    RewardPrize: RewardPrize,
    RewardsClaim: RewardsClaim,
    Log: Log,
    CourierResolver: CourierResolver,
    MailLog: MailLog,
    ThemeSetting: ThemeSetting,
    Storage: Storage,
    SupportTicket: SupportTicket,
    PushNotification: PushNotification,
    PushSubscription: PushSubscription,
    PushSubscriptionKey: PushSubscriptionKey,
    IconPack: IconPack,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
