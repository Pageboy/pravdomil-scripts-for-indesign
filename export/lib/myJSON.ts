function myJSONparse(string) {
  if(typeof string != 'string') { return {} }
  
  var obj = {};
  var objects = string.split('++\n');
  for(var i = 0; i < objects.length; i++) {
    var keyvalue = objects[i].split('+');
    if(keyvalue[0]) {
      obj[keyvalue[0]] = keyvalue[1]
    }
  }
  
  return obj
}

function myJSONstringify(obj) {
  var string = '';
  for(var key in obj) {
    var value = obj[key];
    if(!value) { value = '' }
    string += key + '+' + value + '++\n'
  }
  
  return string
}
