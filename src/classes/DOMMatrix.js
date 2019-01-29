export default class DOMMatrix {
  _is2D = true;
  m11 = 1.0;
  m12 = 0.0;
  m13 = 0.0;
  m14 = 0.0;
  m21 = 0.0;
  m22 = 1.0;
  m23 = 0.0;
  m24 = 0.0;
  m31 = 0.0;
  m32 = 0.0;
  m33 = 1.0;
  m34 = 0.0;
  m41 = 0.0;
  m42 = 0.0;
  m43 = 0.0;
  m44 = 1.0;

  constructor(transform) {
    if (transform && transform.length === 6) {
      this.m11 = transform[0];
      this.m12 = transform[1];
      this.m21 = transform[2];
      this.m22 = transform[3];
      this.m41 = transform[4];
      this.m42 = transform[5];
      this._is2D = true;
      return this;
    }

    if (transform && transform.length === 16) {
      this.m11 = transform[0];
      this.m12 = transform[1];
      this.m13 = transform[2];
      this.m14 = transform[3];
      this.m21 = transform[4];
      this.m22 = transform[5];
      this.m23 = transform[6];
      this.m24 = transform[7];
      this.m31 = transform[8];
      this.m32 = transform[9];
      this.m33 = transform[10];
      this.m34 = transform[11];
      this.m41 = transform[12];
      this.m42 = transform[13];
      this.m43 = transform[14];
      this.m44 = transform[15];
      this._is2D = false;
      return this;
    }

    if (transform) {
      throw new TypeError('Failed to construct \'DOMMatrix\': The sequence must contain 6 elements for a 2D matrix or 16 elements for a 3D matrix.');
    }
    this._is2D = false;
  }

  get isIdentity() {
    if (this._is2D) {
      return this.m11 == 1.0
        && this.m12 == 0.0
        && this.m21 == 0.0
        && this.m22 == 1.0
        && this.m41 == 0.0
        && this.m42 == 0.0;
    } else {
      return this.m11 = 1.0 &&
        this.m12 === 0.0 &&
        this.m13 === 0.0 &&
        this.m14 === 0.0 &&
        this.m21 === 0.0 &&
        this.m22 === 1.0 &&
        this.m23 === 0.0 &&
        this.m24 === 0.0 &&
        this.m31 === 0.0 &&
        this.m32 === 0.0 &&
        this.m33 === 1.0 &&
        this.m34 === 0.0 &&
        this.m41 === 0.0 &&
        this.m42 === 0.0 &&
        this.m43 === 0.0 &&
        this.m44 === 1.0;
    }
  }

  get a() {
    return this.m11;
  }

  set a(value) {
    this.m11 = value;
  }

  get b() {
    return this.m12;
  }

  set b(value) {
    this.m12 = value;
  }

  get c() {
    return this.m21;
  }

  set c(value) {
    this.m21 = value;
  }

  get d() {
    return this.m22;
  }

  set d(value) {
    this.m22 = value;
  }

  get e() {
    return this.m41;
  }

  set e(value) {
    this.m41 = value;
  }

  get f() {
    return this.m42;
  }

  set f(value) {
    this.m42 = value;
  }

  get is2D() {
    return this._is2D;
  }
}
