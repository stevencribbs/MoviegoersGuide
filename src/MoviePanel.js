import React, { Component } from 'react';
import API from './Api';
import MovieList from './MovieList';

class MoviePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.initListDisplay = this.initListDisplay.bind(this);
        this.getListDisplay = this.getListDisplay.bind(this);
    }

    initListDisplay() {
        return this.getListDisplay("");
    }

    getListDisplay(query) {
        let display = "";
        switch (this.props.moviePanelType) {
            case "explore":
                display = <div>
                    <MovieList listType='horizontal' listTitle='Now Playing' dataType='discover' query='/discover/movie?primary_release_date.gte=2018-09-01' />
                    <MovieList listType='horizontal' listTitle='Most Popular Movies' dataType='discover' query='/discover/movie?sort_by=popularity.desc' />
                    <MovieList listType='horizontal' listTitle='Top Rated Movies' dataType='discover' query='/discover/movie?sort_by=vote_average.desc' />
                </div>;
                break;
            default:
                display = <div><MovieList listType='vertical' listTitle='Most Popular' dataType='discover' query={(query != "") ? query : '/discover/movie?primary_release_date.gte=2018-09-01'} /></div>;
                break;
        }
        return display;
    }

    render() {

        return (
            <div>
                <div>
                    {/* lists - multiple horizontal lists or one vertical list */}
                    { this.initListDisplay() }
                </div>
            </div>
        );
    }
}

export default MoviePanel;