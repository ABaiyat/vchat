import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
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
        this.stomp.connect({}, () => {
            console.log("CONNECTED");
            this.stomp.subscribe('/topic/greetings', (greeting) => {
                const message = JSON.parse(greeting.body);
                this.setState({greeting: message.content});
            });
        })
    }

    handleButton = () => {
        console.log("CLICKED");
        if (this.state.input !== "") {
            this.stomp.send("/app/welcome", {}, JSON.stringify({name: this.state.input}));
        }
    }

    handleChange = (event) => {
        this.setState({input: event.target.value})
    }

    render() {
        const greeting = this.state.greeting;
        return (
            <div>
                <h1>Welcome</h1>
                <h2>{greeting}</h2>
                <Input value={this.state.input} onChange={this.handleChange} placeholder="Enter your Name..."/>
                <Button onClick={this.handleButton}>Submit</Button>
            </div>

        )
    }
}

export default Welcome;