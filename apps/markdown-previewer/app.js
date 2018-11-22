var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Editor(props) {
  return React.createElement(
    "div",
    { id: "editor" },
    React.createElement(
      "h2",
      null,
      "Editor"
    )
  );
}

function Preview(props) {
  return React.createElement(
    "div",
    { id: "preview" },
    React.createElement(
      "h2",
      null,
      "Preview"
    )
  );
}

var MarkdownApp = function (_React$Component) {
  _inherits(MarkdownApp, _React$Component);

  function MarkdownApp() {
    _classCallCheck(this, MarkdownApp);

    return _possibleConstructorReturn(this, (MarkdownApp.__proto__ || Object.getPrototypeOf(MarkdownApp)).apply(this, arguments));
  }

  _createClass(MarkdownApp, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Editor, null),
        React.createElement(Preview, null)
      );
    }
  }]);

  return MarkdownApp;
}(React.Component);

var APP_CONTAINER = document.querySelector("#app");
ReactDOM.render(React.createElement(MarkdownApp, null), APP_CONTAINER);