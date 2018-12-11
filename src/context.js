import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'SEARCH_TRACKS':
            return { 
                ...state,
                track_list: action.payload,
                heading: 'Search Results'
            }
        default:
            return state;
    }
}

// Our Provider where we hold the state that we will be sharing
export class Provider extends Component {
    state = {
        track_list: [],
        heading: "Top 10 Tracks Baby",
        dispatch: action => this.setState(state => reducer(state, action))
    }
    
    componentDidMount = async () => {
        let response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`);

        let parsedResponse = await response.json();

        this.setState({
            track_list: parsedResponse.message.body.track_list
        })
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