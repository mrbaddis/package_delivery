/* tslint:disable */

declare var Object: any;
export interface NotificationInterface {
  "title"?: string;
  "message"?: string;
  "startDate"?: Date;
  "endDate"?: Date;
  "displayOnWebsite"?: boolean;
  "displayOnInvoice"?: boolean;
  "id"?: number;
  "courierSettingsId"?: number;
}

export class Notification implements NotificationInterface {
  "title": string;
  "message": string;
  "startDate": Date;
  "endDate": Date;
  "displayOnWebsite": boolean;
  "displayOnInvoice": boolean;
  "id": number;
  "courierSettingsId": number;
  constructor(data?: NotificationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Notification`.
   */
  public static getModelName() {
    return "Notification";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Notification for dynamic purposes.
  **/
  public static factory(data: NotificationInterface): Notification{
    return new Notification(data);
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
      name: 'Notification',
      plural: 'Notifications',
      path: 'Notifications',
      idName: 'id',
      properties: {
        "title": {
          name: 'title',
          type: 'string'
        },
        "message": {
          name: 'message',
          type: 'string'
        },
        "startDate": {
          name: 'startDate',
          type: 'Date'
        },
        "endDate": {
          name: 'endDate',
          type: 'Date'
        },
        "displayOnWebsite": {
          name: 'displayOnWebsite',
          type: 'boolean'
        },
        "displayOnInvoice": {
          name: 'displayOnInvoice',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "courierSettingsId": {
          name: 'courierSettingsId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
