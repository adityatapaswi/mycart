import React from 'react'
import TopBar from '../components/TopBar'
import ProductDescription from '../components/ProductDescription';

export default class ProductDescriptionpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        let product = require('../database/products.json').filter(x => x.id === this.props.match.params.productId)


        this.setState({ product: product[0] });
    }

    render() {
        let { product } = this.state;

        return (
            <div>
                <TopBar watchCart={true} />
                <div className='mt-30'>
                    <ProductDescription product={product} />
                </div>


                {/* <ToastContainer /> */}
            </div>
        )
    }
}
