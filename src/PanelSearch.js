import React, { Component } from 'react';
import API from './Api';
import MovieList from './MovieList';

class PanelSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.getListDisplay = this.getListDisplay.bind(this);
    }



    getListDisplay() {
        let display = "";
        switch (this.props.panelType) {
            case "explore":
                display = <div><MovieList listType='horizontal' listTitle='Most Popular Movies' dataType='discover' query='/discover/movie?sort_by=popularity.desc' />
                    <MovieList listType='horizontal' listTitle='Recent Movies' dataType='discover' query='/discover/movie?primary_release_date.gte=2018-06-30' />
                    <MovieList listType='horizontal' listTitle='Top Rated Movies' dataType='discover' query='/discover/movie?sort_by=vote_average.desc' />
                </div>;
                break;
            default:
                display = <div><MovieList listType='vertical' listTitle='Most Popular' dataType='discover' query='/discover/movie?sort_by=popularity.desc' /></div>;
                break;
        }
        return display;
    }

    render() {

        return (
            <div>
                <div>
                    {/* filters/search criteria */}
                </div>
                <div>
                    {/* lists - multiple horizontal lists or one vertical list */}
                    {this.getListDisplay()}
                </div>
            </div>
        );
    }
}

export default PanelSearch;