import React, { Component } from 'react';
import API from './Api';
import MovieList from './MovieList';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryYear: 0,
            queryRating: 0,
            queryGenre: "",
            query: ""
        }
        this.getListDisplay = this.getListDisplay.bind(this);
        this.showMovies = this.showMovies.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
    }

    getListDisplay() {
        const query = this.state.query;
        let display = "";
        switch (this.props.panelType) {
            case "explore":
                display = <div>
                        <MovieList listType='horizontal' listTitle='Now Playing' dataType='discover' query='/movie/now_playing?language=en-US&page=1' />
                        <MovieList listType='horizontal' listTitle='Most Popular Movies' dataType='discover' query='/discover/movie?sort_by=popularity.desc' />
                        <MovieList listType='horizontal' listTitle='Top Rated Movies' dataType='discover' query='/movie/top_rated?language=en-US&page=1' />
                        </div>;
                break;
            default:
                display = <div><MovieList listType='vertical' listTitle='Most Popular' dataType='discover' query={(query != "") ? query : '/discover/movie?primary_release_date.gte=2018-09-01'} /></div>;
                break;
        }
        return display;
    }

    handleDDClick(mode, e) {
        e.preventDefault();
        $("#filterGenreBtn").html(mode);
    }

    handleSortClick(sort, e) {
        e.preventDefault();
        $("#filterSortBtn").html(sort);
    }

    showMovies() {
        let qGenre = $("#filterGenreBtn").html();
        let qYear = $("#filterYearInput").val();
        let qSortby = $("#filterSortBtn").html();
        
        let genreId = 0;
        switch (qGenre) {
            case "Action":
                genreId = 28;
                break;
            case "Adventure":
                genreId = 12;
                break;
            case "Animation":
                genreId = 16;
                break;
            case "Comedy":
                genreId = 35;
                break;
            case "Crime":
                genreId = 80;
                break;
            case "Documentary":
                genreId = 99;
                break;
            case "Drama":
                genreId = 18;
                break;
            case "Family":
                genreId = 10751;
                break;
            case "Fantasy":
                genreId = 14;
                break;
            case "History":
                genreId = 36;
                break;
            case "Mystery":
                genreId = 9648;
                break;
            case "Romance":
                genreId = 10749;
                break;
            case "Science Fiction":
                genreId = 878;
                break;
            case "Thriller":
                genreId = 53;
                break;
            case "War":
                genreId = 10752;
                break;
            case "Western":
                genreId = 37;
                break;
        }

        let sortPhrase = "";
        switch (qSortby) {
            case "Popularity":
                sortPhrase = "popularity.desc";
                break;
            case "User Rating":
                sortPhrase = "vote_average.desc";
                break;
            case "Revenue":
                sortPhrase = "revenue.desc";
                break;
            case "Release Date":
                sortPhrase = "release_date.desc";
                break;
            case "Original Title":
                sortPhrase = "original_title.desc";
                break;
        }
        
        let newQuery = "/discover/movie?";
        let append = false;
        if (qYear > 0) { newQuery += "primary_release_year=" + qYear.toString(); append = true; }
        if (sortPhrase != "") {
            if (append) { newQuery += "&"; }
            newQuery += "sort_by=" + sortPhrase;
            append = true;
        }
        else { qSortby = "";}
        if (genreId > 0) {
            if (append) { newQuery += "&"; }
            newQuery += "with_genres=" + genreId.toString();
            append = true;
        }
        else { qGenre = "";}

        if (append) { //we do have at least one search parameter set
            this.setState({
                queryYear: qYear,
                querySortby: qSortby,
                queryGenre: qGenre,
                query: newQuery
            });
        }
    }

    searchMovies() {
        let queryVal = $("#searchInput").val();
        if (queryVal != "") {
            let newQuery = "/search/movie?query=" + queryVal + "&page1";
            this.setState({
                queryYear: 0,
                querySortby: "",
                queryGenre: "",
                query: newQuery
            });
        }
    }

    render() {
        
        return (
            <div>
                <div>
                    {/* filters/search criteria */}
                    {(this.props.panelType == "search")?(
                        <div className="searchTools">
                            <div className="filterTools">
                                <div className="filterToolsA mt-2 mb-2">
                                <div className="filterTool">
                                    <input id="filterYearInput" className="form-control" style={{ width: '150px', display: 'inline-block' }} type="number" placeholder="Year" aria-label="Year" title="A blank or zero value will leave the year out of the search" />
                                </div>
                                <div className="filterTool">
                                    <div className="btn-group">
                                        <button type="button" id="filterSortBtn" className="btn btn-primary btn-block dropdown-toggle px-4 btn-sm" style={{ 'fontSize': '.90rem' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Sort By
                                    </button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" onClick={(e) => this.handleSortClick("None", e)} >None</a>
                                                <a className="dropdown-item" onClick={(e) => this.handleSortClick("Popularity", e)} >Popularity</a>
                                                <a className="dropdown-item" onClick={(e) => this.handleSortClick("User Rating", e)} >User Rating</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleSortClick("Revenue", e)} >Revenue</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleSortClick("Release Date", e)} >Release Date</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleSortClick("Original Title", e)} >Original Title</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="filterTool">
                                    <div className="btn-group">
                                        <button type="button" id="filterGenreBtn" className="btn btn-primary btn-block dropdown-toggle px-4 btn-sm" style={{ 'fontSize': '.90rem' }} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Genre
                                        </button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("None", e)} >None</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Action", e)} >Action</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Adventure", e)} >Adventure</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Animation", e)} >Animation</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Comedy", e)} >Comedy</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Crime", e)} >Crime</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Documentary", e)} >Documentary</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Drama", e)} >Drama</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Family", e)} >Family</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Fantasy", e)} >Fantasy</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Mystery", e)} >Mystery</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Romance", e)} >Romance</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Science Fiction", e)} >Science Fiction</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Thriller", e)} >Thriller</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("War", e)} >War</a>
                                            <a className="dropdown-item" onClick={(e) => this.handleDDClick("Western", e)} >Western</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="filterToolsB mt-2 mb-2">
                                <div className="form-inline">
                                    <button type="button" id="filterShowBtn" className="btn btn-primary btn-block px-4 btn-sm" style={{ width: '180px', 'fontSize': '.90rem' }} aria-haspopup="true" aria-expanded="false" onClick={this.showMovies}>
                                        Show Movies
                                    </button>
                                </div>
                            </div>
                            <div className="filterToolsC mt-2 mb-2">
                                <div className="form-inline">
                                    <input id="searchInput" className="form-control form-control-sm ml-3 w-60 mr-3" type="text" placeholder="Search" aria-label="Search" />
                                    <button type="button" id="searchShowBtn" className="btn btn-primary btn-block px-4 btn-sm" style={{ width: '180px', 'fontSize': '.90rem' }} aria-haspopup="true" aria-expanded="false" onClick={this.searchMovies}>
                                        Search Movies
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
                    ):""}
                </div>
                <div>
                    {/* lists - multiple horizontal lists or one vertical list */}
                    { this.getListDisplay() }
                </div>
            </div>
        );
    }
}

export default Panel;