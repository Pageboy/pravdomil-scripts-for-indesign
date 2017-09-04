function myJSONParse(str: string): any {
  try {
    return eval(str);
  }
  catch (e) {
    
  }
  return {}
}

function myJSONStringify(obj: Object): string {
  return obj.toSource();
}
