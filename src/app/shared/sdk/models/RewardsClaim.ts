/* tslint:disable */
import {
  CourierUser,
  RewardPrize
} from '../index';

declare var Object: any;
export interface RewardsClaimInterface {
  "status"?: string;
  "lastUpdated"?: Date;
  "id"?: number;
  "courierUserId"?: number;
  "rewardPrizeId"?: number;
  courierUser?: CourierUser;
  rewardPrize?: RewardPrize;
}

export class RewardsClaim implements RewardsClaimInterface {
  "status": string;
  "lastUpdated": Date;
  "id": number;
  "courierUserId": number;
  "rewardPrizeId": number;
  courierUser: CourierUser;
  rewardPrize: RewardPrize;
  constructor(data?: RewardsClaimInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RewardsClaim`.
   */
  public static getModelName() {
    return "RewardsClaim";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RewardsClaim for dynamic purposes.
  **/
  public static factory(data: RewardsClaimInterface): RewardsClaim{
    return new RewardsClaim(data);
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
      name: 'RewardsClaim',
      plural: 'RewardsClaims',
      path: 'RewardsClaims',
      idName: 'id',
      properties: {
        "status": {
          name: 'status',
          type: 'string'
        },
        "lastUpdated": {
          name: 'lastUpdated',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "courierUserId": {
          name: 'courierUserId',
          type: 'number'
        },
        "rewardPrizeId": {
          name: 'rewardPrizeId',
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
        rewardPrize: {
          name: 'rewardPrize',
          type: 'RewardPrize',
          model: 'RewardPrize',
          relationType: 'belongsTo',
                  keyFrom: 'rewardPrizeId',
          keyTo: 'id'
        },
      }
    }
  }
}
