/* tslint:disable */
import {
  CourierUser,
  Courier,
  CourierPackage
} from '../index';

declare var Object: any;
export interface InvoiceInterface {
  "items"?: Array<any>;
  "status"?: string;
  "amount"?: number;
  "discount"?: number;
  "created"?: Date;
  "dateDue"?: Date;
  "sentInEmail"?: boolean;
  "id"?: number;
  "customerId"?: number;
  "businessId"?: number;
  "courierPackageId"?: number;
  customer?: CourierUser;
  business?: Courier;
  courierPackage?: CourierPackage;
}

export class Invoice implements InvoiceInterface {
  "items": Array<any>;
  "status": string;
  "amount": number;
  "discount": number;
  "created": Date;
  "dateDue": Date;
  "sentInEmail": boolean;
  "id": number;
  "customerId": number;
  "businessId": number;
  "courierPackageId": number;
  customer: CourierUser;
  business: Courier;
  courierPackage: CourierPackage;
  constructor(data?: InvoiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Invoice`.
   */
  public static getModelName() {
    return "Invoice";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Invoice for dynamic purposes.
  **/
  public static factory(data: InvoiceInterface): Invoice{
    return new Invoice(data);
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
      name: 'Invoice',
      plural: 'Invoices',
      path: 'Invoices',
      idName: 'id',
      properties: {
        "items": {
          name: 'items',
          type: 'Array&lt;any&gt;'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
        "amount": {
          name: 'amount',
          type: 'number'
        },
        "discount": {
          name: 'discount',
          type: 'number'
        },
        "created": {
          name: 'created',
          type: 'Date'
        },
        "dateDue": {
          name: 'dateDue',
          type: 'Date'
        },
        "sentInEmail": {
          name: 'sentInEmail',
          type: 'boolean',
          default: false
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "customerId": {
          name: 'customerId',
          type: 'number'
        },
        "businessId": {
          name: 'businessId',
          type: 'number'
        },
        "courierPackageId": {
          name: 'courierPackageId',
          type: 'number'
        },
      },
      relations: {
        customer: {
          name: 'customer',
          type: 'CourierUser',
          model: 'CourierUser',
          relationType: 'belongsTo',
                  keyFrom: 'customerId',
          keyTo: 'id'
        },
        business: {
          name: 'business',
          type: 'Courier',
          model: 'Courier',
          relationType: 'belongsTo',
                  keyFrom: 'businessId',
          keyTo: 'id'
        },
        courierPackage: {
          name: 'courierPackage',
          type: 'CourierPackage',
          model: 'CourierPackage',
          relationType: 'belongsTo',
                  keyFrom: 'courierPackageId',
          keyTo: 'id'
        },
      }
    }
  }
}
