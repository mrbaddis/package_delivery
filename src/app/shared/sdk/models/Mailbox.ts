/* tslint:disable */
import {
  CourierUser,
  Courier
} from '../index';

declare var Object: any;
export interface MailboxInterface {
  "mailboxNumber"?: number;
  "id"?: number;
  "userId"?: number;
  "courierId"?: number;
  owner?: CourierUser;
  courier?: Courier;
}

export class Mailbox implements MailboxInterface {
  "mailboxNumber": number;
  "id": number;
  "userId": number;
  "courierId": number;
  owner: CourierUser;
  courier: Courier;
  constructor(data?: MailboxInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Mailbox`.
   */
  public static getModelName() {
    return "Mailbox";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Mailbox for dynamic purposes.
  **/
  public static factory(data: MailboxInterface): Mailbox{
    return new Mailbox(data);
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
      name: 'Mailbox',
      plural: 'Mailboxes',
      path: 'Mailboxes',
      idName: 'id',
      properties: {
        "mailboxNumber": {
          name: 'mailboxNumber',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "userId": {
          name: 'userId',
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
                  keyFrom: 'userId',
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
