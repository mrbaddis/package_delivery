/* tslint:disable */
import {
  Courier
} from '../index';

declare var Object: any;
export interface LogInterface {
  "timestamp"?: Date;
  "name"?: string;
  "description"?: string;
  "type"?: string;
  "isError"?: boolean;
  "status"?: string;
  "id"?: number;
  "courierId"?: number;
  courier?: Courier;
}

export class Log implements LogInterface {
  "timestamp": Date;
  "name": string;
  "description": string;
  "type": string;
  "isError": boolean;
  "status": string;
  "id": number;
  "courierId": number;
  courier: Courier;
  constructor(data?: LogInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Log`.
   */
  public static getModelName() {
    return "Log";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Log for dynamic purposes.
  **/
  public static factory(data: LogInterface): Log{
    return new Log(data);
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
      name: 'Log',
      plural: 'Logs',
      path: 'Logs',
      idName: 'id',
      properties: {
        "timestamp": {
          name: 'timestamp',
          type: 'Date'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "isError": {
          name: 'isError',
          type: 'boolean'
        },
        "status": {
          name: 'status',
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
