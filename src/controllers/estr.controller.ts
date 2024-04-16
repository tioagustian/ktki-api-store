import {authenticate} from '@loopback/authentication';
import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, requestBody,
  response
} from '@loopback/rest';
import {Estr} from '../models';
import {EstrRepository} from '../repositories';
const CryptoJS = require("crypto-js");

var JsonFormatter = {
  stringify: function(cipherParams: any) {
    // create json object with ciphertext
    var jsonObj = { ciphertext: cipherParams.ciphertext.toString(CryptoJS.enc.Base64), iv: "", salt:"" };
    // optionally add iv or salt
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
      jsonObj.salt = cipherParams.salt.toString();
    }
    // stringify json object
    return JSON.stringify(jsonObj);
  },
  parse: function(jsonStr: any) {
    // parse json string
    var jsonObj = JSON.parse(jsonStr);
    // extract ciphertext from json object, and create cipher params object
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ciphertext)
    });
    // optionally extract iv or salt
    if (jsonObj.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
    }
    if (jsonObj.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.salt);
    }
    return cipherParams;
  }
};

type Encrypted = {
  encrypted: string;
  iv: string;
};

@authenticate('jwt')
export class EstrController {
  constructor(
    @repository(EstrRepository)
    public estrRepository : EstrRepository,
  ) {}


  @get('/estr')
  @response(200, {
    description: 'Array of Estr model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estr, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    // @param.filter(Estr) filter?: Filter<Estr>,
    @requestBody() filter? : Filter<Estr>
  ): Promise<Encrypted> {
    const data = await this.estrRepository.find(filter);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'osfh1pD%WkA5Z$Zo', {
      format: JsonFormatter
    });
    const string = encrypted.toString();
    const json = JSON.parse(string);
    return json;
  }

  @get('/estr/{id}')
  @response(200, {
    description: 'Estr model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Estr, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Estr, {exclude: 'where'}) filter?: FilterExcludingWhere<Estr>
  ): Promise<Encrypted> {
    const data = await this.estrRepository.findById(id, filter);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), 'osfh1pD%WkA5Z$Zo', {
      format: JsonFormatter
    });
    const string = encrypted.toString();
    const json = JSON.parse(string);
    return json;
  }
}
