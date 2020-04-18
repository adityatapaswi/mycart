import React from 'react'
import {
  Image, Card, Icon, Button, Label
} from 'semantic-ui-react'
import avatar from '../images/square-image.png'
import { withRouter } from "react-router-dom";
import Increment from './Increment';
import { ToastContainer, toast } from 'react-toastify';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      date: new Date(),
      itemCount: 0

    }



  }
  displayAmt(product) {
    var x = product.price;
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
  handleItemClick({ name, link }) {
    this.props.history.push(link);
    this.setState({ activeItem: name })
  }

  updateItemCount(count) {
    this.setState({ itemCount: count })
  }

  goToProducts() {
    this.props.history.push('/product/' + this.state.product.id);
    // this.setState({ activeItem: name })
  }
  componentWillReceiveProps(newProps) {
    this.setState({ product: newProps.product })
  }
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toDateString();
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
    else{
      toast.error('Please select quantity greater than 0')
    }
  }
  render() {
    let { product } = this.state
    return (
      <Card>
        <Card.Content>
          <Image
            floated='left'
            className="pointer"
            size='tiny'
            src={avatar}
            onClick={() => { this.goToProducts() }}
          />
          <div>
            <label className="prod-name pointer" onClick={() => { this.goToProducts() }}>{product.name}</label>
            <br />
            <Label color='teal' tag>
              <Icon name='rupee sign' /> {this.displayAmt(product)}
            </Label>
            <Label>{product.available} Left in stock</Label>
            <Label> Sold By {product.seller}</Label>
            <br />
            <div className="float-left">Get It By <strong>{this.randomDate(new Date(), new Date(2020, 4, 31))}</strong></div>
            <div className="float-right">
              <div className="float-left"><Increment updateItemCount={this.updateItemCount.bind(this)} available={product.available} />
              </div>
              <Button animated className="float-right" onClick={() => this.addToCart()}>
                <Button.Content visible>Add to cart</Button.Content>
                <Button.Content hidden>
                  <Icon name='cart plus' />
                </Button.Content>
              </Button>
            </div>
          </div>

        </Card.Content>

        <ToastContainer />
      </Card>
    )
  }
}

export default withRouter(ProductCard);