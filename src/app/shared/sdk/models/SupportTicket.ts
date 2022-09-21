/* tslint:disable */
import {
  Courier,
  CourierUser
} from '../index';

declare var Object: any;
export interface SupportTicketInterface {
  "openDate"?: Date;
  "closeDate"?: Date;
  "description"?: string;
  "type"?: string;
  "previousTicketId"?: string;
  "attachments"?: Array<any>;
  "id"?: number;
  "courierId"?: number;
  "courierUserId"?: number;
  courier?: Courier;
  courierUser?: CourierUser;
}

export class SupportTicket implements SupportTicketInterface {
  "openDate": Date;
  "closeDate": Date;
  "description": string;
  "type": string;
  "previousTicketId": string;
  "attachments": Array<any>;
  "id": number;
  "courierId": number;
  "courierUserId": number;
  courier: Courier;
  courierUser: CourierUser;
  constructor(data?: SupportTicketInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `SupportTicket`.
   */
  public static getModelName() {
    return "SupportTicket";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of SupportTicket for dynamic purposes.
  **/
  public static factory(data: SupportTicketInterface): SupportTicket{
    return new SupportTicket(data);
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
      name: 'SupportTicket',
      plural: 'SupportTickets',
      path: 'SupportTickets',
      idName: 'id',
      properties: {
        "openDate": {
          name: 'openDate',
          type: 'Date'
        },
        "closeDate": {
          name: 'closeDate',
          type: 'Date'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "previousTicketId": {
          name: 'previousTicketId',
          type: 'string'
        },
        "attachments": {
          name: 'attachments',
          type: 'Array&lt;any&gt;'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "courierId": {
          name: 'courierId',
          type: 'number'
        },
        "courierUserId": {
          name: 'courierUserId',
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
