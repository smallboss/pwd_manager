import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

export default class ModalDialog extends Component {

    constructor(props) {
        super(props);

        this.editRss = this.editRss.bind(this);
    }


    componentDidUpdate(){
        if(!this.props.errorText)
            this.channelRssInput.value = this.props.channelRss;
    }


    editRss(){
        this.props.edit(this.channelRssInput.value);
    }


    render(){

        const { show, hideModal, title, errorText, channelRss, edit } = this.props;


        const renderModalBody = () => {
            if(errorText) return (<h4>{errorText}</h4>);

            return (
                <input type="text" className="form-control"
                       ref={input => this.channelRssInput = input} />
            )
        };


        const renderModalFooter = () => {
            const closeButton = (<button className='btn btn-default' onClick={hideModal}>
                Close
            </button>);

            const editButton = (<button className='btn btn-primary' onClick={this.editRss}>
                Edit
            </button>);

            return (
                <div>
                    { closeButton }
                    { errorText ? null : editButton }
                </div>
            )
        };


        return(
            <Modal isOpen={show} onRequestHide={hideModal}>
                <ModalHeader>
                    <ModalClose onClick={hideModal}/>
                    <ModalTitle>{title}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    { renderModalBody() }
                </ModalBody>
                <ModalFooter>
                    { renderModalFooter() }
                </ModalFooter>
            </Modal>
        )
    }
}
