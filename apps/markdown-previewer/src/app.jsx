const { IconButton } = window["material-ui"];

function Editor(props) {
  return (
    <section
      id="editor"
      className={
        props.minimized ? "hidden" : props.fullscreen ? "maximized" : ""
      }
    >
      <header>
        <h1>Editor</h1>
        <IconButton
          className="material-icons"
          onClick={e => props.onExpandClick(e, "editor")}
        >
          {props.fullscreen ? "fullscreen_exit" : "fullscreen"}
        </IconButton>
      </header>
      <textarea
        cols="30"
        value={props.editorText}
        onChange={props.onInputChange}
      />
    </section>
  );
}

function Preview(props) {
  return (
    <section
      id="preview"
      className={
        props.minimized ? "hidden" : props.fullscreen ? "maximized" : ""
      }
    >
      <header>
        <h1>Preview</h1>
        <IconButton
          className="material-icons"
          onClick={e => props.onExpandClick(e, "preview")}
        >
          {props.fullscreen ? "fullscreen_exit" : "fullscreen"}
        </IconButton>
      </header>
      <div id="output" dangerouslySetInnerHTML={{ __html: props.parsedText }} />
    </section>
  );
}

class MarkdownApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rawText: INITIAL_MARKDOWN, elementExpanded: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleInputChange(e) {
    this.setState({ rawText: e.target.value });
  }

  handleExpandClick(e, section) {
    const elementExpanded = this.state.elementExpanded;
    this.setState({
      elementExpanded: elementExpanded === section ? "" : section
    });
  }

  render() {
    const rawText = this.state.rawText;
    const elementExpanded = this.state.elementExpanded;
    return (
      <div>
        <Editor
          onInputChange={this.handleInputChange}
          editorText={rawText}
          minimized={elementExpanded === "preview"}
          fullscreen={elementExpanded === "editor"}
          onExpandClick={this.handleExpandClick}
        />
        <Preview
          parsedText={marked(rawText)}
          minimized={elementExpanded === "editor"}
          fullscreen={elementExpanded === "preview"}
          onExpandClick={this.handleExpandClick}
        />
      </div>
    );
  }
}

const INITIAL_MARKDOWN = `
# Quesadillas with Guacamole

![Quesadillas with guacamole](https://c1.staticflickr.com/5/4023/4308368180_7a2f817518_b.jpg)

photo by [Robert](https://www.flickr.com/photos/rdpeyton/)

## Ingredients
* 1/4 *Oaxaca* cheese
* 4 Tortillas
* 1 Avocado
* 1 Tomato
* 1 Lemon
* 1/4 Onion
* Salt

## Instructions
1. Fill your tortillas with shredded cheese and fold them forming a half-moon shape.
2. Cook them over a large pan with moderate heat. Try to get a crusty, brown surface on your quesadillas.
3. While the quesadillas are being cooked, you can start preparing the guacamole. Slice your onion and tomato in small squares.
4. Take out the flesh of the avocado and smash with a spoon or fork in a bowl.
5. Mix the smashed avocado, onion and tomato in the bowl. Add lemon juice and salt.
6. Put some guacamole in each quesadilla and enjoy!

> The name 'guacamole' comes from the nahuatl 'Ahuacamolli' [\`aːwakaˈmolːi\`] which literally translates to 'avocado sauce'

**Nutritional value per 100g of Avocado:**
\`\`\`
Energy          160kcal
Carbohydrates   8.53g
Fat             14.66g
Protein         2.00g
\`\`\`
`;

const APP_CONTAINER = document.querySelector("#app");
ReactDOM.render(<MarkdownApp />, APP_CONTAINER);
