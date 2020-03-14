
function pick(obj, keys) {
  var newObj = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    newObj[key] = obj[key];
  }
  return newObj;
}

var ob = {
  a: 1,
  b: 2,
  c: 3
};


console.log(pick(ob, ['b']));