import React from 'react'
import {
    Image,  Icon, Button, Label, List
} from 'semantic-ui-react'
import avatar from '../images/square-image.png'
import { withRouter } from "react-router-dom";

class CartListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: props.product
        }



    }

    componentWillReceiveProps(newProps) {
        this.setState({ product: newProps.product });
    }
    handleItemClick({ name, link }) {
        this.props.history.push(link);
        this.setState({ activeItem: name })
    }
    goToProducts() {
        this.props.history.push('/product/' + this.state.product.id);
        // this.setState({ activeItem: name })
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
    render() {
        let { product } = this.state
        return (
            <List.Item>
                <Image size='tiny' src={avatar} className="pointer" onClick={() => { this.goToProducts() }} />
                <List.Content className="widht-90">
                    <List.Description>
                        <div>
                            <label className='prod-name pointer' onClick={() => this.goToProducts()}>{product.name}</label>
                            <Button onClick={() => { this.props.removeProduct(this.props.idx) }} icon='close' className="float-right" />
                            <br />
                            <br />
                            <div className="float-left width-50p">
                                <Label color='teal' tag>
                                    <Icon name='rupee sign' /> {this.displayAmt(product.price)} <Icon name='close' color='black' />{product.itemCount}
                                </Label>
                            </div>
                            <div className="float-right width-50p">
                                <label className="float-left price">
                                    <Icon name='rupee sign' />   {this.displayAmt(Number(product.price) * Number(product.itemCount))}
                                </label>

                            </div>

                        </div>
                    </List.Description>
                </List.Content>
            </List.Item>
        )
    }
}

export default withRouter(CartListItem);