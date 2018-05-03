export default class Matrix4 {
  constructor(...args) {
    this.elements = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ]);
    if (args.length !== 0) {
      this.set.apply(this, args);
    }
  }

  set(a, b, c, d,
      e, f, g, h,
      i, j, k, l,
      m, n, o, p
  ) {

    let elements = this.elements;

    elements[0] = a; elements[4] = b; elements[8] = c; elements[12] = d;
    elements[1] = e; elements[5] = f; elements[9] = g; elements[13] = h;
    elements[2] = i; elements[6] = j; elements[10] = k; elements[14] = l;
    elements[3] = m; elements[7] = n; elements[11] = o; elements[15] = p;
  }
}