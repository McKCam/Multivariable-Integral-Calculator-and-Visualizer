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
		let node = math.parse(this.input);
		return node.toString();
	}

  /**
   * Finding f(x, y) at a specific point.
   * @param {number} x The x-coordinate.
   * @param {number} y The y-coordinate.
   * @returns The output from f(x, y) evaluation.
   */
  evaluateAt(x, y, mathExpr) {
    const parser = math.parser();
    //console.log(mathExpr);
    parser.evaluate(mathExpr);
    const f = parser.get('f');
    //let parser = math.parser();
    //parser.evaluate('f(x, y) = ' + this.input);
    //const f = parser.get('f');
    //const f = math.parse(this.input);
    // let scope = {
    //   x : x,
    //   y : y
    // };
    //console.log(parser.evaluate(f, scope));
    //console.log(f(x, y));
    return f(x, y);
  }

  /**
	 * Computes the approximate area under the given curve.
	 * @param {number} deltaX The change in x for each box length.
   * @param {number} deltaY The change in y for each step width.
	 * @return {number} The approximate area under the curve. 
	 */
	getApproxArea(deltaX, deltaY) {
    const parser = math.parser();
    
    parser.evaluate(this.input);
    
    // Valid way of getting string of function w/ f(x, y) format
    //const node = math.parse(this.input); 
    //console.log(node.toString());

    //parser.evaluate('f(x, y) = 2x + y');  // Valid

    let f = parser.get('f');
    //console.log(parser.evaluate('f(2, 3)')); // works, valid
    //console.log(f(2, 3)); // Works, valid
    
		var nx = ceil((this.b - this.a) / deltaX);
    var ny = ceil((this.d - this.c) / deltaY);
		var area = 0;

    for (var i =  a; i < b; i += deltaX) {
      for (var j = c; j < d; j += deltaY) {
        area += f(i, j) * deltaX * deltaY;
      }
    }

		//console.log(area);
		parser.clear();
		return area;
	}
}