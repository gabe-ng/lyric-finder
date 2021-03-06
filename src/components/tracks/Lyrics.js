import React, { Component } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;

        let fetchLyrics = await fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`);

        let fetchTrack = await fetch(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`);


        let lyrics = await fetchLyrics.json();
        let track = await fetchTrack.json();

        this.setState({
            track: track.message.body.track,
            lyrics: lyrics.message.body.lyrics
        })
    }
    
    render() {
        const { track, lyrics } = this.state;

        if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
            return <Spinner />
        } else {
            return <React.Fragment>
                <Link to="/lyric-finder" className="btn btn-dark btn-sm mb-4">
                  Go Back
                </Link>
                <div className="card">
                  <h5 className="card-header">
                    {track.track_name} by <span className="text-secondary">
                      {track.artist_name}
                    </span>
                  </h5>
                  <div className="card-body">
                    <p className="card-text">
                      {lyrics.lyrics_body}
                    </p>
                  </div>
                </div>

                <ul className="list-group mt-3">
                  <li className="list-group-item">
                    <strong>Album ID</strong>: {track.album_id}
                  </li>
                  <li className="list-group-item">
                    <strong>Explicit Words</strong>: {track.explicit === 0 ? "No" : "Yes"}
                  </li>
                  <li className="list-group-item">
                    <strong>Release Date</strong>: <Moment format="MM/DD/YYYY">
                      {track.first_release_date}
                    </Moment>
                  </li>
                </ul>
              </React.Fragment>;
        }
    }
}

export default Lyrics;
