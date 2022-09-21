/* tslint:disable */

declare var Object: any;
export interface RewardSettingsInterface {
  "packagePoints": number;
  "recruitedPoints": number;
  "shippedPoints": number;
  "id"?: number;
  "courierId"?: number;
}

export class RewardSettings implements RewardSettingsInterface {
  "packagePoints": number;
  "recruitedPoints": number;
  "shippedPoints": number;
  "id": number;
  "courierId": number;
  constructor(data?: RewardSettingsInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RewardSettings`.
   */
  public static getModelName() {
    return "RewardSettings";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RewardSettings for dynamic purposes.
  **/
  public static factory(data: RewardSettingsInterface): RewardSettings{
    return new RewardSettings(data);
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
      name: 'RewardSettings',
      plural: 'RewardSettings',
      path: 'RewardSettings',
      idName: 'id',
      properties: {
        "packagePoints": {
          name: 'packagePoints',
          type: 'number',
          default: 0
        },
        "recruitedPoints": {
          name: 'recruitedPoints',
          type: 'number',
          default: 0
        },
        "shippedPoints": {
          name: 'shippedPoints',
          type: 'number',
          default: 0
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
      }
    }
  }
}
