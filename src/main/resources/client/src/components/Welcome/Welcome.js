import React, { Component } from 'react';
import { Input, Button, Form, Card } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Stomp from 'stomp-websocket';

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            greeting: ""
        }
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        this.stomp = Stomp.client('ws://localhost:8080/socket/websocket');
    }

    handleButton = () => {
        const { input } = this.state;
        if (input !== "") {
            this.stomp.send("/app/welcome", {}, JSON.stringify({name: input}));
            this.props.callback(input);
            const greeting = 'Greetings, ' + input + '!';
            this.setState({greeting});
            this.stomp.disconnect();
            setTimeout(() => {
                this.props.history.push('/rooms');
            }, 500);
        }
    };

    handleChange = (event) => {
        this.setState({input: event.target.value})
    };

    render() {
        return (
            <div className='bodyWrapper'>
                <div className='welcomeBox'>
                    <Card centered>
                        <Card.Content>
                            <h1>Welcome</h1>
                            <Form>
                                <Form.Field>
                                    <Input value={this.state.input} onChange={this.handleChange} placeholder="Enter your Name..."/>
                                </Form.Field>
                                <Form.Field>
                                    <Button color='teal' fluid onClick={this.handleButton}>Submit</Button>
                                </Form.Field>
                            </Form>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);