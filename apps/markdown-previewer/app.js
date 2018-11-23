var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Editor(props) {
  return React.createElement(
    "section",
    { id: "editor", className: props.minimized ? "hidden" : "" },
    React.createElement(
      "header",
      null,
      React.createElement(
        "h1",
        null,
        "Editor"
      ),
      React.createElement(
        "button",
        {
          className: "material-icons",
          onClick: function onClick(e) {
            return props.onExpandClick(e, "editor");
          }
        },
        props.fullscreen ? "fullscreen_exit" : "fullscreen"
      )
    ),
    React.createElement("textarea", {
      cols: "30",
      value: props.editorText,
      onChange: props.onInputChange
    })
  );
}

function Preview(props) {
  return React.createElement(
    "section",
    { id: "preview", className: props.minimized ? "hidden" : "" },
    React.createElement(
      "header",
      null,
      React.createElement(
        "h1",
        null,
        "Preview"
      ),
      React.createElement(
        "button",
        {
          className: "material-icons",
          onClick: function onClick(e) {
            return props.onExpandClick(e, "preview");
          }
        },
        props.fullscreen ? "fullscreen_exit" : "fullscreen"
      )
    ),
    React.createElement("div", { id: "output", dangerouslySetInnerHTML: { __html: props.parsedText } })
  );
}

var MarkdownApp = function (_React$Component) {
  _inherits(MarkdownApp, _React$Component);

  function MarkdownApp(props) {
    _classCallCheck(this, MarkdownApp);

    var _this = _possibleConstructorReturn(this, (MarkdownApp.__proto__ || Object.getPrototypeOf(MarkdownApp)).call(this, props));

    _this.state = { rawText: INITIAL_MARKDOWN, elementExpanded: "" };
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleExpandClick = _this.handleExpandClick.bind(_this);
    return _this;
  }

  _createClass(MarkdownApp, [{
    key: "handleInputChange",
    value: function handleInputChange(e) {
      this.setState({ rawText: e.target.value });
    }
  }, {
    key: "handleExpandClick",
    value: function handleExpandClick(e, section) {
      var elementExpanded = this.state.elementExpanded;
      this.setState({
        elementExpanded: elementExpanded === section ? "" : section
      });
    }
  }, {
    key: "render",
    value: function render() {
      var rawText = this.state.rawText;
      var elementExpanded = this.state.elementExpanded;
      return React.createElement(
        "div",
        null,
        React.createElement(Editor, {
          onInputChange: this.handleInputChange,
          editorText: rawText,
          minimized: elementExpanded === "preview",
          fullscreen: elementExpanded === "editor",
          onExpandClick: this.handleExpandClick
        }),
        React.createElement(Preview, {
          parsedText: marked(rawText),
          minimized: elementExpanded === "editor",
          fullscreen: elementExpanded === "preview",
          onExpandClick: this.handleExpandClick
        })
      );
    }
  }]);

  return MarkdownApp;
}(React.Component);

var INITIAL_MARKDOWN = "\n# Quesadillas with Guacamole\n\n![Quesadillas with guacamole](https://c1.staticflickr.com/5/4023/4308368180_7a2f817518_b.jpg)\n\nphoto by [Robert](https://www.flickr.com/photos/rdpeyton/)\n\n## Ingredients\n* 1/4 *Oaxaca* cheese\n* 4 Tortillas\n* 1 Avocado\n* 1 Tomato\n* 1 Lemon\n* 1/4 Onion\n* Salt\n\n## Instructions\n1. Fill your tortillas with shredded cheese and fold them forming a half-moon shape.\n2. Cook them over a large pan with moderate heat. Try to get a crusty, brown surface on your quesadillas.\n3. While the quesadillas are being cooked, you can start preparing the guacamole. Slice your onion and tomato in small squares.\n4. Take out the flesh of the avocado and smash with a spoon or fork in a bowl.\n5. Mix the smashed avocado, onion and tomato in the bowl. Add lemon juice and salt.\n6. Put some guacamole in each quesadilla and enjoy!\n\n> The name 'guacamole' comes from the nahuatl 'Ahuacamolli' [`a\u02D0waka\u02C8mol\u02D0i`] which literally translates to 'avocado sauce'\n\n**Nutritional value per 100g of Avocado:**\n```\nEnergy          160kcal\nCarbohydrates   8.53g\nFat             14.66g\nProtein         2.00g\n```\n";

var APP_CONTAINER = document.querySelector("#app");
ReactDOM.render(React.createElement(MarkdownApp, null), APP_CONTAINER);