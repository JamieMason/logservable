// 3rd party modules
var spawn = require('child_process').spawn;

// public
module.exports = {
  read: read
};

function read (fields) {
  var process = spawn('git', [
    'log',
    '--pretty=format:<commit>' + fields.map(toNode).join('') + '</commit>',
    '--author-date-order'
  ]);
  process.stdout.setEncoding('utf8');
  process.stderr.setEncoding('utf8');
  return process;
}

function toNode (field) {
  return '<name>placeholder</name>'
    .replace(/name/g, field.name)
    .replace(/placeholder/g, field.placeholder);
}
