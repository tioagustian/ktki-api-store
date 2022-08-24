import {Entity, model, property} from '@loopback/repository';

@model()
export class Todo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    mysql: {columnName: 'title', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  title: string;

  @property({
    type: 'string',
    mysql: {columnName: 'description', dataType: 'varchar', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'Y'},
  })
  desc?: string;

  @property({
    type: 'boolean',
    default: 0,
    mysql: {columnName: 'completed', dataType: 'tinyint', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'N'},
  })
  isComplete?: boolean;


  constructor(data?: Partial<Todo>) {
    super(data);
  }
}

export interface TodoRelations {
  // describe navigational properties here
}

export type TodoWithRelations = Todo & TodoRelations;
