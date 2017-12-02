/**
 * Created by korman on 30.07.17.
 */

export default class Config
{
    constructor() {
        this._backendUrl = 'http://levon.bottle-backend/app_dev.php/';
    }

    get backendUrl() {
        return this._backendUrl;
    }
}