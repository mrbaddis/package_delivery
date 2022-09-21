/* tslint:disable */
import {
  Courier
} from '../index';

declare var Object: any;
export interface RewardPrizeInterface {
  "pointsRequired"?: number;
  "name"?: string;
  "imageUrl"?: string;
  "description"?: string;
  "isActive"?: boolean;
  "id"?: number;
  "courierId"?: number;
  courier?: Courier;
}

export class RewardPrize implements RewardPrizeInterface {
  "pointsRequired": number;
  "name": string;
  "imageUrl": string;
  "description": string;
  "isActive": boolean;
  "id": number;
  "courierId": number;
  courier: Courier;
  constructor(data?: RewardPrizeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RewardPrize`.
   */
  public static getModelName() {
    return "RewardPrize";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RewardPrize for dynamic purposes.
  **/
  public static factory(data: RewardPrizeInterface): RewardPrize{
    return new RewardPrize(data);
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
      name: 'RewardPrize',
      plural: 'RewardPrizes',
      path: 'RewardPrizes',
      idName: 'id',
      properties: {
        "pointsRequired": {
          name: 'pointsRequired',
          type: 'number',
          default: 0
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "imageUrl": {
          name: 'imageUrl',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "isActive": {
          name: 'isActive',
          type: 'boolean'
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
