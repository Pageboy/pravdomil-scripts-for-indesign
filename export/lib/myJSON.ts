function myJSONparse(string) {
  if(typeof string != "string") { return {} }
  
  let obj = {};
  let objects = string.split("++\n");
  for(let i = 0; i < objects.length; i++) {
    let keyvalue = objects[i].split("+");
    if(keyvalue[0]) {
      obj[keyvalue[0]] = keyvalue[1]
    }
  }
  
  return obj
}

function myJSONstringify(obj) {
  let string = "";
  for(let key in obj) {
    let value = obj[key];
    if(!value) { value = "" }
    string += key + "+" + value + "++\n"
  }
  
  return string
}
