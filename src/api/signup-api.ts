/* eslint-disable class-methods-use-this */
import HTTPTransport from '../../utils/HTTPTransport';
import BaseAPI from './base-api';
import URLs from './baseURLs';

const httpTransport = new HTTPTransport(URLs['https://ya-praktikum.tech/api/v2']);

export default class SignupApi extends BaseAPI {
  create() {
    return httpTransport.post('/auth/signup', {});
  }
}
