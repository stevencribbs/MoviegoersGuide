import React, { Component } from 'react';
import API from './Api';
import Panel from './Panel';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelMode: "explore"
        }
        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel() {
        if (this.state.panelMode == "explore") {
            this.setState({ panelMode: "search" });
        }
        else {
            this.setState({ panelMode: "explore" });
        }
    }
    
    render() {
        
        return (
            <div className="app">
                <header className="appHeader bg-primary">
                    <label className="appTitle font-weight-normal">The Ultimate Moviegoers Guide</label>
                </header>
                <div className="m-4">
                    <div className="panelTool" onClick={this.togglePanel}><button type="button" className="btn btn-outline-light">{(this.state.panelMode == "explore") ? "Search for Movies" : "Movie Lists Page"}</button></div>
                    <div>
                        <Panel panelType={this.state.panelMode} />
                    </div>

                </div>
            </div>
        );
    }
}


export default App;