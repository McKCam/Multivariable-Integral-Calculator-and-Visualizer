/**
 * Creates representations of math functions of three dimensions using the math.js library.
 */
class MathFunc {
  /**
   * 
   * @param {string} input The math function as a string
   * @param {number} a The lower limit for x.
   * @param {number} b The upper limit for x.
   * @param {number} c The lower limit for y.
   * @param {number} d The upper limit for y.
   */
  constructor(input, a, b, c, d) {
    this.input = input;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  getMathFunc() {
    let parser = math.parser();
    const parseFunc = parser.evaluate('f(x, y) = ' + this.input);
    const f = parser.get('f');
    parser.clear();
    return f;
  }

  setMathFunc(newInput) {
    let parser = math.parser();
		//console.log('f(x) = ' + inputMathFunc)
		const parseFunc = parser.evaluate('f(x, y) = ' + newInput);
		const f = parser.get('f');
  }

  toString() {
		let parser = math.parser();
		const parseFunc = parser.evaluate(this.input);
		const str = parseFunc.toString();
		parser.clear();
		console.log('f(x. y) = ' + this.input);
		return str;
	}

  /**
   * Finding f(x, y) at a specific point.
   * @param {number} x The x-coordinate.
   * @param {number} y The y-coordinate.
   * @returns The output from f(x, y) evaluation.
   */
  evaluateAt(x, y) {
    let parser = math.parser();

    const parseFunc = parser.evaluate('f(x, y) = ' + this.input);
    const f = parser.get('f');
    return f(x, y);
  }
}