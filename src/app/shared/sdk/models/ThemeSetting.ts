/* tslint:disable */

declare var Object: any;
export interface ThemeSettingInterface {
  "backgroundColor"?: string;
  "backgroundTextColor"?: string;
  "primaryColor"?: string;
  "primaryTextColor"?: string;
  "secondaryColor"?: string;
  "secondaryTextColor"?: string;
  "errorColor"?: string;
  "errorTextColor"?: string;
  "warningColor"?: string;
  "warningTextColor"?: string;
  "iconPack"?: string;
  "id"?: number;
  "courierId"?: number;
}

export class ThemeSetting implements ThemeSettingInterface {
  "backgroundColor": string;
  "backgroundTextColor": string;
  "primaryColor": string;
  "primaryTextColor": string;
  "secondaryColor": string;
  "secondaryTextColor": string;
  "errorColor": string;
  "errorTextColor": string;
  "warningColor": string;
  "warningTextColor": string;
  "iconPack": string;
  "id": number;
  "courierId": number;
  constructor(data?: ThemeSettingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ThemeSetting`.
   */
  public static getModelName() {
    return "ThemeSetting";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ThemeSetting for dynamic purposes.
  **/
  public static factory(data: ThemeSettingInterface): ThemeSetting{
    return new ThemeSetting(data);
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
      name: 'ThemeSetting',
      plural: 'ThemeSettings',
      path: 'ThemeSettings',
      idName: 'id',
      properties: {
        "backgroundColor": {
          name: 'backgroundColor',
          type: 'string'
        },
        "backgroundTextColor": {
          name: 'backgroundTextColor',
          type: 'string'
        },
        "primaryColor": {
          name: 'primaryColor',
          type: 'string'
        },
        "primaryTextColor": {
          name: 'primaryTextColor',
          type: 'string'
        },
        "secondaryColor": {
          name: 'secondaryColor',
          type: 'string'
        },
        "secondaryTextColor": {
          name: 'secondaryTextColor',
          type: 'string'
        },
        "errorColor": {
          name: 'errorColor',
          type: 'string'
        },
        "errorTextColor": {
          name: 'errorTextColor',
          type: 'string'
        },
        "warningColor": {
          name: 'warningColor',
          type: 'string'
        },
        "warningTextColor": {
          name: 'warningTextColor',
          type: 'string'
        },
        "iconPack": {
          name: 'iconPack',
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
      }
    }
  }
}
