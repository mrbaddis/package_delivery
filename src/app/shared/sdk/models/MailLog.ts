/* tslint:disable */
import {
  Invoice,
  Courier
} from '../index';

declare var Object: any;
export interface MailLogInterface {
  "timestamp"?: Date;
  "resourceId"?: number;
  "success"?: boolean;
  "resourceType"?: string;
  "description"?: string;
  "id"?: number;
  "courierId"?: number;
  invoice?: Invoice;
  courier?: Courier;
}

export class MailLog implements MailLogInterface {
  "timestamp": Date;
  "resourceId": number;
  "success": boolean;
  "resourceType": string;
  "description": string;
  "id": number;
  "courierId": number;
  invoice: Invoice;
  courier: Courier;
  constructor(data?: MailLogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MailLog`.
   */
  public static getModelName() {
    return "MailLog";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MailLog for dynamic purposes.
  **/
  public static factory(data: MailLogInterface): MailLog{
    return new MailLog(data);
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
      name: 'MailLog',
      plural: 'MailLogs',
      path: 'MailLogs',
      idName: 'id',
      properties: {
        "timestamp": {
          name: 'timestamp',
          type: 'Date'
        },
        "resourceId": {
          name: 'resourceId',
          type: 'number'
        },
        "success": {
          name: 'success',
          type: 'boolean'
        },
        "resourceType": {
          name: 'resourceType',
          type: 'string'
        },
        "description": {
          name: 'description',
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
        invoice: {
          name: 'invoice',
          type: 'Invoice',
          model: 'Invoice',
          relationType: 'belongsTo',
                  keyFrom: 'resourceId',
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
