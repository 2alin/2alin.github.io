function Editor(props) {
  return (
    <div id="editor">
      <h2>Editor</h2>
      <textarea
        cols="30"
        rows="10"
        value={props.editorText}
        onChange={props.onInputChange}
      />
    </div>
  );
}

function Preview(props) {
  return (
    <div id="preview">
      <h2>Preview</h2>
      <div id="output" dangerouslySetInnerHTML={{__html: props.parsedText}} />
    </div>
  );
}

class MarkdownApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rawText: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({ rawText: e.target.value });
  }

  render() {
    const rawText = this.state.rawText;
    return (
      <div>
        <Editor
          onInputChange={this.handleInputChange}
          editorText={rawText}
        />
        <Preview parsedText={marked(rawText)}/>
      </div>
    );
  }
}




const APP_CONTAINER = document.querySelector("#app");
ReactDOM.render(<MarkdownApp />, APP_CONTAINER);
