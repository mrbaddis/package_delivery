/* tslint:disable */
import {
  CourierUser
} from '../index';

declare var Object: any;
export interface ReferralInterface {
  "signUpConfirmedOn"?: Date;
  "emailConfirmedOn"?: Date;
  "firstShipmentConfirmedOn"?: Date;
  "id"?: number;
  "referrerId"?: number;
  "referreeId"?: number;
  referer?: CourierUser;
  referee?: CourierUser;
}

export class Referral implements ReferralInterface {
  "signUpConfirmedOn": Date;
  "emailConfirmedOn": Date;
  "firstShipmentConfirmedOn": Date;
  "id": number;
  "referrerId": number;
  "referreeId": number;
  referer: CourierUser;
  referee: CourierUser;
  constructor(data?: ReferralInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Referral`.
   */
  public static getModelName() {
    return "Referral";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Referral for dynamic purposes.
  **/
  public static factory(data: ReferralInterface): Referral{
    return new Referral(data);
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
      name: 'Referral',
      plural: 'Referrals',
      path: 'Referrals',
      idName: 'id',
      properties: {
        "signUpConfirmedOn": {
          name: 'signUpConfirmedOn',
          type: 'Date'
        },
        "emailConfirmedOn": {
          name: 'emailConfirmedOn',
          type: 'Date'
        },
        "firstShipmentConfirmedOn": {
          name: 'firstShipmentConfirmedOn',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "referrerId": {
          name: 'referrerId',
          type: 'number'
        },
        "referreeId": {
          name: 'referreeId',
          type: 'number'
        },
      },
      relations: {
        referer: {
          name: 'referer',
          type: 'CourierUser',
          model: 'CourierUser',
          relationType: 'belongsTo',
                  keyFrom: 'referrerId',
          keyTo: 'id'
        },
        referee: {
          name: 'referee',
          type: 'CourierUser',
          model: 'CourierUser',
          relationType: 'belongsTo',
                  keyFrom: 'referreeId',
          keyTo: 'id'
        },
      }
    }
  }
}
