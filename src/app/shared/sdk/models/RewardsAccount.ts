/* tslint:disable */

declare var Object: any;
export interface RewardsAccountInterface {
  "points"?: number;
  "id"?: number;
  "courierUserId"?: number;
  "courierId"?: number;
}

export class RewardsAccount implements RewardsAccountInterface {
  "points": number;
  "id": number;
  "courierUserId": number;
  "courierId": number;
  constructor(data?: RewardsAccountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RewardsAccount`.
   */
  public static getModelName() {
    return "RewardsAccount";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RewardsAccount for dynamic purposes.
  **/
  public static factory(data: RewardsAccountInterface): RewardsAccount{
    return new RewardsAccount(data);
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
      name: 'RewardsAccount',
      plural: 'RewardsAccounts',
      path: 'RewardsAccounts',
      idName: 'id',
      properties: {
        "points": {
          name: 'points',
          type: 'number',
          default: 0
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
