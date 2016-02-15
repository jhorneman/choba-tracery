var tracery = require('./tracery/tracery');
var choba = require('choba-engine');


function evaluateTraceryExpression(_parameters, _dynamicState, _context) {
    // Check if context has grammars.
    // Check if there are two parameters.
    // Check if grammars has desired grammar.
    var grammar = _context.grammars[_parameters[0]];
    var trace = grammar.expand(_parameters[1]);
    // Check if Tracery returned errors.
    return {
        type: 'string',
        value: trace.finishedText
    };
}


var grammar = tracery.createGrammar({
  'animal': ['panda','fox','capybara','iguana'],
  'emotion': ['sad','happy','angry','jealous'],
  'origin':['I am #emotion.a# #animal#.'],
});

grammar.addModifiers(tracery.baseEngModifiers);

var context = choba.buildContext({
    scenes: {
        start: {
            content: ['seq',
                ['text', 'Hello! '],
                ['trace', 'test', '#origin#']
            ]
        }
    },
    grammars: {
        test: grammar
    },
    expressionEvaluators: Object.assign({}, choba.expressionEvaluators, {
        'trace': evaluateTraceryExpression
    })
});

var rv = choba.restartGame(context);
console.log(rv.newScene.text);
