import React, { Component } from 'react';

const Context = React.createContext();

// Our Provider where we hold the state that we will be sharing
export class Provider extends Component {
    state = {
        track_list: [
            {
                track: {
                    track_name: "abc"
                }
            },
            {
                track: {
                    track_name: "123"
                }
            },
            {
                track: {
                    track_name: "xyz"
                }
            },
        ],
        heading: "Top 10 Tracks Baby"
    }

    render() {
        return (
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
        )
  }
}

// What we import into our components to access state
// Similar to " Connect " in Redux
export const Consumer = Context.Consumer;