import React from 'react'
import {
    Grid, Dropdown, Input, Label, Header, Segment
} from 'semantic-ui-react'
import { withRouter } from "react-router-dom";

class FilterSortBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sellerOptions: [],
            searchQuery: '',
            sortOptions: props.sortOptions,
            productsLength: 0,
            allProductsLength: 0

        }



    }

    handleItemClick({ name, link }) {
        this.props.history.push(link);
        this.setState({ activeItem: name })
    }
    componentWillReceiveProps(newProps) {
        this.setState({ sellerOptions: newProps.sellerOptions, allProductsLength: newProps.allProductsLength, productsLength: newProps.productsLength })
    }
    handleSearchChange = (e, { value }) => {
        this.setState({ searchQuery: value })
        this.props.updateFiltersAndSort('search', value)
    }
    handleSellerChange = (e, { value }) => {
        // this.setState({ searchQuery: value })
        this.props.updateFiltersAndSort('seller', value)
    }
    handleMinPriceChange = (e, { value }) => {
        // this.setState({ searchQuery: value })
        this.props.updateFiltersAndSort('minPrice', Number(value))
    }
    handleMaxPriceChange = (e, { value }) => {
        // this.setState({ searchQuery: value })
        this.props.updateFiltersAndSort('maxPrice', Number(value))
    }
    handleSortChange = (e, { value }) => {
        // this.setState({ searchQuery: value })
        this.props.updateFiltersAndSort('sort', value)
    }
    render() {
        const { sellerOptions, searchQuery, sortOptions, productsLength, allProductsLength } = this.state
        return (
            <Segment>
                <Grid className="mt-5">
                    <Grid.Column width={3}>
                        <Input icon='search' fluid placeholder='Search...' value={searchQuery} onChange={this.handleSearchChange} />
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Dropdown fluid placeholder='Filter By Seller' multiple
                            search
                            selection
                            onChange={this.handleSellerChange}
                            options={sellerOptions} />
                    </Grid.Column>

                    <Grid.Column width={2}>
                        <Input labelPosition='left' type='number' placeholder='Min Price' className='wd-100' onChange={this.handleMinPriceChange}>
                            <Label basic>₹</Label>
                            <input />

                        </Input>
                    </Grid.Column>
                    <Grid.Column width={2} className='ml-20'>
                        <Input labelPosition='left' type='number' placeholder='Max Price' className='wd-100' onChange={this.handleMaxPriceChange}>
                            <Label basic>₹</Label>
                            <input />

                        </Input>

                    </Grid.Column>
                    <Grid.Column width={2} className='ml-20'>
                        <Dropdown
                            button
                            className='icon'
                            onChange={this.handleSortChange}
                            floating
                            labeled
                            fluid
                            icon='sort'
                            options={sortOptions}
                            search
                            text='Sort By'
                        />

                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Header as='h4' className='pt-11'>Showing {productsLength} products from {allProductsLength}</Header>

                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

export default withRouter(FilterSortBar);