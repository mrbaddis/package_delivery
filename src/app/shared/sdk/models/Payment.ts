/* tslint:disable */

declare var Object: any;
export interface PaymentInterface {
  "gateway"?: string;
  "amount"?: string;
  "transactionId"?: string;
  "status"?: string;
  "date"?: Date;
  "id"?: number;
}

export class Payment implements PaymentInterface {
  "gateway": string;
  "amount": string;
  "transactionId": string;
  "status": string;
  "date": Date;
  "id": number;
  constructor(data?: PaymentInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Payment`.
   */
  public static getModelName() {
    return "Payment";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Payment for dynamic purposes.
  **/
  public static factory(data: PaymentInterface): Payment{
    return new Payment(data);
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
      name: 'Payment',
      plural: 'Payments',
      path: 'Payments',
      idName: 'id',
      properties: {
        "gateway": {
          name: 'gateway',
          type: 'string'
        },
        "amount": {
          name: 'amount',
          type: 'string'
        },
        "transactionId": {
          name: 'transactionId',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "date": {
          name: 'date',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
