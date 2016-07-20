// modules
var commitStream = require('./src/commitStream');

// implementation
var commit$ = commitStream.create();

commit$.addListener({
  next: function (value) {
    console.log(
      JSON.stringify(value, null, 2)
    );
  },
  error: function () {},
  complete: function () {}
});
