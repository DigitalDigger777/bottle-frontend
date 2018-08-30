import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import Divider from 'material-ui/Divider';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Config from '../Config';


export default class WhomSendSetting extends React.Component {

    constructor(props){
        super(props);

        const whomSetting = window.localStorage.getItem('whomSetting');

        this.state = {
            whomSetting: JSON.parse(whomSetting)
        };

        this.changeRedirect = this.changeRedirect.bind(this);
    }

    changeRedirect() {
        window.localStorage.setItem('settingRedirectUrl', '/#/whom-send');
    }

    render(){
        return(
            <div>
                <Divider style={{width: '100%'}} />
                <div className="input-row clearfix">
                    <div className="col-60">
                        <div className="my-label">
                            Страна
                        </div>
                    </div>
                    <div className="col-40">
                        <div className="text-right">
                            <Link to="/settings/country" onClick={ this.changeRedirect }>{ this.state.whomSetting.country.name }</Link>
                        </div>
                        <ChevronRight style={{position: 'absolute', right: '0', top: '12px'}} />
                    </div>
                </div>
                <Divider style={{width: '100%'}} />
                <div className="input-row-city clearfix">
                    <div className="col-40">
                        <div className="my-label">
                            Город
                        </div>
                    </div>
                    <div className="col-60">
                        <div className="text-right">
                            <Link to="/settings/city" onClick={ this.changeRedirect }>{ this.state.whomSetting.city.name }</Link>
                        </div>
                        <ChevronRight style={{position: 'absolute', right: '0', top: '12px'}} />
                    </div>
                </div>
                <Divider style={{width: '100%'}} />
                <div className="input-row clearfix">
                    <div className="col-60">
                        <div className="my-label">
                            Пол
                        </div>
                    </div>
                    <div className="col-40">
                        <div className="text-right">
                            <Link to="/settings/gender" onClick={ this.changeRedirect }>{ this.state.whomSetting.gender.name }</Link>
                        </div>
                        <ChevronRight style={{position: 'absolute', right: '0', top: '12px'}} />
                    </div>
                </div>
                <Divider style={{width: '100%'}} />
                <div className="input-row clearfix">
                    <div className="col-60">
                        <div className="my-label">
                            Возраст
                        </div>
                    </div>
                    <div className="col-40">
                        <div className="text-right">
                            <Link to="/settings/old">{ this.state.whomSetting.age.from }—{this.state.whomSetting.age.to }</Link>
                        </div>
                        <ChevronRight style={{position: 'absolute', right: '0', top: '12px'}} />
                    </div>
                </div>
                <Divider style={{width: '100%'}} />
            </div>
        );
    }
}