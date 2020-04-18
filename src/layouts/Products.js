import React, { createRef } from 'react'
import TopBar from '../components/TopBar'
import ProductCard from '../components/ProductCard'
// import src from '../images/square-image.png'
import { Card, Sticky, Header } from 'semantic-ui-react';
import FilterSortBar from '../components/FilterSortBar';

export default class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            catProducts: [],
            allProducts: [],
            sortOptions: [{ key: 'A-Z', text: 'A-Z', value: 'A-Z' },
            { key: 'Z-A', text: 'Z-A', value: 'Z-A' },
            { key: 'Price Low-High', text: 'Price Low-High', value: 'Price Low-High' },
            { key: 'Price High-Low', text: 'Price High-Low', value: 'Price High-Low' }
            ],
            sellerOptions: [],
            filtersAndSort: {
                search: '',
                seller: [],
                minPrice: 0,
                maxPrice: 0,
                sort: ''
            }
        }


    }
    updateFiltersAndSort(key, value) {
        let filtersAndSort = this.state.filtersAndSort;
        filtersAndSort[key] = value
        this.setState({ filtersAndSort: filtersAndSort })
        this.sortAndFilterProducts();
    }
    sortAndFilterProducts() {
        let catProducts = this.state.catProducts;
        let filters = this.state.filtersAndSort;
        if (filters.search.length) {
            catProducts = catProducts.filter(x => x.name.toUpperCase().includes(filters.search.toUpperCase()))
        }
        if (filters.seller.length) {
            catProducts = catProducts.filter(x => filters.seller.indexOf(x.seller) !== -1)
        }
        if (filters.minPrice < filters.maxPrice) {
            catProducts = catProducts.filter(x => x.price >= filters.minPrice && x.price <= filters.maxPrice)
        }
        if (filters.sort.length) {
            let sortOptions = this.state.sortOptions;
            switch (filters.sort) {
                case sortOptions[0].key:
                    catProducts.sort(function (a, b) {
                        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                        if (nameA < nameB) //sort string ascending
                            return -1
                        if (nameA > nameB)
                            return 1
                        return 0 //default return value (no sorting)
                    })
                    break;
                case sortOptions[1].key:
                    catProducts.sort(function (a, b) {
                        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                        if (nameA > nameB) //sort string desc
                            return -1
                        if (nameA < nameB)
                            return 1
                        return 0 //default return value (no sorting)
                    })
                    break;
                case sortOptions[2].key:
                    catProducts.sort(function (a, b) {
                        if (a.price < b.price)
                            return -1
                        if (a.price > b.price)
                            return 1
                        return 0 //default return value (no sorting)
                    })
                    break;
                case sortOptions[3].key:
                    catProducts.sort(function (a, b) {
                        if (a.price > b.price)
                            return -1
                        if (a.price < b.price)
                            return 1
                        return 0 //default return value (no sorting)
                    })
                    break;

                default:
                    break;
            }
        }
        this.setState({ products: catProducts })
    }
    componentDidMount() {
        this.getProducts(this.props)
    }
    getProducts(props) {
        const { categoryId } = props.match.params
        let allProducts = require('../database/products.json')
        let products;
        if (!isNaN(categoryId))
            products = allProducts.filter(x => x.category_id === Number(categoryId))
        else
            products = allProducts;
        let sellerOptions = products.map(x => { return { key: x.seller, text: x.seller, value: x.seller } })
        this.setState({ allProducts: allProducts, products: products, catProducts: products, sellerOptions: sellerOptions })
    }
    componentWillReceiveProps(newProps) {
        this.getProducts(newProps);
    }
    contextRef = createRef()
    render() {
        let { products, sellerOptions, sortOptions, allProducts } = this.state;
        return (
            <div ref={this.contextRef}>
                <TopBar watchCart={true} />
                <Sticky context={this.contextRef}>
                    <FilterSortBar updateFiltersAndSort={this.updateFiltersAndSort.bind(this)} sellerOptions={sellerOptions} sortOptions={sortOptions} productsLength={products.length} allProductsLength={allProducts.length} />
                </Sticky>
                <div className='mt-30'>
                <Header as='h4'>Products</Header>
                    <Card.Group itemsPerRow={1}>
                        {products.map((product, idx) => {
                            return <ProductCard key={idx} product={product} />
                        })}

                    </Card.Group>
                </div>
                {/* <ToastContainer /> */}
            </div>
        )
    }
}
