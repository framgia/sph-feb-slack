import React from 'react';
import mime from 'mime-types';
import { Modal, Input, Button, Icon } from 'semantic-ui-react';

class FileModal extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      file: null,
      authorized: ['image/jpeg', 'image/png']
    }
  }

  addFile = e => {
    const file = e.target.files[0];

    if (file) {
      this.setState({ file });
    }
  }

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;

    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };

        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  }

  clearFile = () => this.setState({ file: null });

  isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));

  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            onChange={this.addFile}
            label="File Types:jpg,png"
            name="file"
            type="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            inverted
            onClick={this.sendFile}
          >
            <Icon name="checkmark" /> Send
          </Button>

          <Button
            color="red"
            onClick={closeModal}
            inverted
          >
            <Icon name="remove" /> cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;