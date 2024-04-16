// Copyright IBM Corp. and LoopBack contributors 2020. All Rights Reserved.
// Node module: @loopback/authentication-jwt
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredentials} from './user-credentials.model';

@model({
  settings: {
    strict: false,
    mysql: {
      table: 'user'
    }
  },
})
export class User extends Entity {
  // must keep it
  // add id:string<UUID>
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
    mysql: {columnName: 'id', dataType: 'VARCHAR', dataLength: 36, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  id: string;

  // @property({
  //   type: 'string',
  //   mysql: {columnName: 'realm', dataType: 'VARCHAR', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  // })
  // realm?: string;

  // must keep it
  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'username', dataType: 'VARCHAR', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  username?: string;

  // must keep it
  // feat email unique
  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
    mysql: {columnName: 'email', dataType: 'VARCHAR', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  email: string;

  @property({
    type: 'number',
    default: 0,
    mysql: {columnName: 'isActive', dataType: 'tinyint', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  isActive?: boolean;

  // @property({
  //   type: 'string',
  //   mysql: {columnName: 'verificationToken', dataType: 'VARCHAR', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  // })
  // verificationToken?: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
