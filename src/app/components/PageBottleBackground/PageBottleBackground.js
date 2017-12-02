import React, {Component} from 'react';

class PageBottleBackground extends Component{
    constructor(props){
        super(props);

    }
    render() {

        return (
            <div className="wrapper bottle-bg blur">
                <div className="logo"></div>

                {this.props.children}

            </div>
        );
    }
}

export default PageBottleBackground;