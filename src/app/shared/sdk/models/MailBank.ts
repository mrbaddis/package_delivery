/* tslint:disable */

declare var Object: any;
export interface MailBankInterface {
  "id"?: number;
}

export class MailBank implements MailBankInterface {
  "id": number;
  constructor(data?: MailBankInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MailBank`.
   */
  public static getModelName() {
    return "MailBank";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MailBank for dynamic purposes.
  **/
  public static factory(data: MailBankInterface): MailBank{
    return new MailBank(data);
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
      name: 'MailBank',
      plural: 'MailBanks',
      path: 'MailBanks',
      idName: 'id',
      properties: {
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
