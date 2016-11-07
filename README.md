Cottonwood
==========

Cottonwood is an engine for making dialog trees using javascript.

Cottonwood makes use of [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), and as such will only work on Chrome 42+, Firefox 45+, Edge 13+, Safari 9+, and does not work on IE or Opera.

##Using
To use cottonwood, you need to first have an array of objects (in javascript or JSON file).

That would look like this:

```json
[{
  "point": "0",
  "statement": "Hello World",
  "run": "console.log('foobar')",
  "options": [{
    "response": "Option 1",
    "endPoint": "1"
  }, {
    "response": "Option 2",
    "endPoint": "2",
    "run": "someFunction();"
  }]
}]
```

Here is what these items do in a bit more detail. The only one really necessary is`point`.

* `point`: The number of the option. Any format you want should work, but I like X.X.X where each X is a number deeper.
* `statement`: What will be said for the user to respond to.
* `run`: Javascript that can be ran. If this is in a point, it will be done when the point is loaded, regardless of how it got to that point (this is also done using eval()). If it is in an option, it will be executed when the option is clicked (and is done by an onclick attribute).
* `options`: Another array of objects, these are the options a user can select.
* `response`: What the text for an option will say.
* `endPoint`: What point you want selecting that option to go to.

Once you have your dialog, you can add these elements somewhere in your html:

```html
<div>
  <p id="cw-output"></p>
</div>

<div>
  <ul id="cw-input">
  </ul>
</div>
```

The output can have any ID, or class, or be any tag. All that matters is that it's unique, and it shows text.

It's a bit more strict with the input. You can use any unique class or ID, but it needs to be able to have `li` as children (i.e. `ul` or `ol`).

Now in your javascript you would add something like this:

```javascript
var cw = new Cottonwood("path-to-dialog.json", "#cw-output", "#cw-input");
cw.loadDialog(() => {
  cw.setPoint("0");
});
```

This would have ran the `console.log()`, and made our elements look like so:

```html
<div>
  <p id="cw-output">Hello World</p>
</div>

<div>
  <ul id="cw-input">
    <li><a data-point="1" class="cw-option">Option 1</a></li>
    <li><a data-point="2" class="cw-option" onclick="someFunction()">Option 2</a></li>
  </ul>
</div>
```

###Methods

* `new Cottonwood(dialogPath, outLoc, inLoc)`: Takes a path to the JSON file of dialog (note: if you want to use javascripts objects to use one file, set this to null and set the dialog property to your object).
  * Those variables are also properties of the class, so you should be able to access them or change them like a normal.
* `loadDialog()`: Loads the dialog from from the path given through the dialogPath property.
  * The JSON is parsed and stored in the property `dialog`, which you can modify or set yourself.
* `outLocVal`: When ran as a getter (i.e. just `cw.outLocVal`), it gets the text for the element you set as your output. When ran as a setter (i.e. `cw.outLocVal = value`), it sets the value as text.
* `inLocVal`: When ran as getter it returns an array of objects with the properties of `response`, `endPoint`, and `run` (as a string). When ran as a setter it takes an array of objects with the previously mentioned values, it turns each object into `<li><a data-point="X" class="cw-option" onclick="js if run was defined">Response</a></li>`.
* `setPoint(point)`: Selects a point and sets the output and input options (note: point needs to be the same type as your JSON. If you put it as a string, it must be a string, and same with numbers).

##License
The MIT License (MIT)

Copyright (c) 2016 Nate Rauh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
