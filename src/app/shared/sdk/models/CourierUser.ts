/* tslint:disable */
import {
  Role,
  Mailbox,
  RewardsAccount,
  PushSubscription
} from '../index';

declare var Object: any;
export interface CourierUserInterface {
  "firstName"?: string;
  "lastName"?: string;
  "email"?: string;
  "addresses"?: Array<any>;
  "contactInformation"?: any;
  "trnNumber"?: string;
  "createdOn"?: Date;
  "lastUpdatedOn"?: Date;
  "isProfileSet"?: boolean;
  "source"?: string;
  "points"?: number;
  "realm"?: string;
  "username"?: string;
  "emailVerified"?: boolean;
  "id"?: number;
  "password"?: string;
  accessTokens?: any[];
  roles?: Role[];
  credentials?: any[];
  identities?: any[];
  mailboxes?: Mailbox[];
  rewardsAccount?: RewardsAccount;
  pushSubscription?: PushSubscription[];
}

export class CourierUser implements CourierUserInterface {
  "firstName": string;
  "lastName": string;
  "email": string;
  "addresses": Array<any>;
  "contactInformation": any;
  "trnNumber": string;
  "createdOn": Date;
  "lastUpdatedOn": Date;
  "isProfileSet": boolean;
  "source": string;
  "points": number;
  "realm": string;
  "username": string;
  "emailVerified": boolean;
  "id": number;
  "password": string;
  accessTokens: any[];
  roles: Role[];
  credentials: any[];
  identities: any[];
  mailboxes: Mailbox[];
  rewardsAccount: RewardsAccount;
  pushSubscription: PushSubscription[];
  constructor(data?: CourierUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CourierUser`.
   */
  public static getModelName() {
    return "CourierUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CourierUser for dynamic purposes.
  **/
  public static factory(data: CourierUserInterface): CourierUser{
    return new CourierUser(data);
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
      name: 'CourierUser',
      plural: 'CourierUsers',
      path: 'CourierUsers',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "addresses": {
          name: 'addresses',
          type: 'Array&lt;any&gt;'
        },
        "contactInformation": {
          name: 'contactInformation',
          type: 'any'
        },
        "trnNumber": {
          name: 'trnNumber',
          type: 'string'
        },
        "createdOn": {
          name: 'createdOn',
          type: 'Date'
        },
        "lastUpdatedOn": {
          name: 'lastUpdatedOn',
          type: 'Date'
        },
        "isProfileSet": {
          name: 'isProfileSet',
          type: 'boolean',
          default: false
        },
        "source": {
          name: 'source',
          type: 'string'
        },
        "points": {
          name: 'points',
          type: 'number',
          default: 0
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        roles: {
          name: 'roles',
          type: 'Role[]',
          model: 'Role',
          relationType: 'hasMany',
          modelThrough: 'RoleMapping',
          keyThrough: 'roleId',
          keyFrom: 'id',
          keyTo: 'principalId'
        },
        credentials: {
          name: 'credentials',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        identities: {
          name: 'identities',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        mailboxes: {
          name: 'mailboxes',
          type: 'Mailbox[]',
          model: 'Mailbox',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        rewardsAccount: {
          name: 'rewardsAccount',
          type: 'RewardsAccount',
          model: 'RewardsAccount',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'courierUserId'
        },
        pushSubscription: {
          name: 'pushSubscription',
          type: 'PushSubscription[]',
          model: 'PushSubscription',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'courierUserId'
        },
      }
    }
  }
}
