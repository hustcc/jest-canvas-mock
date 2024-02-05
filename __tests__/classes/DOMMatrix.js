import DOMMatrix from '../../src/classes/DOMMatrix';

describe('DOMMatrix class', () => {
  it('should accept no parameters', () => {
    const matrix = new DOMMatrix();
    expect(matrix).toBeInstanceOf(DOMMatrix);
  });

  it('should construct a 2d matrix properly', () => {
    const matrix = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    expect(matrix.a).toBe(1);
    expect(matrix.b).toBe(2);
    expect(matrix.c).toBe(3);
    expect(matrix.d).toBe(4);
    expect(matrix.e).toBe(5);
    expect(matrix.f).toBe(6);
  });

  it('should accept a DOMMatrix as parameter', () => {
    const matrix = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    const matrix2 = new DOMMatrix(matrix);
    expect(matrix2).toBeInstanceOf(DOMMatrix);
  });

  it('should be a 3d matrix if constructed without a parameter', () => {
    const matrix = new DOMMatrix();
    expect(matrix.is2D).toBeFalsy();
  });

  it('should throw for invalid parameter length', () => {
    expect(() => new DOMMatrix([1])).toThrow();
  });

  it('should accept an array of 6 length', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    expect(matrix).toBeInstanceOf(DOMMatrix);
  });

  it('should accept an array of 16 length', () => {
    const matrix = new DOMMatrix([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    ]);
    expect(matrix).toBeInstanceOf(DOMMatrix);
  });

  it('should return Float32Array', () => {
    const matrix32 = new DOMMatrix().toFloat32Array();
    expect(matrix32).toBeInstanceOf(Float32Array);
    expect(matrix32).toStrictEqual(
      new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    );
  });

  it('should return Float64Array', () => {
    const matrix64 = new DOMMatrix().toFloat64Array();
    expect(matrix64).toBeInstanceOf(Float64Array);
    expect(matrix64).toStrictEqual(
      new Float64Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
    );
  });

  it('should know if a 2d matrix is an identity matrix', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    expect(matrix.isIdentity).toBeTruthy();
  });

  it('should know if a 2d matrix is not an identity matrix', () => {
    const matrix = new DOMMatrix([1, 2, 3, 4, 5, 6]);
    expect(matrix.isIdentity).toBeFalsy();
  });

  it('should know if a 3d matrix is an identity matrix', () => {
    const matrix = new DOMMatrix();
    expect(matrix.isIdentity).toBeTruthy();
  });

  it('should know if a 3d matrix is not an identity matrix', () => {
    const matrix = new DOMMatrix();
    matrix.m21 = 100;
    expect(matrix.isIdentity).toBeFalsy();
  });

  it('should set the m11 value when the a value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.a = 2;
    expect(matrix.m11).toBe(2);
  });

  it('should return the m11 value when the a property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m11 = 2;
    expect(matrix.a).toBe(2);
  });

  it('should set the m12 value when the b value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.b = 2;
    expect(matrix.m12).toBe(2);
  });

  it('should return the m12 value when the b property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m12 = 2;
    expect(matrix.b).toBe(2);
  });

  it('should set the m21 value when the c value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.c = 2;
    expect(matrix.m21).toBe(2);
  });

  it('should return the m21 value when the c property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m21 = 2;
    expect(matrix.c).toBe(2);
  });

  it('should set the m22 value when the d value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.d = 2;
    expect(matrix.m22).toBe(2);
  });

  it('should return the m22 value when the d property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m22 = 2;
    expect(matrix.d).toBe(2);
  });

  it('should set the m41 value when the e value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.e = 2;
    expect(matrix.m41).toBe(2);
  });

  it('should return the m41 value when the e property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m41 = 2;
    expect(matrix.e).toBe(2);
  });

  it('should set the m42 value when the f value is set', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.f = 2;
    expect(matrix.m42).toBe(2);
  });

  it('should return the m42 value when the f property is accessed', () => {
    const matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);
    matrix.m42 = 2;
    expect(matrix.f).toBe(2);
  });

  describe(`translate`, function () {
    it(`should return a new DOMMatrix instance`, function () {
      const matrix = new DOMMatrix();
      const translatedMatrix = matrix.translate(100, 100);
      expect(translatedMatrix instanceof DOMMatrix).toBeTruthy();
      expect(translatedMatrix === matrix).toBeFalsy();
    });

    it(`should apply 2d changes`, function () {
      const x = 100;
      const y = 200;
      const matrix = new DOMMatrix([4, 5, 1, 3, 10, 9]);
      const expectedMatrix = new DOMMatrix([
        4, 5, 0, 0, 1, 3, 0, 0, 0, 0, 1, 0, 610, 1109, 0, 1,
      ]);
      const translatedMatrix = matrix.translate(x, y);
      expect(translatedMatrix.toFloat32Array()).toEqual(
        expectedMatrix.toFloat32Array()
      );
      expect(translatedMatrix.is2D).toEqual(true);
    });

    it(`should apply 3d changes`, function () {
      const x = 100;
      const y = 200;
      const z = 300;
      const matrix = new DOMMatrix();
      const expectedMatrix = new DOMMatrix([
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 300, 1,
      ]);
      const translatedMatrix = matrix.translate(x, y, z);
      expect(translatedMatrix).toEqual(expectedMatrix);
      expect(translatedMatrix.is2D).toEqual(false);
    });
  });

  describe(`scale`, function () {
    it(`should return a new DOMMatrix instance`, function () {
      const matrix = new DOMMatrix();
      const scaledMatrix = matrix.scale(0.5, 0.7);
      expect(scaledMatrix instanceof DOMMatrix).toBeTruthy();
      expect(scaledMatrix === matrix).toBeFalsy();
    });

    it(`should apply 2d changes`, function () {
      const scaleX = 0.75;
      const scaleY = 0.5;
      const matrix = new DOMMatrix([7, 8, 9, 20, 4, 7]);
      const expectedMatrix = new DOMMatrix([5.25, 6, 4.5, 10, 4, 7]);
      const scaledMatrix = matrix.scale(scaleX, scaleY);
      expect(scaledMatrix).toEqual(expectedMatrix);
    });

    it(`should apply 3d changes`, function () {
      const scaleX = 0.65;
      const scaleY = 0.55;
      const scaleZ = 0.9;
      const matrix = new DOMMatrix();
      const expectedMatrix = new DOMMatrix([
        0.65, 0, 0, 0, 0, 0.55, 0, 0, 0, 0, 0.9, 0, 0, 0, 0, 1,
      ]);
      const scaledMatrix = matrix.scale(scaleX, scaleY, scaleZ);
      expect(scaledMatrix).toEqual(expectedMatrix);
    });
  });

  describe(`translateSelf`, function () {
    it(`should return dot product of a 2d matrix multiplication`, function () {
      const matrix2D = new DOMMatrix([1, 2, 3, 4, 5, 6]);
      const tx = 2,
        ty = 3;
      const expectedMatrix = new DOMMatrix([1, 2, 3, 4, 16, 22]);
      matrix2D.translateSelf(tx, ty);
      expect(matrix2D.toFloat32Array()).toEqual(
        expectedMatrix.toFloat32Array()
      );
      expect(matrix2D.is2D).toEqual(true);
    });

    it(`should return do product of a 3d matrix`, function () {
      const matrix3D = new DOMMatrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      ]);
      const tx = 2,
        ty = 3,
        tz = 4;
      const expectedMatrix = new DOMMatrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 66, 76, 86, 96,
      ]);
      matrix3D.translateSelf(tx, ty, tz);
      expect(matrix3D.toFloat32Array()).toEqual(
        expectedMatrix.toFloat32Array()
      );
      expect(matrix3D.is2D).toEqual(false);
    });

    it(`should convert 2d matrix to 3d matrix when sent tz`, function () {
      const matrix2D = new DOMMatrix([1, 2, 3, 4, 5, 6]);
      const tx = 2,
        ty = 3,
        tz = 4;
      const expectedMatrix = new DOMMatrix([
        1, 2, 0, 0, 3, 4, 0, 0, 0, 0, 1, 0, 16, 22, 4, 1,
      ]);
      matrix2D.translateSelf(tx, ty, tz);
      expect(matrix2D.toFloat32Array()).toEqual(
        expectedMatrix.toFloat32Array()
      );
      expect(matrix2D.is2D).toEqual(false);
    });
  });

  describe(`scaleSelf`, function () {
    it(`should return dot product of a 2d translated matrix multiplication`, function () {
      const matrix2D = new DOMMatrix([1, 2, 3, 4, 5, 6]);
      const scaleX = 2,
        scaleY = 3;
      const expectedMatrix = new DOMMatrix([2, 4, 9, 12, 5, 6]);
      matrix2D.scaleSelf(scaleX, scaleY);
      expect(matrix2D).toEqual(expectedMatrix);
    });

    it(`should return dot product of a 3d translated matrix multiplication`, function () {
      const matrix3D = new DOMMatrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      ]);
      const sx = 2,
        sy = 3,
        sz = 4;
      const expectedMatrix = new DOMMatrix([
        2, 4, 6, 8, 15, 18, 21, 24, 36, 40, 44, 48, 13, 14, 15, 16,
      ]);
      matrix3D.scaleSelf(sx, sy, sz);
      expect(matrix3D).toEqual(expectedMatrix);
    });

    it(`should return dot product of a 3d translated matrix multiplication with origin`, function () {
      const matrix3D = new DOMMatrix([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
      ]);
      const sx = 2,
        sy = 3,
        sz = 4,
        ox = 5,
        oy = 6,
        oz = 7;
      const expectedMatrix = new DOMMatrix([
        2, 4, 6, 8, 15, 18, 21, 24, 36, 40, 44, 48, -241, -278, -315, -352,
      ]);
      matrix3D.scaleSelf(sx, sy, sz, ox, oy, oz);
      expect(matrix3D).toEqual(expectedMatrix);
    });
  });
});
