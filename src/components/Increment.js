import React from 'react'
import {
    Icon, Button, Label
} from 'semantic-ui-react'
// import avatar from '../images/square-image.png'
import { toast } from 'react-toastify';
// import { withRouter } from "react-router-dom";

export default class Increment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
    }

    handleCounterChange(dir) {
        let newVal
        if (dir === 'up') {
            newVal = this.state.current + 1
            if (newVal > this.props.available) {
                toast.error("Max available reached")
                return;
            }
        }
        else {
            newVal = this.state.current - 1
            if (newVal < 0) {
                return;
            }
        }
        this.setState({ current: newVal });
        this.props.updateItemCount(newVal)
    }
    goToProducts() {
        this.props.history.push('/products/1');
        // this.setState({ activeItem: name })
    }

    render() {
        let { current } = this.state
        return (
            <div>

                <Button icon onClick={() => this.handleCounterChange('down')}>
                    <Icon name='minus' />
                </Button>
                <Label circular color='teal' className="mt-5">{current}</Label>
                <Button icon onClick={() => this.handleCounterChange('up')}>
                    <Icon name='plus' />
                </Button>

            </div>
        )
    }
}

// export default withRouter(Increment);