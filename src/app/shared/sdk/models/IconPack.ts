/* tslint:disable */
import {
  Courier
} from '../index';

declare var Object: any;
export interface IconPackInterface {
  "name"?: string;
  "packageIcon"?: string;
  "warehouseIcon"?: string;
  "transitIcon"?: string;
  "readyIcon"?: string;
  "deliveredIcon"?: string;
  "mailboxIcon"?: string;
  "calculatorIcon"?: string;
  "invoiceIcon"?: string;
  "moreIcon"?: string;
  "profileIcon"?: string;
  "rewardsIcon"?: string;
  "notificationIcon"?: string;
  "contactIcon"?: string;
  "reportIcon"?: string;
  "id"?: number;
  "courierId"?: number;
  courier?: Courier;
}

export class IconPack implements IconPackInterface {
  "name": string;
  "packageIcon": string;
  "warehouseIcon": string;
  "transitIcon": string;
  "readyIcon": string;
  "deliveredIcon": string;
  "mailboxIcon": string;
  "calculatorIcon": string;
  "invoiceIcon": string;
  "moreIcon": string;
  "profileIcon": string;
  "rewardsIcon": string;
  "notificationIcon": string;
  "contactIcon": string;
  "reportIcon": string;
  "id": number;
  "courierId": number;
  courier: Courier;
  constructor(data?: IconPackInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `IconPack`.
   */
  public static getModelName() {
    return "IconPack";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of IconPack for dynamic purposes.
  **/
  public static factory(data: IconPackInterface): IconPack{
    return new IconPack(data);
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
      name: 'IconPack',
      plural: 'IconPacks',
      path: 'IconPacks',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "packageIcon": {
          name: 'packageIcon',
          type: 'string'
        },
        "warehouseIcon": {
          name: 'warehouseIcon',
          type: 'string'
        },
        "transitIcon": {
          name: 'transitIcon',
          type: 'string'
        },
        "readyIcon": {
          name: 'readyIcon',
          type: 'string'
        },
        "deliveredIcon": {
          name: 'deliveredIcon',
          type: 'string'
        },
        "mailboxIcon": {
          name: 'mailboxIcon',
          type: 'string'
        },
        "calculatorIcon": {
          name: 'calculatorIcon',
          type: 'string'
        },
        "invoiceIcon": {
          name: 'invoiceIcon',
          type: 'string'
        },
        "moreIcon": {
          name: 'moreIcon',
          type: 'string'
        },
        "profileIcon": {
          name: 'profileIcon',
          type: 'string'
        },
        "rewardsIcon": {
          name: 'rewardsIcon',
          type: 'string'
        },
        "notificationIcon": {
          name: 'notificationIcon',
          type: 'string'
        },
        "contactIcon": {
          name: 'contactIcon',
          type: 'string'
        },
        "reportIcon": {
          name: 'reportIcon',
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
      }
    }
  }
}
