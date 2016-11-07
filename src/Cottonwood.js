class Cottonwood {
  constructor(dialogPath, outLoc, inLoc) {
    this.dialogPath = dialogPath;
    this.outLoc = outLoc;
    this.inLoc = inLoc;
    this.dialog = null;

    document.addEventListener("click", (e) => {
      if (e.target.className === "cw-option") {
        this.setPoint(e.target.dataset.point);
      }
    });
  }

  loadDialog(cb) {
    var request = new XMLHttpRequest();
    request.open("GET", this.dialogPath, true);
    request.send();
    request.addEventListener("load", () => {
      if (request.status >= 200 && request.status < 400) {
        this.dialog = JSON.parse(request.responseText);
        cb();
      } else {
        console.log("Failed to load dialog");
      }
    });
  }

  get outLocVal() {
    return document.querySelector(this.outLoc).innerText;
  }

  set outLocVal(value) {
    return document.querySelector(this.outLoc).innerText = value;
  }

  get inLocVal() {
    var input = document.querySelector(this.inLoc).children;
    var inputOptions = [];

    for (var i = 0; i < input.length; i++) {
      var inputOption = {
        response: input[i].children[0].innerText,
        endPoint: input[i].children[0].dataset.point
      }
      if (input[i].children[0].getAttribute("onclick")) {
        inputOption.run = input[i].children[0].getAttribute("onclick")
      }
      inputOptions.push(inputOption);
    }

    return inputOptions;
  }

  set inLocVal(options) {
    var inputLocation = document.querySelector(this.inLoc);
    inputLocation.innerHTML = "";

    options.forEach((option) => {
      var inputItem = document.createElement("li");
      var inputOption = document.createElement("a");

      inputOption.innerText = option.response;
      inputOption.className = "cw-option";
      inputOption.dataset.point = option.endPoint;

      if (option.run) {
        inputOption.setAttribute("onclick", option.run);
      }

      inputItem.appendChild(inputOption);
      inputLocation.appendChild(inputItem);
    });
  }

  setPoint(point) {
    var endPoint = this.dialog.filter((obj) => {
      return obj.point == point;
    });
    eval(endPoint[0].run);
    this.outLocVal = endPoint[0].statement;
    this.inLocVal = endPoint[0].options;
  }
}
