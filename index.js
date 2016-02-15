var tracery = require('./tracery/tracery');

var grammar = tracery.createGrammar({
  'animal': ['panda','fox','capybara','iguana'],
  'emotion': ['sad','happy','angry','jealous'],
  'origin':['I am #emotion.a# #animal#.'],
});

grammar.addModifiers(tracery.baseEngModifiers);

var trace = grammar.expand('#origin#');

console.log(trace.finishedText);
console.log(trace.errors);
