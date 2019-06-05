// 0. Make it modular

// 0.0.0.1 Use Gulp for Compilation --> compile to ES6 using babel
// 0.0.1.1 Rewrite ES6 code to ES5
// 0.0.1.2 Migrate the compilation configuration to a .babelrc file
0.0.1.3 Implement hot reload
0.1 Consider using Webpack instead of Gulp https://www.google.com/search?q=webpack+vs+gulp&oq=webpack+vs+gulp&aqs=chrome..69i57j0l5.2480j0j4&sourceid=chrome&ie=UTF-8
0.2 Compile ES6 to ES5 using babel
0.5 Use Google Chrome Debug
1. Make it test driven
    1.1 Install Jest
    1.2 Run Jest on compiled code in /dist
    1.2 List options of testing
    1.3 Make tests for core functions
        1.3.1 Regex for toMatch
2. Make it FP:
    2.1 Use higher order functions for each array manipulation
    2.2 Make it immutable
    2.3 Remove shared state
    2.4 Remove side effects
    2.5 Use pure functions
3. 68 rules (Effective JavaScript)
4. Add TS types