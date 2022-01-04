class CustomTimer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.initSeconds = this.currentSeconds = this.parseTimeAttribute();
    this.running = false;
    this.timerIntervalID = null;

    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");
    wrapper.innerHTML = `
    <span class="display"><span>
    `;

    const style = document.createElement("style");
    style.textContent = `
     .running {
       color: red;
     }
    `;
    this.shadowRoot.append(style, wrapper);
  }

  static get observedAttributes() {
    return ["time"];
  }

  parseTimeAttribute() {
    const timeString = this.getAttribute("time");
    const minutes = timeString.match(/(\d+)m/) || 0;
    const seconds = timeString.match(/(\d+)s/) || 0;
    return parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
  }
  render() {
    this.shadowRoot
      .querySelector(".wrapper")
      .classList.toggle("running", this.running);

    const display = this.shadowRoot.querySelector(".display");
    let displayMinutes = Math.floor(this.currentSeconds / 60).toString();
    let displaySeconds = (this.currentSeconds % 60).toString();

    display.textContent = `${displayMinutes.padStart(
      2,
      "0"
    )}:${displaySeconds.padStart(2, "0")}`;
    console.log("rendered!");
  }
  start() {
    this.dispatchEvent(new Event("timer-started"));
    this.timerIntervalID = setInterval(() => {
      this.running = true;
      this.tick();
    }, 1000);
  }
  stop() {
    this.currentSeconds = this.initSeconds;
    clearInterval(this.timerIntervalID);
    this.running = false;
    this.render();
  }
  tick() {
    if (this.currentSeconds <= 0) {
      this.dispatchEvent(new Event("timer-finished"));
      this.stop();
      return;
    }
    this.currentSeconds--;
    this.render();
  }
  attributeChangedCallback() {
    this.initSeconds = this.parseTimeAttribute();
    this.stop();
  }
  connectedCallback() {
    console.log("element has been connected");
    this.render();
  }
}

customElements.define("custom-timer", CustomTimer);
