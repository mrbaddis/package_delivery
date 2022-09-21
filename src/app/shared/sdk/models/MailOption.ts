/* tslint:disable */

declare var Object: any;
export interface MailOptionInterface {
  "host"?: string;
  "port"?: number;
  "secure"?: boolean;
  "user"?: string;
  "password"?: string;
  "rejectUnauthorized"?: boolean;
  "sendGridApiKey"?: string;
  "method"?: number;
  "id"?: number;
  "courierId"?: number;
}

export class MailOption implements MailOptionInterface {
  "host": string;
  "port": number;
  "secure": boolean;
  "user": string;
  "password": string;
  "rejectUnauthorized": boolean;
  "sendGridApiKey": string;
  "method": number;
  "id": number;
  "courierId": number;
  constructor(data?: MailOptionInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MailOption`.
   */
  public static getModelName() {
    return "MailOption";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MailOption for dynamic purposes.
  **/
  public static factory(data: MailOptionInterface): MailOption{
    return new MailOption(data);
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
      name: 'MailOption',
      plural: 'MailOptions',
      path: 'MailOptions',
      idName: 'id',
      properties: {
        "host": {
          name: 'host',
          type: 'string'
        },
        "port": {
          name: 'port',
          type: 'number'
        },
        "secure": {
          name: 'secure',
          type: 'boolean'
        },
        "user": {
          name: 'user',
          type: 'string'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
        "rejectUnauthorized": {
          name: 'rejectUnauthorized',
          type: 'boolean'
        },
        "sendGridApiKey": {
          name: 'sendGridApiKey',
          type: 'string'
        },
        "method": {
          name: 'method',
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
