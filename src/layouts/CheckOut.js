import React from 'react'
import TopBar from '../components/TopBar'
import { Header } from 'semantic-ui-react';
import logo from '../images/logo.jfif'
import { withRouter } from 'react-router';

class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render() {

        return (
            <div>
                <TopBar />
                <div className="home-segment App">
                    <img className='ml-130' alt='Logo' src={logo} />
                    <h1>Thanks for shopping with us!!</h1>
                    <Header color='blue' className="pointer" onClick={() => {
                        this.props.history.push('/categories');
                    }}>Continue Shoping</Header>
                </div>
            </div>
        )
    }
}
export default withRouter(CheckOut)