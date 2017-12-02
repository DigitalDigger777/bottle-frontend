import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
    colLeft: {
        lineHeight: '55px',
        color: '#ffffff',
        fontSize: '16px',
        marginTop: 0,
        marginLeft: 0
    },
    colRight: {
        lineHeight: '55px',
        color: '#ffffff',
        fontSize: '16px',
        marginTop: 0,
        marginRight: 0
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: '20px'
    }
};

export default class PanelTop extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            colLeft: props.colLeft,
            colRight: props.colRight
        }
    }

    render() {
        return (
            <div className="panel-top">
                <AppBar zDepth={1}
                    title={<span style={styles.title}>{this.state.title}</span>}
                    iconElementLeft={this.state.colLeft}
                    iconElementRight={this.state.colRight}
                    titleStyle={styles.titleStyle}
                    iconStyleLeft={styles.colLeft}
                    iconStyleRight={styles.colRight}
                />
            </div>
        )
    }
}