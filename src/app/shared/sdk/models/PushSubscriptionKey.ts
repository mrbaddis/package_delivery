/* tslint:disable */

declare var Object: any;
export interface PushSubscriptionKeyInterface {
  "p256dh": string;
  "auth": string;
  "id"?: number;
}

export class PushSubscriptionKey implements PushSubscriptionKeyInterface {
  "p256dh": string;
  "auth": string;
  "id": number;
  constructor(data?: PushSubscriptionKeyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PushSubscriptionKey`.
   */
  public static getModelName() {
    return "PushSubscriptionKey";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PushSubscriptionKey for dynamic purposes.
  **/
  public static factory(data: PushSubscriptionKeyInterface): PushSubscriptionKey{
    return new PushSubscriptionKey(data);
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
      name: 'PushSubscriptionKey',
      plural: 'PushSubscriptionKeys',
      path: 'PushSubscriptionKeys',
      idName: 'id',
      properties: {
        "p256dh": {
          name: 'p256dh',
          type: 'string'
        },
        "auth": {
          name: 'auth',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
