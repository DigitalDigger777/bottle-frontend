import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
const chatIcon = <FontIcon className="material-icons">forum</FontIcon>;
const buildIcon = <FontIcon className="material-icons">build</FontIcon>;
const chat_bubble = <FontIcon className="material-icons">chat_bubble</FontIcon>;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class NavigationBottom extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedIndex: props.active,
        };

        this.clickSetting = this.clickSetting.bind(this);
    }

    clickSetting() {
        window.localStorage.setItem('settingRedirectUrl', '/#/settings');
    }

    render() {
        return (
            <div className="nav-button-wrap">
                <Paper zDepth={4}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>

                            <BottomNavigationItem
                                label="Получить послание"
                                icon={chat_bubble}
                                href="/#/receive-message-no-message"
                                style={{paddingLeft: 0, paddingRight: 0, lineHeight: 1, textAlign: 'center'}}
                            />

                            <BottomNavigationItem
                                label="Чаты"
                                icon={chatIcon}
                                href="/#/chats"
                                style={{paddingLeft: 0, paddingRight: 0, lineHeight: 1, textAlign: 'center'}}
                            />

                            <BottomNavigationItem
                                label="Настройки"
                                icon={buildIcon}
                                href="/#/settings"
                                style={{paddingLeft: 0, paddingRight: 0, lineHeight: 1, textAlign: 'center'}}
                                onClick={ this.clickSetting }
                            >

                            </BottomNavigationItem>

                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

export default NavigationBottom;