/* tslint:disable */
import {
  Courier,
  Notification,
  ThemeSetting
} from '../index';

declare var Object: any;
export interface CourierSettingsInterface {
  "prefix"?: string;
  "useJmd"?: boolean;
  "businessExchangeRate"?: number;
  "exchangeRate"?: number;
  "gct"?: number;
  "processingFee1"?: number;
  "processingFee2"?: number;
  "warehouseAddress"?: any;
  "weightPrice"?: Array<any>;
  "storeAddress"?: any;
  "facebook"?: any;
  "google"?: any;
  "paypal"?: any;
  "stripe"?: any;
  "referralEnabled"?: boolean;
  "pointsEnabled"?: boolean;
  "notificationEnabled"?: boolean;
  "paymentsEnabled"?: boolean;
  "pwaSupported"?: boolean;
  "contactInformation"?: any;
  "googleTrackingCode"?: string;
  "publicVapidKey"?: string;
  "privateVapidKey"?: string;
  "id"?: number;
  "courierId"?: number;
  courier?: Courier;
  notifications?: Notification[];
  themeSetting?: ThemeSetting;
}

export class CourierSettings implements CourierSettingsInterface {
  "prefix": string;
  "useJmd": boolean;
  "exchangeRate": number;
  "businessExchangeRate": number;
  "gct": number;
  "processingFee1": number;
  "processingFee2": number;
  "warehouseAddress": any;
  "weightPrice": Array<any>;
  "storeAddress": any;
  "facebook": any;
  "google": any;
  "paypal": any;
  "stripe": any;
  "referralEnabled": boolean;
  "pointsEnabled": boolean;
  "notificationEnabled": boolean;
  "paymentsEnabled": boolean;
  "pwaSupported": boolean;
  "contactInformation": any;
  "googleTrackingCode": string;
  "publicVapidKey": string;
  "privateVapidKey": string;
  "id": number;
  "courierId": number;
  courier: Courier;
  notifications: Notification[];
  themeSetting: ThemeSetting;
  constructor(data?: CourierSettingsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CourierSettings`.
   */
  public static getModelName() {
    return "CourierSettings";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CourierSettings for dynamic purposes.
  **/
  public static factory(data: CourierSettingsInterface): CourierSettings{
    return new CourierSettings(data);
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
      name: 'CourierSettings',
      plural: 'CourierSettings',
      path: 'CourierSettings',
      idName: 'id',
      properties: {
        "prefix": {
          name: 'prefix',
          type: 'string'
        },
        "useJmd": {
          name: 'useJmd',
          type: 'boolean'
        },
        "exchangeRate": {
          name: 'exchangeRate',
          type: 'number'
        },
        "businessExchangeRate": {
          name: 'businessExchangeRate',
          type: 'number'
        },
        "gct": {
          name: 'gct',
          type: 'number'
        },
        "processingFee1": {
          name: 'processingFee1',
          type: 'number'
        },
        "processingFee2": {
          name: 'processingFee2',
          type: 'number'
        },
        "warehouseAddress": {
          name: 'warehouseAddress',
          type: 'any'
        },
        "weightPrice": {
          name: 'weightPrice',
          type: 'Array&lt;any&gt;'
        },
        "storeAddress": {
          name: 'storeAddress',
          type: 'any'
        },
        "facebook": {
          name: 'facebook',
          type: 'any'
        },
        "google": {
          name: 'google',
          type: 'any'
        },
        "paypal": {
          name: 'paypal',
          type: 'any'
        },
        "stripe": {
          name: 'stripe',
          type: 'any'
        },
        "referralEnabled": {
          name: 'referralEnabled',
          type: 'boolean'
        },
        "pointsEnabled": {
          name: 'pointsEnabled',
          type: 'boolean'
        },
        "notificationEnabled": {
          name: 'notificationEnabled',
          type: 'boolean'
        },
        "paymentsEnabled": {
          name: 'paymentsEnabled',
          type: 'boolean'
        },
        "pwaSupported": {
          name: 'pwaSupported',
          type: 'boolean'
        },
        "contactInformation": {
          name: 'contactInformation',
          type: 'any'
        },
        "googleTrackingCode": {
          name: 'googleTrackingCode',
          type: 'string'
        },
        "publicVapidKey": {
          name: 'publicVapidKey',
          type: 'string'
        },
        "privateVapidKey": {
          name: 'privateVapidKey',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "courierId": {
          name: 'courierId',
          type: 'number'
        },
      },
      relations: {
        courier: {
          name: 'courier',
          type: 'Courier',
          model: 'Courier',
          relationType: 'belongsTo',
                  keyFrom: 'courierId',
          keyTo: 'id'
        },
        notifications: {
          name: 'notifications',
          type: 'Notification[]',
          model: 'Notification',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courierSettingsId'
        },
        themeSetting: {
          name: 'themeSetting',
          type: 'ThemeSetting',
          model: 'ThemeSetting',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'courierId'
        },
      }
    }
  }
}
