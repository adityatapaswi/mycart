import React from 'react'
import {
    Menu, Image, Icon, Label, Segment
} from 'semantic-ui-react'
import logo from '../images/logo.jfif'
import { withRouter } from "react-router-dom";

class TopBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
            menuItems: [
                {
                    name: 'home',
                    link: '/home',
                },
                {
                    name: 'categories',
                    link: '/categories',
                },
                {
                    name: 'products',
                    link: '/products/all',
                }
            ],
            cartCount: JSON.parse(localStorage.getItem('cartProducts')).length
        }



    }

    handleItemClick({ name, link }) {
        this.props.history.push(link);
        this.setState({ activeItem: name })
    }
    timer = null;
    componentDidMount() {
        if (this.props.watchCart)
            this.timer = setInterval(() => {
                this.setState({ cartCount: JSON.parse(localStorage.getItem('cartProducts')).length })
                console.log('cart count updated', JSON.parse(localStorage.getItem('cartProducts')).length);

            }, 1000);
    }
    componentWillUnmount() {
        if (this.props.watchCart)
            clearInterval(this.timer)
    }
    render() {
        const { activeItem, menuItems, cartCount } = this.state
        return (
            <Segment className="mb-0 top-bar">
                <Image size='tiny' className="pointer" floated='left' onClick={() =>    this.props.history.push('/home')} src={logo}></Image>
                <Menu secondary>
                    {
                        menuItems.map((item, idx) => {
                            return (<Menu.Item
                                key={idx}
                                name={item.name}
                                active={activeItem === item.name}
                                onClick={() => this.handleItemClick(item)}
                            />)
                        })
                    }
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Menu.Item as='a' onClick={() => {
                                this.handleItemClick({ name: 'cart', link: '/cart' })
                            }}>
                                <Icon name='cart' color='teal' /> Cart
                                    <Label color='teal' floating>
                                    {cartCount}
                                </Label>
                            </Menu.Item>
                        </Menu.Item>
                        <Menu.Item
                            name='logout'
                            active={activeItem === 'logout'}
                        // onClick={this.handleItemClick}
                        >
                            {/* <div> */}
                            <Image src='https://react.semantic-ui.com/images/avatar/small/rachel.png' title="Username" avatar />

                            {/* </div> */}
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                {/* <Divider /> */}
            </Segment>
        )
    }
}

export default withRouter(TopBar);