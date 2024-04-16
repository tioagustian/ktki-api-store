import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EstrDataSource} from '../datasources';
import {Estr, EstrRelations} from '../models';

export class EstrRepository extends DefaultCrudRepository<
  Estr,
  typeof Estr.prototype.id_registrasi,
  EstrRelations
> {
  constructor(
    @inject('datasources.estr') dataSource: EstrDataSource,
  ) {
    super(Estr, dataSource);
  }
}
