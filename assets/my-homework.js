// Risk
function risk(height, weight, sex) {
  var meterOfHeight = height * 0.0254;
  var kiloOfWeight = weight * 0.4536;
  var bmi = kiloOfWeight / Math.pow(meterOfHeight, 2);
  if (sex == 'M') {
    return bmi < 20.4 || bmi > 31.9;
  } else {
    return bmi < 19.4 || bmi > 27.6;
  }
}

// Hail Caesar
function roman(number) {
  var object = {'I' : 1, 'II' : 2, 'III' : 3, 'IV' : 4, 'V' : 5, 'VI' : 6, 'VII' : 7, "VIII" : 8, 'IX' : 9, 'X' : 10};
  var arrString = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', "VIII", 'IX', 'X']
  if (typeof number == 'string') {
    return object[number.toUpperCase()];
  } else {
    return arrString[number - 1];
  }
}

// Follow the Leader
function lettersThatFollow(text, ch) {
  var result = "";
  text = text.split('');
  for (var i = 0; i < text.length - 1; i++) {
    if(text[i] == ch && result.indexOf(text[i + 1]) < 0) {
      result += text[i + 1];
    }
  }
  return result;
}

// Props to JavaScript
function props(list, propertyName) {
  var result = [];
  for (var i = 0; i < list.length; i++) {
    result.push(list[i][propertyName]);
  }
  return result;
}

// JavaScript to HTML
function toHTML(list) {
  var result = "<ol>";
  for (var i = 0; i < list.length; i++) {
    if (typeof list[i] == "object") {
      result += toHTML(list[i]);
    } else {
      result += "<li>" + list[i] + "</li>";  
    }
  }
  result += "</ol>";
  return result;
}

// One Step After The Other
function sequence(start, step) {
  var counter = 0;
  return function() {
    var result = start + step * counter;
    counter += 1;
    return result;
  };
}

// Over and Over Again
function repeat(text, n) {
  var result = "";
  for (var i = 0; i < n; i++) {
    result += text;
  }
  return result;
}

// Over and Over Again and Again
function repeatf(f, n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(f());
  }
  return result;
}

// The Matchmaker
function matchmaker(obj) {
  return function (object) {
    for (var Key in obj) {
      if (obj[Key] != object[Key]) {
        return false;
      }
    }
    return true;
  }
}

//Breaking Up is Hard TO Do
function breakup(list, partitioner) {
  var result = {};
  for (var i = 0; i < list.length; i++) {
    var key = partitioner(list[i]).toString();
    result[key] = result[key] ? result[key].push(list[i]) : [];
  }
  return result;
}

// All For One and One For All
function eachOne(list) {
  for (var i = 0; i < list.length; i++) {
    if(!list[i]) {
      return list[i];
    }
  }
  return true;
}

// NoSql Query
function noSql(list, query) {
  var result = [];
  for (var Key in query) {
    for (var i = 0; i < list.length; i++) {
      var object = list[i];
      if (!(object[Key] && object[Key] == query[Key])) {
        break;
      } else {
        result.push(object);
      }
    }
  }
  return result;
}

// Once and Only Once

