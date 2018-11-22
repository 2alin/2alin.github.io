function Editor(props) {
  return (
    <div id="editor">
      <h2>Editor</h2>
    </div>
  );
}

function Preview(props) {
  return (
    <div id="preview">
      <h2>Preview</h2>
    </div>
  );
}


class MarkdownApp extends React.Component {
  render() {
    return (
      <div>
        <Editor />
        <Preview />
      </div>
    );
  }
}

const APP_CONTAINER = document.querySelector("#app");
ReactDOM.render(<MarkdownApp />, APP_CONTAINER);
