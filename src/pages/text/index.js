import React, { PureComponent, Fragment } from 'react';
import { Button, Card, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';
import './text.less';

class Rich extends PureComponent {

    state = {
        showRichText: false,
        editorContent: '',
        editorState: '',
    };

    handleClearContent = () => {
        this.setState({
            editorState: ''
        })
    }

    handleGetText = () => {
        this.setState({
            showRichText: true
        })
    }

    onContentStateChange = (editorContent) => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <Fragment>
                <Card className='card-wrapper'>
                    <Button type='primary' onClick={this.handleClearContent} style={{ marginRight: 10 }}>清空内容</Button>
                    <Button type='primary' onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title='富文本编辑器' className='card-wrapper'>
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onContentStateChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={() => {
                        this.setState({
                            showRichText: false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(this.state.editorContent)}
                </Modal>
            </Fragment>
        );
    }
}

export default Rich;