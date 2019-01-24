import React, {Component} from 'react';

import UserView from './userPages/UserView';

class MainFrame extends Component{
    render(){
        return(
            <div>
                <div>Header</div>
                <UserView/>
            </div>
        );
    }
}

export default MainFrame;