var cw = new Cottonwood("test.json", "#output", "#input");

describe("Cottonwood", () => {
  it("should be initiated with the dialog path, output location & input location", () => {
    expect(cw.dialogPath).toEqual("test.json");
    expect(cw.outLoc).toEqual("#output");
    expect(cw.inLoc).toEqual("#input");
  });

  it("should load the dialog", (done) => {
    cw.loadDialog(() => {
      expect(cw.dialog[0].statement).toEqual("You can choose three options");
      done();
    });
  });

  it("can get the value of the output element", () => {
    expect(cw.outLocVal).toEqual("output");
  });

  it("can set the value of the output element", () => {
    cw.outLocVal = "Foobar";
    expect(cw.outLocVal).toEqual("Foobar");
  });

  it("can get the value of the input ul as an object array", () => {
    expect(cw.inLocVal).toEqual([{
      response: "Some option",
      endPoint: "1",
      run: "console.log('hello world');"
    }]);
  });

  it("can set the value of the input as a ul from object array", () => {
    cw.inLocVal = [{
      response: "Foo option",
      endPoint: "2",
      run: "console.log('foobar');"
    }];
    expect(cw.inLocVal).toEqual([{
      response: "Foo option",
      endPoint: "2",
      run: "console.log('foobar');"
    }]);
  });

  it("should get an option at a point, and run a points script", (done) => {
    cw.loadDialog(() => {
      cw.setPoint("0");
      expect(cw.outLocVal).toEqual("You can choose three options");
      expect(document.querySelector("#test").innerText).toEqual("Entry script ran");
      done();
    });
  });

  it("should go to the point when the option is clicked", () => {
    cw.inLocVal = [{
      response: "Option",
      endPoint: "1",
      run: "document.querySelector('#test').innerText = 'Click script ran'"
    }];

    var option = document.querySelector("#input li a");
    cw.dialog = [{
      point: "0",
      statement: "Hello world",
      options: [{
        response: "Click me",
        endPoint: "1"
      }]
    }, {
      point: "1",
      statement: "I've been clicked",
      options: [{
        response: "Neat",
        endPoint: "0"
      }]
    }];

    option.click();

    expect(cw.outLocVal).toEqual("I've been clicked");
    expect(cw.inLocVal).toEqual([{
      response: "Neat",
      endPoint: "0"
    }]);
    expect(document.querySelector("#test").innerText).toEqual("Click script ran");
  });
});
