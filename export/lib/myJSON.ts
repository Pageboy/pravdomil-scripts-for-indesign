function myJSONParse(str: string): any {
  try {
    return eval(str);
  }
  catch (e) {
    
  }
  return {}
}

function myJSONStringify(obj: object): string {
  return obj.toSource();
}
