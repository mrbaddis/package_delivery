/* tslint:disable */
import {
  CourierUser
} from '../index';

declare var Object: any;
export interface RewardTransactionInterface {
  "type"?: string;
  "points"?: number;
  "id"?: number;
  "courierUserId"?: number;
  courierUser?: CourierUser;
}

export class RewardTransaction implements RewardTransactionInterface {
  "type": string;
  "points": number;
  "id": number;
  "courierUserId": number;
  courierUser: CourierUser;
  constructor(data?: RewardTransactionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RewardTransaction`.
   */
  public static getModelName() {
    return "RewardTransaction";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RewardTransaction for dynamic purposes.
  **/
  public static factory(data: RewardTransactionInterface): RewardTransaction{
    return new RewardTransaction(data);
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
      name: 'RewardTransaction',
      plural: 'RewardTransactions',
      path: 'RewardTransactions',
      idName: 'id',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "points": {
          name: 'points',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "courierUserId": {
          name: 'courierUserId',
          type: 'number'
        },
      },
      relations: {
        courierUser: {
          name: 'courierUser',
          type: 'CourierUser',
          model: 'CourierUser',
          relationType: 'belongsTo',
                  keyFrom: 'courierUserId',
          keyTo: 'id'
        },
      }
    }
  }
}
