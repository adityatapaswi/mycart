import React from 'react'
import {
    Image, Card, Icon, Label
} from 'semantic-ui-react'
import avatar from '../images/square-image.png'
import { withRouter } from "react-router-dom";

class CatergoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: '',
            category: props.category,
            menuItems: [
                {
                    name: 'home',
                    link: '/home',
                },
                {
                    name: 'dashboard',
                    link: '/dashboard',
                }
            ]
        }



    }

    handleItemClick({ name, link }) {
        this.props.history.push(link);
        this.setState({ activeItem: name })
    }
    goToProducts(category) {
        this.props.history.push('/products/'+category.id);
        // this.setState({ activeItem: name })
    }

    render() {
        let { category } = this.state;
        return (
            <Card onClick={() => {
                this.goToProducts(category)
            }}>
                <Image src={avatar} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{category.name}</Card.Header>
                    <Card.Meta></Card.Meta>
                    <Card.Description>
                        {category.description}
              </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label>
                        <Icon name='numbered list' />
                {category.no_of_items} items
              </Label>
                </Card.Content>
            </Card>
        )
    }
}

export default withRouter(CatergoryCard);