/* tslint:disable */
import {
  CourierUser,
  Courier
} from '../index';

declare var Object: any;
export interface CourierPackageInterface {
  "trackingNo": string;
  "description"?: string;
  "businessPackage"?: boolean;
  "value"?: number;
  "customsFee"?: number;
  "weight"?: number;
  "attachedFile"?: string;
  "url"?: string;
  "merchant"?: string;
  "createdOn"?: Date;
  "createdBy"?: number;
  "lastUpdatedOn"?: Date;
  "warehouseDate"?: Date;
  "readyDate"?: Date;
  "deliveryDate"?: Date;
  "status"?: string;
  "source"?: string;
  "manifestNumber"?: string;
  "id"?: number;
  "ownerId"?: number;
  "courierId"?: number;
  owner?: CourierUser;
  courier?: Courier;
}

export class CourierPackage implements CourierPackageInterface {
  "trackingNo": string;
  "description": string;
  "value": number;
  "businessPackage": boolean;
  "customsFee": number;
  "weight": number;
  "attachedFile": string;
  "url": string;
  "merchant": string;
  "createdOn": Date;
  "createdBy": number;
  "lastUpdatedOn": Date;
  "warehouseDate": Date;
  "readyDate": Date;
  "deliveryDate": Date;
  "status": string;
  "source": string;
  "manifestNumber": string;
  "id": number;
  "ownerId": number;
  "courierId": number;
  owner: CourierUser;
  courier: Courier;
  constructor(data?: CourierPackageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CourierPackage`.
   */
  public static getModelName() {
    return "CourierPackage";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CourierPackage for dynamic purposes.
  **/
  public static factory(data: CourierPackageInterface): CourierPackage{
    return new CourierPackage(data);
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
      name: 'CourierPackage',
      plural: 'CourierPackages',
      path: 'CourierPackages',
      idName: 'id',
      properties: {
        "trackingNo": {
          name: 'trackingNo',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "businessPackage": {
          name: 'businessPackage',
          type: 'boolean'
        },
        "value": {
          name: 'value',
          type: 'number'
        },
        "customsFee": {
          name: 'customsFee',
          type: 'number'
        },
        "weight": {
          name: 'weight',
          type: 'number'
        },
        "attachedFile": {
          name: 'attachedFile',
          type: 'string'
        },
        "url": {
          name: 'url',
          type: 'string'
        },
        "merchant": {
          name: 'merchant',
          type: 'string'
        },
        "createdOn": {
          name: 'createdOn',
          type: 'Date'
        },
        "createdBy": {
          name: 'createdBy',
          type: 'number'
        },
        "lastUpdatedOn": {
          name: 'lastUpdatedOn',
          type: 'Date'
        },
        "warehouseDate": {
          name: 'warehouseDate',
          type: 'Date'
        },
        "readyDate": {
          name: 'readyDate',
          type: 'Date'
        },
        "deliveryDate": {
          name: 'deliveryDate',
          type: 'Date'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "source": {
          name: 'source',
          type: 'string'
        },
        "manifestNumber": {
          name: 'manifestNumber',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "ownerId": {
          name: 'ownerId',
          type: 'number'
        },
        "courierId": {
          name: 'courierId',
          type: 'number'
        },
      },
      relations: {
        owner: {
          name: 'owner',
          type: 'CourierUser',
          model: 'CourierUser',
          relationType: 'belongsTo',
                  keyFrom: 'ownerId',
          keyTo: 'id'
        },
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
