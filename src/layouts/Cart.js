import React from 'react'
import TopBar from '../components/TopBar'
import CartListItem from '../components/CartCard'
import { Header, List, Divider, Icon, Image, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: JSON.parse(localStorage.getItem('cartProducts')),
        }
    }
    calculateSubTotal() {
        let { products } = this.state;
        let subtotal = 0
        products.forEach(prod => {
            subtotal += (Number(prod.price) * Number(prod.itemCount))
        });
        return this.displayAmt(subtotal)
    }
    displayAmt(amt) {
        var x = amt;
        x = x.toString();
        var afterPoint = '';
        if (x.indexOf('.') > 0)
            afterPoint = x.substring(x.indexOf('.'), x.length);
        x = Math.floor(x);
        x = x.toString();
        var lastThree = x.substring(x.length - 3);
        var otherNumbers = x.substring(0, x.length - 3);
        if (otherNumbers !== '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        return res

    }
    removeProduct(idx) {
        let { products } = this.state;
        products.splice(idx, 1)
        this.setState({ products: products })
        localStorage.setItem('cartProducts', JSON.stringify(products))
    }
    clearCart() {
        this.setState({ products: [] })
        localStorage.setItem('cartProducts', JSON.stringify([]))
    }
    checkout() {
        this.setState({ products: [] })
        localStorage.setItem('cartProducts', JSON.stringify([]))
        this.props.history.push('/checkout');
    }
    render() {
        let { products } = this.state;
        return (
            <div>
                <TopBar watchCart={true} />
                <div className='mt-30'>
                    <Header as='h2'>Items In Your Cart</Header>
                    <Divider></Divider>
                    <List relaxed divided>
                        {products.map((product, idx) => {
                            return (<CartListItem product={product} idx={idx} key={idx} removeProduct={this.removeProduct.bind(this)} />)
                        })}

                        {products.length === 0 &&
                            <List.Item>
                                <Image size='tiny' />
                                <List.Content className="widht-90">
                                    <List.Description>
                                        <Header as='h3'>No items to your cart!</Header>
                                        <Header color='blue' className="pointer" onClick={() => {
                                            this.props.history.push('/products/all');
                                        }}>Buy Products</Header>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        }
                        <List.Item>
                            <Image size='tiny' />
                            <List.Content className="widht-90">
                                <List.Description>
                                    <div className="mt-20">
                                        <div className="float-left width-50p">
                                            <label className="float-left price">Subtotal </label>
                                        </div>
                                        <div className="float-right width-50p">
                                            <label className="float-left price">
                                                <Icon name='rupee sign' />   {this.calculateSubTotal()}
                                            </label>
                                        </div>
                                    </div>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                    <Divider></Divider>
                    {products.length !== 0 && <div className='text-right'>
                        <Button onClick={() => this.clearCart()} icon labelPosition='right' color='red'>
                            Clear Cart
      <Icon name='close' />
                        </Button>
                        <Button onClick={() => this.checkout()} icon labelPosition='right' color='green'>
                            Checkout
      <Icon name='check' />
                        </Button>
                    </div>}
                </div>
                {/* <ToastContainer /> */}
            </div>
        )
    }
}
export default withRouter(Cart);