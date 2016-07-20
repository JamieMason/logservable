// 3rd party modules
var xs = require('xstream').default;

// modules
var fields = require('./fields');
var gitlog = require('./gitlog');

// public
module.exports = {
  create: createCommitStream
};

// implementation
function createCommitStream () {
  return xs.create({
    start: start,
    stop: stop
  });
}

function start (listener) {
  this.process = gitlog.read(fields);
  this.process.stdout.on('data', onData);
  this.process.on('close', onComplete);

  function onData (str) {
    str.split(/\n?<commit>|<\/commit>\n?/g)
      .forEach(parseCommit);
  }

  function parseCommit (line) {
    if (line) {
      listener.next(
        fields.reduce(takeValue, {})
      );
    }

    function takeValue (commit, field) {
      var start = line.indexOf(field.openTag) + field.openTag.length;
      var end = line.indexOf(field.closeTag);
      commit[field.name] = line.substring(start, end).trim();
      return commit;
    }
  }

  function onComplete () {
    listener.complete();
  }
}

function stop () {
  this.process.kill();
}
