import React from 'react';
import { Container, Modal, ModalBody, ModalHeader } from 'mdbreact';


class ModalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieModal: false
        };
        //this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            movieModal: !this.state.movieModal
        });
    }

    render() {
        return (
            <Container>
                <img className="listImg" src={this.props.baseImageUri + this.props.data.poster_path} title={this.props.data.title} onClick={() => { this.toggle() }} />
                <Modal isOpen={this.state.movieModal} toggle={() => this.toggle()} size="lg">
                    <ModalHeader toggle={() => this.toggle()}></ModalHeader>
                    <ModalBody>
                        <div className="detailContainer">
                            <div className="detailImg"><img src={this.props.baseImageUri + this.props.data.poster_path} /></div>
                            <div className="detailContent">
                                <div className="detailTitle">{this.props.data.title}</div>
                                <div className="detailDate">({this.props.data.release_date.substring(0,4)})</div>
                                <div className="detailOverview">{this.props.data.overview}</div>
                                <div></div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </Container>
        );
    }
}

export default ModalPage;