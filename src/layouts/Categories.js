import React from 'react'
import TopBar from '../components/TopBar'
import CatergoryCard from '../components/CatergoryCard'
import { Card, Header } from 'semantic-ui-react';

export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
        this.state.pathName = this.props.location.pathname;


    }

    componentDidMount() {
        let categories = require('../database/category.json');
        this.setState({ categories: categories });
    }

    render() {
        let { categories } = this.state;
        return (
            <div>
                <TopBar />
                <div className='mt-30'>
                    <Header as='h4'>Product categories</Header>
                    <Card.Group itemsPerRow={6}>
                        {categories.map((category,idx) => {
                            return <CatergoryCard key={idx} category={category} />
                        })}

                    </Card.Group>
                </div>
            </div>
        )
    }
}
