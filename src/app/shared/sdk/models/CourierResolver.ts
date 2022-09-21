/* tslint:disable */
import {
  Courier
} from '../index';

declare var Object: any;
export interface CourierResolverInterface {
  "realm"?: string;
  "adminUrl"?: string;
  "customerUrl"?: string;
  "id"?: number;
  "courierId"?: number;
  courier?: Courier;
}

export class CourierResolver implements CourierResolverInterface {
  "realm": string;
  "adminUrl": string;
  "customerUrl": string;
  "id": number;
  "courierId": number;
  courier: Courier;
  constructor(data?: CourierResolverInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CourierResolver`.
   */
  public static getModelName() {
    return "CourierResolver";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CourierResolver for dynamic purposes.
  **/
  public static factory(data: CourierResolverInterface): CourierResolver{
    return new CourierResolver(data);
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
      name: 'CourierResolver',
      plural: 'CourierResolvers',
      path: 'CourierResolvers',
      idName: 'id',
      properties: {
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "adminUrl": {
          name: 'adminUrl',
          type: 'string'
        },
        "customerUrl": {
          name: 'customerUrl',
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
