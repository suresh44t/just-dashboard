const module = require('./interpolation.js')

const string_tests = [
  ['foo', 'foo', {}],
  ['Hello World!', 'Hello World!', {}],
  ['Hello ${name}', 'Hello World!', {'name': 'World!'}],
  ['Hello ${name}!', 'Hello Person!', {'name': 'Person'}],
  ['${greeting} ${name}!', 'Hola Person!', {'name': 'Person', 'greeting': 'Hola'}],
  ['${foo} ${bar}!', 'Hola Person!', {'bar': 'Person', 'foo': 'Hola'}],
]

const array_tests = [
  [[], [], {}],
  [['Hello ${name}!'], ['Hello World!'], {'name': 'World'}],
  [['Hello ${foo}!'], ['Hello World!'], {'foo': 'World'}],
  [['Hello ${foo}!', 'Hello ${foo}!'], ['Hello World!', 'Hello World!'], {'foo': 'World'}],
  [['Hello ${foo}!', ['Hello ${foo}!']], ['Hello World!', ['Hello World!']], {'foo': 'World'}],
]

const static_tests = [
  [42, 42, {}],
  [false, false, {}],
  [889593.234234, 889593.234234, {}],
]

const tests = [
  ['String interpolation', 'format_string', [string_tests]],
  ['Array interpolation', 'format_array', [array_tests]],
  ['Object interpolation', 'format_object', [string_tests, array_tests, static_tests]],
]

tests.forEach(([test_suite_name, function_name, test_sets]) =>
  describe(test_suite_name, () => {
    test_sets.forEach(test_set =>
      test_set.forEach(([input, output, state]) => 
        it(`${[input, output, state]}`, () => {
          module[function_name](input, state).should.deepEqual(output)
        })
      )
    )
  })
)
