import React, { Component } from "react";
import "./App.css";
import LoadData from "./LoadData";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    html: null
  };

  onChange = editorState => this.setState({ editorState });

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onSaveBtn = () => {
    const contentState = this.state.editorState.getCurrentContent();
    this.setState(
      {
        html: stateToHTML(contentState)
      },
      () => console.log(this.state.html)
    );
    localStorage.setItem("html", stateToHTML(contentState));
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="Editor">
            <button onClick={this.onBoldClick}>
              <b>B</b>
            </button>
            <button onClick={this.onUnderlineClick}>U</button>
            <button onClick={this.onItalicClick}>
              <i>i</i>
            </button>
            <Editor
              editorState={this.state.editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
            />
            <button onClick={this.onSaveBtn}> Save content </button>
          </div>
        </div>
        <Switch>
          <Route
            path="/load"
            render={() => <LoadData data={this.state.html} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
