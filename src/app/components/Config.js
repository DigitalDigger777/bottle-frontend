/**
 * Created by korman on 30.07.17.
 */

export default class Config
{
    constructor() {
        this._backendUrl = 'http://bottle-backend.ceant.net/';
    }

    get backendUrl() {
        return this._backendUrl;
    }
}