function risk(height, weight, sex) {
  var meterOfHeight = height * 0.0254;
  var kiloOfWeight = weight * 0.4536;
  var bmi = kiloOfWeight / Math.pow(meterOfHeight, 2);
  return sex == 'M' && bmi < 20.4 || bmi > 31.9 || 
  sex == 'F' && bmi < 19.4 || bmi > 27.6;
}

function roman(number) {
  var numberToRoman = {
    1 : "I",
    2 : "II",
    3 : "III",
    4 : "IV",
    5 : "V",
    6 : "VI",
    7 : "VII",
    8 : "VIII",
    9 : "IX",
    10 : "X"
  };
  var romanToNumber = {
    "I" : 1,
    "II" : 2,
    "III" : 3,
    "IV" : 4,
    "V" : 5,
    "VI": 6,
    "VII" : 7,
    "VIII" : 8,
    "IX" : 9,
    "X" : 10
  };
  if (typeof number == 'number') {
    return numberToRoman[number];
  } else if (typeof number == 'string') {
    return romanToNumber[number.toUpperCase()];
  } else {
    return undefined;
  }
}

function letterThatFollow(text, ch) {
  var result = "";
  var phrases = text.split(ch).slice(1);
  
  phrases.map(ph => ph[0]).forEach(c => {
    if ( c && result.indexOf(c) < 0 ) {
      result += c;
    }
  });
  
  return result;
}

function props(list, propertyName) {
  return list.map(val => val[propertyName]);
}

function toHTML(list) {
  if (typeof list != 'object') {
    return "<li>" + list + "</li>";
  } else {
    return "<ol>" + list.map(toHTML).join('') + "</ol>";
  }
}

function sequence(start, step) {
  var count = 0;
  
  return function() {
    return start + step * count++;
  };
}

function repeat(text, n) {
  return repeatf(() => text, n).join('');
}

function repeatf(f, n) {
  var result =[];
  for (var i = 0; i < n; i++) {
    result.push(f());
  }
  return result;
}

function matchmaker(obj) {
  return function (object) {
    for (var key in obj) {
      if (obj[key] != object[Key]) {
        return false;
      }
    }
    return true;
  };
}

function breakup(list, partitioner) {
  var result = {};
  list.forEach(val => {
    var key = partitioner(val);
    if (! result.hasOwnProperty[key]) {
      result[key] = [];
    }
    result[key].push(val);
  });
  return result;
}

function eachOne(list) {
  for (var i = 0; i < liset.length; i++) {
    if (!list[i]) {
      return list[i];
    }
  }
  return true;
}

function noSql(list, query) {
  return list.filter(matchmaker(query));
}

function justOnce(f) {
  var hasBeenCalled = false;
  var value;
  
  return function() {
    if(hasBeenCalled) {
      return value;
    } else {
      value = f();
      hasBeenCalled = true;
      return value;
    }
  }
}
