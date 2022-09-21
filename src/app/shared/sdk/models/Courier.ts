/* tslint:disable */
import {
  CourierSettings,
  MailOption,
  RewardsAccount,
  RewardSettings,
  ThemeSetting,
  PushSubscription
} from '../index';

declare var Object: any;
export interface CourierInterface {
  "name"?: string;
  "shortName"?: string;
  "imageUrl"?: string;
  "hostingUrl"?: string;
  "slogan"?: string;
  "email"?: string;
  "isActive"?: boolean;
  "expiryDate"?: Date;
  "mailboxPaddingLength"?: number;
  "realm": string;
  "id"?: number;
  courierSetting?: CourierSettings;
  mailOption?: MailOption;
  rewardsAccounts?: RewardsAccount[];
  rewardSetting?: RewardSettings;
  themeSetting?: ThemeSetting;
  pushSubscribers?: PushSubscription[];
}

export class Courier implements CourierInterface {
  "name": string;
  "shortName": string;
  "imageUrl": string;
  "hostingUrl": string;
  "slogan": string;
  "email": string;
  "isActive": boolean;
  "expiryDate": Date;
  "mailboxPaddingLength": number;
  "realm": string;
  "id": number;
  courierSetting: CourierSettings;
  mailOption: MailOption;
  rewardsAccounts: RewardsAccount[];
  rewardSetting: RewardSettings;
  themeSetting: ThemeSetting;
  pushSubscribers: PushSubscription[];
  constructor(data?: CourierInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Courier`.
   */
  public static getModelName() {
    return "Courier";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Courier for dynamic purposes.
  **/
  public static factory(data: CourierInterface): Courier{
    return new Courier(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Courier',
      plural: 'Couriers',
      path: 'Couriers',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "shortName": {
          name: 'shortName',
          type: 'string'
        },
        "imageUrl": {
          name: 'imageUrl',
          type: 'string'
        },
        "hostingUrl": {
          name: 'hostingUrl',
          type: 'string'
        },
        "slogan": {
          name: 'slogan',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean'
        },
        "expiryDate": {
          name: 'expiryDate',
          type: 'Date'
        },
        "mailboxPaddingLength": {
          name: 'mailboxPaddingLength',
          type: 'number'
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        courierSetting: {
          name: 'courierSetting',
          type: 'CourierSettings',
          model: 'CourierSettings',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'courierId'
        },
        mailOption: {
          name: 'mailOption',
          type: 'MailOption',
          model: 'MailOption',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'courierId'
        },
        rewardsAccounts: {
          name: 'rewardsAccounts',
          type: 'RewardsAccount[]',
          model: 'RewardsAccount',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courierId'
        },
        rewardSetting: {
          name: 'rewardSetting',
          type: 'RewardSettings',
          model: 'RewardSettings',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'courierId'
        },
        themeSetting: {
          name: 'themeSetting',
          type: 'ThemeSetting',
          model: 'ThemeSetting',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'courierId'
        },
        pushSubscribers: {
          name: 'pushSubscribers',
          type: 'PushSubscription[]',
          model: 'PushSubscription',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courierId'
        },
      }
    }
  }
}
