import React, { Component } from 'react';
import API from "./Api";
import MovieDetail from "./MovieDetail";

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '3094e4a280079075a026f659b0389e17',
            baseImageUri: "http://image.tmdb.org/t/p/w185_and_h278_bestv2/",
            movieQuery: "",
            movieData: []

        }
        this.getMovieListContent = this.getMovieListContent.bind(this);
        this.getMovieListContent();
    }

    getMovieListContent() {
        $("body").css("cursor", "wait");
        API.get(this.props.query + "&api_key=" + this.state.apiKey).then((response) => {
            this.setState({
                movieQuery: this.props.query,
                movieData: response.data.results
            });
            $("body").css("cursor", "default");
        })
        .catch(function (error) {
            console.log(error);
            alert("Failed to get content");
            $("body").css("cursor", "default");
        });
    }

    render() {
        let items = "";
        if (this.props.query != this.state.movieQuery) {
            this.getMovieListContent();
        }
        else {
            items = this.state.movieData.map(d => {
                if ((d.poster_path != null) && (d.poster_path != "")) {
                    return (
                        <div className={(this.props.listType == 'horizontal') ? 'listItem' : 'listItemV'} key={d.id}>
                            <MovieDetail data={d} baseImageUri={this.state.baseImageUri} />
                        </div>
                    );
                }
            });
        }
        return (
            <div>
                {(this.props.listType == 'horizontal') ? (<div className="listTitle">{this.props.listTitle}</div>) : ""}
                <div>
                    {/* horizontal or vertical list of movies */}
                    <div className={(this.props.listType == 'horizontal')?'movieListH':'movieListV'}>
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}


export default MovieList;