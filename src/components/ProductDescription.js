import React from 'react'
import {
    Image, Card, Icon, Button, Grid, Label, Divider, List, Header
} from 'semantic-ui-react'
import avatar from '../images/square-image.png'
import { withRouter } from "react-router-dom";
import Increment from './Increment';
import { ToastContainer, toast } from 'react-toastify';

class ProductDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product,
            product_date: this.randomDate(new Date(), new Date(2020, 4, 31)),
            itemCount: 0
        }



    }

    handleItemClick({ name, link }) {
        this.props.history.push(link);
        this.setState({ activeItem: name })
    }
    goToProducts() {
        this.props.history.push('/products/1');
        // this.setState({ activeItem: name })
    }
    componentWillReceiveProps(newProps) {
        this.setState({ product: newProps.product })
    }
    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
    }
    updateItemCount(count) {
        this.setState({ itemCount: count })
    }
    addToCart() {
        if (this.state.itemCount > 0) {
            let product = this.state.product;
            let insert = true;
            product.itemCount = this.state.itemCount;
            let cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
            if (!cartProducts || !cartProducts.length) {
                cartProducts = []
            }
            else {
                let matchIndex = cartProducts.findIndex(x => x.id === product.id)
                if (matchIndex !== -1) {
                    cartProducts[matchIndex] = product
                    insert = false;
                }
            }
            if (insert)
                cartProducts.push(product)
            localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
        }
        else {
            toast.error('Please select quantity greater than 0')
        }
    }
    render() {
        let { product, product_date } = this.state;
        return (
            <Card fluid>
                <Card.Content>
                    <Image
                        floated='left'
                        size='tiny'
                        src={avatar}
                    />
                    <div>
                        <label className="prod-name">{product.name}</label>
                        <br />
                        <Grid divided='horrizontally'>
                            <Grid.Row columns={2}>
                                <Grid.Column width="14">
                                    <Label color='teal' tag>
                                        <Icon name='rupee sign' /> {product.price}
                                    </Label>
                                    <Label color='teal' tag>
                                        By {product.company}
                                    </Label>
                                    <Label color='teal' tag>
                                        Sold By {product.seller}
                                    </Label>

                                    <p>{product.description}</p>


                                </Grid.Column>
                                <Grid.Column width="2">
                                    <Label>{product.available} Left in stock</Label>
                                    <br />
                                    <div>Get It By <strong>{product_date}</strong></div>
                                    <br />
                                    <Increment updateItemCount={this.updateItemCount.bind(this)} available={product.available} />
                                    <br />
                                    <Button animated onClick={() => this.addToCart()}>
                                        <Button.Content visible>Add to cart</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='cart plus' />
                                        </Button.Content>
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <Divider />
                        <Header as="h3">Product Reviews</Header>
                        <List relaxed divided>
                            {product && product.reviews && product.reviews.length && product.reviews.map((review, idx) => {
                                return (<List.Item key={idx}>
                                    <Image floated='left' avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                    <List.Content className='widht-90'>
                                        <List.Header color='blue'>{review.name}</List.Header>
                                        <List.Description>
                                            {review.review}

                                            <Label>On  {this.randomDate(new Date(2019, 4, 31), new Date())}</Label>


                                        </List.Description>
                                    </List.Content>
                                </List.Item>)
                            })}
                        </List>
                    </div>

                </Card.Content>

                <ToastContainer />
            </Card>
        )
    }
}

export default withRouter(ProductDescription);