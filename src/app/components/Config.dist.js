/**
 * Created by korman on 30.07.17.
 */

export default class Config
{
    constructor() {
        this._backendUrl = 'http://levon.bottle-backend/app_dev.php/';
        this._defaultWhomSetting = {
            country: {
                id: 351,
                name: 'Russia'
            },
            city: {
                id: 6,
                name: 'Москва'
            },
            gender: {
                id: 0,
                name: 'Мужской'
            },
            age: {
                from: 18,
                to: 50
            },
            isRandom: false
        };
        this._defaultSetting = {
            country: {
                id: 0,
                name: 'Страна'
            },
            city: {
                id: 0,
                name: 'Город'
            },
            gender: {
                id: -1,
                name: 'Пол'
            }
        };

    }

    get backendUrl() {
        return this._backendUrl;
    }

    get defaultWhomSetting() {
        return this._defaultWhomSetting;
    }

    get defaultSetting() {
        return this._defaultSetting;
    }
}