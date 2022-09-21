/* tslint:disable */

declare var Object: any;
export interface PushSubscriptionInterface {
  "endpoint": string;
  "keys": any;
  "id"?: number;
  "courierUserId"?: number;
  "courierId"?: number;
}

export class PushSubscription implements PushSubscriptionInterface {
  "endpoint": string;
  "keys": any;
  "id": number;
  "courierUserId": number;
  "courierId": number;
  constructor(data?: PushSubscriptionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PushSubscription`.
   */
  public static getModelName() {
    return "PushSubscription";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PushSubscription for dynamic purposes.
  **/
  public static factory(data: PushSubscriptionInterface): PushSubscription{
    return new PushSubscription(data);
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
      name: 'PushSubscription',
      plural: 'PushSubscriptions',
      path: 'PushSubscriptions',
      idName: 'id',
      properties: {
        "endpoint": {
          name: 'endpoint',
          type: 'string'
        },
        "keys": {
          name: 'keys',
          type: 'any'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "courierUserId": {
          name: 'courierUserId',
          type: 'number'
        },
        "courierId": {
          name: 'courierId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
