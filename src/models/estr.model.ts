import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mysql: {table: 'estr'}
  },
})
export class Estr extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id_registrasi: string;

  @property({
    type: 'string',
    required: true,
  })
  Nama: string;

  @property({
    type: 'string',
  })
  no_ktp?: string;

  @property({
    type: 'date',
    required: true,
  })
  TanggalLahir: string;

  @property({
    type: 'string',
    required: true,
  })
  KodeGender: string;

  @property({
    type: 'string',
    required: true,
  })
  KodeOp: string;

  @property({
    type: 'string',
  })
  Profesi: string;

  @property({
    type: 'string',
  })
  Nostr?: string;

  @property({
    type: 'date',
  })
  StrBerlakuSampai?: string;

  @property({
    type: 'date',
  })
  updated_at: string;

  @property({
    type: 'string',
  })
  TempatLahir: string;

  @property({
    type: 'date',
  })
  TanggalDikeluarkan: string;

  constructor(data?: Partial<Estr>) {
    super(data);
  }
}

export interface EstrRelations {
  // describe navigational properties here
}

export type EstrWithRelations = Estr & EstrRelations;
