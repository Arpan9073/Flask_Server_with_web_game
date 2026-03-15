(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) s(n);
  new MutationObserver((n) => {
    for (const i of n)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && s(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(n) {
    const i = {};
    return (
      n.integrity && (i.integrity = n.integrity),
      n.referrerPolicy && (i.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : n.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function s(n) {
    if (n.ep) return;
    n.ep = !0;
    const i = r(n);
    fetch(n.href, i);
  }
})();
var Wn = (() => {
    for (var t = new Uint8Array(128), e = 0; e < 64; e++)
      t[e < 26 ? e + 65 : e < 52 ? e + 71 : e < 62 ? e - 4 : e * 4 - 205] = e;
    return (r) => {
      for (
        var s = r.length,
          n = new Uint8Array(
            (((s - (r[s - 1] == "=") - (r[s - 2] == "=")) * 3) / 4) | 0,
          ),
          i = 0,
          a = 0;
        i < s;
      ) {
        var d = t[r.charCodeAt(i++)],
          l = t[r.charCodeAt(i++)],
          o = t[r.charCodeAt(i++)],
          c = t[r.charCodeAt(i++)];
        ((n[a++] = (d << 2) | (l >> 4)),
          (n[a++] = (l << 4) | (o >> 2)),
          (n[a++] = (o << 6) | c));
      }
      return n;
    };
  })(),
  Qn = { version: "3001.0.19" };
function Oe(t, e, r) {
  return e > r ? Oe(t, r, e) : Math.min(Math.max(t, e), r);
}
var Y = class ie {
  r = 255;
  g = 255;
  b = 255;
  constructor(e, r, s) {
    ((this.r = Oe(e, 0, 255)),
      (this.g = Oe(r, 0, 255)),
      (this.b = Oe(s, 0, 255)));
  }
  static fromArray(e) {
    return new ie(e[0], e[1], e[2]);
  }
  static fromHex(e) {
    if (typeof e == "number")
      return new ie((e >> 16) & 255, (e >> 8) & 255, (e >> 0) & 255);
    if (typeof e == "string") {
      let r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
      if (!r) throw new Error("Invalid hex color format");
      return new ie(parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16));
    } else throw new Error("Invalid hex color format");
  }
  static fromHSL(e, r, s) {
    if (r == 0) return new ie(255 * s, 255 * s, 255 * s);
    let n = (c, w, u) => (
        u < 0 && (u += 1),
        u > 1 && (u -= 1),
        u < 1 / 6
          ? c + (w - c) * 6 * u
          : u < 1 / 2
            ? w
            : u < 2 / 3
              ? c + (w - c) * (2 / 3 - u) * 6
              : c
      ),
      i = s < 0.5 ? s * (1 + r) : s + r - s * r,
      a = 2 * s - i,
      d = n(a, i, e + 1 / 3),
      l = n(a, i, e),
      o = n(a, i, e - 1 / 3);
    return new ie(
      Math.round(d * 255),
      Math.round(l * 255),
      Math.round(o * 255),
    );
  }
  static RED = new ie(255, 0, 0);
  static GREEN = new ie(0, 255, 0);
  static BLUE = new ie(0, 0, 255);
  static YELLOW = new ie(255, 255, 0);
  static MAGENTA = new ie(255, 0, 255);
  static CYAN = new ie(0, 255, 255);
  static WHITE = new ie(255, 255, 255);
  static BLACK = new ie(0, 0, 0);
  clone() {
    return new ie(this.r, this.g, this.b);
  }
  lighten(e) {
    return new ie(this.r + e, this.g + e, this.b + e);
  }
  darken(e) {
    return this.lighten(-e);
  }
  invert() {
    return new ie(255 - this.r, 255 - this.g, 255 - this.b);
  }
  mult(e) {
    return new ie(
      (this.r * e.r) / 255,
      (this.g * e.g) / 255,
      (this.b * e.b) / 255,
    );
  }
  lerp(e, r) {
    return new ie(ve(this.r, e.r, r), ve(this.g, e.g, r), ve(this.b, e.b, r));
  }
  toHSL() {
    let e = this.r / 255,
      r = this.g / 255,
      s = this.b / 255,
      n = Math.max(e, r, s),
      i = Math.min(e, r, s),
      a = (n + i) / 2,
      d = a,
      l = a;
    if (n == i) a = d = 0;
    else {
      let o = n - i;
      switch (((d = l > 0.5 ? o / (2 - n - i) : o / (n + i)), n)) {
        case e:
          a = (r - s) / o + (r < s ? 6 : 0);
          break;
        case r:
          a = (s - e) / o + 2;
          break;
        case s:
          a = (e - r) / o + 4;
          break;
      }
      a /= 6;
    }
    return [a, d, l];
  }
  eq(e) {
    return this.r === e.r && this.g === e.g && this.b === e.b;
  }
  toString() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  toHex() {
    return (
      "#" +
      ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
        .toString(16)
        .slice(1)
    );
  }
  toArray() {
    return [this.r, this.g, this.b];
  }
};
function J(...t) {
  if (t.length === 0) return new Y(255, 255, 255);
  if (t.length === 1) {
    if (t[0] instanceof Y) return t[0].clone();
    if (typeof t[0] == "string") return Y.fromHex(t[0]);
    if (Array.isArray(t[0]) && t[0].length === 3) return Y.fromArray(t[0]);
  } else if (t.length === 2) {
    if (t[0] instanceof Y) return t[0].clone();
  } else if (t.length === 3 || t.length === 4) return new Y(t[0], t[1], t[2]);
  throw new Error("Invalid color arguments");
}
var Jn = (t, e, r) => Y.fromHSL(t, e, r);
function oe(t) {
  return (t * Math.PI) / 180;
}
function rt(t) {
  return (t * 180) / Math.PI;
}
function ve(t, e, r) {
  if (typeof t == "number" && typeof e == "number") return t + (e - t) * r;
  if ((t instanceof M && e instanceof M) || (t instanceof Y && e instanceof Y))
    return t.lerp(e, r);
  throw new Error(
    `Bad value for lerp(): ${t}, ${e}. Only number, Vec2 and Color is supported.`,
  );
}
function Fe(t, e, r, s, n) {
  return s + ((t - e) / (r - e)) * (n - s);
}
function Zn(t, e, r, s, n) {
  return Oe(Fe(t, e, r, s, n), s, n);
}
var M = class ue {
  x = 0;
  y = 0;
  constructor(e = 0, r = e) {
    ((this.x = e), (this.y = r));
  }
  static fromAngle(e) {
    let r = oe(e);
    return new ue(Math.cos(r), Math.sin(r));
  }
  static fromArray(e) {
    return new ue(e[0], e[1]);
  }
  static ZERO = new ue(0, 0);
  static ONE = new ue(1, 1);
  static LEFT = new ue(-1, 0);
  static RIGHT = new ue(1, 0);
  static UP = new ue(0, -1);
  static DOWN = new ue(0, 1);
  clone() {
    return new ue(this.x, this.y);
  }
  add(...e) {
    let r = b(...e);
    return new ue(this.x + r.x, this.y + r.y);
  }
  sub(...e) {
    let r = b(...e);
    return new ue(this.x - r.x, this.y - r.y);
  }
  scale(...e) {
    let r = b(...e);
    return new ue(this.x * r.x, this.y * r.y);
  }
  dist(...e) {
    let r = b(...e);
    return this.sub(r).len();
  }
  sdist(...e) {
    let r = b(...e);
    return this.sub(r).slen();
  }
  static sdist(e, r) {
    let s = e.x - r.x,
      n = e.y - r.y;
    return s * s + n * n;
  }
  len() {
    return Math.sqrt(this.dot(this));
  }
  slen() {
    return this.dot(this);
  }
  unit() {
    let e = this.len();
    return e === 0 ? new ue(0) : this.scale(1 / e);
  }
  normal() {
    return new ue(this.y, -this.x);
  }
  reflect(e) {
    return this.sub(e.scale(2 * this.dot(e)));
  }
  project(e) {
    return e.scale(e.dot(this) / e.len());
  }
  reject(e) {
    return this.sub(this.project(e));
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  static dot(e, r) {
    return e.x * r.x + e.y * r.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  static cross(e, r) {
    return e.x * r.y - e.y * r.x;
  }
  angle(...e) {
    let r = b(...e);
    return rt(Math.atan2(this.y - r.y, this.x - r.x));
  }
  angleBetween(...e) {
    let r = b(...e);
    return rt(Math.atan2(this.cross(r), this.dot(r)));
  }
  lerp(e, r) {
    return new ue(ve(this.x, e.x, r), ve(this.y, e.y, r));
  }
  slerp(e, r) {
    let s = this.dot(e),
      n = this.cross(e),
      i = Math.atan2(n, s);
    return this.scale(Math.sin((1 - r) * i))
      .add(e.scale(Math.sin(r * i)))
      .scale(1 / n);
  }
  isZero() {
    return this.x === 0 && this.y === 0;
  }
  toFixed(e) {
    return new ue(Number(this.x.toFixed(e)), Number(this.y.toFixed(e)));
  }
  transform(e) {
    return e.multVec2(this);
  }
  eq(e) {
    return this.x === e.x && this.y === e.y;
  }
  bbox() {
    return new $(this, 0, 0);
  }
  toString() {
    return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
  }
  toArray() {
    return [this.x, this.y];
  }
};
function b(...t) {
  if (t.length === 1) {
    if (t[0] instanceof M) return new M(t[0].x, t[0].y);
    if (Array.isArray(t[0]) && t[0].length === 2) return new M(...t[0]);
  }
  return new M(...t);
}
var se = class Br {
  x = 0;
  y = 0;
  w = 1;
  h = 1;
  constructor(e, r, s, n) {
    ((this.x = e), (this.y = r), (this.w = s), (this.h = n));
  }
  scale(e) {
    return new Br(
      this.x + this.w * e.x,
      this.y + this.h * e.y,
      this.w * e.w,
      this.h * e.h,
    );
  }
  pos() {
    return new M(this.x, this.y);
  }
  clone() {
    return new Br(this.x, this.y, this.w, this.h);
  }
  eq(e) {
    return this.x === e.x && this.y === e.y && this.w === e.w && this.h === e.h;
  }
  toString() {
    return `quad(${this.x}, ${this.y}, ${this.w}, ${this.h})`;
  }
};
function ae(t, e, r, s) {
  return new se(t, e, r, s);
}
var $t = class ft {
    a;
    b;
    c;
    d;
    constructor(e, r, s, n) {
      ((this.a = e), (this.b = r), (this.c = s), (this.d = n));
    }
    mul(e) {
      return new ft(
        this.a * e.a + this.b * e.c,
        this.a * e.b + this.b * e.d,
        this.c * e.a + this.d * e.c,
        this.c * e.b + this.d * e.d,
      );
    }
    transform(e) {
      return b(this.a * e.x + this.b * e.y, this.c * e.x + this.d * e.y);
    }
    get inverse() {
      let e = this.det;
      return new ft(this.d / e, -this.b / e, -this.c / e, this.a / e);
    }
    get transpose() {
      return new ft(this.a, this.c, this.b, this.d);
    }
    get eigenvalues() {
      let e = this.trace / 2,
        r = this.det,
        s = e + Math.sqrt(e * e - r),
        n = e - Math.sqrt(e * e - r);
      return [s, n];
    }
    eigenvectors(e, r) {
      return this.c != 0
        ? [
            [e - this.d, this.c],
            [r - this.d, this.c],
          ]
        : this.b != 0
          ? [
              [this.b, e - this.a],
              [this.b, r - this.a],
            ]
          : Math.abs(this.transform(b(1, 0)).x - e) < Number.EPSILON
            ? [
                [1, 0],
                [0, 1],
              ]
            : [
                [0, 1],
                [1, 0],
              ];
    }
    get det() {
      return this.a * this.d - this.b * this.c;
    }
    get trace() {
      return this.a + this.d;
    }
    static rotation(e) {
      let r = Math.cos(e),
        s = Math.sin(e);
      return new ft(r, s, -s, r);
    }
    static scale(e, r) {
      return new ft(e, 0, 0, r);
    }
  },
  Et = class Mt {
    m11;
    m12;
    m13;
    m21;
    m22;
    m23;
    m31;
    m32;
    m33;
    constructor(e, r, s, n, i, a, d, l, o) {
      ((this.m11 = e),
        (this.m12 = r),
        (this.m13 = s),
        (this.m21 = n),
        (this.m22 = i),
        (this.m23 = a),
        (this.m31 = d),
        (this.m32 = l),
        (this.m33 = o));
    }
    static fromMat2(e) {
      return new Mt(e.a, e.b, 0, e.c, e.d, 0, 0, 0, 1);
    }
    toMat2() {
      return new $t(this.m11, this.m12, this.m21, this.m22);
    }
    mul(e) {
      return new Mt(
        this.m11 * e.m11 + this.m12 * e.m21 + this.m13 * e.m31,
        this.m11 * e.m12 + this.m12 * e.m22 + this.m13 * e.m32,
        this.m11 * e.m13 + this.m12 * e.m23 + this.m13 * e.m33,
        this.m21 * e.m11 + this.m22 * e.m21 + this.m23 * e.m31,
        this.m21 * e.m12 + this.m22 * e.m22 + this.m23 * e.m32,
        this.m21 * e.m13 + this.m22 * e.m23 + this.m23 * e.m33,
        this.m31 * e.m11 + this.m32 * e.m21 + this.m33 * e.m31,
        this.m31 * e.m12 + this.m32 * e.m22 + this.m33 * e.m32,
        this.m31 * e.m13 + this.m32 * e.m23 + this.m33 * e.m33,
      );
    }
    get det() {
      return (
        this.m11 * this.m22 * this.m33 +
        this.m12 * this.m23 * this.m31 +
        this.m13 * this.m21 * this.m32 -
        this.m13 * this.m22 * this.m31 -
        this.m12 * this.m21 * this.m33 -
        this.m11 * this.m23 * this.m32
      );
    }
    rotate(e) {
      let r = Math.cos(e),
        s = Math.sin(e),
        n = this.m11,
        i = this.m12;
      return (
        (this.m11 = r * this.m11 + s * this.m21),
        (this.m12 = r * this.m12 + s * this.m22),
        (this.m21 = r * this.m21 - s * n),
        (this.m22 = r * this.m22 - s * i),
        this
      );
    }
    scale(e, r) {
      return (
        (this.m11 *= e),
        (this.m12 *= e),
        (this.m21 *= r),
        (this.m22 *= r),
        this
      );
    }
    get inverse() {
      let e = this.det;
      return new Mt(
        (this.m22 * this.m33 - this.m23 * this.m32) / e,
        (this.m13 * this.m32 - this.m12 * this.m33) / e,
        (this.m12 * this.m23 - this.m13 * this.m22) / e,
        (this.m23 * this.m31 - this.m21 * this.m33) / e,
        (this.m11 * this.m33 - this.m13 * this.m31) / e,
        (this.m13 * this.m21 - this.m11 * this.m23) / e,
        (this.m21 * this.m32 - this.m22 * this.m31) / e,
        (this.m12 * this.m31 - this.m11 * this.m32) / e,
        (this.m11 * this.m22 - this.m12 * this.m21) / e,
      );
    }
    get transpose() {
      return new Mt(
        this.m11,
        this.m21,
        this.m31,
        this.m12,
        this.m22,
        this.m32,
        this.m13,
        this.m23,
        this.m33,
      );
    }
  },
  Ue = class Ge {
    m = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    constructor(e) {
      e && (this.m = e);
    }
    static translate(e) {
      return new Ge([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, 0, 1]);
    }
    static scale(e) {
      return new Ge([e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    static rotateX(e) {
      e = oe(-e);
      let r = Math.cos(e),
        s = Math.sin(e);
      return new Ge([1, 0, 0, 0, 0, r, -s, 0, 0, s, r, 0, 0, 0, 0, 1]);
    }
    static rotateY(e) {
      e = oe(-e);
      let r = Math.cos(e),
        s = Math.sin(e);
      return new Ge([r, 0, s, 0, 0, 1, 0, 0, -s, 0, r, 0, 0, 0, 0, 1]);
    }
    static rotateZ(e) {
      e = oe(-e);
      let r = Math.cos(e),
        s = Math.sin(e);
      return new Ge([r, -s, 0, 0, s, r, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    }
    translate(e) {
      return (
        (this.m[12] += this.m[0] * e.x + this.m[4] * e.y),
        (this.m[13] += this.m[1] * e.x + this.m[5] * e.y),
        (this.m[14] += this.m[2] * e.x + this.m[6] * e.y),
        (this.m[15] += this.m[3] * e.x + this.m[7] * e.y),
        this
      );
    }
    scale(e) {
      return (
        (this.m[0] *= e.x),
        (this.m[4] *= e.y),
        (this.m[1] *= e.x),
        (this.m[5] *= e.y),
        (this.m[2] *= e.x),
        (this.m[6] *= e.y),
        (this.m[3] *= e.x),
        (this.m[7] *= e.y),
        this
      );
    }
    rotate(e) {
      e = oe(-e);
      let r = Math.cos(e),
        s = Math.sin(e),
        n = this.m[0],
        i = this.m[1],
        a = this.m[4],
        d = this.m[5];
      return (
        (this.m[0] = n * r + i * s),
        (this.m[1] = -n * s + i * r),
        (this.m[4] = a * r + d * s),
        (this.m[5] = -a * s + d * r),
        this
      );
    }
    mult(e) {
      let r = [];
      for (let s = 0; s < 4; s++)
        for (let n = 0; n < 4; n++)
          r[s * 4 + n] =
            this.m[0 + n] * e.m[s * 4 + 0] +
            this.m[4 + n] * e.m[s * 4 + 1] +
            this.m[8 + n] * e.m[s * 4 + 2] +
            this.m[12 + n] * e.m[s * 4 + 3];
      return new Ge(r);
    }
    multVec2(e) {
      return new M(
        e.x * this.m[0] + e.y * this.m[4] + this.m[12],
        e.x * this.m[1] + e.y * this.m[5] + this.m[13],
      );
    }
    getTranslation() {
      return new M(this.m[12], this.m[13]);
    }
    getScale() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new M(r, e / r);
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = this.m[0] * this.m[5] - this.m[1] * this.m[4],
          r = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new M(e / r, r);
      } else return new M(0, 0);
    }
    getRotation() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return rt(
          this.m[1] > 0 ? Math.acos(this.m[0] / e) : -Math.acos(this.m[0] / e),
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return rt(
          Math.PI / 2 -
            (this.m[5] > 0
              ? Math.acos(-this.m[4] / e)
              : -Math.acos(this.m[4] / e)),
        );
      } else return 0;
    }
    getSkew() {
      if (this.m[0] != 0 || this.m[1] != 0) {
        let e = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);
        return new M(
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e),
          0,
        );
      } else if (this.m[4] != 0 || this.m[5] != 0) {
        let e = Math.sqrt(this.m[4] * this.m[4] + this.m[5] * this.m[5]);
        return new M(
          0,
          Math.atan(this.m[0] * this.m[4] + this.m[1] * this.m[5]) / (e * e),
        );
      } else return new M(0, 0);
    }
    invert() {
      let e = [],
        r = this.m[10] * this.m[15] - this.m[14] * this.m[11],
        s = this.m[9] * this.m[15] - this.m[13] * this.m[11],
        n = this.m[9] * this.m[14] - this.m[13] * this.m[10],
        i = this.m[8] * this.m[15] - this.m[12] * this.m[11],
        a = this.m[8] * this.m[14] - this.m[12] * this.m[10],
        d = this.m[8] * this.m[13] - this.m[12] * this.m[9],
        l = this.m[6] * this.m[15] - this.m[14] * this.m[7],
        o = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        c = this.m[5] * this.m[14] - this.m[13] * this.m[6],
        w = this.m[4] * this.m[15] - this.m[12] * this.m[7],
        u = this.m[4] * this.m[14] - this.m[12] * this.m[6],
        g = this.m[5] * this.m[15] - this.m[13] * this.m[7],
        f = this.m[4] * this.m[13] - this.m[12] * this.m[5],
        x = this.m[6] * this.m[11] - this.m[10] * this.m[7],
        m = this.m[5] * this.m[11] - this.m[9] * this.m[7],
        y = this.m[5] * this.m[10] - this.m[9] * this.m[6],
        q = this.m[4] * this.m[11] - this.m[8] * this.m[7],
        C = this.m[4] * this.m[10] - this.m[8] * this.m[6],
        D = this.m[4] * this.m[9] - this.m[8] * this.m[5];
      ((e[0] = this.m[5] * r - this.m[6] * s + this.m[7] * n),
        (e[4] = -(this.m[4] * r - this.m[6] * i + this.m[7] * a)),
        (e[8] = this.m[4] * s - this.m[5] * i + this.m[7] * d),
        (e[12] = -(this.m[4] * n - this.m[5] * a + this.m[6] * d)),
        (e[1] = -(this.m[1] * r - this.m[2] * s + this.m[3] * n)),
        (e[5] = this.m[0] * r - this.m[2] * i + this.m[3] * a),
        (e[9] = -(this.m[0] * s - this.m[1] * i + this.m[3] * d)),
        (e[13] = this.m[0] * n - this.m[1] * a + this.m[2] * d),
        (e[2] = this.m[1] * l - this.m[2] * o + this.m[3] * c),
        (e[6] = -(this.m[0] * l - this.m[2] * w + this.m[3] * u)),
        (e[10] = this.m[0] * g - this.m[1] * w + this.m[3] * f),
        (e[14] = -(this.m[0] * c - this.m[1] * u + this.m[2] * f)),
        (e[3] = -(this.m[1] * x - this.m[2] * m + this.m[3] * y)),
        (e[7] = this.m[0] * x - this.m[2] * q + this.m[3] * C),
        (e[11] = -(this.m[0] * m - this.m[1] * q + this.m[3] * D)),
        (e[15] = this.m[0] * y - this.m[1] * C + this.m[2] * D));
      let S =
        this.m[0] * e[0] +
        this.m[1] * e[4] +
        this.m[2] * e[8] +
        this.m[3] * e[12];
      for (let A = 0; A < 4; A++)
        for (let v = 0; v < 4; v++) e[A * 4 + v] *= 1 / S;
      return new Ge(e);
    }
    clone() {
      return new Ge([...this.m]);
    }
    toString() {
      return this.m.toString();
    }
  };
function Cs(t, e, r, s = (n) => -Math.cos(n)) {
  return t + ((s(r) + 1) / 2) * (e - t);
}
var _n = 1103515245,
  $n = 12345,
  ps = 2147483648,
  Is = class {
    seed;
    constructor(t) {
      this.seed = t;
    }
    gen() {
      return ((this.seed = (_n * this.seed + $n) % ps), this.seed / ps);
    }
    genNumber(t, e) {
      return t + this.gen() * (e - t);
    }
    genVec2(t, e) {
      return new M(this.genNumber(t.x, e.x), this.genNumber(t.y, e.y));
    }
    genColor(t, e) {
      return new Y(
        this.genNumber(t.r, e.r),
        this.genNumber(t.g, e.g),
        this.genNumber(t.b, e.b),
      );
    }
    genAny(...t) {
      if (t.length === 0) return this.gen();
      if (t.length === 1) {
        if (typeof t[0] == "number") return this.genNumber(0, t[0]);
        if (t[0] instanceof M) return this.genVec2(b(0, 0), t[0]);
        if (t[0] instanceof Y) return this.genColor(J(0, 0, 0), t[0]);
      } else if (t.length === 2) {
        if (typeof t[0] == "number" && typeof t[1] == "number")
          return this.genNumber(t[0], t[1]);
        if (t[0] instanceof M && t[1] instanceof M)
          return this.genVec2(t[0], t[1]);
        if (t[0] instanceof Y && t[1] instanceof Y)
          return this.genColor(t[0], t[1]);
      }
      throw new Error("More than 2 arguments not supported");
    }
  },
  Rr = new Is(Date.now());
function ei(t) {
  return (t != null && (Rr.seed = t), Rr.seed);
}
function he(...t) {
  return Rr.genAny(...t);
}
function Ps(...t) {
  return Math.floor(he(...(t.length > 0 ? t : [2])));
}
function ti(t) {
  return he() <= t;
}
function Ts(t) {
  for (let e = t.length - 1; e > 0; e--) {
    let r = Math.floor(Math.random() * (e + 1));
    [t[e], t[r]] = [t[r], t[e]];
  }
  return t;
}
function ri(t, e) {
  return t.length <= e ? t.slice() : Ts(t.slice()).slice(0, e);
}
function si(t) {
  return t[Ps(t.length)];
}
function ks(t, e) {
  return (
    t.pos.x + t.width > e.pos.x &&
    t.pos.x < e.pos.x + e.width &&
    t.pos.y + t.height > e.pos.y &&
    t.pos.y < e.pos.y + e.height
  );
}
function ni(t, e) {
  if (
    (t.p1.x === t.p2.x && t.p1.y === t.p2.y) ||
    (e.p1.x === e.p2.x && e.p1.y === e.p2.y)
  )
    return null;
  let r =
    (e.p2.y - e.p1.y) * (t.p2.x - t.p1.x) -
    (e.p2.x - e.p1.x) * (t.p2.y - t.p1.y);
  if (r === 0) return null;
  let s =
      ((e.p2.x - e.p1.x) * (t.p1.y - e.p1.y) -
        (e.p2.y - e.p1.y) * (t.p1.x - e.p1.x)) /
      r,
    n =
      ((t.p2.x - t.p1.x) * (t.p1.y - e.p1.y) -
        (t.p2.y - t.p1.y) * (t.p1.x - e.p1.x)) /
      r;
  return s < 0 || s > 1 || n < 0 || n > 1 ? null : s;
}
function Xr(t, e) {
  let r = ni(t, e);
  return r
    ? b(t.p1.x + r * (t.p2.x - t.p1.x), t.p1.y + r * (t.p2.y - t.p1.y))
    : null;
}
function zr(t, e) {
  let r = e.p2.sub(e.p1),
    s = Number.NEGATIVE_INFINITY,
    n = Number.POSITIVE_INFINITY;
  if (r.x != 0) {
    let i = (t.pos.x - e.p1.x) / r.x,
      a = (t.pos.x + t.width - e.p1.x) / r.x;
    ((s = Math.max(s, Math.min(i, a))), (n = Math.min(n, Math.max(i, a))));
  }
  if (r.y != 0) {
    let i = (t.pos.y - e.p1.y) / r.y,
      a = (t.pos.y + t.height - e.p1.y) / r.y;
    ((s = Math.max(s, Math.min(i, a))), (n = Math.min(n, Math.max(i, a))));
  }
  return n >= s && n >= 0 && s <= 1;
}
function lr(t, e) {
  return (
    e.x > t.pos.x &&
    e.x < t.pos.x + t.width &&
    e.y > t.pos.y &&
    e.y < t.pos.y + t.height
  );
}
function Ds(t, e) {
  let r = Math.max(t.pos.x, Math.min(e.center.x, t.pos.x + t.width)),
    s = Math.max(t.pos.y, Math.min(e.center.y, t.pos.y + t.height));
  return b(r, s).sdist(e.center) <= e.radius * e.radius;
}
function Fs(t, e) {
  return Os(e, new we(t.points()));
}
function Wr(t, e) {
  let r = e.sub(t.p1),
    s = t.p2.sub(t.p1);
  if (Math.abs(r.cross(s)) > Number.EPSILON) return !1;
  let n = r.dot(s) / s.dot(s);
  return n >= 0 && n <= 1;
}
function Lt(t, e) {
  let r = t.p2.sub(t.p1),
    s = r.dot(r),
    n = t.p1.sub(e.center),
    i = 2 * r.dot(n),
    a = n.dot(n) - e.radius * e.radius,
    d = i * i - 4 * s * a;
  if (s <= Number.EPSILON || d < 0) return !1;
  if (d == 0) {
    let l = -i / (2 * s);
    if (l >= 0 && l <= 1) return !0;
  } else {
    let l = (-i + Math.sqrt(d)) / (2 * s),
      o = (-i - Math.sqrt(d)) / (2 * s);
    if ((l >= 0 && l <= 1) || (o >= 0 && o <= 1)) return !0;
  }
  return ur(e, t.p1);
}
function Qr(t, e) {
  if (We(e, t.p1) || We(e, t.p2)) return !0;
  for (let r = 0; r < e.pts.length; r++) {
    let s = e.pts[r],
      n = e.pts[(r + 1) % e.pts.length];
    if (Xr(t, new Ee(s, n))) return !0;
  }
  return !1;
}
function ur(t, e) {
  return t.center.sdist(e) < t.radius * t.radius;
}
function ii(t, e) {
  return (
    t.center.sdist(e.center) < (t.radius + e.radius) * (t.radius + e.radius)
  );
}
function hr(t, e) {
  let r = e.pts[e.pts.length - 1];
  for (let s of e.pts) {
    if (Lt(new Ee(r, s), t)) return !0;
    r = s;
  }
  return ur(t, e.pts[0]) ? !0 : We(e, t.center);
}
function Os(t, e) {
  for (let r = 0; r < t.pts.length; r++)
    if (Qr(new Ee(t.pts[r], t.pts[(r + 1) % t.pts.length]), e)) return !0;
  return !!(t.pts.some((r) => We(e, r)) || e.pts.some((r) => We(t, r)));
}
function We(t, e) {
  let r = !1,
    s = t.pts;
  for (let n = 0, i = s.length - 1; n < s.length; i = n++)
    s[n].y > e.y != s[i].y > e.y &&
      e.x < ((s[i].x - s[n].x) * (e.y - s[n].y)) / (s[i].y - s[n].y) + s[n].x &&
      (r = !r);
  return r;
}
function Jr(t, e) {
  e = e.sub(t.center);
  let r = oe(t.angle),
    s = Math.cos(r),
    n = Math.sin(r),
    i = e.x * s + e.y * n,
    a = -e.x * n + e.y * s;
  return (
    (i * i) / (t.radiusX * t.radiusX) + (a * a) / (t.radiusY * t.radiusY) < 1
  );
}
function er(t, e) {
  let r = e.center.sub(t.center),
    s = oe(t.angle),
    n = Math.cos(s),
    i = Math.sin(s),
    a = r.x * n + r.y * i,
    d = -r.x * i + r.y * n;
  return Jr(
    new je(b(), t.radiusX + e.radius, t.radiusY + e.radius, 0),
    b(a, d),
  );
}
function Us(t, e) {
  let r = t.toMat2().inverse;
  return (
    (e = new Ee(
      r.transform(e.p1.sub(t.center)),
      r.transform(e.p2.sub(t.center)),
    )),
    Lt(e, new be(b(), 1))
  );
}
function ai(t, e) {
  if (t.radiusX === t.radiusY) return er(e, new be(t.center, t.radiusX));
  if (e.radiusX === e.radiusY) return er(t, new be(e.center, e.radiusX));
  let r = new Et(1 / t.radiusX ** 2, 0, 0, 0, 1 / t.radiusY ** 2, 0, 0, 0, -1),
    s = new Et(1 / e.radiusX ** 2, 0, 0, 0, 1 / e.radiusY ** 2, 0, 0, 0, -1),
    n = t.center.x,
    i = t.center.y,
    a = e.center.x,
    d = e.center.y,
    l = oe(t.angle),
    o = oe(e.angle),
    c = new Et(
      Math.cos(l),
      -Math.sin(l),
      n,
      Math.sin(l),
      Math.cos(l),
      i,
      0,
      0,
      1,
    ),
    w = new Et(
      Math.cos(o),
      -Math.sin(o),
      a,
      Math.sin(o),
      Math.cos(o),
      d,
      0,
      0,
      1,
    ),
    u = c.inverse,
    g = w.inverse,
    f = u.transpose.mul(r).mul(u),
    x = g.transpose.mul(s).mul(g),
    m = f.m11,
    y = f.m12,
    q = f.m13,
    C = f.m21,
    D = f.m22,
    S = f.m23,
    A = f.m31,
    v = f.m32,
    R = f.m33,
    I = x.m11,
    P = x.m12,
    k = x.m13,
    O = x.m21,
    K = x.m22,
    V = x.m23,
    X = x.m31,
    N = x.m32,
    U = x.m33,
    te = m * D * R - m * S * v - y * C * R + y * S * A + q * C * v - q * D * A,
    z =
      (m * D * U -
        m * S * N -
        m * v * V +
        m * R * K -
        y * C * U +
        y * S * X +
        y * A * V -
        y * R * O +
        q * C * N -
        q * D * X -
        q * A * K +
        q * v * O +
        C * v * k -
        C * R * P -
        D * A * k +
        D * R * I +
        S * A * P -
        S * v * I) /
      te,
    Z =
      (m * K * U -
        m * V * N -
        y * O * U +
        y * V * X +
        q * O * N -
        q * K * X -
        C * P * U +
        C * k * N +
        D * I * U -
        D * k * X -
        S * I * N +
        S * P * X +
        A * P * V -
        A * k * K -
        v * I * V +
        v * k * O +
        R * I * K -
        R * P * O) /
      te,
    ce =
      (I * K * U - I * V * N - P * O * U + P * V * X + k * O * N - k * K * X) /
      te;
  if (z >= 0) {
    let L = -3 * Z + z ** 2,
      Ze = 3 * z * ce + Z * z ** 2 - 4 * Z ** 2,
      ut =
        -27 * ce ** 2 +
        18 * ce * z * Z +
        z ** 2 * Z ** 2 -
        4 * z ** 3 * ce -
        4 * Z ** 3;
    return !(L > 0 && Ze < 0 && ut > 0);
  } else {
    let L = -3 * Z + z ** 2,
      Ze =
        -27 * ce ** 2 +
        18 * ce * z * Z +
        z ** 2 * Z ** 2 -
        4 * z ** 3 * ce -
        4 * Z ** 3;
    return !(L > 0 && Ze > 0);
  }
}
function Ls(t, e) {
  return Zr(t, new we(e.points()));
}
function Zr(t, e) {
  let r = t.toMat2().inverse;
  return (
    (e = new we(e.pts.map((s) => r.transform(s.sub(t.center))))),
    hr(new be(b(), 1), e)
  );
}
function oi(t, e) {
  return t.x === e.x && t.y === e.y;
}
function li(t, e) {
  return e instanceof M
    ? oi(e, t.pt)
    : e instanceof be
      ? ur(e, t.pt)
      : e instanceof Ee
        ? Wr(e, t.pt)
        : e instanceof $
          ? lr(e, t.pt)
          : e instanceof we
            ? We(e, t.pt)
            : e instanceof je
              ? Jr(e, t.pt)
              : !1;
}
function ui(t, e) {
  return e instanceof M
    ? Wr(t, e)
    : e instanceof be
      ? Lt(t, e)
      : e instanceof Ee
        ? Xr(t, e) != null
        : e instanceof $
          ? zr(e, t)
          : e instanceof we
            ? Qr(t, e)
            : e instanceof je
              ? Us(e, t)
              : !1;
}
function hi(t, e) {
  return e instanceof M
    ? ur(t, e)
    : e instanceof be
      ? ii(t, e)
      : e instanceof Ee
        ? Lt(e, t)
        : e instanceof $
          ? Ds(e, t)
          : e instanceof we
            ? hr(t, e)
            : e instanceof je
              ? er(e, t)
              : !1;
}
function di(t, e) {
  return e instanceof M
    ? lr(t, e)
    : e instanceof be
      ? Ds(t, e)
      : e instanceof Ee
        ? zr(t, e)
        : e instanceof $
          ? ks(t, e)
          : e instanceof we
            ? Fs(t, e)
            : e instanceof je
              ? Ls(e, t)
              : !1;
}
function ci(t, e) {
  return e instanceof M
    ? We(t, e)
    : e instanceof be
      ? hr(e, t)
      : e instanceof Ee
        ? Qr(e, t)
        : e instanceof $
          ? Fs(e, t)
          : e instanceof we
            ? Os(e, t)
            : e instanceof je
              ? Zr(e, t)
              : !1;
}
function fi(t, e) {
  return e instanceof M
    ? Jr(t, e)
    : e instanceof be
      ? er(t, e)
      : e instanceof Ee
        ? Us(t, e)
        : e instanceof $
          ? Ls(t, e)
          : e instanceof we
            ? Zr(t, e)
            : e instanceof je
              ? ai(e, t)
              : !1;
}
function Ns(t, e, r) {
  let s = t,
    n = r.p1,
    i = r.p2,
    a = e,
    d = i.sub(n),
    l = a.cross(d);
  if (Math.abs(l) < Number.EPSILON) return null;
  let o = n.sub(s),
    c = o.cross(d) / l;
  if (c <= 0 || c >= 1) return null;
  let w = o.cross(a) / l;
  if (w <= 0 || w >= 1) return null;
  let u = d.normal().unit();
  return (
    e.dot(u) > 0 && ((u.x *= -1), (u.y *= -1)),
    { point: s.add(a.scale(c)), normal: u, fraction: c }
  );
}
function pi(t, e, r) {
  let s = Number.NEGATIVE_INFINITY,
    n = Number.POSITIVE_INFINITY,
    i;
  if (t.x != 0) {
    let a = (r.pos.x - t.x) / e.x,
      d = (r.pos.x + r.width - t.x) / e.x;
    ((i = b(-Math.sign(e.x), 0)),
      (s = Math.max(s, Math.min(a, d))),
      (n = Math.min(n, Math.max(a, d))));
  }
  if (t.y != 0) {
    let a = (r.pos.y - t.y) / e.y,
      d = (r.pos.y + r.height - t.y) / e.y;
    (Math.min(a, d) > s && (i = b(0, -Math.sign(e.y))),
      (s = Math.max(s, Math.min(a, d))),
      (n = Math.min(n, Math.max(a, d))));
  }
  return n >= s && s >= 0 && s <= 1
    ? { point: t.add(e.scale(s)), normal: i, fraction: s }
    : null;
}
function Hs(t, e, r) {
  let s = t,
    n = r.center,
    i = e,
    a = i.dot(i),
    d = s.sub(n),
    l = 2 * i.dot(d),
    o = d.dot(d) - r.radius * r.radius,
    c = l * l - 4 * a * o;
  if (a <= Number.EPSILON || c < 0) return null;
  if (c == 0) {
    let w = -l / (2 * a);
    if (w >= 0 && w <= 1) {
      let u = s.add(i.scale(w));
      return { point: u, normal: u.sub(n), fraction: w };
    }
  } else {
    let w = (-l + Math.sqrt(c)) / (2 * a),
      u = (-l - Math.sqrt(c)) / (2 * a),
      g = null;
    if (
      (w >= 0 && w <= 1 && (g = w),
      u >= 0 && u <= 1 && (g = Math.min(u, g ?? u)),
      g != null)
    ) {
      let f = s.add(i.scale(g));
      return { point: f, normal: f.sub(n).unit(), fraction: g };
    }
  }
  return null;
}
function gi(t, e, r) {
  let s = r.pts,
    n = null,
    i = s[s.length - 1];
  for (let a = 0; a < s.length; a++) {
    let d = s[a],
      l = Ns(t, e, new Ee(i, d));
    (l && (!n || n.fraction > l.fraction) && (n = l), (i = d));
  }
  return n;
}
function mi(t, e, r) {
  let s = r.toMat2(),
    n = s.inverse,
    i = n.transform(t.sub(r.center)),
    a = n.transform(e),
    d = Hs(i, a, new be(b(), 1));
  if (d) {
    let l = $t.rotation(oe(-r.angle)),
      o = $t.scale(r.radiusX, r.radiusY).transform(d.point),
      c = s.transform(d.point).add(r.center),
      w = c.dist(t) / e.len();
    return {
      point: c,
      normal: l.transform(b(r.radiusY ** 2 * o.x, r.radiusX ** 2 * o.y)).unit(),
      fraction: w,
    };
  }
  return d;
}
function wi(t, e, r, s = 64) {
  let n = t,
    i = e.len(),
    a = e.scale(1 / i),
    d = 0,
    l = b(Math.floor(t.x), Math.floor(t.y)),
    o = b(a.x > 0 ? 1 : -1, a.y > 0 ? 1 : -1),
    c = b(Math.abs(1 / a.x), Math.abs(1 / a.y)),
    w = b(
      o.x > 0 ? l.x + 1 - t.x : t.x - l.x,
      o.y > 0 ? l.y + 1 - t.y : t.y - l.y,
    ),
    u = b(c.x < 1 / 0 ? c.x * w.x : 1 / 0, c.y < 1 / 0 ? c.y * w.y : 1 / 0),
    g = -1;
  for (; d <= s; ) {
    let f = r(l);
    if (f === !0)
      return {
        point: n.add(a.scale(d)),
        normal: b(g === 0 ? -o.x : 0, g === 1 ? -o.y : 0),
        fraction: d / i,
        gridPos: l,
      };
    if (f) return f;
    u.x < u.y
      ? ((l.x += o.x), (d = u.x), (u.x += c.x), (g = 0))
      : ((l.y += o.y), (d = u.y), (u.y += c.y), (g = 1));
  }
  return null;
}
var yi = class Cr {
    pt;
    constructor(e) {
      this.pt = e.clone();
    }
    transform(e) {
      return new Cr(e.multVec2(this.pt));
    }
    bbox() {
      return new $(this.pt, 0, 0);
    }
    area() {
      return 0;
    }
    clone() {
      return new Cr(this.pt);
    }
    collides(e) {
      return li(this, e);
    }
    contains(e) {
      return this.pt.eq(e);
    }
    raycast(e, r) {
      return null;
    }
    random() {
      return this.pt.clone();
    }
  },
  Ee = class Ir {
    p1;
    p2;
    constructor(e, r) {
      ((this.p1 = e.clone()), (this.p2 = r.clone()));
    }
    transform(e) {
      return new Ir(e.multVec2(this.p1), e.multVec2(this.p2));
    }
    bbox() {
      return $.fromPoints(this.p1, this.p2);
    }
    area() {
      return this.p1.dist(this.p2);
    }
    clone() {
      return new Ir(this.p1, this.p2);
    }
    collides(e) {
      return ui(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, r) {
      return Ns(e, r, this);
    }
    random() {
      return this.p1.add(this.p2.sub(this.p1).scale(he(1)));
    }
  },
  $ = class Pr {
    pos;
    width;
    height;
    constructor(e, r, s) {
      ((this.pos = e.clone()), (this.width = r), (this.height = s));
    }
    static fromPoints(e, r) {
      return new Pr(e.clone(), r.x - e.x, r.y - e.y);
    }
    center() {
      return new M(this.pos.x + this.width / 2, this.pos.y + this.height / 2);
    }
    points() {
      return [
        this.pos,
        this.pos.add(this.width, 0),
        this.pos.add(this.width, this.height),
        this.pos.add(0, this.height),
      ];
    }
    transform(e) {
      return new we(this.points().map((r) => e.multVec2(r)));
    }
    bbox() {
      return this.clone();
    }
    area() {
      return this.width * this.height;
    }
    clone() {
      return new Pr(this.pos.clone(), this.width, this.height);
    }
    distToPoint(e) {
      return Math.sqrt(this.sdistToPoint(e));
    }
    sdistToPoint(e) {
      let r = this.pos,
        s = this.pos.add(this.width, this.height),
        n = Math.max(r.x - e.x, 0, e.x - s.x),
        i = Math.max(r.y - e.y, 0, e.y - s.y);
      return n * n + i * i;
    }
    collides(e) {
      return di(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, r) {
      return pi(e, r, this);
    }
    random() {
      return this.pos.add(he(this.width), he(this.height));
    }
  },
  be = class Gs {
    center;
    radius;
    constructor(e, r) {
      ((this.center = e.clone()), (this.radius = r));
    }
    transform(e) {
      return new je(this.center, this.radius, this.radius).transform(e);
    }
    bbox() {
      return $.fromPoints(
        this.center.sub(b(this.radius)),
        this.center.add(b(this.radius)),
      );
    }
    area() {
      return this.radius * this.radius * Math.PI;
    }
    clone() {
      return new Gs(this.center, this.radius);
    }
    collides(e) {
      return hi(this, e);
    }
    contains(e) {
      return this.collides(e);
    }
    raycast(e, r) {
      return Hs(e, r, this);
    }
    random() {
      return this.center.add(M.fromAngle(he(360)).scale(he(this.radius)));
    }
  },
  je = class pt {
    center;
    radiusX;
    radiusY;
    angle;
    constructor(e, r, s, n = 0) {
      ((this.center = e.clone()),
        (this.radiusX = r),
        (this.radiusY = s),
        (this.angle = n));
    }
    static fromMat2(e) {
      let r = e.inverse,
        s = r.transpose.mul(r),
        [n, i] = s.eigenvalues,
        [a, d] = s.eigenvectors(n, i),
        [l, o] = [1 / Math.sqrt(n), 1 / Math.sqrt(i)];
      return l > o
        ? new pt(b(), l, o, rt(Math.atan2(-a[1], a[0])))
        : new pt(b(), o, l, rt(Math.atan2(-d[1], d[0])));
    }
    toMat2() {
      let e = oe(this.angle),
        r = Math.cos(e),
        s = Math.sin(e);
      return new $t(
        r * this.radiusX,
        -s * this.radiusY,
        s * this.radiusX,
        r * this.radiusY,
      );
    }
    transform(e) {
      if (this.angle == 0 && e.getRotation() == 0)
        return new pt(
          e.multVec2(this.center),
          e.m[0] * this.radiusX,
          e.m[5] * this.radiusY,
        );
      {
        let r = this.toMat2(),
          s = e.getRotation(),
          n = e.getScale();
        r = Et.fromMat2(r).scale(n.x, n.y).rotate(s).toMat2();
        let i = pt.fromMat2(r);
        return ((i.center = e.multVec2(this.center)), i);
      }
    }
    bbox() {
      if (this.angle == 0)
        return $.fromPoints(
          this.center.sub(b(this.radiusX, this.radiusY)),
          this.center.add(b(this.radiusX, this.radiusY)),
        );
      {
        let e = oe(this.angle),
          r = Math.cos(e),
          s = Math.sin(e),
          n = this.radiusX * r,
          i = this.radiusX * s,
          a = this.radiusY * s,
          d = this.radiusY * r,
          l = Math.sqrt(n * n + a * a),
          o = Math.sqrt(i * i + d * d);
        return $.fromPoints(this.center.sub(b(l, o)), this.center.add(b(l, o)));
      }
    }
    area() {
      return this.radiusX * this.radiusY * Math.PI;
    }
    clone() {
      return new pt(this.center, this.radiusX, this.radiusY, this.angle);
    }
    collides(e) {
      return fi(this, e);
    }
    contains(e) {
      e = e.sub(this.center);
      let r = oe(this.angle),
        s = Math.cos(r),
        n = Math.sin(r),
        i = e.x * s + e.y * n,
        a = -e.x * n + e.y * s;
      return (
        (i * i) / (this.radiusX * this.radiusX) +
          (a * a) / (this.radiusY * this.radiusY) <
        1
      );
    }
    raycast(e, r) {
      return mi(e, r, this);
    }
    random() {
      return this.center;
    }
  };
function Ai(t, e, r, s) {
  let n = e.sub(t),
    i = s.sub(r),
    a = n.cross(i);
  return (a < 1e-5 && a > -1e-5) ||
    ((a = r.sub(t).cross(i) / a), a < 0 || a > 1)
    ? null
    : t.add(n.scale(a));
}
var we = class St {
  pts;
  constructor(e) {
    if (e.length < 3)
      throw new Error("Polygons should have at least 3 vertices");
    this.pts = e;
  }
  transform(e) {
    return new St(this.pts.map((r) => e.multVec2(r)));
  }
  bbox() {
    let e = b(Number.MAX_VALUE),
      r = b(-Number.MAX_VALUE);
    for (let s of this.pts)
      ((e.x = Math.min(e.x, s.x)),
        (r.x = Math.max(r.x, s.x)),
        (e.y = Math.min(e.y, s.y)),
        (r.y = Math.max(r.y, s.y)));
    return $.fromPoints(e, r);
  }
  area() {
    let e = 0,
      r = this.pts.length;
    for (let s = 0; s < r; s++) {
      let n = this.pts[s],
        i = this.pts[(s + 1) % r];
      ((e += n.x * i.y * 0.5), (e -= i.x * n.y * 0.5));
    }
    return Math.abs(e);
  }
  clone() {
    return new St(this.pts.map((e) => e.clone()));
  }
  collides(e) {
    return ci(this, e);
  }
  contains(e) {
    return this.collides(e);
  }
  raycast(e, r) {
    return gi(e, r, this);
  }
  random() {
    return b();
  }
  cut(e, r) {
    new Ee(e, r);
    let s = [],
      n = [],
      i = r.sub(e),
      a = this.pts[this.pts.length - 1],
      d = a.sub(e),
      l = i.cross(d) > 0;
    return (
      this.pts.forEach((o) => {
        d = o.sub(e);
        let c = i.cross(d) > 0;
        if (l != c) {
          let w = Ai(a, o, e, r);
          (s.push(w), n.push(w), (l = c));
        }
        ((c ? s : n).push(o), (a = o));
      }),
      [s.length ? new St(s) : null, n.length ? new St(n) : null]
    );
  }
};
function xi(t, e, r, s) {
  let n = s * s,
    i = 1 - s,
    a = i * i;
  return t
    .scale(a)
    .add(e.scale(2 * i * s))
    .add(r.scale(n));
}
function vi(t, e, r, s) {
  let n = 1 - s;
  return e
    .sub(t)
    .scale(2 * n)
    .add(r.sub(e).scale(2 * s));
}
function bi(t, e, r, s) {
  return r.sub(e.scale(2)).add(t).scale(2);
}
function _r(t, e, r, s, n) {
  let i = n * n,
    a = i * n,
    d = 1 - n,
    l = d * d,
    o = l * d;
  return t
    .scale(o)
    .add(e.scale(3 * l * n))
    .add(r.scale(3 * d * i))
    .add(s.scale(a));
}
function Ei(t, e, r, s, n) {
  let i = n * n,
    a = 1 - n,
    d = a * a;
  return e
    .sub(t)
    .scale(3 * d)
    .add(r.sub(e).scale(6 * a * n))
    .add(s.sub(r).scale(3 * i));
}
function Mi(t, e, r, s, n) {
  let i = 1 - n;
  return r
    .sub(e.scale(2))
    .add(t)
    .scale(6 * i)
    .add(
      s
        .sub(r.scale(2))
        .add(e)
        .scale(6 * n),
    );
}
function Si(t, e, r, s, n) {
  let i = 0.5 * (((-n + 2) * n - 1) * n),
    a = 0.5 * ((3 * n - 5) * n * n + 2),
    d = 0.5 * (((-3 * n + 4) * n + 1) * n),
    l = 0.5 * ((n - 1) * n * n);
  return t.scale(i).add(e.scale(a)).add(r.scale(d)).add(s.scale(l));
}
function qi(t, e, r, s, n) {
  let i = 0.5 * ((-3 * n + 4) * n - 1),
    a = 0.5 * ((9 * n - 10) * n),
    d = 0.5 * ((-9 * n + 8) * n + 1),
    l = 0.5 * ((3 * n - 2) * n);
  return t.scale(i).add(e.scale(a)).add(r.scale(d)).add(s.scale(l));
}
function Bi(t) {
  let e = js(t),
    r = e(1);
  return (s) => {
    let n = s * r,
      i = e(n, !0);
    return t(i);
  };
}
function js(t, e = 10, r = 10) {
  let s = [0],
    n = [0],
    i = 1 / (e - 1) / r,
    a = 0,
    d = t(0),
    l = 0;
  for (let o = 1; o < e; o++) {
    for (let c = 0; c < r; c++) {
      l += i;
      let w = t(l),
        u = w.dist(d);
      ((a += u), (d = w));
    }
    ((s[o] = a), (n[o] = l));
  }
  return (
    (n[e - 1] = 1),
    (o, c = !1) => {
      if (c) {
        let w = o;
        if (w <= 0) return 0;
        if (w >= a) return 1;
        let u = 0;
        for (; s[u + 1] < w; ) u++;
        let g = n[u],
          f = n[u + 1],
          x = s[u],
          m = s[u + 1],
          y = (w - x) / (m - x);
        return g + (f - g) * y;
      } else {
        if (o <= 0) return 0;
        if (o >= 1) return s[e - 1];
        let w = 0;
        for (; n[w + 1] < o; ) w++;
        let u = n[w],
          g = n[w + 1],
          f = s[w],
          x = s[w + 1],
          m = (o - u) / (g - u);
        return f + (x - f) * m;
      }
    }
  );
}
function Nt(t, e, r, s) {
  let n = 2 * t + e - 2 * s + r,
    i = -3 * t + 3 * s - 2 * e - r,
    a = e,
    d = t;
  return (l) => {
    let o = l * l,
      c = o * l;
    return n * c + i * o + a * l + d;
  };
}
function Ks(t, e, r, s, n, i = Nt) {
  let a = i(e.x, (1 - n) * (r.x - t.x), (1 - n) * (s.x - e.x), r.x),
    d = i(e.y, (1 - n) * (r.y - t.y), (1 - n) * (s.y - e.y), r.y);
  return (l) => new M(a(l), d(l));
}
function tr(t, e, r, s, n = Nt) {
  return Ks(t, e, r, s, 0.5, n);
}
function Ri(t, e, r, s, n = Nt) {
  return tr(s.add(t.sub(e).scale(6)), t, s, t.add(s.sub(r).scale(6)), n);
}
function Ci(t, e, r, s, n, i, a, d = Nt) {
  let l = d(
      e.x,
      0.5 * (1 - n) * (1 + a) * (1 + i) * (e.x - t.x) +
        0.5 * (1 - n) * (1 - a) * (1 - i) * (r.x - e.x),
      0.5 * (1 - n) * (1 + a) * (1 - i) * (r.x - e.x) +
        0.5 * (1 - n) * (1 - a) * (1 + i) * (s.x - r.x),
      r.x,
    ),
    o = d(
      e.y,
      0.5 * (1 - n) * (1 + a) * (1 + i) * (e.y - t.y) +
        0.5 * (1 - n) * (1 - a) * (1 - i) * (r.y - e.y),
      0.5 * (1 - n) * (1 + a) * (1 - i) * (r.y - e.y) +
        0.5 * (1 - n) * (1 - a) * (1 + i) * (s.y - r.y),
      r.y,
    );
  return (c) => new M(l(c), o(c));
}
function Ii(t, e, r, s) {
  let n = 2 * t + e - 2 * s + r,
    i = -3 * t + 3 * s - 2 * e + r,
    a = e;
  return (d) => {
    let l = d * d;
    return 3 * n * l + 2 * i * d + a;
  };
}
function vt(t) {
  return 0 <= t && t <= 1;
}
function Er(t, e) {
  return Math.abs(t - e) <= Number.EPSILON;
}
function bt(t) {
  return t < 0 ? -Math.pow(-t, 1 / 3) : Math.pow(t, 1 / 3);
}
function Pi(t, e, r, s) {
  let n = 3 * t - 6 * e + 3 * r,
    i = -3 * t + 3 * e,
    a = t,
    d = -t + 3 * e - 3 * r + s;
  if (Er(d, 0)) {
    if (Er(n, 0)) return Er(i, 0) ? [] : [-a / i].filter(vt);
    let m = Math.sqrt(i * i - 4 * n * a),
      y = 2 * n;
    return [(m - i) / y, (-i - m) / y].filter(vt);
  }
  ((n /= d), (i /= d), (a /= d));
  let l = (3 * i - n * n) / 3,
    o = l / 3,
    c = (2 * n * n * n - 9 * n * i + 27 * a) / 27,
    w = c / 2,
    u = w * w + o * o * o;
  if (u < 0) {
    let m = -l / 3,
      y = m * m * m,
      q = Math.sqrt(y),
      C = -c / (2 * q),
      D = C < -1 ? -1 : C > 1 ? 1 : C,
      S = Math.acos(D),
      A = 2 * bt(q),
      v = A * Math.cos(S / 3) - n / 3,
      R = A * Math.cos((S + 2 * Math.PI) / 3) - n / 3,
      I = A * Math.cos((S + 4 * Math.PI) / 3) - n / 3;
    return [v, R, I].filter(vt);
  }
  if (u === 0) {
    let m = w < 0 ? bt(-w) : -bt(w),
      y = 2 * m - n / 3,
      q = -m - n / 3;
    return [y, q].filter(vt);
  }
  let g = Math.sqrt(u),
    f = bt(g - w),
    x = bt(g + w);
  return [f - x - n / 3].filter(vt);
}
function Ti(t, e, r, s, n) {
  let i = Pi(t.x - n, e.x - n, r.x - n, s.x - n);
  return i.length > 0 ? _r(t, e, r, s, i[0]).y : NaN;
}
function ki(t) {
  if (!t || t.length == 0)
    throw new Error("Need at least one point for easingLinear.");
  let e = t.length;
  return (r) => {
    if (r <= 0 || t.length == 1 || r <= t[0].x) return t[0].y;
    for (let s = 0; s < e; s++)
      if (t[s].x >= r) return Fe(r, t[s - 1].x, t[s].x, t[s - 1].y, t[s].y);
    return t[t.length - 1].y;
  };
}
function Di(t, e) {
  return (r) => Ti(b(0, 0), t, e, b(1, 1), r);
}
function Fi(t, e = "jump-end") {
  let r = 1 / t,
    s = e == "jump-start" || e == "jump-both",
    n = e == "jump-end" || e == "jump-both",
    i = 1 / (t + (n ? 1 : 0)),
    a = s ? i : 0;
  return (d) => {
    let l = Math.floor(d / r);
    return a + l * i;
  };
}
function Oi(t, e) {
  let r = Number.MAX_VALUE,
    s = { normal: b(0), distance: 0 };
  for (let n of [t, e])
    for (let i = 0; i < n.pts.length; i++) {
      let a = n.pts[i],
        d = n.pts[(i + 1) % n.pts.length].sub(a).normal().unit(),
        l = Number.MAX_VALUE,
        o = -Number.MAX_VALUE;
      for (let g = 0; g < t.pts.length; g++) {
        let f = t.pts[g].dot(d);
        ((l = Math.min(l, f)), (o = Math.max(o, f)));
      }
      let c = Number.MAX_VALUE,
        w = -Number.MAX_VALUE;
      for (let g = 0; g < e.pts.length; g++) {
        let f = e.pts[g].dot(d);
        ((c = Math.min(c, f)), (w = Math.max(w, f)));
      }
      let u = Math.min(o, w) - Math.max(l, c);
      if (u < 0) return null;
      if (u < Math.abs(r)) {
        let g = w - l,
          f = c - o;
        ((r = Math.abs(g) < Math.abs(f) ? g : f),
          (s.normal = d),
          (s.distance = r));
      }
    }
  return s;
}
function Vs(t, e, r) {
  return (e.x - t.x) * (r.y - t.y) - (e.y - t.y) * (r.x - t.x) >= 0;
}
function Ui(t) {
  let e = 0,
    r = t[t.length - 1];
  for (let s = 0; s < t.length; s++)
    ((e += (t[s].x - r.x) * (t[s].y + r.y)), (r = t[s]));
  return e < 0;
}
function Mr(t, e, r, s) {
  let n = s.x - r.x,
    i = s.y - r.y,
    a = n * (t.y - r.y) - i * (t.x - r.x),
    d = n * (e.y - r.y) - i * (e.x - r.x);
  return a * d >= 0;
}
function Li(t, e, r, s) {
  return Mr(t, e, r, s) && Mr(t, r, e, s) && Mr(t, s, e, r);
}
function Ni(t, e, r, s) {
  for (let n of t)
    if (n !== e && n !== r && n !== s && Li(n, e, r, s)) return !0;
  return !1;
}
function Hi(t, e, r, s) {
  return Vs(t, e, r) && !Ni(s, t, e, r);
}
function Ys(t) {
  if (t.length < 3) return [];
  if (t.length == 3) return [t];
  let e = [],
    r = [],
    s = 0;
  for (let w = 0; w < t.length; w++) {
    let u = t[s],
      g = t[w];
    ((g.x < u.x || (g.x == u.x && g.y < u.y)) && (s = s),
      (e[w] = w + 1),
      (r[w] = w - 1));
  }
  ((e[e.length - 1] = 0), (r[0] = r.length - 1), Ui(t) || ([e, r] = [r, e]));
  let n = [];
  for (let w = 0; w < t.length; ++w) Vs(t[r[w]], t[w], t[e[w]]) || n.push(t[w]);
  let i = [],
    a = t.length,
    d = 1,
    l = 0,
    o,
    c;
  for (; a > 3; ) {
    ((o = e[d]), (c = r[d]));
    let w = t[c],
      u = t[d],
      g = t[o];
    if (Hi(w, u, g, n))
      (i.push([w, u, g]),
        (e[c] = o),
        (r[o] = c),
        n.splice(n.indexOf(u), 1),
        --a,
        (l = 0));
    else if (++l > a) return [];
    d = o;
  }
  return ((o = e[d]), (c = r[d]), i.push([t[c], t[d], t[o]]), i);
}
function Gi(t) {
  if (t.length < 3) return !1;
  let e = t.length - 2,
    r = t.length - 1,
    s = 0,
    n = t[r].sub(t[e]),
    i = t[s].sub(t[r]),
    a = n.cross(i);
  for (; s + 1 < t.length; )
    if (
      ((e = r),
      (r = s),
      s++,
      (n = t[r].sub(t[e])),
      (i = t[s].sub(t[r])),
      n.cross(i) * a < 0)
    )
      return !1;
  return !0;
}
var Xs =
    " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  dr = "topleft",
  ji = "monospace",
  rr = "monospace",
  Tr = "linear",
  $r = [
    { name: "a_pos", size: 2 },
    { name: "a_uv", size: 2 },
    { name: "a_color", size: 4 },
  ],
  Ki = $r.reduce((t, e) => t + e.size, 0),
  zs = 2048,
  Vi = zs * 4 * Ki,
  Yi = zs * 6,
  Xi = `
attribute vec2 a_pos;
attribute vec2 a_uv;
attribute vec4 a_color;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

vec4 def_vert() {
	return vec4(a_pos, 0.0, 1.0);
}

{{user}}

void main() {
	vec4 pos = vert(a_pos, a_uv, a_color);
	v_pos = a_pos;
	v_uv = a_uv;
	v_color = a_color;
	gl_Position = pos;
}
`,
  zi = `
precision mediump float;

varying vec2 v_pos;
varying vec2 v_uv;
varying vec4 v_color;

uniform sampler2D u_tex;

vec4 def_frag() {
	vec4 texColor = texture2D(u_tex, v_uv);
	return vec4((v_color.rgb * texColor.rgb), texColor.a) * v_color.a;
}

{{user}}

void main() {
	gl_FragColor = frag(v_pos, v_uv, v_color, u_tex);
	if (gl_FragColor.a == 0.0) {
		discard;
	}
}
`,
  kr = `
vec4 vert(vec2 pos, vec2 uv, vec4 color) {
	return def_vert();
}
`,
  Dr = `
vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
	return def_frag();
}
`,
  Wi = new Set(["id", "require"]),
  Qi = new Set([
    "add",
    "fixedUpdate",
    "update",
    "draw",
    "destroy",
    "inspect",
    "drawInspect",
  ]),
  gs = 200,
  Ji = 640,
  Zi = 65536,
  Ws = Symbol.for("kaplay.cancel"),
  Qs = class extends Map {
    lastID = 0;
    push(t) {
      let e = this.lastID;
      return (this.set(e, t), this.lastID++, e);
    }
    pushd(t) {
      let e = this.push(t);
      return () => this.delete(e);
    }
  },
  ot = class Js {
    paused = !1;
    cancel;
    constructor(e) {
      this.cancel = e;
    }
    static join(e) {
      let r = new Js(() => e.forEach((s) => s.cancel()));
      return (
        Object.defineProperty(r, "paused", {
          get: () => e[0].paused,
          set: (s) => e.forEach((n) => (n.paused = s)),
        }),
        (r.paused = !1),
        r
      );
    }
    static replace(e, r) {
      return (
        (e.cancel = () => r.cancel()),
        (r.paused = e.paused),
        Object.defineProperty(e, "paused", {
          get: () => r.paused,
          set: (s) => (r.paused = s),
        }),
        e
      );
    }
  },
  me = class {
    cancellers = new WeakMap();
    handlers = new Qs();
    add(t) {
      function e(...n) {
        if (!s.paused) return t(...n);
      }
      let r = this.handlers.pushd(e),
        s = new ot(r);
      return (this.cancellers.set(e, r), s);
    }
    addOnce(t) {
      let e = this.add((...r) => {
        (e.cancel(), t(...r));
      });
      return e;
    }
    next() {
      return new Promise((t) => this.addOnce(t));
    }
    trigger(...t) {
      this.handlers.forEach((e) => {
        let r = e(...t),
          s;
        r === Ws && (s = this.cancellers.get(e)) && s();
      });
    }
    numListeners() {
      return this.handlers.size;
    }
    clear() {
      this.handlers.clear();
    }
  },
  kt = class {
    handlers = {};
    registers = {};
    on(t, e) {
      return (
        this.handlers[t] || (this.handlers[t] = new me()),
        this.handlers[t].add(e)
      );
    }
    onOnce(t, e) {
      let r = this.on(t, (...s) => {
        (r.cancel(), e(...s));
      });
      return r;
    }
    next(t) {
      return new Promise((e) => {
        this.onOnce(t, (...r) => e(r[0]));
      });
    }
    trigger(t, ...e) {
      this.handlers[t] && this.handlers[t].trigger(...e);
    }
    remove(t) {
      delete this.handlers[t];
    }
    clear() {
      this.handlers = {};
    }
    numListeners(t) {
      return this.handlers[t]?.numListeners() ?? 0;
    }
  },
  _i = (t) => t[0] instanceof Y,
  $i = (t) => t[0] instanceof M,
  ea = (t) => typeof t[0] == "number",
  Zs = class {
    _items;
    _compareFn;
    constructor(t = (e, r) => e < r) {
      ((this._compareFn = t), (this._items = []));
    }
    insert(t) {
      (this._items.push(t), this.moveUp(this._items.length - 1));
    }
    remove() {
      if (this._items.length === 0) return null;
      let t = this._items[0],
        e = this._items.pop();
      return (
        this._items.length !== 0 && ((this._items[0] = e), this.moveDown(0)),
        t
      );
    }
    clear() {
      this._items.splice(0, this._items.length);
    }
    moveUp(t) {
      for (; t > 0; ) {
        let e = Math.floor((t - 1) / 2);
        if (
          !this._compareFn(this._items[t], this._items[e]) &&
          this._items[t] >= this._items[e]
        )
          break;
        (this.swap(t, e), (t = e));
      }
    }
    moveDown(t) {
      for (; t < Math.floor(this._items.length / 2); ) {
        let e = 2 * t + 1;
        if (
          (e < this._items.length - 1 &&
            !this._compareFn(this._items[e], this._items[e + 1]) &&
            ++e,
          this._compareFn(this._items[t], this._items[e]))
        )
          break;
        (this.swap(t, e), (t = e));
      }
    }
    swap(t, e) {
      [this._items[t], this._items[e]] = [this._items[e], this._items[t]];
    }
    get length() {
      return this._items.length;
    }
  };
function ta(t) {
  let e = window.atob(t),
    r = e.length,
    s = new Uint8Array(r);
  for (let n = 0; n < r; n++) s[n] = e.charCodeAt(n);
  return s.buffer;
}
function ra(t) {
  return ta(t.split(",")[1]);
}
function es(t, e) {
  let r = document.createElement("a");
  ((r.href = e), (r.download = t), r.click());
}
function _s(t, e) {
  es(t, "data:text/plain;charset=utf-8," + e);
}
function sa(t, e) {
  _s(t, JSON.stringify(e));
}
function ms(t, e) {
  let r = URL.createObjectURL(e);
  (es(t, r), URL.revokeObjectURL(r));
}
var $s = (t) => t.match(/^data:\w+\/\w+;base64,.+/),
  na = (t) => t.split(".").slice(0, -1).join(".");
function ts(t, e) {
  if (t === e) return !0;
  let r = typeof t,
    s = typeof e;
  if (r !== s) return !1;
  if (r === "object" && s === "object" && t !== null && e !== null) {
    if (Array.isArray(t) !== Array.isArray(e)) return !1;
    let n = Object.keys(t),
      i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (let a of n) {
      let d = t[a],
        l = e[a];
      if (!ts(d, l)) return !1;
    }
    return !0;
  }
  return !1;
}
var ws = new Set(),
  ia = (t) => (t instanceof Error ? t.message : String(t));
function aa(t) {
  ws.has(t) || (ws.add(t), console.warn(t));
}
function mt(t, e) {
  aa(`${t} is deprecated. Use ${e} instead.`);
}
function Fr(t, e) {
  return Number(t.toFixed(e));
}
function ee(t, e) {
  return (...r) => {
    let s = r.length;
    if (s === t.length) return t(...r);
    if (s === e.length) return e(...r);
  };
}
var oa = Object.freeze([
  776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520,
]);
function la(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  let e = [],
    r = 0,
    s = 0;
  for (; r < t.length; ) {
    if (
      ((s += ua(r + s, t)),
      ma(t[r + s]) && s++,
      fa(t[r + s]) && s++,
      pa(t[r + s]) && s++,
      wa(t[r + s]))
    ) {
      s++;
      continue;
    }
    (e.push(t.substring(r, r + s)), (r += s), (s = 0));
  }
  return e;
}
function ua(t, e) {
  let r = e[t];
  if (!ha(r) || t === e.length - 1) return 1;
  let s = r + e[t + 1],
    n = e.substring(t + 2, t + 5);
  return ys(s) && ys(n)
    ? 4
    : da(s) && ga(n)
      ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2
      : ca(n)
        ? 4
        : 2;
}
function ha(t) {
  return t && lt(t[0].charCodeAt(0), 55296, 56319);
}
function ys(t) {
  return lt(rs(t), 127462, 127487);
}
function da(t) {
  return lt(rs(t), 127988, 127988);
}
function ca(t) {
  return lt(rs(t), 127995, 127999);
}
function fa(t) {
  return typeof t == "string" && lt(t.charCodeAt(0), 65024, 65039);
}
function pa(t) {
  return typeof t == "string" && lt(t.charCodeAt(0), 8400, 8447);
}
function ga(t) {
  let e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && lt(e, 917504, 917631);
}
function ma(t) {
  return typeof t == "string" && oa.includes(t.charCodeAt(0));
}
function wa(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function rs(t) {
  let e = t.charCodeAt(0) - 55296,
    r = t.charCodeAt(1) - 56320;
  return (e << 10) + r + 65536;
}
function lt(t, e, r) {
  return t >= e && t <= r;
}
var qe = (t, e) => (Array.isArray(t) ? t?.includes(e) : t === e),
  De = (t, e) => (Array.isArray(e) ? e.some((r) => t.has(r)) : t.has(e)),
  zt = (t, e, r) => {
    t.has(e) ? t.get(e)?.push(r) : t.set(e, [r]);
  },
  ya = (() => {
    let t = 0;
    return () => t++;
  })(),
  Aa = {
    "Joy-Con L+R (STANDARD GAMEPAD Vendor: 057e Product: 200e)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
        17: "capture",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
    "Joy-Con (L) (STANDARD GAMEPAD Vendor: 057e Product: 2006)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        9: "select",
        10: "lstick",
        16: "start",
      },
      sticks: { left: { x: 0, y: 1 } },
    },
    "Joy-Con (R) (STANDARD GAMEPAD Vendor: 057e Product: 2007)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        9: "start",
        10: "lstick",
        16: "select",
      },
      sticks: { left: { x: 0, y: 1 } },
    },
    "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)": {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
        17: "capture",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
    default: {
      buttons: {
        0: "south",
        1: "east",
        2: "west",
        3: "north",
        4: "lshoulder",
        5: "rshoulder",
        6: "ltrigger",
        7: "rtrigger",
        8: "select",
        9: "start",
        10: "lstick",
        11: "rstick",
        12: "dpad-up",
        13: "dpad-down",
        14: "dpad-left",
        15: "dpad-right",
        16: "home",
      },
      sticks: { left: { x: 0, y: 1 }, right: { x: 2, y: 3 } },
    },
  };
function en() {
  let t = h.globalOpt.pixelDensity ?? 1,
    e = h.globalOpt.width,
    r = h.globalOpt.height,
    s = h.gfx.ggl.gl.drawingBufferWidth,
    n = h.gfx.ggl.gl.drawingBufferHeight,
    i = s / t,
    a = n / t,
    d = 0,
    l = 0,
    o = i,
    c = a;
  if (h.globalOpt.letterbox) {
    if (!e || !r)
      throw new Error("Letterboxing requires width and height defined.");
    let w = i / a,
      u = e / r;
    if (w > u) {
      let g = a * u;
      ((d = (i - g) / 2), (o = g));
    } else {
      let g = i / u;
      ((c = g), (l = (a - g) / 2));
    }
  }
  if (h.globalOpt.stretch && (!h.globalOpt.width || !h.globalOpt.height))
    throw new Error("Stretching requires width and height defined.");
  h.gfx.viewport = {
    x: d,
    y: l,
    width: o,
    height: c,
    scale:
      (h.gfx.viewport.width + h.gfx.viewport.height) /
      (h.gfx.width + h.gfx.height),
  };
}
function xa(t) {
  return new M(
    (t.x * h.gfx.viewport.width) / h.gfx.width,
    (t.y * h.gfx.viewport.height) / h.gfx.height,
  );
}
function He(t) {
  return new M(
    ((t.x - h.gfx.viewport.x) * h.gfx.width) / h.gfx.viewport.width,
    ((t.y - h.gfx.viewport.y) * h.gfx.height) / h.gfx.viewport.height,
  );
}
var va = () => et.lastInputDevice,
  ba = () => {
    let t = et.buttons;
    for (let e in t) {
      let r = t[e].keyboard && [t[e].keyboard].flat(),
        s = t[e].keyboardCode && [t[e].keyboardCode].flat(),
        n = t[e].gamepad && [t[e].gamepad].flat(),
        i = t[e].mouse && [t[e].mouse].flat();
      (r &&
        r.forEach((a) => {
          zt(et.buttonsByKey, a, e);
        }),
        s &&
          s.forEach((a) => {
            zt(et.buttonsByKeyCode, a, e);
          }),
        n &&
          n.forEach((a) => {
            zt(et.buttonsByGamepad, a, e);
          }),
        i &&
          i.forEach((a) => {
            zt(et.buttonsByMouse, a, e);
          }));
    }
  },
  Ct = class {
    pressed = new Set([]);
    pressedRepeat = new Set([]);
    released = new Set([]);
    down = new Set([]);
    update() {
      (this.pressed.clear(), this.released.clear(), this.pressedRepeat.clear());
    }
    press(t) {
      (this.pressed.add(t), this.pressedRepeat.add(t), this.down.add(t));
    }
    pressRepeat(t) {
      this.pressedRepeat.add(t);
    }
    release(t) {
      (this.down.delete(t), this.pressed.delete(t), this.released.add(t));
    }
  },
  Ea = class {
    buttonState = new Ct();
    stickState = new Map();
  },
  Ma = class {
    dts = [];
    timer = 0;
    fps = 0;
    tick(t) {
      (this.dts.push(t),
        (this.timer += t),
        this.timer >= 1 &&
          ((this.timer = 0),
          (this.fps = Math.round(
            1 / (this.dts.reduce((e, r) => e + r) / this.dts.length),
          )),
          (this.dts = [])));
    }
  },
  et,
  As = Aa,
  Sa = (t) => {
    let e = t.buttons ?? {};
    return {
      canvas: t.canvas,
      buttons: e,
      buttonsByKey: new Map(),
      buttonsByMouse: new Map(),
      buttonsByGamepad: new Map(),
      buttonsByKeyCode: new Map(),
      loopID: null,
      stopped: !1,
      dt: 0,
      fixedDt: 1 / 50,
      restDt: 0,
      time: 0,
      realTime: 0,
      fpsCounter: new Ma(),
      timeScale: 1,
      skipTime: !1,
      isHidden: !1,
      numFrames: 0,
      mousePos: new M(0),
      mouseDeltaPos: new M(0),
      keyState: new Ct(),
      mouseState: new Ct(),
      mergedGamepadState: new Ea(),
      gamepadStates: new Map(),
      lastInputDevice: null,
      buttonState: new Ct(),
      gamepads: [],
      charInputted: [],
      isMouseMoved: !1,
      lastWidth: t.canvas.offsetWidth,
      lastHeight: t.canvas.offsetHeight,
      events: new kt(),
    };
  },
  qa = (t) => {
    if (!t.canvas) throw new Error("Please provide a canvas");
    let e = Sa(t);
    ((et = e), ba());
    function r() {
      return e.dt * e.timeScale;
    }
    function s() {
      return e.fixedDt * e.timeScale;
    }
    function n() {
      return e.restDt * e.timeScale;
    }
    function i() {
      return e.isHidden;
    }
    function a() {
      return e.time;
    }
    function d() {
      return e.fpsCounter.fps;
    }
    function l() {
      return e.numFrames;
    }
    function o() {
      return e.canvas.toDataURL();
    }
    function c(p) {
      e.canvas.style.cursor = p;
    }
    function w() {
      return e.canvas.style.cursor;
    }
    function u(p) {
      if (p)
        try {
          let E = e.canvas.requestPointerLock();
          E?.catch && E.catch((B) => console.error(B));
        } catch (E) {
          console.error(E);
        }
      else document.exitPointerLock();
    }
    function g() {
      return !!document.pointerLockElement;
    }
    function f(p) {
      p.requestFullscreen
        ? p.requestFullscreen()
        : p.webkitRequestFullscreen && p.webkitRequestFullscreen();
    }
    function x() {
      document.exitFullscreen
        ? document.exitFullscreen()
        : document.webkitExitFullScreen && document.webkitExitFullScreen();
    }
    function m(p = !0) {
      p ? f(e.canvas) : x();
    }
    function y() {
      return (
        document.fullscreenElement === e.canvas ||
        document.webkitFullscreenElement === e.canvas
      );
    }
    function q() {
      e.stopped = !0;
      let p = Object.entries(Ae),
        E = Object.entries(vr),
        B = Object.entries(Xt);
      for (let [T, Q] of p) e.canvas.removeEventListener(T, Q);
      for (let [T, Q] of E) document.removeEventListener(T, Q);
      for (let [T, Q] of B) window.removeEventListener(T, Q);
      fs.disconnect();
    }
    function C(p, E) {
      e.loopID !== null && cancelAnimationFrame(e.loopID);
      let B = 0,
        T = 0,
        Q = (re) => {
          if (e.stopped) return;
          if (document.visibilityState !== "visible") {
            e.loopID = requestAnimationFrame(Q);
            return;
          }
          let Se = re / 1e3,
            dt = Math.min(Se - e.realTime, 0.25),
            Ne = t.maxFPS ? 1 / t.maxFPS : 0;
          if (((e.realTime = Se), (T += dt), T > Ne)) {
            if (!e.skipTime) {
              for (B += T, e.dt = e.fixedDt, e.restDt = 0; B > e.fixedDt; )
                ((B -= e.fixedDt), B < e.fixedDt && (e.restDt = B), p());
              ((e.restDt = B),
                (e.dt = T),
                (e.time += r()),
                e.fpsCounter.tick(e.dt));
            }
            ((T = 0), (e.skipTime = !1), e.numFrames++, E(Kn, Vn));
          }
          e.loopID = requestAnimationFrame(Q);
        };
      Q(0);
    }
    function D() {
      return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    }
    function S() {
      return e.mousePos.clone();
    }
    function A() {
      return e.mouseDeltaPos.clone();
    }
    function v(p = "left") {
      return e.mouseState.pressed.has(p);
    }
    function R(p = "left") {
      return e.mouseState.down.has(p);
    }
    function I(p = "left") {
      return e.mouseState.released.has(p);
    }
    function P() {
      return e.isMouseMoved;
    }
    function k(p) {
      return p === void 0
        ? e.keyState.pressed.size > 0
        : De(e.keyState.pressed, p);
    }
    function O(p) {
      return p === void 0
        ? e.keyState.pressedRepeat.size > 0
        : De(e.keyState.pressedRepeat, p);
    }
    function K(p) {
      return p === void 0 ? e.keyState.down.size > 0 : De(e.keyState.down, p);
    }
    function V(p) {
      return p === void 0
        ? e.keyState.released.size > 0
        : De(e.keyState.released, p);
    }
    function X(p) {
      return p === void 0
        ? e.mergedGamepadState.buttonState.pressed.size > 0
        : De(e.mergedGamepadState.buttonState.pressed, p);
    }
    function N(p) {
      return p === void 0
        ? e.mergedGamepadState.buttonState.down.size > 0
        : De(e.mergedGamepadState.buttonState.down, p);
    }
    function U(p) {
      return p === void 0
        ? e.mergedGamepadState.buttonState.released.size > 0
        : De(e.mergedGamepadState.buttonState.released, p);
    }
    function te(p) {
      return p === void 0
        ? e.buttonState.pressed.size > 0
        : De(e.buttonState.pressed, p);
    }
    function z(p) {
      return p === void 0
        ? e.buttonState.down.size > 0
        : De(e.buttonState.down, p);
    }
    function Z(p) {
      return p === void 0
        ? e.buttonState.released.size > 0
        : De(e.buttonState.released, p);
    }
    function ce(p) {
      return e.buttons?.[p];
    }
    function L(p, E) {
      e.buttons[p] = { ...e.buttons[p], ...E };
    }
    function Ze(p) {
      (e.buttonState.press(p), e.events.trigger("buttonPress", p));
    }
    function ut(p) {
      (e.buttonState.release(p), e.events.trigger("buttonRelease", p));
    }
    function At(p) {
      return e.events.on("resize", p);
    }
    let Ht = ee(
        (p) => e.events.on("keyDown", p),
        (p, E) => e.events.on("keyDown", (B) => qe(p, B) && E(B)),
      ),
      Gt = ee(
        (p) => e.events.on("keyPress", (E) => p(E)),
        (p, E) => e.events.on("keyPress", (B) => qe(p, B) && E(B)),
      ),
      gr = ee(
        (p) => e.events.on("keyPressRepeat", p),
        (p, E) => e.events.on("keyPressRepeat", (B) => qe(p, B) && E(B)),
      ),
      mr = ee(
        (p) => e.events.on("keyRelease", p),
        (p, E) => e.events.on("keyRelease", (B) => qe(p, B) && E(B)),
      ),
      ht = ee(
        (p) => e.events.on("mouseDown", (E) => p(E)),
        (p, E) => e.events.on("mouseDown", (B) => qe(p, B) && E(B)),
      ),
      Te = ee(
        (p) => e.events.on("mousePress", (E) => p(E)),
        (p, E) => e.events.on("mousePress", (B) => qe(p, B) && E(B)),
      ),
      jt = ee(
        (p) => e.events.on("mouseRelease", (E) => p(E)),
        (p, E) => e.events.on("mouseRelease", (B) => B === p && E(B)),
      );
    function F(p) {
      return e.events.on("mouseMove", () => p(S(), A()));
    }
    function H(p) {
      return e.events.on("charInput", p);
    }
    function j(p) {
      return e.events.on("touchStart", p);
    }
    function _(p) {
      return e.events.on("touchMove", p);
    }
    function le(p) {
      return e.events.on("touchEnd", p);
    }
    function W(p) {
      return e.events.on("scroll", p);
    }
    function ge(p) {
      return e.events.on("hide", p);
    }
    function Ke(p) {
      return e.events.on("show", p);
    }
    let wr = ee(
        (p) => e.events.on("gamepadButtonPress", (E, B) => p(E, B)),
        (p, E) =>
          e.events.on("gamepadButtonPress", (B, T) => qe(p, B) && E(B, T)),
      ),
      yr = ee(
        (p) => e.events.on("gamepadButtonDown", (E, B) => p(E, B)),
        (p, E) =>
          e.events.on("gamepadButtonDown", (B, T) => qe(p, B) && E(B, T)),
      ),
      Ar = ee(
        (p) => e.events.on("gamepadButtonRelease", (E, B) => p(E, B)),
        (p, E) =>
          e.events.on("gamepadButtonRelease", (B, T) => qe(p, B) && E(B, T)),
      );
    function xr(p, E) {
      return e.events.on("gamepadStick", (B, T, Q) => B === p && E(T, Q));
    }
    function Kt(p) {
      e.events.on("gamepadConnect", p);
    }
    function ke(p) {
      e.events.on("gamepadDisconnect", p);
    }
    function Ve(p) {
      return e.mergedGamepadState.stickState.get(p) || new M(0);
    }
    function Vt() {
      return [...e.charInputted];
    }
    function ye() {
      return [...e.gamepads];
    }
    let xt = ee(
        (p) => e.events.on("buttonPress", (E) => p(E)),
        (p, E) => e.events.on("buttonPress", (B) => qe(p, B) && E(B)),
      ),
      Le = ee(
        (p) => e.events.on("buttonDown", (E) => p(E)),
        (p, E) => e.events.on("buttonDown", (B) => qe(p, B) && E(B)),
      ),
      Yt = ee(
        (p) => e.events.on("buttonRelease", (E) => p(E)),
        (p, E) => e.events.on("buttonRelease", (B) => qe(p, B) && E(B)),
      );
    function Kn() {
      (e.events.trigger("input"),
        e.keyState.down.forEach((p) => e.events.trigger("keyDown", p)),
        e.mouseState.down.forEach((p) => e.events.trigger("mouseDown", p)),
        e.buttonState.down.forEach((p) => {
          e.events.trigger("buttonDown", p);
        }),
        Xn());
    }
    function Vn() {
      (e.keyState.update(),
        e.mouseState.update(),
        e.buttonState.update(),
        e.mergedGamepadState.buttonState.update(),
        e.mergedGamepadState.stickState.forEach((p, E) => {
          e.mergedGamepadState.stickState.set(E, new M(0));
        }),
        (e.charInputted = []),
        (e.isMouseMoved = !1),
        (e.mouseDeltaPos = new M(0)),
        e.gamepadStates.forEach((p) => {
          (p.buttonState.update(),
            p.stickState.forEach((E, B) => {
              p.stickState.set(B, new M(0));
            }));
        }));
    }
    function us(p) {
      let E = {
        index: p.index,
        isPressed: (B) =>
          e.gamepadStates.get(p.index)?.buttonState.pressed.has(B) || !1,
        isDown: (B) =>
          e.gamepadStates.get(p.index)?.buttonState.down.has(B) || !1,
        isReleased: (B) =>
          e.gamepadStates.get(p.index)?.buttonState.released.has(B) || !1,
        getStick: (B) => e.gamepadStates.get(p.index)?.stickState.get(B) || b(),
      };
      return (
        e.gamepads.push(E),
        e.gamepadStates.set(p.index, {
          buttonState: new Ct(),
          stickState: new Map([
            ["left", new M(0)],
            ["right", new M(0)],
          ]),
        }),
        E
      );
    }
    function Yn(p) {
      ((e.gamepads = e.gamepads.filter((E) => E.index !== p.index)),
        e.gamepadStates.delete(p.index));
    }
    function Xn() {
      for (let p of navigator.getGamepads())
        p && !e.gamepadStates.has(p.index) && us(p);
      for (let p of e.gamepads) {
        let E = navigator.getGamepads()[p.index];
        if (!E) continue;
        let B = (t.gamepads ?? {})[E.id] || As[E.id] || As.default,
          T = e.gamepadStates.get(p.index);
        if (T) {
          for (let Q = 0; Q < E.buttons.length; Q++) {
            let re = B.buttons[Q],
              Se = E.buttons[Q],
              dt = e.buttonsByGamepad.has(re);
            if (Se.pressed) {
              if (T.buttonState.down.has(re)) {
                e.events.trigger("gamepadButtonDown", re, p);
                continue;
              }
              ((e.lastInputDevice = "gamepad"),
                dt &&
                  e.buttonsByGamepad.get(re)?.forEach((Ne) => {
                    (e.buttonState.press(Ne),
                      e.events.trigger("buttonPress", Ne));
                  }),
                e.mergedGamepadState.buttonState.press(re),
                T.buttonState.press(re),
                e.events.trigger("gamepadButtonPress", re, p));
            } else
              T.buttonState.down.has(re) &&
                (dt &&
                  e.buttonsByGamepad.get(re)?.forEach((Ne) => {
                    (e.buttonState.release(Ne),
                      e.events.trigger("buttonRelease", Ne));
                  }),
                e.mergedGamepadState.buttonState.release(re),
                T.buttonState.release(re),
                e.events.trigger("gamepadButtonRelease", re, p));
          }
          for (let Q in B.sticks) {
            let re = B.sticks[Q];
            if (!re) continue;
            let Se = new M(E.axes[re.x], E.axes[re.y]);
            (T.stickState.set(Q, Se),
              e.mergedGamepadState.stickState.set(Q, Se),
              e.events.trigger("gamepadStick", Q, Se, p));
          }
        }
      }
    }
    let Ae = {},
      vr = {},
      Xt = {},
      hs = t.pixelDensity || 1;
    Ae.mousemove = (p) => {
      let E = He(new M(p.offsetX, p.offsetY)),
        B = new M(p.movementX, p.movementY);
      if (y()) {
        let T = e.canvas.width / hs,
          Q = e.canvas.height / hs,
          re = window.innerWidth,
          Se = window.innerHeight,
          dt = re / Se,
          Ne = T / Q;
        if (dt > Ne) {
          let _e = Se / Q,
            br = (re - T * _e) / 2;
          ((E.x = Fe(p.offsetX - br, 0, T * _e, 0, T)),
            (E.y = Fe(p.offsetY, 0, Q * _e, 0, Q)));
        } else {
          let _e = re / T,
            br = (Se - Q * _e) / 2;
          ((E.x = Fe(p.offsetX, 0, T * _e, 0, T)),
            (E.y = Fe(p.offsetY - br, 0, Q * _e, 0, Q)));
        }
      }
      e.events.onOnce("input", () => {
        ((e.isMouseMoved = !0),
          (e.mousePos = E),
          (e.mouseDeltaPos = B),
          e.events.trigger("mouseMove"));
      });
    };
    let ds = ["left", "middle", "right", "back", "forward"];
    ((Ae.mousedown = (p) => {
      e.events.onOnce("input", () => {
        let E = ds[p.button];
        E &&
          ((e.lastInputDevice = "mouse"),
          e.buttonsByMouse.has(E) &&
            e.buttonsByMouse.get(E)?.forEach((B) => {
              (e.buttonState.press(B), e.events.trigger("buttonPress", B));
            }),
          e.mouseState.press(E),
          e.events.trigger("mousePress", E));
      });
    }),
      (Ae.mouseup = (p) => {
        e.events.onOnce("input", () => {
          let E = ds[p.button];
          E &&
            (e.buttonsByMouse.has(E) &&
              e.buttonsByMouse.get(E)?.forEach((B) => {
                (e.buttonState.release(B),
                  e.events.trigger("buttonRelease", B));
              }),
            e.mouseState.release(E),
            e.events.trigger("mouseRelease", E));
        });
      }));
    let zn = new Set([
        " ",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ]),
      cs = {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowUp: "up",
        ArrowDown: "down",
        " ": "space",
      };
    ((Ae.keydown = (p) => {
      (zn.has(p.key) && p.preventDefault(),
        e.events.onOnce("input", () => {
          let E = cs[p.key] || p.key.toLowerCase(),
            B = p.code;
          if (E === void 0) throw new Error(`Unknown key: ${p.key}`);
          (E.length === 1
            ? (e.events.trigger("charInput", E), e.charInputted.push(E))
            : E === "space" &&
              (e.events.trigger("charInput", " "), e.charInputted.push(" ")),
            p.repeat
              ? (e.keyState.pressRepeat(E),
                e.events.trigger("keyPressRepeat", E))
              : ((e.lastInputDevice = "keyboard"),
                e.buttonsByKey.has(E) &&
                  e.buttonsByKey.get(E)?.forEach((T) => {
                    (e.buttonState.press(T),
                      e.events.trigger("buttonPress", T));
                  }),
                e.buttonsByKeyCode.has(B) &&
                  e.buttonsByKeyCode.get(B)?.forEach((T) => {
                    (e.buttonState.press(T),
                      e.events.trigger("buttonPress", T));
                  }),
                e.keyState.press(E),
                e.events.trigger("keyPressRepeat", E),
                e.events.trigger("keyPress", E)));
        }));
    }),
      (Ae.keyup = (p) => {
        e.events.onOnce("input", () => {
          let E = cs[p.key] || p.key.toLowerCase(),
            B = p.code;
          (e.buttonsByKey.has(E) &&
            e.buttonsByKey.get(E)?.forEach((T) => {
              (e.buttonState.release(T), e.events.trigger("buttonRelease", T));
            }),
            e.buttonsByKeyCode.has(B) &&
              e.buttonsByKeyCode.get(B)?.forEach((T) => {
                (e.buttonState.release(T),
                  e.events.trigger("buttonRelease", T));
              }),
            e.keyState.release(E),
            e.events.trigger("keyRelease", E));
        });
      }),
      (Ae.touchstart = (p) => {
        (p.preventDefault(),
          e.events.onOnce("input", () => {
            let E = [...p.changedTouches],
              B = e.canvas.getBoundingClientRect();
            (t.touchToMouse !== !1 &&
              ((e.mousePos = He(new M(E[0].clientX - B.x, E[0].clientY - B.y))),
              (e.lastInputDevice = "mouse"),
              e.buttonsByMouse.has("left") &&
                e.buttonsByMouse.get("left")?.forEach((T) => {
                  (e.buttonState.press(T), e.events.trigger("buttonPress", T));
                }),
              e.mouseState.press("left"),
              e.events.trigger("mousePress", "left")),
              E.forEach((T) => {
                e.events.trigger(
                  "touchStart",
                  He(new M(T.clientX - B.x, T.clientY - B.y)),
                  T,
                );
              }));
          }));
      }),
      (Ae.touchmove = (p) => {
        (p.preventDefault(),
          e.events.onOnce("input", () => {
            let E = [...p.changedTouches],
              B = e.canvas.getBoundingClientRect();
            if (t.touchToMouse !== !1) {
              let T = e.mousePos;
              ((e.mousePos = He(new M(E[0].clientX - B.x, E[0].clientY - B.y))),
                (e.mouseDeltaPos = e.mousePos.sub(T)),
                e.events.trigger("mouseMove"));
            }
            E.forEach((T) => {
              e.events.trigger(
                "touchMove",
                He(new M(T.clientX - B.x, T.clientY - B.y)),
                T,
              );
            });
          }));
      }),
      (Ae.touchend = (p) => {
        e.events.onOnce("input", () => {
          let E = [...p.changedTouches],
            B = e.canvas.getBoundingClientRect();
          (t.touchToMouse !== !1 &&
            ((e.mousePos = He(new M(E[0].clientX - B.x, E[0].clientY - B.y))),
            (e.mouseDeltaPos = new M(0, 0)),
            e.buttonsByMouse.has("left") &&
              e.buttonsByMouse.get("left")?.forEach((T) => {
                (e.buttonState.release(T),
                  e.events.trigger("buttonRelease", T));
              }),
            e.mouseState.release("left"),
            e.events.trigger("mouseRelease", "left")),
            E.forEach((T) => {
              e.events.trigger(
                "touchEnd",
                He(new M(T.clientX - B.x, T.clientY - B.y)),
                T,
              );
            }));
        });
      }),
      (Ae.touchcancel = (p) => {
        e.events.onOnce("input", () => {
          let E = [...p.changedTouches],
            B = e.canvas.getBoundingClientRect();
          (t.touchToMouse !== !1 &&
            ((e.mousePos = He(new M(E[0].clientX - B.x, E[0].clientY - B.y))),
            e.mouseState.release("left"),
            e.events.trigger("mouseRelease", "left")),
            E.forEach((T) => {
              e.events.trigger(
                "touchEnd",
                He(new M(T.clientX - B.x, T.clientY - B.y)),
                T,
              );
            }));
        });
      }),
      (Ae.wheel = (p) => {
        (p.preventDefault(),
          e.events.onOnce("input", () => {
            e.events.trigger("scroll", new M(p.deltaX, p.deltaY));
          }));
      }),
      (Ae.contextmenu = (p) => p.preventDefault()),
      (vr.visibilitychange = () => {
        document.visibilityState === "visible"
          ? ((e.skipTime = !0), (e.isHidden = !1), e.events.trigger("show"))
          : ((e.isHidden = !0), e.events.trigger("hide"));
      }),
      (Xt.gamepadconnected = (p) => {
        let E = us(p.gamepad);
        e.events.onOnce("input", () => {
          e.events.trigger("gamepadConnect", E);
        });
      }),
      (Xt.gamepaddisconnected = (p) => {
        let E = ye().filter((B) => B.index === p.gamepad.index)[0];
        (Yn(p.gamepad),
          e.events.onOnce("input", () => {
            e.events.trigger("gamepadDisconnect", E);
          }));
      }));
    for (let [p, E] of Object.entries(Ae)) e.canvas.addEventListener(p, E);
    for (let [p, E] of Object.entries(vr)) document.addEventListener(p, E);
    for (let [p, E] of Object.entries(Xt)) window.addEventListener(p, E);
    let fs = new ResizeObserver((p) => {
      for (let E of p)
        if (E.target === e.canvas) {
          if (
            e.lastWidth === e.canvas.offsetWidth &&
            e.lastHeight === e.canvas.offsetHeight
          )
            return;
          ((e.lastWidth = e.canvas.offsetWidth),
            (e.lastHeight = e.canvas.offsetHeight),
            e.events.onOnce("input", () => {
              e.events.trigger("resize");
            }));
        }
    });
    return (
      fs.observe(e.canvas),
      {
        state: e,
        dt: r,
        fixedDt: s,
        restDt: n,
        time: a,
        run: C,
        canvas: e.canvas,
        fps: d,
        numFrames: l,
        quit: q,
        isHidden: i,
        setFullscreen: m,
        isFullscreen: y,
        setCursor: c,
        screenshot: o,
        getGamepads: ye,
        getCursor: w,
        setCursorLocked: u,
        isCursorLocked: g,
        isTouchscreen: D,
        mousePos: S,
        mouseDeltaPos: A,
        isKeyDown: K,
        isKeyPressed: k,
        isKeyPressedRepeat: O,
        isKeyReleased: V,
        isMouseDown: R,
        isMousePressed: v,
        isMouseReleased: I,
        isMouseMoved: P,
        isGamepadButtonPressed: X,
        isGamepadButtonDown: N,
        isGamepadButtonReleased: U,
        getGamepadStick: Ve,
        isButtonPressed: te,
        isButtonDown: z,
        isButtonReleased: Z,
        setButton: L,
        getButton: ce,
        pressButton: Ze,
        releaseButton: ut,
        charInputted: Vt,
        onResize: At,
        onKeyDown: Ht,
        onKeyPress: Gt,
        onKeyPressRepeat: gr,
        onKeyRelease: mr,
        onMouseDown: ht,
        onMousePress: Te,
        onMouseRelease: jt,
        onMouseMove: F,
        onCharInput: H,
        onTouchStart: j,
        onTouchMove: _,
        onTouchEnd: le,
        onScroll: W,
        onHide: ge,
        onShow: Ke,
        onGamepadButtonDown: yr,
        onGamepadButtonPress: wr,
        onGamepadButtonRelease: Ar,
        onGamepadStick: xr,
        onGamepadConnect: Kt,
        onGamepadDisconnect: ke,
        onButtonPress: xt,
        onButtonDown: Le,
        onButtonRelease: Yt,
        getLastInputDeviceType: va,
        events: e.events,
      }
    );
  };
function de() {
  return h.app.dt();
}
function Or() {
  return h.app.fixedDt();
}
function Ur() {
  return h.app.restDt();
}
var Ba = new M(-1, -1),
  Ra = new M(0, -1),
  Ca = new M(1, -1),
  Ia = new M(-1, 0),
  Pa = new M(0, 0),
  Ta = new M(1, 0),
  ka = new M(-1, 1),
  Da = new M(0, 1),
  Fa = new M(1, 1);
function wt(t) {
  switch (t) {
    case "topleft":
      return Ba;
    case "top":
      return Ra;
    case "topright":
      return Ca;
    case "left":
      return Ia;
    case "center":
      return Pa;
    case "right":
      return Ta;
    case "botleft":
      return ka;
    case "bot":
      return Da;
    case "botright":
      return Fa;
    default:
      return t;
  }
}
function Oa(t) {
  switch (t) {
    case "left":
      return 0;
    case "center":
      return 0.5;
    case "right":
      return 1;
    default:
      return 0;
  }
}
function Ua(t) {
  return t.createBuffer(1, 1, 44100);
}
var Wt = 2.5949095,
  xs = 1.70158 + 1,
  vs = (2 * Math.PI) / 3,
  bs = (2 * Math.PI) / 4.5,
  Qt = {
    linear: (t) => t,
    easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
    easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
    easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => 1 - (1 - t) * (1 - t),
    easeInOutQuad: (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
    easeInOutQuart: (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
    easeInOutQuint: (t) =>
      t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
    easeInExpo: (t) => (t === 0 ? 0 : Math.pow(2, 10 * t - 10)),
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutExpo: (t) =>
      t === 0
        ? 0
        : t === 1
          ? 1
          : t < 0.5
            ? Math.pow(2, 20 * t - 10) / 2
            : (2 - Math.pow(2, -20 * t + 10)) / 2,
    easeInCirc: (t) => 1 - Math.sqrt(1 - Math.pow(t, 2)),
    easeOutCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    easeInOutCirc: (t) =>
      t < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2,
    easeInBack: (t) => xs * t * t * t - 1.70158 * t * t,
    easeOutBack: (t) =>
      1 + xs * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
    easeInOutBack: (t) =>
      t < 0.5
        ? (Math.pow(2 * t, 2) * ((Wt + 1) * 2 * t - Wt)) / 2
        : (Math.pow(2 * t - 2, 2) * ((Wt + 1) * (t * 2 - 2) + Wt) + 2) / 2,
    easeInElastic: (t) =>
      t === 0
        ? 0
        : t === 1
          ? 1
          : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * vs),
    easeOutElastic: (t) =>
      t === 0
        ? 0
        : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * vs) + 1,
    easeInOutElastic: (t) =>
      t === 0
        ? 0
        : t === 1
          ? 1
          : t < 0.5
            ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * bs)) / 2
            : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * bs)) /
                2 +
              1,
    easeInBounce: (t) => 1 - Qt.easeOutBounce(1 - t),
    easeOutBounce: (t) =>
      t < 1 / 2.75
        ? 7.5625 * t * t
        : t < 2 / 2.75
          ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
          : t < 2.5 / 2.75
            ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
            : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375,
    easeInOutBounce: (t) =>
      t < 0.5
        ? (1 - Qt.easeOutBounce(1 - 2 * t)) / 2
        : (1 + Qt.easeOutBounce(2 * t - 1)) / 2,
  },
  Dt = Qt;
function La(t, e, r) {
  let s = [],
    n = e;
  for (s.push(n); n !== t; ) {
    if (((n = r.get(n)), n == null)) return null;
    s.push(n);
  }
  return s.reverse();
}
function Na(t, e, r) {
  let s = new Zs((a, d) => a.cost < d.cost);
  s.insert({ cost: 0, node: e });
  let n = new Map();
  n.set(e, e);
  let i = new Map();
  for (i.set(e, 0); s.length !== 0; ) {
    let a = s.remove()?.node;
    if (a === r) break;
    let d = t.getNeighbours(a);
    for (let l of d) {
      let o = (i.get(a) || 0) + t.getCost(a, l) + t.getHeuristic(l, r);
      (!i.has(l) || o < i.get(l)) &&
        (i.set(l, o), s.insert({ cost: o, node: l }), n.set(l, a));
    }
  }
  return La(e, r, n);
}
var Ha = class {
    a;
    b;
    polygon;
    constructor(t, e, r) {
      ((this.a = t), (this.b = e), (this.polygon = new WeakRef(r)));
    }
    isLeft(t, e) {
      return (
        (this.b.x - this.a.x) * (e - this.a.y) -
        (t - this.a.x) * (this.b.y - this.a.y)
      );
    }
    get middle() {
      return this.a.add(this.b).scale(0.5);
    }
  },
  Ga = class {
    _edges;
    _centroid;
    _id;
    constructor(t) {
      this._id = t;
    }
    get id() {
      return this._id;
    }
    set edges(t) {
      this._edges = t;
      let e = 0,
        r = 0,
        s = 0;
      for (let n of this._edges) {
        n.polygon = new WeakRef(this);
        let i = n.a.x * n.b.y - n.a.y * n.b.x;
        ((e += (n.a.x + n.b.x) * i), (r += (n.a.y + n.b.y) * i), (s += i));
      }
      ((s /= 2), (this._centroid = b(e / (6 * s), r / (6 * s))));
    }
    get edges() {
      return this._edges;
    }
    get centroid() {
      return this._centroid;
    }
    contains(t) {
      let e = !1;
      for (let r of this.edges)
        r.b.y > t.y != r.a.y > t.y &&
          t.x < ((r.a.x - r.b.x) * (t.y - r.b.y)) / (r.a.y - r.b.y) + r.b.x &&
          (e = !e);
      return e;
    }
  },
  ja = class {
    _polygons;
    _pointCache;
    _edgeCache;
    constructor() {
      ((this._polygons = []), (this._pointCache = {}), (this._edgeCache = {}));
    }
    _addPoint(t) {
      let e = this._pointCache[`${t.x}_${t.y}`];
      return e || ((e = t.clone()), (this._pointCache[`${t.x}_${t.y}`] = e), e);
    }
    _addEdge(t) {
      let e = `${t.a.x}_${t.a.y}-${t.b.x}_${t.b.y}`;
      return ((this._edgeCache[e] = t), t);
    }
    _findEdge(t, e) {
      let r = `${t.x}_${t.y}-${e.x}_${e.y}`;
      return this._edgeCache[r];
    }
    _findCommonEdge(t, e) {
      for (let r of t.edges) {
        let s = this._findEdge(r.b, r.a);
        if (s && s.polygon.deref().id === e.id) return s;
      }
      return null;
    }
    addPolygon(t) {
      let e = new Ga(this._polygons.length),
        r = t.map((s, n) => new Ha(s, t[(n + 1) % t.length], e));
      ((e.edges = r), this._polygons.push(e));
      for (let s of e.edges) this._addEdge(s);
      return e;
    }
    addRect(t, e) {
      let r = this._addPoint(t),
        s = this._addPoint(t.add(e.x, 0)),
        n = this._addPoint(t.add(e)),
        i = this._addPoint(t.add(0, e.y));
      return this.addPolygon([r, s, n, i]);
    }
    _getLocation(t) {
      for (let e of this._polygons) if (e.contains(t)) return e;
      return null;
    }
    getNeighbours(t) {
      let e = [];
      for (let r of this._polygons[t].edges) {
        let s = this._findEdge(r.b, r.a);
        if (s) {
          let n = s.polygon.deref();
          n && e.push(n.id);
        }
      }
      return e;
    }
    getCost(t, e) {
      return 1;
    }
    getHeuristic(t, e) {
      let r = this._polygons[t],
        s = this._polygons[e],
        n = r.centroid.x - s.centroid.x,
        i = r.centroid.y - s.centroid.y;
      return Math.sqrt(n * n + i * i);
    }
    getPath(t, e) {
      return t === void 0 || e === void 0
        ? []
        : t === e
          ? [t, e]
          : Na(this, t, e);
    }
    getWaypointPath(t, e, r) {
      let s = r?.type || "centroids",
        n = this._getLocation(t),
        i = this._getLocation(e);
      if (n === void 0 || i === void 0) return [];
      let a = this.getPath(n.id, i.id);
      if (!a) return [];
      if (s === "edges") {
        let d = [];
        for (let l = 1; l < a.length; l++) {
          let o = this._polygons[a[l - 1]],
            c = this._polygons[a[l]],
            w = this._findCommonEdge(o, c);
          d.push(w.middle.add(c.centroid.sub(w.middle).unit().scale(4)));
        }
        return [t, ...d, e];
      } else
        return [t, ...a.slice(1, -1).map((d) => this._polygons[d].centroid), e];
    }
  };
function It(t) {
  let e = new Ue();
  return (
    t.pos && e.translate(t.pos),
    t.scale && e.scale(t.scale),
    t.angle && e.rotate(t.angle),
    t.parent ? e.mult(t.parent.transform) : e
  );
}
function Ka(t) {
  return new M((t.x / fe()) * 2 - 1, (-t.y / pe()) * 2 + 1);
}
function qt(t, e, r, s, n, i = 1) {
  ((s = oe(s % 360)), (n = oe(n % 360)), n <= s && (n += Math.PI * 2));
  let a = [],
    d = Math.ceil(((n - s) / oe(8)) * i),
    l = (n - s) / d,
    o = b(Math.cos(s), Math.sin(s)),
    c = b(Math.cos(l), Math.sin(l));
  for (let w = 0; w <= d; w++)
    (a.push(t.add(e * o.x, r * o.y)),
      (o = b(o.x * c.x - o.y * c.y, o.x * c.y + o.y * c.x)));
  return a;
}
function Va(...t) {
  let e = J(...t),
    r = t[3] ?? 1;
  ((h.gfx.bgColor = e),
    (h.gfx.bgAlpha = r),
    h.gfx.ggl.gl.clearColor(e.r / 255, e.g / 255, e.b / 255, r));
}
function Ya() {
  return h.gfx.bgColor?.clone?.() ?? null;
}
function ne(...t) {
  if (t[0] === void 0) return;
  let e = b(...t);
  (e.x === 0 && e.y === 0) || h.gfx.transform.translate(e);
}
function Be() {
  h.gfx.transformStack.push(h.gfx.transform.clone());
}
function Xa(t) {
  h.gfx.transform = t.clone();
}
function Ft(...t) {
  if (t[0] === void 0) return;
  let e = b(...t);
  (e.x === 1 && e.y === 1) || h.gfx.transform.scale(e);
}
function gt(t) {
  t && h.gfx.transform.rotate(t);
}
function xe() {
  h.gfx.transformStack.length > 0 &&
    (h.gfx.transform = h.gfx.transformStack.pop());
}
function Re() {
  h.gfx.renderer.flush();
}
function fe() {
  return h.gfx.width;
}
function pe() {
  return h.gfx.height;
}
function tn() {
  return (
    (h.gfx.viewport.width + h.gfx.viewport.height) /
    (h.gfx.width + h.gfx.height)
  );
}
function sr() {
  return b(fe() / 2, pe() / 2);
}
var za = class {
  lastTextureId = 0;
  textures = [];
  bigTextures = [];
  texturesPosition = new Map();
  canvas;
  c2d;
  x = 0;
  y = 0;
  curHeight = 0;
  gfx;
  padding;
  constructor(t, e, r, s) {
    ((this.gfx = t),
      (this.canvas = document.createElement("canvas")),
      (this.canvas.width = e),
      (this.canvas.height = r),
      (this.textures = [ze.fromImage(t, this.canvas)]),
      (this.bigTextures = []),
      (this.padding = s));
    let n = this.canvas.getContext("2d");
    if (!n) throw new Error("Failed to get 2d context");
    this.c2d = n;
  }
  addSingle(t) {
    let e = ze.fromImage(this.gfx, t);
    return (this.bigTextures.push(e), [e, new se(0, 0, 1, 1), 0]);
  }
  add(t) {
    let e = t.width + this.padding * 2,
      r = t.height + this.padding * 2;
    if (e > this.canvas.width || r > this.canvas.height)
      return this.addSingle(t);
    (this.x + e > this.canvas.width &&
      ((this.x = 0), (this.y += this.curHeight), (this.curHeight = 0)),
      this.y + r > this.canvas.height &&
        (this.c2d.clearRect(0, 0, this.canvas.width, this.canvas.height),
        this.textures.push(ze.fromImage(this.gfx, this.canvas)),
        (this.x = 0),
        (this.y = 0),
        (this.curHeight = 0)));
    let s = this.textures[this.textures.length - 1],
      n = new M(this.x + this.padding, this.y + this.padding);
    return (
      (this.x += e),
      r > this.curHeight && (this.curHeight = r),
      t instanceof ImageData
        ? this.c2d.putImageData(t, n.x, n.y)
        : this.c2d.drawImage(t, n.x, n.y),
      s.update(this.canvas),
      this.texturesPosition.set(this.lastTextureId, {
        position: n,
        size: new M(t.width, t.height),
        texture: s,
      }),
      this.lastTextureId++,
      [
        s,
        new se(
          n.x / this.canvas.width,
          n.y / this.canvas.height,
          t.width / this.canvas.width,
          t.height / this.canvas.height,
        ),
        this.lastTextureId - 1,
      ]
    );
  }
  free() {
    for (let t of this.textures) t.free();
    for (let t of this.bigTextures) t.free();
  }
};
function Ie(t) {
  return typeof t != "string" || $s(t) ? t : h.assets.urlPrefix + t;
}
var Pe = class rn {
    loaded = !1;
    data = null;
    error = null;
    onLoadEvents = new me();
    onErrorEvents = new me();
    onFinishEvents = new me();
    constructor(e) {
      e.then((r) => {
        ((this.loaded = !0), (this.data = r), this.onLoadEvents.trigger(r));
      })
        .catch((r) => {
          if (((this.error = r), this.onErrorEvents.numListeners() > 0))
            this.onErrorEvents.trigger(r);
          else throw r;
        })
        .finally(() => {
          (this.onFinishEvents.trigger(), (this.loaded = !0));
        });
    }
    static loaded(e) {
      let r = new rn(Promise.resolve(e));
      return ((r.data = e), (r.loaded = !0), r);
    }
    onLoad(e) {
      return (
        this.loaded && this.data ? e(this.data) : this.onLoadEvents.add(e),
        this
      );
    }
    onError(e) {
      return (
        this.loaded && this.error ? e(this.error) : this.onErrorEvents.add(e),
        this
      );
    }
    onFinish(e) {
      return (this.loaded ? e() : this.onFinishEvents.add(e), this);
    }
    then(e) {
      return this.onLoad(e);
    }
    catch(e) {
      return this.onError(e);
    }
    finally(e) {
      return this.onFinish(e);
    }
  },
  ct = class {
    assets = new Map();
    lastUID = 0;
    add(t, e) {
      let r = t ?? this.lastUID++ + "",
        s = new Pe(e);
      return (this.assets.set(r, s), s);
    }
    addLoaded(t, e) {
      let r = t ?? this.lastUID++ + "",
        s = Pe.loaded(e);
      return (this.assets.set(r, s), s);
    }
    get(t) {
      return this.assets.get(t);
    }
    progress() {
      if (this.assets.size === 0) return 1;
      let t = 0;
      return (
        this.assets.forEach((e) => {
          e.loaded && t++;
        }),
        t / this.assets.size
      );
    }
    getFailedAssets() {
      return Array.from(this.assets.keys())
        .filter((t) => this.assets.get(t).error !== null)
        .map((t) => [t, this.assets.get(t)]);
    }
  };
function ss(t) {
  return fetch(t).then((e) => {
    if (!e.ok) throw new Error(`Failed to fetch "${t}"`);
    return e;
  });
}
function cr(t) {
  return ss(t).then((e) => e.json());
}
function Wa(t) {
  return ss(t).then((e) => e.text());
}
function Qa(t) {
  return ss(t).then((e) => e.arrayBuffer());
}
function Ja(t) {
  return (t !== void 0 && (h.assets.urlPrefix = t), h.assets.urlPrefix);
}
function Za(t, e) {
  return h.assets.custom.add(t, cr(Ie(e)));
}
function fr(t) {
  let e = new Image();
  return (
    (e.crossOrigin = "anonymous"),
    (e.src = t),
    new Promise((r, s) => {
      ((e.onload = () => r(e)),
        (e.onerror = () => s(new Error(`Failed to load image from "${t}"`))));
    })
  );
}
function st() {
  let t = [
    h.assets.sprites,
    h.assets.sounds,
    h.assets.shaders,
    h.assets.fonts,
    h.assets.bitmapFonts,
    h.assets.custom,
  ];
  return t.reduce((e, r) => e + r.progress(), 0) / t.length;
}
function sn() {
  return [
    h.assets.sprites,
    h.assets.sounds,
    h.assets.shaders,
    h.assets.fonts,
    h.assets.bitmapFonts,
    h.assets.custom,
  ].reduce((t, e) => t.concat(e.getFailedAssets()), []);
}
function _a(t) {
  return h.assets.custom.get(t) ?? null;
}
function Lr(t) {
  return h.assets.custom.add(null, t);
}
var $a = (t, e) => ({
    urlPrefix: "",
    sprites: new ct(),
    fonts: new ct(),
    bitmapFonts: new ct(),
    sounds: new ct(),
    shaders: new ct(),
    custom: new ct(),
    music: {},
    packer: new za(t, 2048, 2048, e),
    loaded: !1,
  }),
  eo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA1CAYAAADyMeOEAAAAAXNSR0IArs4c6QAAAoVJREFUaIHdm7txwkAQhheGAqACiCHzOKQDQrqgILpwSAeEDBnEUAF0gCMxZ7G72qce/mec2Lpf9+3unaS78wgSNZ8uX5729+d1FNWXUuGmXlBOUUEIMckEpeQJgBu6C+BSFngztBR2vd+ovY+7g+p6LbgaWgJrAeUkDYIUXgXdBBwNi6kpABJwMTQH3AZsXRR8GHTfgEth8E3gjdAUcNewpbTgY85sCMCUuOokozE0YM0YRzM9NGAAXd8+omAF5h4lnmBRvpSnZHyLoLEbaN+aKB9KWv/KWw0tAbbANnlG+UvB2dm77NxxdwgBpjrF/d7rW9cbmpvio2A5z8iAYpVU8pGZlo6/2+MSco2lHfd3rv9jAP038e1xef9o2mjvYb2OqpqKE81028/jeietlSEVO5FRWsxWsJit1G3aFpW8iWe5RwpiCZAk25QvV6nz6fIlynRGuTd5WqpJ4guAlDfVKBK87hXljflgv1ON6fV+4+5gVlA17SfeG0heKqQd4l4jI/wrmaA9N9R4ar+wpHJDZyrrfcH0nB66PqAzPi76pn+faSyJk/vzOorYhGurQrzj/P68jtBMawHaHBIR9xoD5O34dy0qQOSYHvqExq2TpT2nf76+w7y251OYF0CRaU+J920TwLUa6inx6OxE6g80lu2ux7Y2eJLF/rCXE6zEPdnenk9o+4ih9AEdnW2q81HXl5LuU6OTl2fXUhqganbXAGq3g6jJOWV/OnoesO6YqqEB/GdNsjf7uHtwj2DzmRNpp7iOZfm6D9oAxB6Yi1gC4oIYeo4MIPdopEQRB+cAko5J1tW386HpB2Kz1eop4Epdwls/kgZ1sh8gZsEjdcWkr//D8Qu3Z3l5Nl1NtAAAAABJRU5ErkJggg==",
  Qe = class Bt {
    tex;
    frames = [new se(0, 0, 1, 1)];
    anims = {};
    slice9 = null;
    constructor(e, r, s = {}, n = null) {
      ((this.tex = e),
        r && (this.frames = r),
        (this.anims = s),
        (this.slice9 = n));
    }
    get width() {
      return this.tex.width * this.frames[0].w;
    }
    get height() {
      return this.tex.height * this.frames[0].h;
    }
    static from(e, r = {}) {
      return typeof e == "string"
        ? Bt.fromURL(e, r)
        : Promise.resolve(Bt.fromImage(e, r));
    }
    static fromImage(e, r = {}) {
      let [s, n] = r.singular
          ? h.assets.packer.addSingle(e)
          : h.assets.packer.add(e),
        i = r.frames
          ? r.frames.map(
              (a) =>
                new se(n.x + a.x * n.w, n.y + a.y * n.h, a.w * n.w, a.h * n.h),
            )
          : an(r.sliceX || 1, r.sliceY || 1, n.x, n.y, n.w, n.h);
      return new Bt(s, i, r.anims, r.slice9);
    }
    static fromURL(e, r = {}) {
      return fr(e).then((s) => Bt.fromImage(s, r));
    }
  };
function Jt(t) {
  if (typeof t == "string") {
    let e = nn(t);
    if (e) return e;
    if (st() < 1) return null;
    throw new Error(`Sprite not found: ${t}`);
  } else {
    if (t instanceof Qe) return Pe.loaded(t);
    if (t instanceof Pe) return t;
    throw new Error(`Invalid sprite: ${t}`);
  }
}
function nn(t) {
  return h.assets.sprites.get(t) ?? null;
}
function Pt(t, e, r = { sliceX: 1, sliceY: 1, anims: {} }) {
  return (
    (e = Ie(e)),
    Array.isArray(e)
      ? e.some((s) => typeof s == "string")
        ? h.assets.sprites.add(
            t,
            Promise.all(
              e.map((s) => (typeof s == "string" ? fr(s) : Promise.resolve(s))),
            ).then((s) => Es(s, r)),
          )
        : h.assets.sprites.addLoaded(t, Es(e, r))
      : typeof e == "string"
        ? h.assets.sprites.add(t, Qe.from(e, r))
        : h.assets.sprites.addLoaded(t, Qe.fromImage(e, r))
  );
}
function an(t = 1, e = 1, r = 0, s = 0, n = 1, i = 1) {
  let a = [],
    d = n / t,
    l = i / e;
  for (let o = 0; o < e; o++)
    for (let c = 0; c < t; c++) a.push(new se(r + c * d, s + o * l, d, l));
  return a;
}
function Es(t, e = {}) {
  let r = document.createElement("canvas"),
    s = t[0].width,
    n = t[0].height;
  ((r.width = s * t.length), (r.height = n));
  let i = r.getContext("2d");
  if (!i) throw new Error("Failed to create canvas context");
  t.forEach((d, l) => {
    d instanceof ImageData
      ? i.putImageData(d, l * s, 0)
      : i.drawImage(d, l * s, 0);
  });
  let a = i.getImageData(0, 0, t.length * s, n);
  return Qe.fromImage(a, { ...e, sliceX: t.length, sliceY: 1 });
}
function to(t = "bean") {
  return Pt(t, eo);
}
function ro(t, e, r) {
  ((e = Ie(e)),
    (r = Ie(r)),
    typeof e == "string" && !r && (r = na(e) + ".json"));
  let s = typeof r == "string" ? cr(r) : Promise.resolve(r);
  return h.assets.sprites.add(
    t,
    s.then((n) => {
      let i = n.meta.size,
        a = n.frames.map(
          (l) =>
            new se(
              l.frame.x / i.w,
              l.frame.y / i.h,
              l.frame.w / i.w,
              l.frame.h / i.h,
            ),
        ),
        d = {};
      for (let l of n.meta.frameTags)
        l.from === l.to
          ? (d[l.name] = l.from)
          : (d[l.name] = {
              from: l.from,
              to: l.to,
              speed: 10,
              loop: !0,
              pingpong: l.direction === "pingpong",
            });
      return Qe.from(e, { frames: a, anims: d });
    }),
  );
}
var Zt = class {
  fontface;
  filter = Tr;
  outline = null;
  size = 64;
  constructor(t, e = {}) {
    if (
      ((this.fontface = t),
      (this.filter = e.filter ?? Tr),
      (this.size = e.size ?? 64),
      this.size > 256)
    )
      throw new Error("Max font size: 256");
    e.outline &&
      ((this.outline = { width: 1, color: J(0, 0, 0) }),
      typeof e.outline == "number"
        ? (this.outline.width = e.outline)
        : typeof e.outline == "object" &&
          (e.outline.width && (this.outline.width = e.outline.width),
          e.outline.color && (this.outline.color = e.outline.color)));
  }
};
function on(t) {
  if (!t) return on(h.globalOpt.font ?? ji);
  if (typeof t == "string") {
    let e = un(t),
      r = ln(t);
    if (e) return e.data ?? e;
    if (r) return r.data ?? r;
    if (document.fonts.check(`64px ${t}`)) return t;
    if (st() < 1) return null;
    throw new Error(`Font not found: ${t}`);
  } else if (t instanceof Pe) return t.data ? t.data : t;
  return t;
}
function ln(t) {
  return h.assets.fonts.get(t) ?? null;
}
function so(t, e, r = {}) {
  let s = Ie(e),
    n = new FontFace(t, typeof e == "string" ? `url(${s})` : s);
  return (
    document.fonts.add(n),
    h.assets.fonts.add(
      t,
      n
        .load()
        .catch((i) => {
          throw new Error(`Failed to load font from "${s}": ${i}`);
        })
        .then((i) => new Zt(i, r)),
    )
  );
}
function no(t, e, r, s) {
  let n = t.width / e,
    i = {},
    a = s.split("").entries();
  for (let [d, l] of a) i[l] = new se((d % n) * e, Math.floor(d / n) * r, e, r);
  return { tex: t, map: i, size: r };
}
function un(t) {
  return h.assets.bitmapFonts.get(t) ?? null;
}
function io(t, e, r, s, n = {}) {
  let i = Ie(e);
  return h.assets.bitmapFonts.add(
    t,
    fr(i).then((a) => no(ze.fromImage(h.gfx.ggl, a, n), r, s, n.chars ?? Xs)),
  );
}
function ao(t, e) {
  return (
    (e = Ie(e)),
    h.assets.sprites.add(
      t,
      new Promise(async (r) => {
        let s = typeof e == "string" ? await cr(e) : e,
          n = await Promise.all(s.frames.map(fr)),
          i = document.createElement("canvas");
        ((i.width = s.width), (i.height = s.height * s.frames.length));
        let a = i.getContext("2d");
        if (!a) throw new Error("Failed to create canvas context");
        n.forEach((l, o) => {
          a.drawImage(l, 0, o * s.height);
        });
        let d = await Pt(null, i, { sliceY: s.frames.length, anims: s.anims });
        r(d);
      }),
    )
  );
}
var oo = class {
  ctx;
  glProgram;
  constructor(t, e, r, s) {
    ((this.ctx = t), t.onDestroy(() => this.free()));
    let n = t.gl,
      i = n.createShader(n.VERTEX_SHADER),
      a = n.createShader(n.FRAGMENT_SHADER);
    if (!i || !a) throw new Error("Failed to create shader");
    (n.shaderSource(i, e),
      n.shaderSource(a, r),
      n.compileShader(i),
      n.compileShader(a));
    let d = n.createProgram();
    if (
      ((this.glProgram = d),
      n.attachShader(d, i),
      n.attachShader(d, a),
      s.forEach((l, o) => n.bindAttribLocation(d, o, l)),
      n.linkProgram(d),
      !n.getProgramParameter(d, n.LINK_STATUS))
    ) {
      let l = n.getShaderInfoLog(i);
      if (l) throw new Error("VERTEX SHADER " + l);
      let o = n.getShaderInfoLog(a);
      if (o) throw new Error("FRAGMENT SHADER " + o);
    }
    (n.deleteShader(i), n.deleteShader(a));
  }
  bind() {
    this.ctx.pushProgram(this.glProgram);
  }
  unbind() {
    this.ctx.popProgram();
  }
  send(t) {
    let e = this.ctx.gl;
    for (let r in t) {
      let s = t[r],
        n = e.getUniformLocation(this.glProgram, r);
      if (typeof s == "number") e.uniform1f(n, s);
      else if (s instanceof Ue)
        e.uniformMatrix4fv(n, !1, new Float32Array(s.m));
      else if (s instanceof Y) e.uniform3f(n, s.r, s.g, s.b);
      else if (s instanceof M) e.uniform2f(n, s.x, s.y);
      else if (Array.isArray(s))
        (s[0],
          ea(s)
            ? e.uniform1fv(n, s)
            : $i(s)
              ? e.uniform2fv(n, s.map((i) => [i.x, i.y]).flat())
              : _i(s) && e.uniform3fv(n, s.map((i) => [i.r, i.g, i.b]).flat()));
      else throw new Error("Unsupported uniform data type");
    }
  }
  free() {
    this.ctx.gl.deleteProgram(this.glProgram);
  }
};
function ns(t, e = kr, r = Dr) {
  let s = Xi.replace("{{user}}", e ?? kr),
    n = zi.replace("{{user}}", r ?? Dr);
  try {
    return new oo(
      t,
      s,
      n,
      $r.map((i) => i.name),
    );
  } catch (i) {
    let a = /(?<type>^\w+) SHADER ERROR: 0:(?<line>\d+): (?<msg>.+)/,
      d = ia(i).match(a);
    if (!d?.groups) throw i;
    let l = Number(d.groups.line) - 14,
      o = d.groups.msg.trim(),
      c = d.groups.type.toLowerCase();
    throw new Error(`${c} shader line ${l}: ${o}`);
  }
}
function lo(t) {
  if (!t) return h.gfx.defShader;
  if (typeof t == "string") {
    let e = hn(t);
    if (e) return e.data ?? e;
    if (st() < 1) return null;
    throw new Error(`Shader not found: ${t}`);
  } else if (t instanceof Pe) return t.data ? t.data : t;
  return t;
}
function hn(t) {
  return h.assets.shaders.get(t) ?? null;
}
function uo(t, e, r) {
  return h.assets.shaders.addLoaded(t, ns(h.gfx.ggl, e, r));
}
function ho(t, e, r) {
  ((e = Ie(e)), (r = Ie(r)));
  let s = (i) => (i ? Wa(i) : Promise.resolve(null)),
    n = Promise.all([s(e), s(r)]).then(([i, a]) => ns(h.gfx.ggl, i, a));
  return h.assets.shaders.add(t, n);
}
var Ot = class _t {
  buf;
  constructor(e) {
    this.buf = e;
  }
  static fromArrayBuffer(e) {
    return new Promise((r, s) => h.audio.ctx.decodeAudioData(e, r, s)).then(
      (r) => new _t(r),
    );
  }
  static fromURL(e) {
    return $s(e)
      ? _t.fromArrayBuffer(ra(e))
      : Qa(e).then((r) => _t.fromArrayBuffer(r));
  }
};
function co(t) {
  if (typeof t == "string") {
    let e = dn(t);
    if (e) return e;
    if (st() < 1) return null;
    throw new Error(`Sound not found: ${t}`);
  } else {
    if (t instanceof Ot) return Pe.loaded(t);
    if (t instanceof Pe) return t;
    throw new Error(`Invalid sound: ${t}`);
  }
}
function dn(t) {
  return h.assets.sounds.get(t) ?? null;
}
function fo(t, e) {
  return (
    (e = Ie(e)),
    h.assets.sounds.add(
      t,
      typeof e == "string" ? Ot.fromURL(e) : Ot.fromArrayBuffer(e),
    )
  );
}
function po(t, e) {
  let r = Ie(e),
    s = new Audio(r);
  return ((s.preload = "auto"), (h.assets.music[t] = r));
}
function cn(t, e) {
  return (
    (t = Ie(t)),
    Lr(
      typeof e == "string"
        ? new Promise((r, s) => {
            cr(e).then((n) => {
              cn(t, n).then(r).catch(s);
            });
          })
        : Qe.from(t).then((r) => {
            let s = {};
            for (let n in e) {
              let i = e[n],
                a = r.frames[0],
                d = 2048 * a.w,
                l = 2048 * a.h,
                o = i.frames
                  ? i.frames.map(
                      (w) =>
                        new se(
                          a.x + ((i.x + w.x) / d) * a.w,
                          a.y + ((i.y + w.y) / l) * a.h,
                          (w.w / d) * a.w,
                          (w.h / l) * a.h,
                        ),
                    )
                  : an(
                      i.sliceX || 1,
                      i.sliceY || 1,
                      a.x + (i.x / d) * a.w,
                      a.y + (i.y / l) * a.h,
                      (i.width / d) * a.w,
                      (i.height / l) * a.h,
                    ),
                c = new Qe(r.tex, o, i.anims);
              (h.assets.sprites.addLoaded(n, c), (s[n] = c));
            }
            return s;
          }),
    )
  );
}
function Je(t, e, r = !1, s, n, i = {}) {
  let a = s ?? h.gfx.defTex,
    d = n ?? h.gfx.defShader,
    l = lo(d);
  if (!l || l instanceof Pe) return;
  let o =
      h.gfx.fixed || r
        ? h.gfx.transform
        : h.game.cam.transform.mult(h.gfx.transform),
    c = [];
  for (let w of t) {
    let u = Ka(o.multVec2(w.pos));
    c.push(
      u.x,
      u.y,
      w.uv.x,
      w.uv.y,
      w.color.r / 255,
      w.color.g / 255,
      w.color.b / 255,
      w.opacity,
    );
  }
  h.gfx.renderer.push(h.gfx.ggl.gl.TRIANGLES, c, e, l, a, i);
}
function Xe(t) {
  if (!t.pts) throw new Error('drawPolygon() requires property "pts".');
  let e = t.pts.length;
  if (!(e < 3)) {
    if (
      (Be(), ne(t.pos), Ft(t.scale), gt(t.angle), ne(t.offset), t.fill !== !1)
    ) {
      let r = t.color ?? Y.WHITE,
        s = t.pts.map((i, a) => ({
          pos: new M(i.x, i.y),
          uv: t.uv ? t.uv[a] : new M(0, 0),
          color: t.colors && t.colors[a] ? t.colors[a].mult(r) : r,
          opacity: t.opacity ?? 1,
        })),
        n;
      (t.triangulate
        ? (n = Ys(t.pts)
            .map((i) => i.map((a) => t.pts.indexOf(a)))
            .flat())
        : (n = [...Array(e - 2).keys()].map((i) => [0, i + 1, i + 2]).flat()),
        Je(
          s,
          t.indices ?? n,
          t.fixed,
          t.uv ? t.tex : h.gfx.defTex,
          t.shader,
          t.uniform ?? void 0,
        ));
    }
    (t.outline &&
      is({
        pts: [...t.pts, t.pts[0]],
        radius: t.radius,
        width: t.outline.width,
        color: t.outline.color,
        join: t.outline.join,
        uniform: t.uniform,
        fixed: t.fixed,
        opacity: t.opacity ?? t.outline.opacity,
      }),
      xe());
  }
}
function fn(t) {
  if (t.radiusX === void 0 || t.radiusY === void 0)
    throw new Error(
      'drawEllipse() requires properties "radiusX" and "radiusY".',
    );
  if (t.radiusX === 0 || t.radiusY === 0) return;
  let e = t.start ?? 0,
    r = t.end ?? 360,
    s = wt(t.anchor ?? "center").scale(new M(-t.radiusX, -t.radiusY)),
    n = qt(s, t.radiusX, t.radiusY, e, r, t.resolution);
  n.unshift(s);
  let i = Object.assign({}, t, {
    pts: n,
    radius: 0,
    ...(t.gradient
      ? { colors: [t.gradient[0], ...Array(n.length - 1).fill(t.gradient[1])] }
      : {}),
  });
  if (r - e >= 360 && t.outline) {
    (t.fill !== !1 && Xe(Object.assign({}, i, { outline: null })),
      Xe(Object.assign({}, i, { pts: n.slice(1), fill: !1 })));
    return;
  }
  Xe(i);
}
function yt(t) {
  if (typeof t.radius != "number")
    throw new Error('drawCircle() requires property "radius".');
  t.radius !== 0 &&
    fn(
      Object.assign({}, t, { radiusX: t.radius, radiusY: t.radius, angle: 0 }),
    );
}
function Rt(t) {
  let { p1: e, p2: r } = t;
  if (!e || !r)
    throw new Error('drawLine() requires properties "p1" and "p2".');
  let s = t.width || 1,
    n = r
      .sub(e)
      .unit()
      .normal()
      .scale(s * 0.5),
    i = [e.sub(n), e.add(n), r.add(n), r.sub(n)].map((a) => ({
      pos: new M(a.x, a.y),
      uv: new M(0),
      color: t.color ?? Y.WHITE,
      opacity: t.opacity ?? 1,
    }));
  Je(
    i,
    [0, 1, 3, 1, 2, 3],
    t.fixed,
    h.gfx.defTex,
    t.shader,
    t.uniform ?? void 0,
  );
}
function mo(t) {
  let e = t.pts,
    r = [],
    s = (t.width || 1) * 0.5,
    n = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
    i = t.pos || b(0, 0),
    a;
  n ? (a = e[0].sub(e[e.length - 2])) : (a = e[1].sub(e[0]));
  let d = a.len(),
    l = a.normal().scale(-s / d),
    o,
    c = e[0];
  if (!n)
    switch (t.cap) {
      case "square": {
        let f = a.scale(-s / d);
        (r.push(c.add(f).add(l)), r.push(c.add(f).sub(l)));
        break;
      }
      case "round": {
        let f = Math.max(s, 10),
          x = Math.PI / f,
          m = l.scale(-1),
          y = Math.cos(x),
          q = Math.sin(x);
        for (let C = 0; C < f; C++)
          (r.push(c),
            r.push(c.sub(m)),
            (m = b(m.x * y - m.y * q, m.x * q + m.y * y)));
      }
    }
  for (let f = 1; f < e.length; f++) {
    if (c === e[f] || c.eq(e[f])) continue;
    ((o = c), (c = e[f]));
    let x = c.sub(o),
      m = x.len(),
      y = x.normal().scale(-s / m),
      q = a.cross(x);
    if (Math.abs(q) / (d * m) < 0.05) {
      (r.push(o.add(l)),
        r.push(o.sub(l)),
        a.dot(x) < 0 && (r.push(o.sub(l)), r.push(o.add(l))),
        (a = x),
        (d = m),
        (l = y));
      continue;
    }
    let C = y.sub(l).cross(x) / q,
      D = l.add(a.scale(C));
    (q > 0
      ? (r.push(o.add(D)), r.push(o.sub(l)), r.push(o.add(D)), r.push(o.sub(y)))
      : (r.push(o.add(l)),
        r.push(o.sub(D)),
        r.push(o.add(y)),
        r.push(o.sub(D))),
      (a = x),
      (d = m),
      (l = y));
  }
  if (!n)
    switch ((r.push(c.add(l)), r.push(c.sub(l)), t.cap)) {
      case "square": {
        let f = a.scale(s / d);
        (r.push(c.add(f).add(l)), r.push(c.add(f).sub(l)));
        break;
      }
      case "round": {
        let f = Math.max(s, 10),
          x = Math.PI / f,
          m = l.scale(1),
          y = Math.cos(x),
          q = Math.sin(x);
        for (let C = 0; C < f; C++)
          ((m = b(m.x * y - m.y * q, m.x * q + m.y * y)),
            r.push(c),
            r.push(c.sub(m)));
      }
    }
  if (r.length < 4) return;
  let w = r.map((f) => ({
      pos: i.add(f),
      uv: b(),
      color: t.color || Y.WHITE,
      opacity: t.opacity ?? 1,
    })),
    u = [],
    g = 0;
  for (let f = 0; f < r.length - 2; f += 2)
    ((u[g++] = f + 1),
      (u[g++] = f),
      (u[g++] = f + 2),
      (u[g++] = f + 2),
      (u[g++] = f + 3),
      (u[g++] = f + 1));
  (n &&
    ((u[g++] = r.length - 1),
    (u[g++] = r.length - 2),
    (u[g++] = 0),
    (u[g++] = 0),
    (u[g++] = 1),
    (u[g++] = r.length - 1)),
    Je(w, u, t.fixed, h.gfx.defTex, t.shader, t.uniform ?? void 0));
}
function wo(t) {
  let e = t.pts,
    r = [],
    s = (t.width || 1) * 0.5,
    n = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
    i = t.pos || b(0, 0),
    a;
  n ? (a = e[0].sub(e[e.length - 2])) : (a = e[1].sub(e[0]));
  let d = a.len(),
    l = a.normal().scale(-s / d),
    o,
    c = e[0];
  if (!n)
    switch (t.cap) {
      case "square": {
        let f = a.scale(-s / d);
        (r.push(c.add(f).add(l)), r.push(c.add(f).sub(l)));
        break;
      }
      case "round": {
        let f = Math.max(s, 10),
          x = Math.PI / f,
          m = l.scale(-1),
          y = Math.cos(x),
          q = Math.sin(x);
        for (let C = 0; C < f; C++)
          (r.push(c),
            r.push(c.sub(m)),
            (m = b(m.x * y - m.y * q, m.x * q + m.y * y)));
      }
    }
  for (let f = 1; f < e.length; f++) {
    if (c === e[f] || c.eq(e[f])) continue;
    ((o = c), (c = e[f]));
    let x = c.sub(o),
      m = x.len(),
      y = x.normal().scale(-s / m),
      q = a.cross(x);
    if (Math.abs(q) / (d * m) < 0.05) {
      (r.push(o.add(l)),
        r.push(o.sub(l)),
        a.dot(x) < 0 && (r.push(o.sub(l)), r.push(o.add(l))),
        (a = x),
        (d = m),
        (l = y));
      continue;
    }
    let C = y.sub(l).cross(x) / q,
      D = l.add(a.scale(C));
    if (q > 0) {
      let S = o.add(D),
        A = Math.max(s, 10),
        v = oe(l.angleBetween(y) / A),
        R = l,
        I = Math.cos(v),
        P = Math.sin(v);
      for (let k = 0; k < A; k++)
        (r.push(S),
          r.push(o.sub(R)),
          (R = b(R.x * I - R.y * P, R.x * P + R.y * I)));
    } else {
      let S = o.sub(D),
        A = Math.max(s, 10),
        v = oe(l.angleBetween(y) / A),
        R = l,
        I = Math.cos(v),
        P = Math.sin(v);
      for (let k = 0; k < A; k++)
        (r.push(o.add(R)),
          r.push(S),
          (R = b(R.x * I - R.y * P, R.x * P + R.y * I)));
    }
    ((a = x), (d = m), (l = y));
  }
  if (!n)
    switch ((r.push(c.add(l)), r.push(c.sub(l)), t.cap)) {
      case "square": {
        let f = a.scale(s / d);
        (r.push(c.add(f).add(l)), r.push(c.add(f).sub(l)));
        break;
      }
      case "round": {
        let f = Math.max(s, 10),
          x = Math.PI / f,
          m = l.scale(1),
          y = Math.cos(x),
          q = Math.sin(x);
        for (let C = 0; C < f; C++)
          ((m = b(m.x * y - m.y * q, m.x * q + m.y * y)),
            r.push(c),
            r.push(c.sub(m)));
      }
    }
  if (r.length < 4) return;
  let w = r.map((f) => ({
      pos: i.add(f),
      uv: b(),
      color: t.color || Y.WHITE,
      opacity: t.opacity ?? 1,
    })),
    u = [],
    g = 0;
  for (let f = 0; f < r.length - 2; f += 2)
    ((u[g++] = f + 1),
      (u[g++] = f),
      (u[g++] = f + 2),
      (u[g++] = f + 2),
      (u[g++] = f + 3),
      (u[g++] = f + 1));
  (n &&
    ((u[g++] = r.length - 1),
    (u[g++] = r.length - 2),
    (u[g++] = 0),
    (u[g++] = 0),
    (u[g++] = 1),
    (u[g++] = r.length - 1)),
    Je(w, u, t.fixed, h.gfx.defTex, t.shader, t.uniform ?? void 0));
}
function yo(t) {
  let e = t.pts,
    r = [],
    s = (t.width || 1) * 0.5,
    n = e[0] === e[e.length - 1] || e[0].eq(e[e.length - 1]),
    i = t.pos || b(0, 0),
    a;
  n ? (a = e[0].sub(e[e.length - 2])) : (a = e[1].sub(e[0]));
  let d = a.len(),
    l = a.normal().scale(-s / d),
    o,
    c = e[0];
  if (!n)
    switch (t.cap) {
      case "square": {
        let f = a.scale(-s / d);
        (r.push(c.add(f).add(l)), r.push(c.add(f).sub(l)));
        break;
      }
      case "round": {
        let f = Math.max(s, 10),
          x = Math.PI / f,
          m = l.scale(-1),
          y = Math.cos(x),
          q = Math.sin(x);
        for (let C = 0; C < f; C++)
          (r.push(c),
            r.push(c.sub(m)),
            (m = b(m.x * y - m.y * q, m.x * q + m.y * y)));
      }
    }
  for (let f = 1; f < e.length; f++) {
    if (c === e[f] || c.eq(e[f])) continue;
    ((o = c), (c = e[f]));
    let x = c.sub(o),
      m = x.len(),
      y = x.normal().scale(-s / m),
      q = a.cross(x);
    if (Math.abs(q) / (d * m) < 0.05) {
      (r.push(o.add(l)),
        r.push(o.sub(l)),
        a.dot(x) < 0 && (r.push(o.sub(l)), r.push(o.add(l))),
        (a = x),
        (d = m),
        (l = y));
      continue;
    }
    let C = y.sub(l).cross(x) / q,
      D = l.add(a.scale(C));
    (r.push(o.add(D)), r.push(o.sub(D)), (a = x), (d = m), (l = y));
  }
  if (!n)
    switch ((r.push(c.add(l)), r.push(c.sub(l)), t.cap)) {
      case "square": {
        let f = a.scale(s / d);
        (r.push(c.add(f).add(l)), r.push(c.add(f).sub(l)));
        break;
      }
      case "round": {
        let f = Math.max(s, 10),
          x = Math.PI / f,
          m = l.scale(1),
          y = Math.cos(x),
          q = Math.sin(x);
        for (let C = 0; C < f; C++)
          ((m = b(m.x * y - m.y * q, m.x * q + m.y * y)),
            r.push(c),
            r.push(c.sub(m)));
      }
    }
  if (r.length < 4) return;
  let w = r.map((f) => ({
      pos: i.add(f),
      uv: b(),
      color: t.color || Y.WHITE,
      opacity: t.opacity ?? 1,
    })),
    u = [],
    g = 0;
  for (let f = 0; f < r.length - 2; f += 2)
    ((u[g++] = f + 1),
      (u[g++] = f),
      (u[g++] = f + 2),
      (u[g++] = f + 2),
      (u[g++] = f + 3),
      (u[g++] = f + 1));
  (n &&
    ((u[g++] = r.length - 1),
    (u[g++] = r.length - 2),
    (u[g++] = 0),
    (u[g++] = 0),
    (u[g++] = 1),
    (u[g++] = r.length - 1)),
    Je(w, u, t.fixed, h.gfx.defTex, t.shader, t.uniform ?? void 0));
}
function is(t) {
  let e = t.pts,
    r = t.width ?? 1;
  if (!e) throw new Error('drawLines() requires property "pts".');
  if (!(e.length < 2)) {
    if (e.length > 2)
      switch (t.join) {
        case "bevel":
          return mo(t);
        case "round":
          return wo(t);
        case "miter":
          return yo(t);
      }
    if (t.radius && e.length >= 3) {
      Rt(Object.assign({}, t, { p1: e[0], p2: e[1] }));
      for (let s = 1; s < e.length - 2; s++) {
        let n = e[s],
          i = e[s + 1];
        Rt(Object.assign({}, t, { p1: n, p2: i }));
      }
      Rt(Object.assign({}, t, { p1: e[e.length - 2], p2: e[e.length - 1] }));
    } else
      for (let s = 0; s < e.length - 1; s++)
        (Rt(Object.assign({}, t, { p1: e[s], p2: e[s + 1] })),
          t.join !== "none" &&
            yt(Object.assign({}, t, { pos: e[s], radius: r / 2 })));
  }
}
function pn(t, e) {
  let r = e.segments ?? 16,
    s = [];
  for (let n = 0; n <= r; n++) s.push(t(n / r));
  is({
    pts: s,
    width: e.width || 1,
    pos: e.pos,
    color: e.color,
    opacity: e.opacity,
  });
}
function Ao(t) {
  pn((e) => _r(t.pt1, t.pt2, t.pt3, t.pt4, e), t);
}
var ze = class gn {
    ctx;
    src = null;
    glTex;
    width;
    height;
    constructor(e, r, s, n = {}) {
      this.ctx = e;
      let i = e.gl,
        a = e.gl.createTexture();
      if (!a) throw new Error("Failed to create texture");
      ((this.glTex = a),
        e.onDestroy(() => this.free()),
        (this.width = r),
        (this.height = s));
      let d = { linear: i.LINEAR, nearest: i.NEAREST }[
          n.filter ?? e.opts.texFilter ?? "nearest"
        ],
        l = { repeat: i.REPEAT, clampToEdge: i.CLAMP_TO_EDGE }[
          n.wrap ?? "clampToEdge"
        ];
      (this.bind(),
        r &&
          s &&
          i.texImage2D(
            i.TEXTURE_2D,
            0,
            i.RGBA,
            r,
            s,
            0,
            i.RGBA,
            i.UNSIGNED_BYTE,
            null,
          ),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, d),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, d),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, l),
        i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, l),
        i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
        this.unbind());
    }
    static fromImage(e, r, s = {}) {
      let n = new gn(e, r.width, r.height, s);
      return (n.update(r), (n.src = r), n);
    }
    update(e, r = 0, s = 0) {
      let n = this.ctx.gl;
      (this.bind(),
        n.texSubImage2D(n.TEXTURE_2D, 0, r, s, n.RGBA, n.UNSIGNED_BYTE, e),
        this.unbind());
    }
    bind() {
      this.ctx.pushTexture2D(this.glTex);
    }
    unbind() {
      this.ctx.popTexture2D();
    }
    free() {
      this.ctx.gl.deleteTexture(this.glTex);
    }
  },
  nr = class {
    ctx;
    tex;
    glFramebuffer;
    glRenderbuffer;
    constructor(t, e, r, s = {}) {
      this.ctx = t;
      let n = t.gl;
      (t.onDestroy(() => this.free()), (this.tex = new ze(t, e, r, s)));
      let i = n.createFramebuffer(),
        a = n.createRenderbuffer();
      if (!i || !a) throw new Error("Failed to create framebuffer");
      ((this.glFramebuffer = i),
        (this.glRenderbuffer = a),
        this.bind(),
        n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, e, r),
        n.framebufferTexture2D(
          n.FRAMEBUFFER,
          n.COLOR_ATTACHMENT0,
          n.TEXTURE_2D,
          this.tex.glTex,
          0,
        ),
        n.framebufferRenderbuffer(
          n.FRAMEBUFFER,
          n.DEPTH_STENCIL_ATTACHMENT,
          n.RENDERBUFFER,
          this.glRenderbuffer,
        ),
        this.unbind());
    }
    get width() {
      return this.tex.width;
    }
    get height() {
      return this.tex.height;
    }
    toImageData() {
      let t = this.ctx.gl,
        e = new Uint8ClampedArray(this.width * this.height * 4);
      (this.bind(),
        t.readPixels(0, 0, this.width, this.height, t.RGBA, t.UNSIGNED_BYTE, e),
        this.unbind());
      let r = this.width * 4,
        s = new Uint8Array(r);
      for (let n = 0; n < ((this.height / 2) | 0); n++) {
        let i = n * r,
          a = (this.height - n - 1) * r;
        (s.set(e.subarray(i, i + r)), e.copyWithin(i, a, a + r), e.set(s, a));
      }
      return new ImageData(e, this.width, this.height);
    }
    toDataURL() {
      let t = document.createElement("canvas"),
        e = t.getContext("2d");
      if (((t.width = this.width), (t.height = this.height), !e))
        throw new Error("Failed to get 2d context");
      return (e.putImageData(this.toImageData(), 0, 0), t.toDataURL());
    }
    clear() {
      let t = this.ctx.gl;
      t.clear(t.COLOR_BUFFER_BIT);
    }
    draw(t) {
      (this.bind(), t(), this.unbind());
    }
    bind() {
      (this.ctx.pushFramebuffer(this.glFramebuffer),
        this.ctx.pushRenderbuffer(this.glRenderbuffer),
        this.ctx.pushViewport({ x: 0, y: 0, w: this.width, h: this.height }));
    }
    unbind() {
      (this.ctx.popFramebuffer(),
        this.ctx.popRenderbuffer(),
        this.ctx.popViewport());
    }
    free() {
      let t = this.ctx.gl;
      (t.deleteFramebuffer(this.glFramebuffer),
        t.deleteRenderbuffer(this.glRenderbuffer),
        this.tex.free());
    }
  },
  xo = class {
    ctx;
    glVBuf;
    glIBuf;
    vqueue = [];
    iqueue = [];
    stride;
    maxVertices;
    maxIndices;
    vertexFormat;
    numDraws = 0;
    curPrimitive = null;
    curTex = null;
    curShader = null;
    curUniform = {};
    constructor(t, e, r, s) {
      let n = t.gl;
      ((this.vertexFormat = e),
        (this.ctx = t),
        (this.stride = e.reduce((a, d) => a + d.size, 0)),
        (this.maxVertices = r),
        (this.maxIndices = s));
      let i = n.createBuffer();
      if (!i) throw new Error("Failed to create vertex buffer");
      ((this.glVBuf = i),
        t.pushArrayBuffer(this.glVBuf),
        n.bufferData(n.ARRAY_BUFFER, r * 4, n.DYNAMIC_DRAW),
        t.popArrayBuffer(),
        (this.glIBuf = n.createBuffer()),
        t.pushElementArrayBuffer(this.glIBuf),
        n.bufferData(n.ELEMENT_ARRAY_BUFFER, s * 4, n.DYNAMIC_DRAW),
        t.popElementArrayBuffer());
    }
    push(t, e, r, s, n = null, i = {}) {
      (t !== this.curPrimitive ||
        n !== this.curTex ||
        s !== this.curShader ||
        !ts(this.curUniform, i) ||
        this.vqueue.length + e.length * this.stride > this.maxVertices ||
        this.iqueue.length + r.length > this.maxIndices) &&
        this.flush();
      let a = this.vqueue.length / this.stride;
      for (let d of e) this.vqueue.push(d);
      for (let d of r) this.iqueue.push(d + a);
      ((this.curPrimitive = t),
        (this.curShader = s),
        (this.curTex = n),
        (this.curUniform = i));
    }
    flush() {
      if (
        !this.curPrimitive ||
        !this.curShader ||
        this.vqueue.length === 0 ||
        this.iqueue.length === 0
      )
        return;
      let t = this.ctx.gl;
      (this.ctx.pushArrayBuffer(this.glVBuf),
        t.bufferSubData(t.ARRAY_BUFFER, 0, new Float32Array(this.vqueue)),
        this.ctx.pushElementArrayBuffer(this.glIBuf),
        t.bufferSubData(
          t.ELEMENT_ARRAY_BUFFER,
          0,
          new Uint16Array(this.iqueue),
        ),
        this.ctx.setVertexFormat(this.vertexFormat),
        this.curShader.bind(),
        this.curShader.send(this.curUniform),
        this.curTex?.bind(),
        t.drawElements(
          this.curPrimitive,
          this.iqueue.length,
          t.UNSIGNED_SHORT,
          0,
        ),
        this.curTex?.unbind(),
        this.curShader.unbind(),
        this.ctx.popArrayBuffer(),
        this.ctx.popElementArrayBuffer(),
        (this.vqueue = []),
        (this.iqueue = []),
        this.numDraws++);
    }
    free() {
      let t = this.ctx.gl;
      (t.deleteBuffer(this.glVBuf), t.deleteBuffer(this.glIBuf));
    }
  };
function $e(t) {
  let e = [],
    r = (i) => {
      (e.push(i), t(i));
    },
    s = () => {
      (e.pop(), t(n() ?? null));
    },
    n = () => e[e.length - 1];
  return [r, s, n];
}
function vo(t, e = {}) {
  let r = [];
  function s(S) {
    r.push(S);
  }
  function n() {
    r.forEach((A) => A());
    let S = t.getExtension("WEBGL_lose_context");
    S && S.loseContext();
  }
  let i = null;
  function a(S) {
    if (ts(S, i)) return;
    i = S;
    let A = S.reduce((v, R) => v + R.size, 0);
    S.reduce(
      (v, R, I) => (
        t.vertexAttribPointer(I, R.size, t.FLOAT, !1, A * 4, v),
        t.enableVertexAttribArray(I),
        v + R.size * 4
      ),
      0,
    );
  }
  let [d, l] = $e((S) => t.bindTexture(t.TEXTURE_2D, S)),
    [o, c] = $e((S) => t.bindBuffer(t.ARRAY_BUFFER, S)),
    [w, u] = $e((S) => t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, S)),
    [g, f] = $e((S) => t.bindFramebuffer(t.FRAMEBUFFER, S)),
    [x, m] = $e((S) => t.bindRenderbuffer(t.RENDERBUFFER, S)),
    [y, q] = $e((S) => {
      if (!S) return;
      let { x: A, y: v, w: R, h: I } = S;
      t.viewport(A, v, R, I);
    }),
    [C, D] = $e((S) => t.useProgram(S));
  return (
    y({ x: 0, y: 0, w: t.drawingBufferWidth, h: t.drawingBufferHeight }),
    {
      gl: t,
      opts: e,
      onDestroy: s,
      destroy: n,
      pushTexture2D: d,
      popTexture2D: l,
      pushArrayBuffer: o,
      popArrayBuffer: c,
      pushElementArrayBuffer: w,
      popElementArrayBuffer: u,
      pushFramebuffer: g,
      popFramebuffer: f,
      pushRenderbuffer: x,
      popRenderbuffer: m,
      pushViewport: y,
      popViewport: q,
      pushProgram: C,
      popProgram: D,
      setVertexFormat: a,
    }
  );
}
var Sr = {};
function Ms(t, e) {
  if (e.override) {
    Object.assign(t, e);
    return;
  }
  (e.pos && (t.pos = t.pos.add(e.pos)),
    e.scale && (t.scale = t.scale.scale(b(e.scale))),
    e.angle && (t.angle += e.angle),
    e.color && t.ch.length === 1 && (t.color = t.color.mult(e.color)),
    e.opacity != null && (t.opacity *= e.opacity));
}
function Nr(t) {
  let e = {},
    r = "",
    s = [],
    n = String(t),
    i = (a) => {
      (s.length > 0 && (e[r.length] = s.slice()), (r += a));
    };
  for (; n !== ""; ) {
    if (n[0] === "\\") {
      if (n.length === 1)
        throw new Error("Styled text error: \\ at end of string");
      (i(n[1]), (n = n.slice(2)));
      continue;
    }
    if (n[0] === "[") {
      let a = /^\[(\/)?(\w+?)\]/.exec(n);
      if (!a) {
        (i(n[0]), (n = n.slice(1)));
        continue;
      }
      let [d, l, o] = a;
      if (l !== void 0) {
        let c = s.pop();
        if (c !== o)
          throw c !== void 0
            ? new Error(
                `Styled text error: mismatched tags. Expected [/${c}], got [/${o}]`,
              )
            : new Error(`Styled text error: stray end tag [/${o}]`);
      } else s.push(o);
      n = n.slice(d.length);
      continue;
    }
    (i(n[0]), (n = n.slice(1)));
  }
  if (s.length > 0) throw new Error(`Styled text error: unclosed tags ${s}`);
  return { charStyleMap: e, text: r };
}
function nt(t) {
  if (t.text === void 0)
    throw new Error('formatText() requires property "text".');
  let e = on(t.font);
  if (!t.text || t.text === "" || e instanceof Pe || !e)
    return { width: 0, height: 0, chars: [], opt: t, renderedText: "" };
  let { charStyleMap: r, text: s } = Nr(t.text + ""),
    n = la(s);
  if (e instanceof Zt || typeof e == "string") {
    let C = e instanceof Zt ? e.fontface.family : e,
      D =
        e instanceof Zt
          ? { outline: e.outline, filter: e.filter }
          : { outline: null, filter: Tr },
      S = Sr[C] ?? {
        font: {
          tex: new ze(h.gfx.ggl, 2048, 2048, { filter: D.filter }),
          map: {},
          size: 64,
        },
        cursor: new M(0),
        maxHeight: 0,
        outline: D.outline,
      };
    (Sr[C] || (Sr[C] = S), (e = S.font));
    for (let A of n)
      if (!S.font.map[A]) {
        let v = h.fontCacheC2d;
        if (!v) throw new Error("fontCacheC2d is not defined.");
        if (!h.fontCacheCanvas)
          throw new Error("fontCacheCanvas is not defined.");
        (v.clearRect(0, 0, h.fontCacheCanvas.width, h.fontCacheCanvas.height),
          (v.font = `${e.size}px ${C}`),
          (v.textBaseline = "top"),
          (v.textAlign = "left"),
          (v.fillStyle = "#ffffff"));
        let R = v.measureText(A),
          I = Math.ceil(R.width);
        if (!I) continue;
        let P =
          Math.ceil(Math.abs(R.actualBoundingBoxAscent)) +
          Math.ceil(Math.abs(R.actualBoundingBoxDescent));
        (S.outline &&
          S.outline.width &&
          S.outline.color &&
          ((v.lineJoin = "round"),
          (v.lineWidth = S.outline.width * 2),
          (v.strokeStyle = S.outline.color.toHex()),
          v.strokeText(A, S.outline.width, S.outline.width),
          (I += S.outline.width * 2),
          (P += S.outline.width * 3)),
          v.fillText(A, S.outline?.width ?? 0, S.outline?.width ?? 0));
        let k = v.getImageData(0, 0, I, P);
        if (
          S.cursor.x + I > 2048 &&
          ((S.cursor.x = 0),
          (S.cursor.y += S.maxHeight),
          (S.maxHeight = 0),
          S.cursor.y > 2048)
        )
          throw new Error("Font atlas exceeds character limit");
        (e.tex.update(k, S.cursor.x, S.cursor.y),
          (e.map[A] = new se(S.cursor.x, S.cursor.y, I, P)),
          (S.cursor.x += I + 1),
          (S.maxHeight = Math.max(S.maxHeight, P)));
      }
  }
  let i = t.size || e.size,
    a = b(t.scale ?? 1).scale(i / e.size),
    d = t.lineSpacing ?? 0,
    l = t.letterSpacing ?? 0,
    o = 0,
    c = 0,
    w = 0,
    u = [],
    g = [],
    f = 0,
    x = null,
    m = 0,
    y;
  for (; f < n.length; ) {
    let C = n[f];
    if (
      C ===
      `
`
    )
      ((w += i + d),
        u.push({ width: o - l, chars: g }),
        (x = null),
        (m = 0),
        (o = 0),
        (g = []),
        (y = void 0));
    else {
      let D = e.map[C];
      if (D) {
        let S = D.w * a.x;
        (t.width &&
          o + S > t.width &&
          ((w += i + d),
          x != null &&
            ((f -= g.length - x),
            (C = n[f]),
            (D = e.map[C]),
            (S = D.w * a.x),
            (g = g.slice(0, x - 1)),
            (o = m)),
          (x = null),
          (m = 0),
          u.push({ width: o - l, chars: g }),
          (o = y ?? 0),
          (g = [])),
          g.push({
            tex: e.tex,
            width: D.w,
            height: D.h,
            quad: new se(
              D.x / e.tex.width,
              D.y / e.tex.height,
              D.w / e.tex.width,
              D.h / e.tex.height,
            ),
            ch: C,
            pos: new M(o, w),
            opacity: t.opacity ?? 1,
            color: t.color ?? Y.WHITE,
            scale: b(a),
            angle: 0,
          }),
          C === " " && ((x = g.length), (m = o)),
          t.indentAll && y === void 0 && /\S/.test(C) && (y = o),
          (o += S),
          (c = Math.max(c, o)),
          (o += l));
      }
    }
    f++;
  }
  (u.push({ width: o - l, chars: g }), (w += i), t.width && (c = t.width));
  let q = [];
  for (let C = 0; C < u.length; C++) {
    let D = (c - u[C].width) * Oa(t.align ?? "left");
    for (let S of u[C].chars) {
      let A = e.map[S.ch],
        v = q.length + C;
      if (
        ((S.pos = S.pos.add(D, 0).add(A.w * a.x * 0.5, A.h * a.y * 0.5)),
        t.transform)
      ) {
        let R =
          typeof t.transform == "function" ? t.transform(v, S.ch) : t.transform;
        R && Ms(S, R);
      }
      if (r[v]) {
        let R = r[v];
        for (let I of R) {
          let P = t.styles?.[I],
            k = typeof P == "function" ? P(v, S.ch) : P;
          k && Ms(S, k);
        }
      }
      q.push(S);
    }
  }
  return { width: c, height: w, chars: q, opt: t, renderedText: s };
}
function Ut(t) {
  if (t.width === void 0 || t.height === void 0)
    throw new Error('drawUVQuad() requires property "width" and "height".');
  if (t.width <= 0 || t.height <= 0) return;
  let e = t.width,
    r = t.height,
    s = wt(t.anchor || dr).scale(new M(e, r).scale(-0.5)),
    n = t.quad || new se(0, 0, 1, 1),
    i = t.color || J(255, 255, 255),
    a = t.opacity ?? 1,
    d = t.tex ? 0.1 / t.tex.width : 0,
    l = t.tex ? 0.1 / t.tex.height : 0,
    o = n.x + d,
    c = n.y + l,
    w = n.w - d * 2,
    u = n.h - l * 2;
  (Be(),
    ne(t.pos),
    gt(t.angle),
    Ft(t.scale),
    ne(s),
    Je(
      [
        {
          pos: new M(-e / 2, r / 2),
          uv: new M(t.flipX ? o + w : o, t.flipY ? c : c + u),
          color: i,
          opacity: a,
        },
        {
          pos: new M(-e / 2, -r / 2),
          uv: new M(t.flipX ? o + w : o, t.flipY ? c + u : c),
          color: i,
          opacity: a,
        },
        {
          pos: new M(e / 2, -r / 2),
          uv: new M(t.flipX ? o : o + w, t.flipY ? c + u : c),
          color: i,
          opacity: a,
        },
        {
          pos: new M(e / 2, r / 2),
          uv: new M(t.flipX ? o : o + w, t.flipY ? c : c + u),
          color: i,
          opacity: a,
        },
      ],
      [0, 1, 3, 1, 2, 3],
      t.fixed,
      t.tex,
      t.shader,
      t.uniform ?? void 0,
    ),
    xe());
}
function it(t) {
  (Be(),
    ne(t.opt.pos),
    gt(t.opt.angle),
    ne(
      wt(t.opt.anchor ?? "topleft")
        .add(1, 1)
        .scale(t.width, t.height)
        .scale(-0.5),
    ),
    t.chars.forEach((e) => {
      Ut({
        tex: e.tex,
        width: e.width,
        height: e.height,
        pos: e.pos,
        scale: e.scale,
        angle: e.angle,
        color: e.color,
        opacity: e.opacity,
        quad: e.quad,
        anchor: "center",
        uniform: t.opt.uniform,
        shader: t.opt.shader,
        fixed: t.opt.fixed,
      });
    }),
    xe());
}
function Ce(t) {
  if (t.width === void 0 || t.height === void 0)
    throw new Error('drawRect() requires property "width" and "height".');
  if (t.width <= 0 || t.height <= 0) return;
  let e = t.width,
    r = t.height,
    s = wt(t.anchor || dr)
      .add(1, 1)
      .scale(new M(e, r).scale(-0.5)),
    n = [new M(0, 0), new M(e, 0), new M(e, r), new M(0, r)];
  if (t.radius) {
    let i = Math.min(e, r) / 2,
      a = Array.isArray(t.radius)
        ? t.radius.map((d) => Math.min(i, d))
        : new Array(4).fill(Math.min(i, t.radius));
    n = [
      new M(a[0], 0),
      ...(a[1] ? qt(new M(e - a[1], a[1]), a[1], a[1], 270, 360) : [b(e, 0)]),
      ...(a[2] ? qt(new M(e - a[2], r - a[2]), a[2], a[2], 0, 90) : [b(e, r)]),
      ...(a[3] ? qt(new M(a[3], r - a[3]), a[3], a[3], 90, 180) : [b(0, r)]),
      ...(a[0] ? qt(new M(a[0], a[0]), a[0], a[0], 180, 270) : []),
    ];
  }
  Xe(
    Object.assign({}, t, {
      offset: s,
      pts: n,
      ...(t.gradient
        ? {
            colors: t.horizontal
              ? [t.gradient[0], t.gradient[1], t.gradient[1], t.gradient[0]]
              : [t.gradient[0], t.gradient[0], t.gradient[1], t.gradient[1]],
          }
        : {}),
    }),
  );
}
function Ye(t) {
  Re();
  let e = h.gfx.width,
    r = h.gfx.height;
  ((h.gfx.width = h.gfx.viewport.width),
    (h.gfx.height = h.gfx.viewport.height),
    t(),
    Re(),
    (h.gfx.width = e),
    (h.gfx.height = r));
}
function Ss(t, e) {
  Ye(() => {
    let r = b(8);
    (Be(), ne(t));
    let s = nt({
        text: e,
        font: rr,
        size: 16,
        pos: r,
        color: J(255, 255, 255),
        fixed: !0,
      }),
      n = s.width + r.x * 2,
      i = s.height + r.x * 2;
    (t.x + n >= fe() && ne(b(-n, 0)),
      t.y + i >= pe() && ne(b(0, -i)),
      Ce({
        width: n,
        height: i,
        color: J(0, 0, 0),
        radius: 4,
        opacity: 0.8,
        fixed: !0,
      }),
      it(s),
      xe());
  });
}
function mn(t) {
  if (!t.p1 || !t.p2 || !t.p3)
    throw new Error('drawTriangle() requires properties "p1", "p2" and "p3".');
  return Xe(Object.assign({}, t, { pts: [t.p1, t.p2, t.p3] }));
}
function bo() {
  if (h.debug.inspect) {
    let t = null;
    for (let e of h.game.root.get("*", { recursive: !0 }))
      if (e.has("area") && e.isHovering()) {
        t = e;
        break;
      }
    if ((h.game.root.drawInspect(), t)) {
      let e = [],
        r = t.inspect();
      for (let s in r) r[s] ? e.push(`${r[s]}`) : e.push(`${s}`);
      Ss(
        xa(h.k.mousePos()),
        e.join(`
`),
      );
    }
    Ss(b(8), `FPS: ${h.debug.fps()}`);
  }
  (h.debug.paused &&
    Ye(() => {
      (Be(), ne(fe(), 0), ne(-8, 8));
      let t = 32;
      Ce({
        width: t,
        height: t,
        anchor: "topright",
        color: J(0, 0, 0),
        opacity: 0.8,
        radius: 4,
        fixed: !0,
      });
      for (let e = 1; e <= 2; e++)
        Ce({
          width: 4,
          height: t * 0.6,
          anchor: "center",
          pos: b((-t / 3) * e, t * 0.5),
          color: J(255, 255, 255),
          radius: 2,
          fixed: !0,
        });
      xe();
    }),
    h.debug.timeScale !== 1 &&
      Ye(() => {
        (Be(), ne(fe(), pe()), ne(-8, -8));
        let t = 8,
          e = nt({
            text: h.debug.timeScale.toFixed(1),
            font: rr,
            size: 16,
            color: J(255, 255, 255),
            pos: b(-t),
            anchor: "botright",
            fixed: !0,
          });
        Ce({
          width: e.width + t * 2 + t * 4,
          height: e.height + t * 2,
          anchor: "botright",
          color: J(0, 0, 0),
          opacity: 0.8,
          radius: 4,
          fixed: !0,
        });
        for (let r = 0; r < 2; r++) {
          let s = h.debug.timeScale < 1;
          mn({
            p1: b(-e.width - t * (s ? 2 : 3.5), -t),
            p2: b(-e.width - t * (s ? 2 : 3.5), -t - e.height),
            p3: b(-e.width - t * (s ? 3.5 : 2), -t - e.height / 2),
            pos: b(-r * t * 1 + (s ? -t * 0.5 : 0), 0),
            color: J(255, 255, 255),
            fixed: !0,
          });
        }
        (it(e), xe());
      }),
    h.debug.curRecording &&
      Ye(() => {
        (Be(),
          ne(0, pe()),
          ne(24, -24),
          yt({
            radius: 12,
            color: J(255, 0, 0),
            opacity: Cs(0, 1, h.app.time() * 4),
            fixed: !0,
          }),
          xe());
      }),
    h.debug.showLog &&
      h.game.logs.length > 0 &&
      Ye(() => {
        (Be(), ne(0, pe()), ne(8, -8));
        let t = 8,
          e = [];
        for (let s of h.game.logs) {
          let n = "",
            i = s.msg instanceof Error ? "error" : "info";
          ((n += `[time]${s.time.toFixed(2)}[/time]`),
            (n += " "),
            (n += `[${i}]${Hr(s.msg)}[/${i}]`),
            e.push(n));
        }
        h.game.logs = h.game.logs.filter(
          (s) => h.app.time() - s.time < (h.globalOpt.logTime || 4),
        );
        let r = nt({
          text: e.join(`
`),
          font: rr,
          pos: b(t, -t),
          anchor: "botleft",
          size: 16,
          width: fe() * 0.6,
          lineSpacing: t / 2,
          fixed: !0,
          styles: {
            time: { color: J(127, 127, 127) },
            info: { color: J(255, 255, 255) },
            error: { color: J(255, 0, 127) },
          },
        });
        (Ce({
          width: r.width + t * 2,
          height: r.height + t * 2,
          anchor: "botleft",
          color: J(0, 0, 0),
          radius: 4,
          opacity: 0.8,
          fixed: !0,
        }),
          it(r),
          xe());
      }));
}
function Hr(t, e = !1, r = new Set()) {
  if (r.has(t)) return "<recursive>";
  var s = "",
    n;
  return (
    e && typeof t == "string" && (t = JSON.stringify(t)),
    Array.isArray(t) &&
      ((s = [
        "[",
        t.map((i) => Hr(i, !0, r.union(new Set([t])))).join(", "),
        "]",
      ].join("")),
      (t = s)),
    t === null
      ? "null"
      : (typeof t == "object" &&
          t.toString === Object.prototype.toString &&
          (t.constructor !== Object && (s += t.constructor.name + " "),
          (s += [
            "{",
            (n = Object.getOwnPropertyNames(t)
              .map(
                (i) =>
                  `${/^\w+$/.test(i) ? i : JSON.stringify(i)}: ${Hr(t[i], !0, r.union(new Set([t])))}`,
              )
              .join(", "))
              ? ` ${n} `
              : "",
            "}",
          ].join("")),
          (t = s)),
        String(t).replaceAll(new RegExp("(?<!\\\\)\\[", "g"), "\\["))
  );
}
function Eo() {
  let t = h.game.cam,
    e = M.fromAngle(he(0, 360)).scale(t.shake);
  ((t.shake = ve(t.shake, 0, 5 * de())),
    (t.transform = new Ue()
      .translate(sr())
      .scale(t.scale)
      .rotate(t.angle)
      .translate((t.pos ?? sr()).scale(-1).add(e))),
    h.game.root.draw(),
    Re());
}
function Mo() {
  let t = st();
  h.game.events.numListeners("loading") > 0
    ? h.game.events.trigger("loading", t)
    : Ye(() => {
        let e = fe() / 2,
          r = 24,
          s = b(fe() / 2, pe() / 2).sub(b(e / 2, r / 2));
        (Ce({ pos: b(0), width: fe(), height: pe(), color: J(0, 0, 0) }),
          Ce({ pos: s, width: e, height: r, fill: !1, outline: { width: 4 } }),
          Ce({ pos: s, width: e * t, height: r }));
      });
}
function wn(t, e, r) {
  let s = h.gfx.ggl.gl;
  (Re(),
    s.clear(s.STENCIL_BUFFER_BIT),
    s.enable(s.STENCIL_TEST),
    s.stencilFunc(s.NEVER, 1, 255),
    s.stencilOp(s.REPLACE, s.REPLACE, s.REPLACE),
    e(),
    Re(),
    s.stencilFunc(r, 1, 255),
    s.stencilOp(s.KEEP, s.KEEP, s.KEEP),
    t(),
    Re(),
    s.disable(s.STENCIL_TEST));
}
function So(t, e) {
  let r = h.gfx.ggl.gl;
  wn(t, e, r.EQUAL);
}
function ir(t) {
  if (!t.tex) throw new Error('drawTexture() requires property "tex".');
  let e = t.quad ?? new se(0, 0, 1, 1),
    r = t.tex.width * e.w,
    s = t.tex.height * e.h,
    n = new M(1);
  if (t.tiled) {
    let i = wt(t.anchor || dr);
    ((t.pos?.x || 0) - (i.x + 1) * 0.5 * (t.width || r),
      (t.pos?.y || 0) - (i.y + 1) * 0.5 * (t.height || s));
    let a = (t.width || r) / r,
      d = (t.height || s) / s,
      l = Math.floor(a),
      o = Math.floor(d),
      c = a - l,
      w = d - o,
      u = (l + c ? 1 : 0) * (o + w ? 1 : 0),
      g = new Array(u * 6),
      f = new Array(u * 4),
      x = 0,
      m = (y, q, C, D, S) => {
        ((g[x * 6 + 0] = x * 4 + 0),
          (g[x * 6 + 1] = x * 4 + 1),
          (g[x * 6 + 2] = x * 4 + 3),
          (g[x * 6 + 3] = x * 4 + 1),
          (g[x * 6 + 4] = x * 4 + 2),
          (g[x * 6 + 5] = x * 4 + 3),
          (f[x * 4 + 0] = {
            pos: new M(y - i.x, q - i.y),
            uv: new M(S.x, S.y),
            color: t.color || Y.WHITE,
            opacity: t.opacity || 1,
          }),
          (f[x * 4 + 1] = {
            pos: new M(y + C - i.x, q - i.y),
            uv: new M(S.x + S.w, S.y),
            color: t.color || Y.WHITE,
            opacity: t.opacity || 1,
          }),
          (f[x * 4 + 2] = {
            pos: new M(y + C - i.x, q + D - i.y),
            uv: new M(S.x + S.w, S.y + S.h),
            color: t.color || Y.WHITE,
            opacity: t.opacity || 1,
          }),
          (f[x * 4 + 3] = {
            pos: new M(y - i.x, q + D - i.y),
            uv: new M(S.x, S.y + S.h),
            color: t.color || Y.WHITE,
            opacity: t.opacity || 1,
          }),
          x++);
      };
    for (let y = 0; y < o; y++) {
      for (let q = 0; q < l; q++) m(q * r, y * s, r, s, e);
      c && m(l * r, y * s, r * c, s, new se(e.x, e.y, e.w * c, e.h));
    }
    if (w) {
      for (let y = 0; y < l; y++)
        m(y * r, o * s, r, s * w, new se(e.x, e.y, e.w, e.h * w));
      c && m(l * r, o * s, r * c, s * w, new se(e.x, e.y, e.w * c, e.h * w));
    }
    Je(f, g, t.fixed, t.tex, t.shader, t.uniform ?? void 0);
  } else
    (t.width && t.height
      ? ((n.x = t.width / r), (n.y = t.height / s))
      : t.width
        ? ((n.x = t.width / r), (n.y = n.x))
        : t.height && ((n.y = t.height / s), (n.x = n.y)),
      Ut(
        Object.assign({}, t, {
          scale: n.scale(t.scale || new M(1)),
          tex: t.tex,
          quad: e,
          width: r,
          height: s,
        }),
      ));
}
function qo(t) {
  if (!t.sprite) throw new Error('drawSprite() requires property "sprite"');
  let e = Jt(t.sprite);
  if (!e || !e.data) return;
  let r = e.data.frames[t.frame ?? 0];
  if (!r) throw new Error(`Frame not found: ${t.frame ?? 0}`);
  ir(
    Object.assign({}, t, {
      tex: e.data.tex,
      quad: r.scale(t.quad ?? new se(0, 0, 1, 1)),
    }),
  );
}
function Bo(t, e) {
  let r = h.gfx.ggl.gl;
  wn(t, e, r.NOTEQUAL);
}
function qs(t) {
  it(nt(t));
}
var Ro = (t, e) => {
  let r = ns(e, kr, Dr),
    s = t.pixelDensity ?? 1,
    n = t.scale ?? 1,
    { gl: i } = e,
    a = ze.fromImage(
      e,
      new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1),
    ),
    d =
      t.width && t.height
        ? new nr(e, t.width * s * n, t.height * s * n)
        : new nr(e, i.drawingBufferWidth, i.drawingBufferHeight),
    l = null,
    o = 1;
  (t.background &&
    (typeof t.background == "string"
      ? (l = J(t.background))
      : ((l = J(...t.background)), (o = t.background[3] ?? 1)),
    i.clearColor(l.r / 255, l.g / 255, l.b / 255, o ?? 1)),
    i.enable(i.BLEND),
    i.blendFuncSeparate(
      i.ONE,
      i.ONE_MINUS_SRC_ALPHA,
      i.ONE,
      i.ONE_MINUS_SRC_ALPHA,
    ));
  let c = new xo(e, $r, Vi, Yi),
    w = ze.fromImage(
      e,
      new ImageData(
        new Uint8ClampedArray([
          128, 128, 128, 255, 190, 190, 190, 255, 190, 190, 190, 255, 128, 128,
          128, 255,
        ]),
        2,
        2,
      ),
      { wrap: "repeat", filter: "nearest" },
    );
  return {
    lastDrawCalls: 0,
    ggl: e,
    defShader: r,
    defTex: a,
    frameBuffer: d,
    postShader: null,
    postShaderUniform: null,
    renderer: c,
    transform: new Ue(),
    transformStack: [],
    bgTex: w,
    bgColor: l,
    bgAlpha: o,
    width: t.width ?? i.drawingBufferWidth / s / n,
    height: t.height ?? i.drawingBufferHeight / s / n,
    viewport: {
      x: 0,
      y: 0,
      width: i.drawingBufferWidth,
      height: i.drawingBufferHeight,
      scale: 1,
    },
    fixed: !1,
  };
};
function tt(t) {
  return t.fixed ? !0 : t.parent ? tt(t.parent) : !1;
}
function at(t) {
  return {
    color: t.color,
    opacity: t.opacity,
    anchor: t.anchor,
    outline: t.outline,
    shader: t.shader,
    uniform: t.uniform,
  };
}
function Co(t, e = {}) {
  return {
    id: "circle",
    radius: t,
    draw() {
      yt(Object.assign(at(this), { radius: this.radius, fill: e.fill }));
    },
    renderArea() {
      return new $(
        new M(this.anchor ? 0 : -this.radius),
        this.radius * 2,
        this.radius * 2,
      );
    },
    inspect() {
      return `radius: ${Math.ceil(this.radius)}`;
    },
  };
}
function yn(...t) {
  return {
    id: "color",
    color: J(...t),
    inspect() {
      return `color: ${this.color.toString()}`;
    },
  };
}
function Io(t) {
  return {
    add() {
      this.canvas = t;
    },
  };
}
function Po(t = 1) {
  let e,
    r = 0,
    s = !1;
  return {
    require: ["opacity"],
    add() {
      ((e = this.opacity), (this.opacity = 0));
    },
    update() {
      s ||
        ((r += de()),
        (this.opacity = Fe(r, 0, t, 0, e)),
        r >= t && ((this.opacity = e), (s = !0)));
    },
  };
}
function To(t = "intersect") {
  return { id: "mask", mask: t };
}
function An(t) {
  return {
    id: "opacity",
    opacity: t ?? 1,
    fadeIn(e = 1, r = h.k.easings.linear) {
      return h.game.root.tween(
        0,
        this.opacity,
        e,
        (s) => (this.opacity = s),
        r,
      );
    },
    fadeOut(e = 1, r = h.k.easings.linear) {
      return h.game.root.tween(
        this.opacity,
        0,
        e,
        (s) => (this.opacity = s),
        r,
      );
    },
    inspect() {
      return `opacity: ${Fr(this.opacity, 1)}`;
    },
  };
}
function ko(t = 1, e = J(0, 0, 0), r = 1, s = "miter", n = 10, i = "butt") {
  return {
    id: "outline",
    outline: { width: t, color: e, opacity: r, join: s, miterLimit: n, cap: i },
    inspect() {
      return `outline: ${this.outline.width}px, ${this.outline.color}`;
    },
  };
}
var Do = class {
  pos = b(0);
  vel = b(0);
  acc = b(0);
  angle = 0;
  angularVelocity = 0;
  damping = 0;
  t;
  lt = null;
  gc;
  constructor() {
    ((this.t = 0), (this.gc = !0));
  }
  get progress() {
    return this.lt ? this.t / this.lt : this.t;
  }
};
function Fo(t, e) {
  let r = e.lifetime,
    s = [],
    n = t.colors || [Y.WHITE],
    i = t.opacities || [1],
    a = t.quads || [new se(0, 0, 1, 1)],
    d = t.scales || [1],
    l = t.lifeTime,
    o = e.direction,
    c = e.spread,
    w = t.speed || [0, 0],
    u = t.angle || [0, 0],
    g = t.angularVelocity || [0, 0],
    f = t.acceleration || [b(0), b(0)],
    x = t.damping || [0, 0],
    m = [],
    y = new Array(t.max),
    q = 0,
    C = 0;
  for (let A = 0; A < t.max; A++) {
    ((m[A * 6 + 0] = A * 4 + 0),
      (m[A * 6 + 1] = A * 4 + 1),
      (m[A * 6 + 2] = A * 4 + 3),
      (m[A * 6 + 3] = A * 4 + 1),
      (m[A * 6 + 4] = A * 4 + 2),
      (m[A * 6 + 5] = A * 4 + 3));
    for (let v = 0; v < 4; v++)
      y[A * 4 + v] = {
        pos: new M(0, 0),
        uv: new M(0, 0),
        color: J(255, 255, 255),
        opacity: 1,
      };
    s[A] = new Do();
  }
  let D = new me();
  function S(A = 0) {
    for (; A < t.max; ) {
      if (s[A].gc) return A;
      A++;
    }
    return null;
  }
  return {
    id: "particles",
    emit(A) {
      let v = 0;
      for (let R = 0; R < A; R++) {
        if (((v = S(v)), v == null)) return;
        let I = he(o - c, o + c),
          P = M.fromAngle(I).scale(he(w[0], w[1])),
          k = he(u[0], u[1]),
          O = he(g[0], g[1]),
          K = b(he(f[0].x, f[1].x), he(f[0].y, f[1].y)),
          V = he(x[0], x[1]),
          X = l ? he(l[0], l[1]) : null,
          N = e.shape ? e.shape.random() : b(),
          U = s[v];
        ((U.lt = X),
          (U.pos = N),
          (U.vel = P),
          (U.acc = K),
          (U.angle = k),
          (U.angularVelocity = O),
          (U.damping = V),
          (U.angularVelocity = O),
          (U.gc = !1));
      }
      q += A;
    },
    update() {
      if (r !== void 0 && r <= 0) return;
      let A = de();
      for (let v of s)
        if (!v.gc) {
          if (((v.t += A), v.lt && v.t >= v.lt)) {
            ((v.gc = !0), q--);
            continue;
          }
          ((v.vel = v.vel.add(v.acc.scale(A)).scale(1 - v.damping * A)),
            (v.pos = v.pos.add(v.vel.scale(A))),
            (v.angle += v.angularVelocity * A));
        }
      for (
        r !== void 0 && ((r -= A), r <= 0 && D.trigger()), C += A;
        q < t.max && e.rate && C > e.rate;
      )
        (this.emit(1), q++, (C -= e.rate));
    },
    draw() {
      if (!(r !== void 0 && r <= 0)) {
        for (let A = 0; A < s.length; A++) {
          let v = s[A];
          if (v.gc) continue;
          let R = v.progress,
            I = Math.floor(v.progress * n.length),
            P =
              I < n.length - 1
                ? ve(
                    n[I],
                    n[I + 1],
                    Fe(R, I / n.length, (I + 1) / n.length, 0, 1),
                  )
                : n[I],
            k = Math.floor(v.progress * i.length),
            O =
              k < i.length - 1
                ? ve(
                    i[k],
                    i[k + 1],
                    Fe(R, k / i.length, (k + 1) / i.length, 0, 1),
                  )
                : i[k],
            K = Math.floor(v.progress * a.length),
            V = a[K],
            X = Math.floor(v.progress * d.length),
            N = d[X],
            U = Math.cos((v.angle * Math.PI) / 180),
            te = Math.sin((v.angle * Math.PI) / 180),
            z = ((t.texture ? t.texture.width : 10) * V.w) / 2,
            Z = ((t.texture ? t.texture.height : 10) * V.h) / 2,
            ce = A * 4,
            L = y[ce];
          ((L.pos.x = v.pos.x + -z * N * U - -Z * N * te),
            (L.pos.y = v.pos.y + -z * N * te + -Z * N * U),
            (L.uv.x = V.x),
            (L.uv.y = V.y),
            (L.color.r = P.r),
            (L.color.g = P.g),
            (L.color.b = P.b),
            (L.opacity = O),
            (L = y[ce + 1]),
            (L.pos.x = v.pos.x + z * N * U - -Z * N * te),
            (L.pos.y = v.pos.y + z * N * te + -Z * N * U),
            (L.uv.x = V.x + V.w),
            (L.uv.y = V.y),
            (L.color.r = P.r),
            (L.color.g = P.g),
            (L.color.b = P.b),
            (L.opacity = O),
            (L = y[ce + 2]),
            (L.pos.x = v.pos.x + z * N * U - Z * N * te),
            (L.pos.y = v.pos.y + z * N * te + Z * N * U),
            (L.uv.x = V.x + V.w),
            (L.uv.y = V.y + V.h),
            (L.color.r = P.r),
            (L.color.g = P.g),
            (L.color.b = P.b),
            (L.opacity = O),
            (L = y[ce + 3]),
            (L.pos.x = v.pos.x + -z * N * U - Z * N * te),
            (L.pos.y = v.pos.y + -z * N * te + Z * N * U),
            (L.uv.x = V.x),
            (L.uv.y = V.y + V.h),
            (L.color.r = P.r),
            (L.color.g = P.g),
            (L.color.b = P.b),
            (L.opacity = O));
        }
        Je(y, m, this.fixed, t.texture, this.shader, this.uniform);
      }
    },
    onEnd(A) {
      return D.add(A);
    },
    inspect() {
      return `count: ${q}/${t.max}`;
    },
  };
}
function Oo(t, e = {}) {
  if (t.length < 3)
    throw new Error(
      `Polygon's need more than two points, ${t.length} points provided`,
    );
  return {
    id: "polygon",
    pts: t,
    colors: e.colors,
    uv: e.uv,
    tex: e.tex,
    radius: e.radius,
    draw() {
      Xe(
        Object.assign(at(this), {
          pts: this.pts,
          colors: this.colors,
          uv: this.uv,
          tex: this.tex,
          radius: this.radius,
          fill: e.fill,
          triangulate: e.triangulate,
        }),
      );
    },
    renderArea() {
      return new we(this.pts);
    },
    inspect() {
      return `polygon: ${this.pts.map((r) => `[${r.x},${r.y}]`).join(",")}`;
    },
  };
}
function xn(t, e, r) {
  let s;
  return (
    h.game.root.get("area").forEach((n) => {
      if (r && r.some((a) => n.is(a))) return;
      let i = n.worldArea().raycast(t, e);
      i &&
        (s
          ? i.fraction < s.fraction && ((s = i), (s.object = n))
          : ((s = i), (s.object = n)));
    }),
    s
  );
}
function vn(t, e, r = {}) {
  return {
    id: "rect",
    width: t,
    height: e,
    radius: r.radius || 0,
    draw() {
      Ce(
        Object.assign(at(this), {
          width: this.width,
          height: this.height,
          radius: this.radius,
          fill: r.fill,
        }),
      );
    },
    renderArea() {
      return new $(b(0), this.width, this.height);
    },
    inspect() {
      return `rect: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)}h)`;
    },
  };
}
function Uo(t, e) {
  return {
    id: "shader",
    shader: t,
    ...(typeof e == "function"
      ? {
          uniform: e(),
          update() {
            this.uniform = e();
          },
        }
      : { uniform: e }),
    inspect() {
      return `shader: ${t}`;
    },
  };
}
function Lo(t, e) {
  if (!e.tileWidth || !e.tileHeight)
    throw new Error("Must provide tileWidth and tileHeight.");
  let r = h.game.root.add([ar(e.pos ?? b(0))]),
    s = t.length,
    n = 0,
    i = null,
    a = null,
    d = null,
    l = null,
    o = (A) => A.x + A.y * n,
    c = (A) => b(Math.floor(A % n), Math.floor(A / n)),
    w = () => {
      i = [];
      for (let A of r.children) u(A);
    },
    u = (A) => {
      let v = o(A.tilePos);
      i[v] ? i[v].push(A) : (i[v] = [A]);
    },
    g = (A) => {
      let v = o(A.tilePos);
      if (i[v]) {
        let R = i[v].indexOf(A);
        R >= 0 && i[v].splice(R, 1);
      }
    },
    f = () => {
      let A = !1;
      for (let v of r.children) {
        let R = r.pos2Tile(v.pos);
        (v.tilePos.x != R.x || v.tilePos.y != R.y) &&
          ((A = !0), g(v), (v.tilePos.x = R.x), (v.tilePos.y = R.y), u(v));
      }
      A && r.trigger("spatialMapChanged");
    },
    x = () => {
      let A = r.getSpatialMap(),
        v = r.numRows() * r.numColumns();
      (a ? (a.length = v) : (a = new Array(v)), a.fill(1, 0, v));
      for (let R = 0; R < A.length; R++) {
        let I = A[R];
        if (I) {
          let P = 0;
          for (let k of I)
            if (k.isObstacle) {
              P = 1 / 0;
              break;
            } else P += k.cost;
          a[R] = P || 1;
        }
      }
    },
    m = () => {
      let A = r.getSpatialMap(),
        v = r.numRows() * r.numColumns();
      (d ? (d.length = v) : (d = new Array(v)), d.fill(15, 0, v));
      for (let R = 0; R < A.length; R++) {
        let I = A[R];
        if (I) {
          let P = I.length,
            k = 15;
          for (let O = 0; O < P; O++) k |= I[O].edgeMask;
          d[R] = k;
        }
      }
    },
    y = () => {
      let A = r.numRows() * r.numColumns(),
        v = (I, P) => {
          let k = [];
          for (k.push(I); k.length > 0; ) {
            let O = k.pop();
            D(O).forEach((K) => {
              l[K] < 0 && ((l[K] = P), k.push(K));
            });
          }
        };
      (l ? (l.length = A) : (l = new Array(A)), l.fill(-1, 0, A));
      let R = 0;
      for (let I = 0; I < a.length; I++) {
        if (l[I] >= 0) {
          R++;
          continue;
        }
        (v(I, R), R++);
      }
    },
    q = (A, v) => a[v],
    C = (A, v) => {
      let R = c(A),
        I = c(v);
      return R.dist(I);
    },
    D = (A, v) => {
      let R = [],
        I = Math.floor(A % n),
        P = I > 0 && d[A] & 1 && a[A - 1] !== 1 / 0,
        k = A >= n && d[A] & 2 && a[A - n] !== 1 / 0,
        O = I < n - 1 && d[A] & 4 && a[A + 1] !== 1 / 0,
        K = A < n * s - n - 1 && d[A] & 8 && a[A + n] !== 1 / 0;
      return (
        v
          ? (P &&
              (k && R.push(A - n - 1), R.push(A - 1), K && R.push(A + n - 1)),
            k && R.push(A - n),
            O &&
              (k && R.push(A - n + 1), R.push(A + 1), K && R.push(A + n + 1)),
            K && R.push(A + n))
          : (P && R.push(A - 1),
            k && R.push(A - n),
            O && R.push(A + 1),
            K && R.push(A + n)),
        R
      );
    },
    S = {
      id: "level",
      tileWidth() {
        return e.tileWidth;
      },
      tileHeight() {
        return e.tileHeight;
      },
      spawn(A, ...v) {
        let R = b(...v),
          I = (() => {
            if (typeof A == "string") {
              if (e.tiles[A]) {
                if (typeof e.tiles[A] != "function")
                  throw new Error(
                    "Level symbol def must be a function returning a component list",
                  );
                return e.tiles[A](R);
              } else if (e.wildcardTile) return e.wildcardTile(A, R);
            } else {
              if (Array.isArray(A)) return A;
              throw new Error("Expected a symbol or a component list");
            }
          })();
        if (!I) return null;
        let P = !1,
          k = !1;
        for (let K of I)
          (K.id === "tile" && (k = !0), K.id === "pos" && (P = !0));
        (P || I.push(ar(this.tile2Pos(R))), k || I.push(Nn()));
        let O = r.add(I);
        return (
          P && (O.tilePosOffset = O.pos.clone()),
          (O.tilePos = R),
          (O.transform = It(O)),
          i &&
            (u(O),
            this.trigger("spatialMapChanged"),
            this.trigger("navigationMapInvalid")),
          O
        );
      },
      numColumns() {
        return n;
      },
      numRows() {
        return s;
      },
      levelWidth() {
        return n * this.tileWidth();
      },
      levelHeight() {
        return s * this.tileHeight();
      },
      tile2Pos(...A) {
        return b(...A).scale(this.tileWidth(), this.tileHeight());
      },
      pos2Tile(...A) {
        let v = b(...A);
        return b(
          Math.floor(v.x / this.tileWidth()),
          Math.floor(v.y / this.tileHeight()),
        );
      },
      getSpatialMap() {
        return (i || w(), i);
      },
      removeFromSpatialMap: g,
      insertIntoSpatialMap: u,
      onSpatialMapChanged(A) {
        return this.on("spatialMapChanged", A);
      },
      onNavigationMapInvalid(A) {
        return this.on("navigationMapInvalid", A);
      },
      getAt(A) {
        i || w();
        let v = o(A);
        return i[v] || [];
      },
      raycast(A, v) {
        let R = this.toWorld(A),
          I = this.toWorld(A.add(v)).sub(R),
          P = 1 / this.tileWidth(),
          k = A.scale(P),
          O = wi(
            k,
            v,
            (K) => {
              let V = this.getAt(K);
              if (V.some((N) => N.isObstacle)) return !0;
              let X = null;
              for (let N of V)
                if (N.has("area")) {
                  let U = N.worldArea().raycast(R, I);
                  U &&
                    (X
                      ? U.fraction < X.fraction && ((X = U), (X.object = N))
                      : ((X = U), (X.object = N)));
                }
              return (
                X && (X.point = this.fromWorld(X.point).scale(P)),
                X || !1
              );
            },
            64,
          );
        return (O && (O.point = O.point.scale(this.tileWidth())), O);
      },
      update() {
        i && f();
      },
      invalidateNavigationMap() {
        ((a = null), (d = null), (l = null));
      },
      onNavigationMapChanged(A) {
        return this.on("navigationMapChanged", A);
      },
      getTilePath(A, v, R = {}) {
        if (
          (a || x(),
          d || m(),
          l || y(),
          A.x < 0 ||
            A.x >= n ||
            A.y < 0 ||
            A.y >= s ||
            v.x < 0 ||
            v.x >= n ||
            v.y < 0 ||
            v.y >= s)
        )
          return null;
        let I = o(A),
          P = o(v);
        if (a[P] === 1 / 0) return null;
        if (I === P) return [];
        if (l[I] != -1 && l[I] !== l[P]) return null;
        let k = new Zs((U, te) => U.cost < te.cost);
        k.insert({ cost: 0, node: I });
        let O = new Map();
        O.set(I, I);
        let K = new Map();
        for (K.set(I, 0); k.length !== 0; ) {
          let U = k.remove()?.node;
          if (U === P) break;
          let te = D(U, R.allowDiagonals);
          for (let z of te) {
            let Z = (K.get(U) || 0) + q(U, z) + C(z, P);
            (!K.has(z) || Z < K.get(z)) &&
              (K.set(z, Z), k.insert({ cost: Z, node: z }), O.set(z, U));
          }
        }
        let V = [],
          X = P,
          N = c(X);
        for (V.push(N); X !== I; ) {
          let U = O.get(X);
          if (U === void 0) throw new Error("Bug in pathfinding algorithm");
          X = U;
          let te = c(X);
          V.push(te);
        }
        return V.reverse();
      },
      getPath(A, v, R = {}) {
        let I = this.tileWidth(),
          P = this.tileHeight(),
          k = this.getTilePath(this.pos2Tile(A), this.pos2Tile(v), R);
        return k
          ? [
              A,
              ...k.slice(1, -1).map((O) => O.scale(I, P).add(I / 2, P / 2)),
              v,
            ]
          : null;
      },
    };
  return (
    r.use(S),
    r.onNavigationMapInvalid(() => {
      (r.invalidateNavigationMap(), r.trigger("navigationMapChanged"));
    }),
    t.forEach((A, v) => {
      let R = A.split("");
      ((n = Math.max(R.length, n)),
        R.forEach((I, P) => {
          r.spawn(I, b(P, v));
        }));
    }),
    r
  );
}
function Me(t, e, r) {
  return (
    h.game.objEvents.registers[t] || (h.game.objEvents.registers[t] = new Qs()),
    h.game.objEvents.on(t, (s, ...n) => {
      s.is(e) && r(s, ...n);
    })
  );
}
var No = (t, e, ...r) => {
    for (let s of h.game.root.children) s.is(e) && s.trigger(t, r);
  },
  Ho = ee(
    (t) => {
      let e = h.game.root.add([{ fixedUpdate: t }]);
      return {
        get paused() {
          return e.paused;
        },
        set paused(r) {
          e.paused = r;
        },
        cancel: () => e.destroy(),
      };
    },
    (t, e) => Me("fixedUpdate", t, e),
  ),
  bn = ee(
    (t) => {
      let e = h.game.root.add([{ update: t }]);
      return {
        get paused() {
          return e.paused;
        },
        set paused(r) {
          e.paused = r;
        },
        cancel: () => e.destroy(),
      };
    },
    (t, e) => Me("update", t, e),
  ),
  Go = ee(
    (t) => {
      let e = h.game.root.add([{ draw: t }]);
      return {
        get paused() {
          return e.hidden;
        },
        set paused(r) {
          e.hidden = r;
        },
        cancel: () => e.destroy(),
      };
    },
    (t, e) => Me("draw", t, e),
  ),
  En = ee(
    (t) => h.game.events.on("add", t),
    (t, e) => Me("add", t, e),
  ),
  jo = ee(
    (t) => h.game.events.on("destroy", t),
    (t, e) => Me("destroy", t, e),
  ),
  Ko = ee(
    (t) => h.game.events.on("use", t),
    (t, e) => Me("use", t, e),
  ),
  Vo = ee(
    (t) => h.game.events.on("unuse", t),
    (t, e) => Me("unuse", t, e),
  ),
  Mn = ee(
    (t) => h.game.events.on("tag", t),
    (t, e) => Me("tag", t, e),
  ),
  Yo = ee(
    (t) => h.game.events.on("untag", t),
    (t, e) => Me("untag", t, e),
  );
function Xo(t, e, r) {
  return Me("collide", t, (s, n, i) => n.is(e) && r(s, n, i));
}
function zo(t, e, r) {
  return Me("collideUpdate", t, (s, n, i) => n.is(e) && r(s, n, i));
}
function Wo(t, e, r) {
  return Me("collideEnd", t, (s, n, i) => n.is(e) && r(s, n, i));
}
function pr(t, e) {
  (h.game.root.get(t, { recursive: !0 }).forEach(e),
    En(t, e),
    Mn((r, s) => {
      s === t && e(r);
    }));
}
var Qo = ee(
  (t) => h.app.onMousePress(t),
  (t, e) => {
    let r = [];
    return (
      pr(t, (s) => {
        if (!s.area)
          throw new Error(
            "onClick() requires the object to have area() component",
          );
        r.push(s.onClick(() => e(s)));
      }),
      ot.join(r)
    );
  },
);
function Jo(t, e) {
  let r = [];
  return (
    pr(t, (s) => {
      if (!s.area)
        throw new Error(
          "onHover() requires the object to have area() component",
        );
      r.push(s.onHover(() => e(s)));
    }),
    ot.join(r)
  );
}
function Zo(t, e) {
  let r = [];
  return (
    pr(t, (s) => {
      if (!s.area)
        throw new Error(
          "onHoverUpdate() requires the object to have area() component",
        );
      r.push(s.onHoverUpdate(() => e(s)));
    }),
    ot.join(r)
  );
}
function _o(t, e) {
  let r = [];
  return (
    pr(t, (s) => {
      if (!s.area)
        throw new Error(
          "onHoverEnd() requires the object to have area() component",
        );
      r.push(s.onHoverEnd(() => e(s)));
    }),
    ot.join(r)
  );
}
function $o(t) {
  h.game.events.on("loading", t);
}
function el(t) {
  h.app.onResize(t);
}
function tl(t) {
  h.game.events.on("error", t);
}
function as(t) {
  h.assets.loaded ? t() : h.game.events.on("load", t);
}
function rl(t) {
  if (h.assets.loaded) sn().forEach((e) => t(...e));
  else return h.game.events.on("loadError", t);
}
function Sn(...t) {
  h.game.cam.pos = b(...t);
}
function qn() {
  return h.game.cam.pos ? h.game.cam.pos.clone() : sr();
}
function Bn(...t) {
  h.game.cam.scale = b(...t);
}
function Rn() {
  return h.game.cam.scale.clone();
}
function Cn(t) {
  h.game.cam.angle = t;
}
function In() {
  return h.game.cam.angle;
}
function sl() {
  return h.game.cam.transform.clone();
}
function Pn(t = J(255, 255, 255), e = 1) {
  let r = h.game.root.add([vn(fe(), pe()), yn(t), An(1), jn()]),
    s = r.fadeOut(e);
  return (s.onEnd(() => Ln(r)), s);
}
function nl() {
  return h.game.cam.transform.clone();
}
function il(t = 12) {
  h.game.cam.shake += t;
}
function Gr(t) {
  return h.game.cam.transform.multVec2(t);
}
function Tn(t) {
  return h.game.cam.transform.invert().multVec2(t);
}
function al(...t) {
  return (
    mt("camPos", "setCamPos / getCamPos"),
    t.length > 0 && Sn(...t),
    qn()
  );
}
function ol(...t) {
  return (
    mt("camScale", "setCamScale / getCamScale"),
    t.length > 0 && Bn(...t),
    Rn()
  );
}
function ll(t) {
  return (mt("camRot", "setCamRot / getCamRot"), t !== void 0 && Cn(t), In());
}
function ul(t = J(255, 255, 255), e = 1) {
  return (mt("camFlash", "flash"), Pn(t, e));
}
function os(t = []) {
  let e = new Map(),
    r = [],
    s = {},
    n = new kt(),
    i = [],
    a = new Set("*"),
    d = h.globalOpt.tagsAsComponents,
    l = null,
    o = !1,
    c = {
      id: ya(),
      hidden: !1,
      transform: new Ue(),
      children: [],
      parent: null,
      set paused(u) {
        if (u !== o) {
          o = u;
          for (let g of i) g.paused = u;
        }
      },
      get paused() {
        return o;
      },
      get tags() {
        return Array.from(a);
      },
      add(u) {
        let g = Array.isArray(u) ? os(u) : u;
        if (g.parent)
          throw new Error("Cannot add a game obj that already has a parent.");
        return (
          (g.parent = this),
          (g.transform = It(g)),
          this.children.push(g),
          g.trigger("add", g),
          h.game.events.trigger("add", g),
          g
        );
      },
      readd(u) {
        let g = this.children.indexOf(u);
        return (
          g !== -1 && (this.children.splice(g, 1), this.children.push(u)),
          u
        );
      },
      remove(u) {
        let g = this.children.indexOf(u);
        if (g !== -1) {
          ((u.parent = null), this.children.splice(g, 1));
          let f = (x) => {
            (x.trigger("destroy"),
              h.game.events.trigger("destroy", x),
              x.children.forEach((m) => f(m)));
          };
          f(u);
        }
      },
      removeAll(u) {
        if (u) this.get(u).forEach((g) => this.remove(g));
        else for (let g of [...this.children]) this.remove(g);
      },
      fixedUpdate() {
        this.paused ||
          (this.children.forEach((u) => u.fixedUpdate()),
          this.trigger("fixedUpdate"));
      },
      update() {
        this.paused ||
          (this.children.forEach((u) => u.update()), this.trigger("update"));
      },
      draw() {
        if (this.hidden) return;
        this.canvas && (Re(), this.canvas.bind());
        let u = h.gfx.fixed;
        (this.fixed && (h.gfx.fixed = !0),
          Be(),
          ne(this.pos),
          Ft(this.scale),
          gt(this.angle));
        let g = this.children.sort((f, x) => {
          let m = f.layerIndex ?? h.game.defaultLayerIndex,
            y = x.layerIndex ?? h.game.defaultLayerIndex;
          return m - y || (f.z ?? 0) - (x.z ?? 0);
        });
        if (this.mask) {
          let f = { intersect: h.k.drawMasked, subtract: h.k.drawSubtracted }[
            this.mask
          ];
          if (!f) throw new Error(`Invalid mask func: "${this.mask}"`);
          f(
            () => {
              g.forEach((x) => x.draw());
            },
            () => {
              this.trigger("draw");
            },
          );
        } else (this.trigger("draw"), g.forEach((f) => f.draw()));
        (xe(), (h.gfx.fixed = u), this.canvas && (Re(), this.canvas.unbind()));
      },
      drawInspect() {
        this.hidden ||
          (Be(),
          ne(this.pos),
          Ft(this.scale),
          gt(this.angle),
          this.children.forEach((u) => u.drawInspect()),
          this.trigger("drawInspect"),
          xe());
      },
      use(u) {
        if (typeof u == "string") return a.add(u);
        if (!u || typeof u != "object")
          throw new Error(
            `You can only pass a component or a string to .use(), you passed a "${typeof u}"`,
          );
        let g = [];
        u.id
          ? (this.unuse(u.id),
            (s[u.id] = []),
            (g = s[u.id]),
            e.set(u.id, u),
            d && a.add(u.id))
          : r.push(u);
        for (let x in u) {
          if (Wi.has(x)) continue;
          let m = Object.getOwnPropertyDescriptor(u, x);
          if (m)
            if (
              (typeof m.value == "function" && (u[x] = u[x].bind(this)),
              m.set && Object.defineProperty(u, x, { set: m.set.bind(this) }),
              m.get && Object.defineProperty(u, x, { get: m.get.bind(this) }),
              Qi.has(x))
            ) {
              let y =
                x === "add"
                  ? () => {
                      ((l = (q) => g.push(q)), u[x]?.(), (l = null));
                    }
                  : u[x];
              g.push(this.on(x, y).cancel);
            } else if (this[x] === void 0)
              (Object.defineProperty(this, x, {
                get: () => u[x],
                set: (y) => (u[x] = y),
                configurable: !0,
                enumerable: !0,
              }),
                g.push(() => delete this[x]));
            else {
              let y = e.values().find((q) => q[x] !== void 0)?.id;
              throw new Error(
                `Duplicate component property: "${x}" while adding component "${u.id}"` +
                  (y ? ` (originally added by "${y}")` : ""),
              );
            }
        }
        let f = () => {
          if (u.require) {
            for (let x of u.require)
              if (!this.c(x))
                throw new Error(
                  `Component "${u.id}" requires component "${x}"`,
                );
          }
        };
        (u.destroy && g.push(u.destroy.bind(this)),
          this.exists()
            ? (f(),
              u.add && ((l = (x) => g.push(x)), u.add.call(this), (l = null)),
              u.id &&
                (this.trigger("use", u.id),
                h.game.events.trigger("use", this, u.id)))
            : u.require && g.push(this.on("add", f).cancel));
      },
      unuse(u) {
        if (e.has(u)) {
          for (let g of e.values())
            if (g.require && g.require.includes(u))
              throw new Error(
                `Can't unuse. Component "${g.id}" requires component "${u}"`,
              );
          (e.delete(u),
            this.trigger("unuse", u),
            h.game.events.trigger("unuse", this, u));
        } else d && a.has(u) && a.delete(u);
        s[u] && (s[u].forEach((g) => g()), delete s[u]);
      },
      c(u) {
        return e.get(u) ?? null;
      },
      get(u, g = {}) {
        let f = (m, y) =>
            g.only === "comps"
              ? m.has(y)
              : g.only === "tags"
                ? m.is(y)
                : m.is(y) || m.has(y),
          x = g.recursive
            ? this.children.flatMap(function m(y) {
                return [y, ...y.children.flatMap(m)];
              })
            : this.children;
        if (((x = x.filter((m) => (u ? f(m, u) : !0))), g.liveUpdate)) {
          let m = (q) =>
              g.recursive ? this.isAncestorOf(q) : q.parent === this,
            y = [];
          (y.push(
            h.k.onAdd((q) => {
              m(q) && f(q, u) && x.push(q);
            }),
          ),
            y.push(
              h.k.onDestroy((q) => {
                if (m(q) && f(q, u)) {
                  let C = x.findIndex((D) => D.id === q.id);
                  C !== -1 && x.splice(C, 1);
                }
              }),
            ),
            this.onDestroy(() => {
              for (let q of y) q.cancel();
            }));
        }
        return x;
      },
      query(u) {
        let g = u.hierarchy || "children",
          f = u.include,
          x = u.exclude,
          m = [];
        switch (g) {
          case "children":
            m = this.children;
            break;
          case "siblings":
            m = this.parent
              ? this.parent.children.filter((q) => q !== this)
              : [];
            break;
          case "ancestors":
            let y = this.parent;
            for (; y; ) (m.push(y), (y = y.parent));
            break;
          case "descendants":
            m = this.children.flatMap(function q(C) {
              return [C, ...C.children.flatMap(q)];
            });
            break;
        }
        if (
          (f &&
            ((u.includeOp || "and") === "and" || !Array.isArray(u.include)
              ? (m = m.filter((y) => y.is(f)))
              : (m = m.filter((y) => u.include.some((q) => y.is(q))))),
          x &&
            ((u.includeOp || "and") === "and" || !Array.isArray(u.include)
              ? (m = m.filter((y) => !y.is(x)))
              : (m = m.filter((y) => !u.exclude.some((q) => y.is(q))))),
          u.visible === !0 && (m = m.filter((y) => y.visible)),
          u.distance)
        ) {
          if (!this.pos)
            throw Error("Can't do a distance query from an object without pos");
          let y = u.distanceOp || "near",
            q = u.distance * u.distance;
          y === "near"
            ? (m = m.filter((C) => C.pos && this.pos.sdist(C.pos) <= q))
            : (m = m.filter((C) => C.pos && this.pos.sdist(C.pos) > q));
        }
        return (u.name && (m = m.filter((y) => y.name === u.name)), m);
      },
      isAncestorOf(u) {
        return u.parent ? u.parent === this || this.isAncestorOf(u.parent) : !1;
      },
      exists() {
        return h.game.root.isAncestorOf(this);
      },
      is(u, g = "and") {
        return Array.isArray(u)
          ? g === "and"
            ? u.every((f) => a.has(f))
            : u.some((f) => a.has(f))
          : a.has(u);
      },
      tag(u) {
        if (Array.isArray(u))
          for (let g of u)
            (a.add(g),
              this.trigger("tag", g),
              h.game.events.trigger("tag", this, g));
        else
          (a.add(u),
            this.trigger("tag", u),
            h.game.events.trigger("tag", this, u));
      },
      untag(u) {
        if (Array.isArray(u))
          for (let g of u)
            (a.delete(g),
              this.trigger("untag", g),
              h.game.events.trigger("untag", this, g));
        else
          (a.delete(u),
            this.trigger("untag", u),
            h.game.events.trigger("untag", this, u));
      },
      has(u, g = "and") {
        return Array.isArray(u)
          ? g === "and"
            ? u.every((f) => e.has(f))
            : u.some((f) => e.has(f))
          : e.has(u);
      },
      on(u, g) {
        let f = n.on(u, g.bind(this));
        return (l && l(() => f.cancel()), f);
      },
      trigger(u, ...g) {
        (n.trigger(u, ...g), h.game.objEvents.trigger(u, this, ...g));
      },
      destroy() {
        this.parent && this.parent.remove(this);
      },
      inspect() {
        let u = {};
        for (let [g, f] of e) u[g] = f.inspect?.() ?? null;
        for (let [g, f] of r.entries()) {
          if (f.inspect) {
            u[g] = f.inspect();
            continue;
          }
          for (let [x, m] of Object.entries(f))
            typeof m != "function" && (u[x] = `${x}: ${m}`);
        }
        return u;
      },
      onAdd(u) {
        return this.on("add", u);
      },
      onFixedUpdate(u) {
        return this.on("fixedUpdate", u);
      },
      onUpdate(u) {
        return this.on("update", u);
      },
      onDraw(u) {
        return this.on("draw", u);
      },
      onDestroy(u) {
        return this.on("destroy", u);
      },
      onUse(u) {
        return this.on("use", u);
      },
      onUnuse(u) {
        return this.on("unuse", u);
      },
      clearEvents() {
        n.clear();
      },
    },
    w = [
      "onKeyPress",
      "onKeyPressRepeat",
      "onKeyDown",
      "onKeyRelease",
      "onMousePress",
      "onMouseDown",
      "onMouseRelease",
      "onMouseMove",
      "onCharInput",
      "onMouseMove",
      "onTouchStart",
      "onTouchMove",
      "onTouchEnd",
      "onScroll",
      "onGamepadButtonPress",
      "onGamepadButtonDown",
      "onGamepadButtonRelease",
      "onGamepadStick",
      "onButtonPress",
      "onButtonDown",
      "onButtonRelease",
    ];
  for (let u of w)
    c[u] = (...g) => {
      let f = h.app[u]?.(...g);
      return (
        i.push(f),
        c.onDestroy(() => f.cancel()),
        c.on("sceneEnter", () => {
          i.splice(i.indexOf(f), 1);
          let x = h.app[u]?.(...g);
          (ot.replace(f, x), i.push(f));
        }),
        f
      );
    };
  for (let u of t) c.use(u);
  return c;
}
var hl = () => ({
  events: new kt(),
  objEvents: new kt(),
  root: os([]),
  gravity: null,
  scenes: {},
  currentScene: null,
  layers: null,
  defaultLayerIndex: 0,
  logs: [],
  cam: { pos: null, scale: new M(1), angle: 0, shake: 0, transform: new Ue() },
});
function dl(t) {
  h.game.gravity = t ? (h.game.gravity || b(0, 1)).unit().scale(t) : null;
}
function cl() {
  return h.game.gravity ? h.game.gravity.len() : 0;
}
function fl(t) {
  h.game.gravity = t.unit().scale(h.game.gravity ? h.game.gravity.len() : 1);
}
function Tt() {
  return h.game.gravity ? h.game.gravity.unit() : b(0, 1);
}
var pl = Wn(
    "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",
  ),
  gl = () =>
    (() => {
      let t = new (window.AudioContext || window.webkitAudioContext)(),
        e = t.createGain();
      e.connect(t.destination);
      let r = new Ot(Ua(t));
      return (
        t
          .decodeAudioData(pl.buffer.slice(0))
          .then((s) => {
            r.buf = s;
          })
          .catch((s) => {
            console.error("Failed to load burp: ", s);
          }),
        { ctx: t, masterNode: e, burpSnd: r }
      );
    })();
function ml(t, e = {}) {
  let r = new me(),
    s = new Audio(t);
  ((s.crossOrigin = "anonymous"),
    (s.loop = !!e.loop),
    h.audio.ctx.createMediaElementSource(s).connect(h.audio.masterNode));
  function n() {
    h.debug.paused ||
      (h.app.isHidden() && !h.globalOpt.backgroundAudio) ||
      h.audio.ctx.resume();
  }
  function i() {
    (n(), s.play());
  }
  return (
    e.paused || i(),
    (s.onended = () => r.trigger()),
    {
      play() {
        i();
      },
      seek(a) {
        s.currentTime = a;
      },
      stop() {
        (s.pause(), this.seek(0));
      },
      set loop(a) {
        s.loop = a;
      },
      get loop() {
        return s.loop;
      },
      set paused(a) {
        a ? s.pause() : i();
      },
      get paused() {
        return s.paused;
      },
      time() {
        return s.currentTime;
      },
      duration() {
        return s.duration;
      },
      set volume(a) {
        s.volume = Oe(a, 0, 1);
      },
      get volume() {
        return s.volume;
      },
      set speed(a) {
        s.playbackRate = Math.max(a, 0);
      },
      get speed() {
        return s.playbackRate;
      },
      set detune(a) {},
      get detune() {
        return 0;
      },
      onEnd(a) {
        return r.add(a);
      },
      then(a) {
        return this.onEnd(a);
      },
    }
  );
}
function wl(t, e = {}) {
  if (typeof t == "string" && h.assets.music[t])
    return ml(h.assets.music[t], e);
  let r = h.audio.ctx,
    s = e.paused ?? !1,
    n = r.createBufferSource(),
    i = new me(),
    a = r.createGain(),
    d = r.createStereoPanner(),
    l = e.seek ?? 0,
    o = 0,
    c = 0,
    w = !1;
  ((n.loop = !!e.loop),
    (n.detune.value = e.detune ?? 0),
    (n.playbackRate.value = e.speed ?? 1),
    n.connect(d),
    (n.onended = () => {
      f() >= (n.buffer?.duration ?? Number.POSITIVE_INFINITY) && i.trigger();
    }),
    (d.pan.value = e.pan ?? 0),
    d.connect(a),
    a.connect(h.audio.masterNode),
    (a.gain.value = e.volume ?? 1));
  let u = (m) => {
      ((n.buffer = m.buf), s || ((o = r.currentTime), n.start(0, l), (w = !0)));
    },
    g = co(t);
  g instanceof Pe && g.onLoad(u);
  let f = () => {
      if (!n.buffer) return 0;
      let m = s ? c - o : r.currentTime - o,
        y = n.buffer.duration;
      return n.loop ? m % y : Math.min(m, y);
    },
    x = (m) => {
      let y = r.createBufferSource();
      return (
        (y.buffer = m.buffer),
        (y.loop = m.loop),
        (y.playbackRate.value = m.playbackRate.value),
        (y.detune.value = m.detune.value),
        (y.onended = m.onended),
        y.connect(d),
        y
      );
    };
  return {
    stop() {
      ((this.paused = !0), this.seek(0));
    },
    set paused(m) {
      if (s !== m)
        if (((s = m), m)) (w && (n.stop(), (w = !1)), (c = r.currentTime));
        else {
          n = x(n);
          let y = c - o;
          (n.start(0, y), (w = !0), (o = r.currentTime - y), (c = 0));
        }
    },
    get paused() {
      return s;
    },
    play(m = 0) {
      (this.seek(m), (this.paused = !1));
    },
    seek(m) {
      n.buffer?.duration &&
        (m > n.buffer.duration ||
          (s
            ? ((n = x(n)), (o = c - m))
            : (n.stop(),
              (n = x(n)),
              (o = r.currentTime - m),
              n.start(0, m),
              (w = !0),
              (c = 0))));
    },
    set speed(m) {
      n.playbackRate.value = m;
    },
    get speed() {
      return n.playbackRate.value;
    },
    set detune(m) {
      n.detune.value = m;
    },
    get detune() {
      return n.detune.value;
    },
    set volume(m) {
      a.gain.value = Math.max(m, 0);
    },
    get volume() {
      return a.gain.value;
    },
    set pan(m) {
      d.pan.value = m;
    },
    get pan() {
      return d.pan.value;
    },
    set loop(m) {
      n.loop = m;
    },
    get loop() {
      return n.loop;
    },
    duration() {
      return n.buffer?.duration ?? 0;
    },
    time() {
      return f() % this.duration();
    },
    onEnd(m) {
      return i.add(m);
    },
    then(m) {
      return this.onEnd(m);
    },
  };
}
function kn(t) {
  return h.k.play(h.audio.burpSnd, t);
}
function Dn(t) {
  h.audio.masterNode.gain.value = t;
}
function Fn() {
  return h.audio.masterNode.gain.value;
}
function yl(t) {
  return (mt("volume", "setVolume / getVolume"), t !== void 0 && Dn(t), Fn());
}
function On() {
  (h.app.onHide(() => {
    h.globalOpt.backgroundAudio || h.audio.ctx.suspend();
  }),
    h.app.onShow(() => {
      !h.globalOpt.backgroundAudio && !h.debug.paused && h.audio.ctx.resume();
    }),
    h.app.onResize(() => {
      if (h.app.isFullscreen()) return;
      let t = h.globalOpt.width && h.globalOpt.height;
      (t && !h.globalOpt.stretch && !h.globalOpt.letterbox) ||
        ((h.canvas.width = h.canvas.offsetWidth * h.pixelDensity),
        (h.canvas.height = h.canvas.offsetHeight * h.pixelDensity),
        en(),
        t ||
          (h.gfx.frameBuffer.free(),
          (h.gfx.frameBuffer = new nr(
            h.gfx.ggl,
            h.gfx.ggl.gl.drawingBufferWidth,
            h.gfx.ggl.gl.drawingBufferHeight,
          )),
          (h.gfx.width =
            h.gfx.ggl.gl.drawingBufferWidth / h.pixelDensity / h.gscale),
          (h.gfx.height =
            h.gfx.ggl.gl.drawingBufferHeight / h.pixelDensity / h.gscale)));
    }),
    h.globalOpt.debug !== !1 &&
      (h.app.onKeyPress(
        h.globalOpt.debugKey ?? "f1",
        () => (h.debug.inspect = !h.debug.inspect),
      ),
      h.app.onKeyPress("f2", () => h.debug.clearLog()),
      h.app.onKeyPress("f8", () => (h.debug.paused = !h.debug.paused)),
      h.app.onKeyPress("f7", () => {
        h.debug.timeScale = Fr(Oe(h.debug.timeScale - 0.2, 0, 2), 1);
      }),
      h.app.onKeyPress("f9", () => {
        h.debug.timeScale = Fr(Oe(h.debug.timeScale + 0.2, 0, 2), 1);
      }),
      h.app.onKeyPress("f10", () => h.debug.stepFrame())),
    h.globalOpt.burp && h.app.onKeyPress("b", () => kn()));
}
function Al(t, e = {}) {
  let r = h.game.root.add([ar(t), Gn()]),
    s = (e.speed || 1) * 5,
    n = e.scale || 1;
  r.add([jr(h.boomSprite), or(0), Yr("center"), Rs(s, n), ...(e.comps ?? [])]);
  let i = r.add([
    jr(h.kaSprite),
    or(0),
    Yr("center"),
    Kr(),
    ...(e.comps ?? []),
  ]);
  return (
    i.wait(0.4 / s, () => i.use(Rs(s, n))),
    i.onDestroy(() => r.destroy()),
    r
  );
}
function Un(t, e) {
  if (h.game.layers) throw Error("Layers can only be assigned once.");
  let r = t.indexOf(e);
  if (r == -1)
    throw Error("The default layer name should be present in the layers list.");
  ((h.game.layers = t), (h.game.defaultLayerIndex = r));
}
function xl() {
  return h.game.layers;
}
function vl() {
  return h.game.layers?.[h.game.defaultLayerIndex] ?? null;
}
function bl(t, e) {
  (mt("layers", "setLayers"), Un(t, e));
}
function Ln(t) {
  t.destroy();
}
function El() {
  return h.game.root;
}
function Ml(t, e) {
  h.game.scenes[t] = e;
}
function Sl(t, ...e) {
  if (!h.game.scenes[t]) throw new Error(`Scene not found: ${t}`);
  (h.game.events.onOnce("frameEnd", () => {
    (h.game.events.trigger("sceneLeave", t),
      h.app.events.clear(),
      h.game.events.clear(),
      h.game.objEvents.clear(),
      [...h.game.root.children].forEach((r) => {
        !r.stay || (r.scenesToStay && !r.scenesToStay.includes(t))
          ? h.game.root.remove(r)
          : r.trigger("sceneEnter", t);
      }),
      h.game.root.clearEvents(),
      On(),
      (h.game.cam = {
        pos: null,
        scale: b(1),
        angle: 0,
        shake: 0,
        transform: new Ue(),
      }),
      h.game.scenes[t](...e));
  }),
    (h.game.currentScene = t));
}
function ql(t) {
  return h.game.events.on("sceneLeave", t);
}
function Bl() {
  return h.game.currentScene;
}
function jr(t, e = {}) {
  let r = null,
    s = null,
    n = null,
    i = new me();
  if (!t) throw new Error("Please pass the resource name or data to sprite()");
  let a = (o, c, w, u) => {
      let g = b(1, 1);
      return (
        w && u
          ? ((g.x = w / (o.width * c.w)), (g.y = u / (o.height * c.h)))
          : w
            ? ((g.x = w / (o.width * c.w)), (g.y = g.x))
            : u && ((g.y = u / (o.height * c.h)), (g.x = g.y)),
        g
      );
    },
    d = (o, c) => {
      if (!c) return;
      let w = c.frames[0].clone();
      e.quad && (w = w.scale(e.quad));
      let u = a(c.tex, w, e.width, e.height);
      if (
        ((o.width = c.tex.width * w.w * u.x),
        (o.height = c.tex.height * w.h * u.y),
        c.anims)
      )
        for (let g in c.anims) {
          let f = c.anims[g];
          typeof f != "number" && (f.frames = l(f));
        }
      ((r = c), i.trigger(r), e.anim && o.play(e.anim));
    },
    l = (o) => {
      if (o.frames) return o.frames;
      let c = [];
      if (o.from === void 0 || o.to === void 0)
        throw new Error(
          "Sprite anim 'from' and 'to' must be defined if 'frames' is not defined",
        );
      let w = Math.abs(o.to - o.from) + 1;
      for (let u = 0; u < w; u++) c.push(o.from + u * Math.sign(o.to - o.from));
      if (o.pingpong) for (let u = w - 2; u > 0; u--) c.push(c[u]);
      return c;
    };
  return {
    id: "sprite",
    width: 0,
    height: 0,
    frame: e.frame || 0,
    quad: e.quad || new se(0, 0, 1, 1),
    animSpeed: e.animSpeed ?? 1,
    flipX: e.flipX ?? !1,
    flipY: e.flipY ?? !1,
    get sprite() {
      return t.toString();
    },
    set sprite(o) {
      let c = Jt(o);
      c && c.onLoad((w) => d(this, w));
    },
    get animFrame() {
      if (!r || !s || n === null) return this.frame;
      let o = r.anims[s.name];
      return typeof o == "number"
        ? o
        : o.from === void 0 || o.to === void 0
          ? s.frameIndex
          : this.frame - Math.min(o.from, o.to);
    },
    draw() {
      if (!r) return;
      let o = r.frames[this.frame ?? 0];
      if (!o) throw new Error(`Frame not found: ${this.frame ?? 0}`);
      if (r.slice9) {
        let { left: c, right: w, top: u, bottom: g } = r.slice9,
          f = r.tex.width * o.w,
          x = r.tex.height * o.h,
          m = this.width - c - w,
          y = this.height - u - g,
          q = c / f,
          C = w / f,
          D = 1 - q - C,
          S = u / x,
          A = g / x,
          v = 1 - S - A,
          R = [
            ae(0, 0, q, S),
            ae(q, 0, D, S),
            ae(q + D, 0, C, S),
            ae(0, S, q, v),
            ae(q, S, D, v),
            ae(q + D, S, C, v),
            ae(0, S + v, q, A),
            ae(q, S + v, D, A),
            ae(q + D, S + v, C, A),
            ae(0, 0, c, u),
            ae(c, 0, m, u),
            ae(c + m, 0, w, u),
            ae(0, u, c, y),
            ae(c, u, m, y),
            ae(c + m, u, w, y),
            ae(0, u + y, c, g),
            ae(c, u + y, m, g),
            ae(c + m, u + y, w, g),
          ];
        for (let I = 0; I < 9; I++) {
          let P = R[I],
            k = R[I + 9];
          ir(
            Object.assign(at(this), {
              pos: k.pos(),
              tex: r.tex,
              quad: o.scale(P),
              flipX: this.flipX,
              flipY: this.flipY,
              tiled: e.tiled,
              width: k.w,
              height: k.h,
            }),
          );
        }
      } else
        ir(
          Object.assign(at(this), {
            tex: r.tex,
            quad: o.scale(this.quad ?? new se(0, 0, 1, 1)),
            flipX: this.flipX,
            flipY: this.flipY,
            tiled: e.tiled,
            width: this.width,
            height: this.height,
          }),
        );
    },
    add() {
      let o = Jt(t);
      o ? o.onLoad((c) => d(this, c)) : as(() => d(this, Jt(t).data));
    },
    update() {
      if (!r || !s || n === null) return;
      let o = r.anims[s.name];
      if (typeof o == "number") {
        this.frame = o;
        return;
      }
      if (o.speed === 0) throw new Error("Sprite anim speed cannot be 0");
      if (((s.timer += de() * this.animSpeed), s.timer >= 1 / s.speed)) {
        ((s.timer = 0), (s.frameIndex += n));
        let c = o.frames;
        if (s.frameIndex >= c.length)
          if (s.pingpong && !o.pingpong)
            ((n = -1), (s.frameIndex = c.length - 2));
          else if (s.loop) s.frameIndex = 0;
          else {
            ((this.frame = c.at(-1)), s.onEnd(), this.stop());
            return;
          }
        else if (s.frameIndex < 0)
          if (s.pingpong && s.loop) ((n = 1), (s.frameIndex = 1));
          else if (s.loop) s.frameIndex = c.length - 1;
          else {
            ((this.frame = c[0]), s.onEnd(), this.stop());
            return;
          }
        this.frame = c[s.frameIndex];
      }
    },
    play(o, c = {}) {
      if (!r) {
        i.add(() => this.play(o, c));
        return;
      }
      let w = r.anims[o];
      if (w === void 0) throw new Error(`Anim not found: ${o}`);
      (s && this.stop(),
        (s =
          typeof w == "number"
            ? {
                name: o,
                timer: 0,
                loop: !1,
                pingpong: !1,
                speed: 0,
                frameIndex: 0,
                onEnd: () => {},
              }
            : {
                name: o,
                timer: 0,
                loop: c.loop ?? w.loop ?? !1,
                pingpong: c.pingpong ?? w.pingpong ?? !1,
                speed: c.speed ?? w.speed ?? 10,
                frameIndex: 0,
                onEnd: c.onEnd ?? (() => {}),
              }),
        (n = typeof w == "number" ? null : 1),
        (this.frame = typeof w == "number" ? w : w.frames[0]),
        this.trigger("animStart", o));
    },
    stop() {
      if (!s) return;
      let o = s.name;
      ((s = null), this.trigger("animEnd", o));
    },
    numFrames() {
      return r?.frames.length ?? 0;
    },
    getCurAnim() {
      return s;
    },
    curAnim() {
      return s?.name;
    },
    getAnim(o) {
      return r?.anims[o] ?? null;
    },
    hasAnim(o) {
      return !!this.getAnim(o);
    },
    onAnimEnd(o) {
      return this.on("animEnd", o);
    },
    onAnimStart(o) {
      return this.on("animStart", o);
    },
    renderArea() {
      return new $(b(0), this.width, this.height);
    },
    inspect() {
      return typeof t == "string" ? `sprite: "${t}"` : null;
    },
  };
}
function Rl(t, e = {}) {
  function r(n) {
    let i = nt(
      Object.assign(at(n), {
        text: n.text + "",
        size: n.textSize,
        font: n.font,
        width: e.width && n.width,
        align: n.align,
        letterSpacing: n.letterSpacing,
        lineSpacing: n.lineSpacing,
        transform: n.textTransform,
        styles: n.textStyles,
        indentAll: e.indentAll,
      }),
    );
    return (
      e.width || (n.width = i.width / (n.scale?.x || 1)),
      (n.height = i.height / (n.scale?.y || 1)),
      i
    );
  }
  let s = {
    id: "text",
    set text(n) {
      ((t = n), r(this), (this.renderedText = Nr(t).text));
    },
    get text() {
      return t;
    },
    textSize: e.size ?? 36,
    font: e.font,
    width: e.width ?? 0,
    height: 0,
    align: e.align,
    lineSpacing: e.lineSpacing,
    letterSpacing: e.letterSpacing,
    textTransform: e.transform,
    textStyles: e.styles,
    renderedText: t ? Nr(t).text : "",
    add() {
      as(() => r(this));
    },
    draw() {
      it(r(this));
    },
    renderArea() {
      return new $(b(0), this.width, this.height);
    },
  };
  return (r(s), s);
}
function Cl(t, e) {
  return {
    id: "rect",
    width: t,
    height: e,
    draw() {
      Ut(Object.assign(at(this), { width: this.width, height: this.height }));
    },
    renderArea() {
      return new $(b(0), this.width, this.height);
    },
    inspect() {
      return `uvquad: (${Math.ceil(this.width)}w, ${Math.ceil(this.height)})h`;
    },
  };
}
function Il(t = {}) {
  let e = null,
    r = null,
    s = null,
    n = null;
  return {
    id: "agent",
    require: ["pos", "tile"],
    agentSpeed: t.speed ?? 100,
    allowDiagonals: t.allowDiagonals ?? !0,
    getDistanceToTarget() {
      return e ? this.pos.dist(e) : 0;
    },
    getNextLocation() {
      return r && s ? r[s] : null;
    },
    getPath() {
      return r ? r.slice() : null;
    },
    getTarget() {
      return e;
    },
    isNavigationFinished() {
      return r ? s === null : !0;
    },
    isTargetReachable() {
      return r !== null;
    },
    isTargetReached() {
      return e ? this.pos.eq(e) : !0;
    },
    setTarget(i) {
      ((e = i),
        (r = this.getLevel().getPath(this.pos, e, {
          allowDiagonals: this.allowDiagonals,
        })),
        (s = r ? 0 : null),
        r && s !== null
          ? (n ||
              ((n = this.getLevel().onNavigationMapChanged(() => {
                e &&
                  r &&
                  s !== null &&
                  ((r = this.getLevel().getPath(this.pos, e, {
                    allowDiagonals: this.allowDiagonals,
                  })),
                  r
                    ? ((s = 0), this.trigger("navigationNext", this, r[s]))
                    : ((s = null), this.trigger("navigationEnded", this)));
              })),
              this.onDestroy(() => n?.cancel())),
            this.trigger("navigationStarted", this),
            this.trigger("navigationNext", this, r[s]))
          : this.trigger("navigationEnded", this));
    },
    update() {
      if (e && r && s !== null) {
        if (this.pos.sdist(r[s]) < 2)
          if (s === r.length - 1) {
            ((this.pos = e.clone()),
              (s = null),
              this.trigger("navigationEnded", this),
              this.trigger("targetReached", this));
            return;
          } else (s++, this.trigger("navigationNext", this, r[s]));
        this.moveTo(r[s], this.agentSpeed);
      }
    },
    onNavigationStarted(i) {
      return this.on("navigationStarted", i);
    },
    onNavigationNext(i) {
      return this.on("navigationNext", i);
    },
    onNavigationEnded(i) {
      return this.on("navigationEnded", i);
    },
    onTargetReached(i) {
      return this.on("targetReached", i);
    },
    inspect() {
      return (
        "agent: " +
        JSON.stringify({ target: JSON.stringify(e), path: JSON.stringify(r) })
      );
    },
  };
}
function Pl(t) {
  let e = t.graph;
  return {
    id: "pathfinder",
    require: ["pos"],
    navigateTo(r) {
      return this.graph?.getWaypointPath(this.pos, r, t.navigationOpt);
    },
    get graph() {
      if (e) return e;
      let r = this.parent;
      for (; r; ) {
        if (r.has("pathfinderMap")) return r.graph;
        r = r.parent;
      }
    },
    set graph(r) {
      e = r;
    },
  };
}
function Tl(t = {}) {
  let e = t.waypoints,
    r = t.speed || 100,
    s = t.endBehavior || "stop",
    n = 0,
    i = e != null;
  return {
    id: "patrol",
    require: ["pos"],
    get patrolSpeed() {
      return r;
    },
    set patrolSpeed(a) {
      r = a;
    },
    get waypoints() {
      return e;
    },
    set waypoints(a) {
      ((e = a), (n = 0), (i = !1));
    },
    get nextLocation() {
      return e ? e[n] : void 0;
    },
    update() {
      let a = this.nextLocation;
      if (!(!e || !a || i) && (this.moveTo(a, r), this.pos.sdist(a) < 9))
        switch (s) {
          case "loop":
            n = (n + 1) % e.length;
            break;
          case "ping-pong":
            ((n = n + 1), n == e.length && (e.reverse(), (n = 0)));
            break;
          case "stop":
            n < e.length - 1
              ? (n += 1)
              : i || ((i = !0), this.trigger("patrolFinished", this));
            break;
        }
    },
    onPatrolFinished(a) {
      return this.on("patrolFinished", a);
    },
  };
}
function kl(t, e = {}) {
  let r = typeof t == "function" ? t : () => h.game.root.query(t),
    s = e.checkFrequency || 1,
    n = typeof e.direction == "number" ? M.fromAngle(e.direction) : e.direction,
    i = 0;
  return {
    id: "sentry",
    require: ["pos"],
    direction:
      typeof e.direction == "number" ? M.fromAngle(e.direction) : e.direction,
    spotted: [],
    set directionAngle(a) {
      this.direction = a !== void 0 ? M.fromAngle(a) : void 0;
    },
    get directionAngle() {
      return this.direction ? this.direction.angle() : void 0;
    },
    fieldOfView: e.fieldOfView || 200,
    isWithinFieldOfView(a, d, l) {
      let o = (typeof d == "number" ? M.fromAngle(d) : d) || n,
        c = l || e.fieldOfView;
      if (!o || !c || c >= 360) return !0;
      let w = c / 2;
      return a.pos && o.angleBetween(a.pos.sub(this.pos)) <= w;
    },
    hasLineOfSight(a) {
      let d = xn(this.pos, a.pos.sub(this.pos), e.raycastExclude);
      return d != null && d.object === a;
    },
    update() {
      if (((i += de()), i > s)) {
        i -= s;
        let a = r();
        if (a.length && n && this.fieldOfView && this.fieldOfView < 360) {
          let d = this.fieldOfView / 2;
          a = a.filter(
            (l) => l.pos && n.angleBetween(l.pos.sub(this.pos)) <= d,
          );
        }
        (a.length &&
          e.lineOfSight &&
          (a = a.filter((d) => d.pos && this.hasLineOfSight(d))),
          a.length > 0 &&
            ((this.spotted = a), this.trigger("objectSpotted", a)));
      }
    },
    onObjectsSpotted(a) {
      return this.on("objectSpotted", a);
    },
  };
}
function Nn(t = {}) {
  let e = b(0),
    r = t.isObstacle ?? !1,
    s = t.cost ?? 0,
    n = t.edges ?? [],
    i = () => {
      let d = { left: 1, top: 2, right: 4, bottom: 8 };
      return n.map((l) => d[l] || 0).reduce((l, o) => l | o, 0);
    },
    a = i();
  return {
    id: "tile",
    tilePosOffset: t.offset ?? b(0),
    set tilePos(d) {
      let l = this.getLevel();
      ((e = d.clone()),
        (this.pos = b(
          this.tilePos.x * l.tileWidth(),
          this.tilePos.y * l.tileHeight(),
        ).add(this.tilePosOffset)));
    },
    get tilePos() {
      return e;
    },
    set isObstacle(d) {
      r !== d && ((r = d), this.getLevel().invalidateNavigationMap());
    },
    get isObstacle() {
      return r;
    },
    set cost(d) {
      s !== d && ((s = d), this.getLevel().invalidateNavigationMap());
    },
    get cost() {
      return s;
    },
    set edges(d) {
      ((n = d), (a = i()), this.getLevel().invalidateNavigationMap());
    },
    get edges() {
      return n;
    },
    get edgeMask() {
      return a;
    },
    getLevel() {
      return this.parent;
    },
    tileMove(d) {
      let l = this.getLevel();
      (l.removeFromSpatialMap(this),
        (this.tilePos = this.tilePos.add(d)),
        l.insertIntoSpatialMap(this),
        l.trigger("spatialMapChanged"));
    },
    moveLeft() {
      this.tileMove(b(-1, 0));
    },
    moveRight() {
      this.tileMove(b(1, 0));
    },
    moveUp() {
      this.tileMove(b(0, -1));
    },
    moveDown() {
      this.tileMove(b(0, 1));
    },
  };
}
var ls = class {
  name;
  duration;
  loops;
  direction;
  easing;
  interpolation;
  isFinished;
  timing;
  easings;
  relative;
  constructor(t, e, r) {
    ((this.name = t),
      (this.duration = e.duration),
      (this.loops = e.loops || 0),
      (this.direction = e.direction || "forward"),
      (this.easing = e.easing || Dt.linear),
      (this.interpolation = e.interpolation || "linear"),
      (this.isFinished = !1),
      (this.timing = e.timing),
      (this.easings = e.easings),
      (this.relative = r));
  }
  update(t, e) {
    return !0;
  }
  getLowerKeyIndexAndRelativeTime(t, e, r) {
    let s = e - 1,
      n = t / this.duration;
    if (this.loops !== 0 && n >= this.loops) return [s, 0, !0];
    let i = Math.trunc(n);
    if (
      ((n -= i),
      (this.direction == "reverse" ||
        (this.direction == "ping-pong" && i & 1)) &&
        (n = 1 - n),
      r)
    ) {
      let a = 0;
      for (; r[a + 1] !== void 0 && r[a + 1] < n; ) a++;
      return a >= s ? [s, 0, !0] : [a, (n - r[a]) / (r[a + 1] - r[a]), !1];
    } else {
      let a = Math.floor((e - 1) * n);
      return [a, (n - a / s) * s, !1];
    }
  }
  setValue(t, e, r) {
    if (this.relative)
      switch (e) {
        case "pos":
          t.pos = t.base.pos.add(r);
          break;
        case "angle":
          t.angle = t.base.angle + r;
          break;
        case "scale":
          t.scale = t.base.scale.scale(r);
          break;
        case "opacity":
          t.opacity = t.base.opacity * r;
          break;
        default:
          t[e] = r;
      }
    else t[e] = r;
  }
  serialize() {
    let t = { duration: this.duration, keys: [] };
    return (
      this.loops && (t.loops = this.loops),
      this.direction !== "forward" && (t.direction = this.direction),
      this.easing != Dt.linear && (t.easing = this.easing.name),
      this.interpolation !== "linear" && (t.interpolation = this.interpolation),
      this.timing && (t.timing = this.timing),
      this.easings && (t.easings = this.easings.map((e) => this.easing.name)),
      t
    );
  }
};
function Bs(t, e) {
  return e.add(e.sub(t));
}
var Dl = class extends ls {
    keys;
    constructor(t, e, r, s) {
      (super(t, r, s), (this.keys = e));
    }
    update(t, e) {
      let [r, s, n] = this.getLowerKeyIndexAndRelativeTime(
        e,
        this.keys.length,
        this.timing,
      );
      if (s == 0 || this.interpolation === "none")
        this.setValue(t, this.name, this.keys[r]);
      else {
        let i = this.easings ? this.easings[r] : this.easing;
        this.setValue(t, this.name, ve(this.keys[r], this.keys[r + 1], i(s)));
      }
      return n;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  },
  Fl = class extends ls {
    keys;
    curves;
    dcurves;
    constructor(e, r, s, n, i) {
      if ((super(e, s, n), (this.keys = r), this.interpolation === "spline")) {
        ((this.curves = []), i && (this.dcurves = []));
        for (let a = 0; a < this.keys.length - 1; a++) {
          let d = this.keys[a],
            l = a + 1,
            o = this.keys[l],
            c = a > 0 ? this.keys[a - 1] : Bs(o, d),
            w = l < this.keys.length - 1 ? this.keys[l + 1] : Bs(d, o);
          (this.curves.push(tr(c, d, o, w)),
            i && this.dcurves?.push(tr(c, d, o, w, Ii)));
        }
      }
    }
    update(e, r) {
      let [s, n, i] = this.getLowerKeyIndexAndRelativeTime(
        r,
        this.keys.length,
        this.timing,
      );
      if (n == 0 || this.interpolation === "none")
        this.setValue(e, this.name, this.keys[s]);
      else {
        let a = this.easings ? this.easings[s] : this.easing;
        switch (this.interpolation) {
          case "linear":
            this.setValue(
              e,
              this.name,
              this.keys[s].lerp(this.keys[s + 1], a(n)),
            );
            break;
          case "slerp":
            this.setValue(
              e,
              this.name,
              this.keys[s].slerp(this.keys[s + 1], a(n)),
            );
            break;
          case "spline":
            if (this.curves) {
              (this.setValue(e, this.name, this.curves[s](a(n))),
                this.dcurves &&
                  this.setValue(e, "angle", this.dcurves[s](a(n)).angle()));
              break;
            }
        }
      }
      return i;
    }
    serialize() {
      return Object.assign(super.serialize(), {
        keys: this.keys.map((e) => [e.x, e.y]),
      });
    }
  },
  Ol = class extends ls {
    keys;
    constructor(t, e, r, s) {
      (super(t, r, s), (this.keys = e));
    }
    update(t, e) {
      let [r, s, n] = this.getLowerKeyIndexAndRelativeTime(
        e,
        this.keys.length,
        this.timing,
      );
      if (s == 0 || this.interpolation == "none")
        this.setValue(t, this.name, this.keys[r]);
      else {
        let i = this.easings ? this.easings[r] : this.easing;
        this.setValue(t, this.name, this.keys[r].lerp(this.keys[r + 1], i(s)));
      }
      return n;
    }
    serialize() {
      return Object.assign(super.serialize(), { keys: this.keys });
    }
  };
function Ul(t = {}) {
  let e = [],
    r = 0,
    s = !1;
  return {
    id: "animate",
    require: t.followMotion ? ["rotate"] : void 0,
    base: { pos: b(0, 0), angle: 0, scale: b(1, 1), opacity: 1 },
    animation: {
      paused: !1,
      seek(n) {
        ((r = Oe(n, 0, this.duration)),
          e.forEach((i) => {
            i.isFinished = !1;
          }),
          (s = !1));
      },
      get duration() {
        return e.reduce((n, i) => Math.max(i.duration, n), 0);
      },
    },
    add() {
      t.relative &&
        (this.has("pos") && (this.base.pos = this.pos.clone()),
        this.has("rotate") && (this.base.angle = this.angle),
        this.has("scale") && (this.base.scale = this.scale),
        this.has("opacity") && (this.base.opacity = this.opacity));
    },
    update() {
      if (this.animation.paused) return;
      let n = !0,
        i;
      r += de();
      for (let a of e)
        ((i = a.update(this, r)),
          i &&
            !a.isFinished &&
            ((a.isFinished = !0),
            this.trigger("animateChannelFinished", a.name)),
          (n &&= i));
      n && !s && ((s = !0), this.trigger("animateFinished"));
    },
    animate(n, i, a) {
      ((s = !1),
        this.unanimate(n),
        typeof i[0] == "number"
          ? e.push(new Dl(n, i, a, t.relative || !1))
          : i[0] instanceof M
            ? e.push(
                new Fl(
                  n,
                  i,
                  a,
                  t.relative || !1,
                  n === "pos" && (t.followMotion || !1),
                ),
              )
            : i[0] instanceof Y && e.push(new Ol(n, i, a, t.relative || !1)));
    },
    unanimate(n) {
      let i = e.findIndex((a) => a.name === n);
      i >= 0 && e.splice(i, 1);
    },
    unanimateAll() {
      e.splice(0, e.length);
    },
    onAnimateFinished(n) {
      return this.on("animateFinished", n);
    },
    onAnimateChannelFinished(n) {
      return this.on("animateChannelFinished", n);
    },
    serializeAnimationChannels() {
      return e.reduce((n, i) => ((n[i.name] = i.serialize()), n), {});
    },
    serializeAnimationOptions() {
      let n = {};
      return (
        t.followMotion && (n.followMotion = !0),
        t.relative && (n.relative = !0),
        n
      );
    },
  };
}
function Hn(t, e) {
  let r = { name: t.name };
  return (
    t.has("animate") &&
      ((r.channels = t.serializeAnimationChannels()),
      Object.assign(r, t.serializeAnimationOptions())),
    t.children.length > 0 &&
      (r.children = t.children
        .filter((s) => s.has("named"))
        .map((s) => Hn(s, s.name))),
    r
  );
}
function Rs(t = 2, e = 1) {
  let r = 0;
  return {
    require: ["scale"],
    update() {
      let s = Math.sin(r * t) * e;
      (s < 0 && this.destroy(), (this.scale = b(s)), (r += de()));
    },
  };
}
function Ll(t, e) {
  if (t == null) throw new Error("health() requires the initial amount of hp");
  return {
    id: "health",
    hurt(r = 1) {
      (this.setHP(t - r), this.trigger("hurt", r));
    },
    heal(r = 1) {
      let s = t;
      (this.setHP(t + r), this.trigger("heal", t - s));
    },
    hp() {
      return t;
    },
    maxHP() {
      return e ?? null;
    },
    setMaxHP(r) {
      e = r;
    },
    setHP(r) {
      ((t = e ? Math.min(e, r) : r), t <= 0 && this.trigger("death"));
    },
    onHurt(r) {
      return this.on("hurt", r);
    },
    onHeal(r) {
      return this.on("heal", r);
    },
    onDeath(r) {
      return this.on("death", r);
    },
    inspect() {
      return `health: ${t}`;
    },
  };
}
function Nl(t, e = {}) {
  if (t == null) throw new Error("lifespan() requires time");
  let r = e.fade ?? 0;
  return {
    id: "lifespan",
    require: ["opacity"],
    add() {
      h.game.root.wait(t, () => {
        ((this.opacity = this.opacity ?? 1),
          r > 0
            ? h.game.root
                .tween(this.opacity, 0, r, (s) => (this.opacity = s), Dt.linear)
                .onEnd(() => {
                  this.destroy();
                })
            : this.destroy());
      });
    },
  };
}
function Hl(t) {
  return { id: "named", name: t };
}
function Gl(t, e, r) {
  if (!t) throw new Error("state() requires an initial state");
  let s = {};
  function n(l) {
    s[l] ||
      (s[l] = {
        enter: new me(),
        end: new me(),
        update: new me(),
        draw: new me(),
      });
  }
  function i(l, o, c) {
    return (n(o), s[o][l].add(c));
  }
  function a(l, o, ...c) {
    (n(o), s[o][l].trigger(...c));
  }
  let d = !1;
  return {
    id: "state",
    state: t,
    enterState(l, ...o) {
      if (((d = !0), e && !e.includes(l)))
        throw new Error(`State not found: ${l}`);
      let c = this.state;
      if (r) {
        if (!r?.[c]) return;
        let w = typeof r[c] == "string" ? [r[c]] : r[c];
        if (!w.includes(l))
          throw new Error(
            `Cannot transition state from "${c}" to "${l}". Available transitions: ${w.map((u) => `"${u}"`).join(", ")}`,
          );
      }
      (a("end", c, ...o),
        (this.state = l),
        a("enter", l, ...o),
        a("enter", `${c} -> ${l}`, ...o));
    },
    onStateTransition(l, o, c) {
      return i("enter", `${l} -> ${o}`, c);
    },
    onStateEnter(l, o) {
      return i("enter", l, o);
    },
    onStateUpdate(l, o) {
      return i("update", l, o);
    },
    onStateDraw(l, o) {
      return i("draw", l, o);
    },
    onStateEnd(l, o) {
      return i("end", l, o);
    },
    update() {
      (d || (a("enter", t), (d = !0)), a("update", this.state));
    },
    draw() {
      a("draw", this.state);
    },
    inspect() {
      return `state: ${this.state}`;
    },
  };
}
function Gn(t) {
  return { id: "stay", stay: !0, scenesToStay: t };
}
function jl(t = !0, e) {
  let r, s;
  return {
    id: "textInput",
    hasFocus: t,
    require: ["text"],
    typedText: "",
    add() {
      let n = () => {
        this.text = this.typedText.replace(/([\[\\])/g, "\\$1");
      };
      ((r = h.k.onCharInput((i) => {
        this.hasFocus &&
          (!e || this.typedText.length < e) &&
          (h.k.isKeyDown("shift")
            ? (this.typedText += i.toUpperCase())
            : (this.typedText += i),
          n());
      })),
        (s = h.k.onKeyPressRepeat("backspace", () => {
          this.hasFocus &&
            ((this.typedText = this.typedText.slice(0, -1)), n());
        })));
    },
    destroy() {
      (r.cancel(), s.cancel());
    },
  };
}
function Kr(t = 1e3) {
  return {
    id: "timer",
    maxLoopsPerFrame: t,
    loop(e, r, s = 1 / 0, n = !1) {
      let i = n ? 0 : e,
        a = new me(),
        d = this.onUpdate(() => {
          i += h.app.state.dt;
          for (let l = 0; i >= e && l < this.maxLoopsPerFrame; l++)
            if ((s--, r(), (i -= e), s <= 0)) {
              (d.cancel(), a.trigger());
              return;
            }
        });
      return {
        get paused() {
          return d.paused;
        },
        set paused(l) {
          d.paused = l;
        },
        cancel: d.cancel,
        onEnd(l) {
          a.add(l);
        },
        then(l) {
          return (a.add(l), this);
        },
      };
    },
    wait(e, r) {
      return this.loop(e, r ?? (() => {}), 1, !0);
    },
    tween(e, r, s, n, i = Dt.linear) {
      let a = 0,
        d = [],
        l = this.onUpdate(() => {
          a += h.app.state.dt;
          let o = Math.min(a / s, 1);
          (n(ve(e, r, i(o))),
            o === 1 && (l.cancel(), n(r), d.forEach((c) => c())));
        });
      return {
        get paused() {
          return l.paused;
        },
        set paused(o) {
          l.paused = o;
        },
        onEnd(o) {
          d.push(o);
        },
        then(o) {
          return (this.onEnd(o), this);
        },
        cancel() {
          l.cancel();
        },
        finish() {
          (l.cancel(), n(r), d.forEach((o) => o()));
        },
      };
    },
  };
}
var Vr = 0;
function Kl() {
  return Vr > 0;
}
function Vl(t = {}) {
  let e = {},
    r = new Set(),
    s = [];
  return {
    id: "area",
    collisionIgnore: t.collisionIgnore ?? [],
    add() {
      (Vr++,
        this.area.cursor &&
          s.push(this.onHover(() => h.app.setCursor(this.area.cursor))),
        s.push(
          this.onCollideUpdate((n, i) => {
            if (!n.id)
              throw new Error("area() requires the object to have an id");
            (e[n.id] || this.trigger("collide", n, i),
              i && ((e[n.id] = i), r.add(n.id)));
          }),
        ));
    },
    destroy() {
      Vr--;
      for (let n of s) n.cancel();
    },
    fixedUpdate() {
      for (let n in e)
        r.has(Number(n)) ||
          (this.trigger("collideEnd", e[n].target), delete e[n]);
      r.clear();
    },
    drawInspect() {
      let n = this.localArea();
      (Be(), ne(this.area.offset));
      let i = {
        outline: { width: 4 / tn(), color: J(0, 0, 255) },
        anchor: this.anchor,
        fill: !1,
        fixed: tt(this),
      };
      (n instanceof $
        ? Ce({
            ...i,
            pos: n.pos,
            width: n.width * this.area.scale.x,
            height: n.height * this.area.scale.y,
          })
        : n instanceof we
          ? Xe({ ...i, pts: n.pts, scale: this.area.scale })
          : n instanceof be && yt({ ...i, pos: n.center, radius: n.radius }),
        xe());
    },
    area: {
      shape: t.shape ?? null,
      scale: t.scale ? b(t.scale) : b(1),
      offset: t.offset ?? b(0),
      cursor: t.cursor ?? null,
    },
    isClicked() {
      return h.app.isMousePressed() && this.isHovering();
    },
    isHovering() {
      let n = tt(this) ? h.k.mousePos() : h.k.toWorld(h.k.mousePos());
      return this.hasPoint(n);
    },
    checkCollision(n) {
      if (!n.id)
        throw new Error("checkCollision() requires the object to have an id");
      return e[n.id] ?? null;
    },
    getCollisions() {
      return Object.values(e);
    },
    isColliding(n) {
      if (!n.id)
        throw new Error("isColliding() requires the object to have an id");
      return !!e[n.id];
    },
    isOverlapping(n) {
      if (!n.id)
        throw new Error("isOverlapping() requires the object to have an id");
      let i = e[n.id];
      return i && i.hasOverlap();
    },
    onClick(n, i = "left") {
      let a = this.onMousePress(i, () => {
        this.isHovering() && n();
      });
      return (s.push(a), a);
    },
    onHover(n) {
      let i = !1;
      return this.onUpdate(() => {
        i ? (i = this.isHovering()) : this.isHovering() && ((i = !0), n());
      });
    },
    onHoverUpdate(n) {
      return this.onUpdate(() => {
        this.isHovering() && n();
      });
    },
    onHoverEnd(n) {
      let i = !1;
      return this.onUpdate(() => {
        i ? this.isHovering() || ((i = !1), n()) : (i = this.isHovering());
      });
    },
    onCollide(n, i) {
      if (typeof n == "function" && i === void 0) return this.on("collide", n);
      if (typeof n == "string")
        return this.onCollide((a, d) => {
          a.is(n) && i?.(a, d);
        });
      throw new Error("onCollide() requires either a function or a tag");
    },
    onCollideUpdate(n, i) {
      if (typeof n == "function" && i === void 0)
        return this.on("collideUpdate", n);
      if (typeof n == "string")
        return this.on("collideUpdate", (a, d) => a.is(n) && i?.(a, d));
      throw new Error("onCollideUpdate() requires either a function or a tag");
    },
    onCollideEnd(n, i) {
      if (typeof n == "function" && i === void 0)
        return this.on("collideEnd", n);
      if (typeof n == "string")
        return this.on("collideEnd", (a) => a.is(n) && i?.(a));
      throw new Error("onCollideEnd() requires either a function or a tag");
    },
    hasPoint(n) {
      return We(this.worldArea(), n);
    },
    resolveCollision(n) {
      let i = this.checkCollision(n);
      i &&
        !i.resolved &&
        ((this.pos = this.pos.add(i.displacement)), (i.resolved = !0));
    },
    localArea() {
      return this.area.shape ? this.area.shape : this.renderArea();
    },
    worldArea() {
      let n = this.localArea();
      if (!(n instanceof we || n instanceof $))
        throw new Error("Only support polygon and rect shapes for now");
      let i = this.transform
        .clone()
        .translate(this.area.offset)
        .scale(b(this.area.scale ?? 1));
      if (n instanceof $) {
        let a = wt(this.anchor || dr)
          .add(1, 1)
          .scale(-0.5)
          .scale(n.width, n.height);
        i.translate(a);
      }
      return n.transform(i);
    },
    screenArea() {
      let n = this.worldArea();
      return tt(this) ? n : n.transform(h.game.cam.transform);
    },
    inspect() {
      return this.area.scale?.x == this.area.scale?.y
        ? `area: ${this.area.scale?.x?.toFixed(1)}x`
        : `area: (${this.area.scale?.x?.toFixed(1)}x, ${this.area.scale.y?.toFixed(1)}y)`;
    },
  };
}
function Yl(t = {}) {
  let e = null,
    r = null,
    s = !1,
    n = b(0),
    i = null,
    a = null,
    d;
  return {
    id: "body",
    require: ["pos"],
    vel: b(0),
    drag: t.drag ?? 0,
    jumpForce: t.jumpForce ?? Ji,
    gravityScale: t.gravityScale ?? 1,
    isStatic: t.isStatic ?? !1,
    mass: t.mass ?? 1,
    add() {
      if (
        ((i = this.pos.clone()),
        (a = this.pos.clone()),
        (d = this.pos.clone()),
        this.mass === 0)
      )
        throw new Error("Can't set body mass to 0");
      this.has("area") &&
        (this.onCollideUpdate((l, o) => {
          if (!o || !l.has("body") || o.resolved) return;
          this.trigger("beforePhysicsResolve", o);
          let c = o.reverse();
          if (
            (l.trigger("beforePhysicsResolve", c),
            !(o.resolved || c.resolved) && !(this.isStatic && l.isStatic))
          ) {
            if (!this.isStatic && !l.isStatic) {
              let w = this.mass + l.mass;
              ((this.pos = this.pos.add(o.displacement.scale(l.mass / w))),
                (l.pos = l.pos.add(o.displacement.scale(-this.mass / w))),
                (this.transform = It(this)),
                (l.transform = It(l)));
            } else {
              let w = !this.isStatic && l.isStatic ? o : o.reverse();
              ((w.source.pos = w.source.pos.add(w.displacement)),
                (w.source.transform = It(w.source)));
            }
            ((o.resolved = !0),
              this.trigger("physicsResolve", o),
              l.trigger("physicsResolve", o.reverse()));
          }
        }),
        this.onPhysicsResolve((l) => {
          if (h.game.gravity)
            if (l.isBottom() && this.isFalling()) {
              this.vel = this.vel.reject(h.game.gravity.unit());
              let o = e;
              ((e = l.target),
                o != e && (r = l.target.pos),
                s
                  ? (s = !1)
                  : o ||
                    (this.trigger("ground", e),
                    l.target.trigger("land", this)));
            } else
              l.isTop() &&
                this.isJumping() &&
                ((this.vel = this.vel.reject(h.game.gravity.unit())),
                this.trigger("headbutt", l.target),
                l.target.trigger("headbutted", this));
        }));
    },
    update() {
      e &&
        this.isColliding(e) &&
        e.exists() &&
        e.has("body") &&
        (r &&
          !e.pos.eq(r) &&
          t.stickToPlatform !== !1 &&
          this.moveBy(e.pos.sub(r)),
        (r = e.pos));
      let l = Ur();
      l &&
        (this.pos.x == d.x &&
          ((this.pos.x = ve(i.x, a.x, l / Or())), (d.x = this.pos.x)),
        this.pos.y == d.y &&
          ((this.pos.y = ve(i.y, a.y, l / Or())), (d.y = this.pos.y)));
    },
    fixedUpdate() {
      if (
        (i &&
          (this.pos.x == d.x && (this.pos.x = i.x),
          this.pos.y == d.y && (this.pos.y = i.y),
          (i = null)),
        h.game.gravity && !this.isStatic)
      ) {
        (s && ((e = null), (r = null), this.trigger("fallOff"), (s = !1)),
          e &&
            (!this.isColliding(e) || !e.exists() || !e.has("body")) &&
            (s = !0));
        let l = this.vel.clone();
        this.vel = this.vel.add(h.game.gravity.scale(this.gravityScale * de()));
        let o = t.maxVelocity ?? Zi;
        (this.vel.slen() > o * o && (this.vel = this.vel.unit().scale(o)),
          l.dot(h.game.gravity) < 0 &&
            this.vel.dot(h.game.gravity) >= 0 &&
            this.trigger("fall"));
      }
      if (
        ((this.vel.x += n.x * de()),
        (this.vel.y += n.y * de()),
        (this.vel.x *= 1 - this.drag * de()),
        (this.vel.y *= 1 - this.drag * de()),
        this.move(this.vel),
        Ur())
      ) {
        i = this.pos.clone();
        let l = this.vel.add(n.scale(de()));
        ((a = this.pos.add(l.scale(de()))), (d = this.pos.clone()));
      }
      ((n.x = 0), (n.y = 0));
    },
    onPhysicsResolve(l) {
      return this.on("physicsResolve", l);
    },
    onBeforePhysicsResolve(l) {
      return this.on("beforePhysicsResolve", l);
    },
    curPlatform() {
      return e;
    },
    isGrounded() {
      return e !== null;
    },
    isFalling() {
      return this.vel.dot(Tt()) > 0;
    },
    isJumping() {
      return this.vel.dot(Tt()) < 0;
    },
    applyImpulse(l) {
      this.isStatic || (this.vel = this.vel.add(l));
    },
    addForce(l) {
      this.isStatic || ((n.x += l.x / this.mass), (n.y += l.y / this.mass));
    },
    jump(l) {
      this.isStatic ||
        ((e = null),
        (r = null),
        (this.vel = Tt().scale(-l || -this.jumpForce)));
    },
    onGround(l) {
      return this.on("ground", l);
    },
    onFall(l) {
      return this.on("fall", l);
    },
    onFallOff(l) {
      return this.on("fallOff", l);
    },
    onHeadbutt(l) {
      return this.on("headbutt", l);
    },
    onLand(l) {
      return this.on("land", l);
    },
    onHeadbutted(l) {
      return this.on("headbutted", l);
    },
    inspect() {
      return `gravityScale: ${this.gravityScale}x`;
    },
  };
}
function Xl(t = 2) {
  let e = t;
  return {
    id: "doubleJump",
    require: ["body"],
    numJumps: t,
    add() {
      this.onGround(() => {
        e = this.numJumps;
      });
    },
    doubleJump(r) {
      e <= 0 ||
        (e < this.numJumps && this.trigger("doubleJump"), e--, this.jump(r));
    },
    onDoubleJump(r) {
      return this.on("doubleJump", r);
    },
    inspect() {
      return `jumpsLeft: ${e}`;
    },
  };
}
function zl(t) {
  return {
    id: "surfaceEffector",
    require: ["area"],
    speed: t.speed,
    speedVariation: t.speedVariation ?? 0,
    forceScale: t.speedVariation ?? 0.9,
    add() {
      this.onCollideUpdate("body", (e, r) => {
        let s = r?.normal.normal(),
          n = e.vel.project(s),
          i = s?.scale(this.speed)?.sub(n);
        e.addForce(i?.scale(e.mass * this.forceScale));
      });
    },
  };
}
function Wl(t) {
  return {
    id: "areaEffector",
    require: ["area"],
    useGlobalAngle: t.useGlobalAngle || !1,
    forceAngle: t.forceAngle,
    forceMagnitude: t.forceMagnitude,
    forceVariation: t.forceVariation ?? 0,
    linearDrag: t.linearDrag ?? 0,
    add() {
      this.onCollideUpdate("body", (e, r) => {
        if (!e.has("body")) return;
        let s = M.fromAngle(this.forceAngle).scale(this.forceMagnitude);
        (e.addForce(s),
          this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag)));
      });
    },
  };
}
function Ql(t) {
  return {
    id: "pointEffector",
    require: ["area", "pos"],
    forceMagnitude: t.forceMagnitude,
    forceVariation: t.forceVariation ?? 0,
    distanceScale: t.distanceScale ?? 1,
    forceMode: t.forceMode || "inverseLinear",
    linearDrag: t.linearDrag ?? 0,
    add() {
      this.onCollideUpdate("body", (e, r) => {
        let s = this.pos.sub(e.pos),
          n = s.len(),
          i = (n * this.distanceScale) / 10,
          a =
            this.forceMode === "constant"
              ? 1
              : this.forceMode === "inverseLinear"
                ? 1 / i
                : 1 / i ** 2,
          d = s.scale((this.forceMagnitude * a) / n);
        (e.addForce(d),
          this.linearDrag && e.addForce(e.vel.scale(-this.linearDrag)));
      });
    },
  };
}
function Jl(t) {
  return {
    id: "constantForce",
    require: ["body"],
    force: t.force,
    update() {
      this.force && this.addForce(this.force);
    },
  };
}
function Zl(t) {
  return {
    id: "platformEffector",
    require: ["area", "body"],
    surfaceArc: t.surfaceArc ?? 180,
    useOneWay: t.useOneWay ?? !1,
    add() {
      this.onBeforePhysicsResolve((e) => {
        let r = e.target.vel,
          s = Tt().scale(-1).angleBetween(r);
        Math.abs(s) > this.surfaceArc / 2 && e.preventResolution();
      });
    },
  };
}
function _l(t) {
  return {
    id: "buoyancyEffector",
    require: ["area"],
    surfaceLevel: t.surfaceLevel,
    density: t.density ?? 1,
    linearDrag: t.linearDrag ?? 1,
    angularDrag: t.angularDrag ?? 0.2,
    flowAngle: t.flowAngle ?? 0,
    flowMagnitude: t.flowMagnitude ?? 0,
    flowVariation: t.flowVariation ?? 0,
    add() {
      this.onCollideUpdate("body", (e, r) => {
        let s = e,
          n = s.worldArea(),
          [i, a] = n.cut(b(-100, this.surfaceLevel), b(100, this.surfaceLevel));
        (i && (this.applyBuoyancy(s, i), this.applyDrag(s, i)),
          this.flowMagnitude &&
            s.addForce(M.fromAngle(this.flowAngle).scale(this.flowMagnitude)));
      });
    },
    applyBuoyancy(e, r) {
      let s = this.density * r.area(),
        n = b(0, 1).scale(-s);
      e.addForce(n);
    },
    applyDrag(e, r) {
      let s = e.vel,
        n = this.density * this.linearDrag,
        i = s.scale(-n);
      e.addForce(i);
    },
  };
}
function Yr(t) {
  if (!t) throw new Error("Please define an anchor");
  return {
    id: "anchor",
    anchor: t,
    inspect() {
      return typeof this.anchor == "string"
        ? "anchor: " + this.anchor
        : "anchor: " + this.anchor.toString();
    },
  };
}
function jn() {
  return { id: "fixed", fixed: !0 };
}
function $l(t, e) {
  return {
    id: "follow",
    require: ["pos"],
    follow: { obj: t, offset: e ?? b(0) },
    add() {
      t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    },
    update() {
      t.exists() && (this.pos = this.follow.obj.pos.add(this.follow.offset));
    },
  };
}
function eu(t) {
  let e = h.game.layers?.indexOf(t);
  return {
    id: "layer",
    get layerIndex() {
      return e ?? null;
    },
    get layer() {
      return e ? (h.game.layers?.[e] ?? null) : null;
    },
    set layer(r) {
      if (((e = h.game.layers?.indexOf(r)), e == -1))
        throw Error("Invalid layer name");
    },
    inspect() {
      return `layer: ${this.layer}`;
    },
  };
}
function tu(t, e) {
  let r = typeof t == "number" ? M.fromAngle(t) : t.unit();
  return {
    id: "move",
    require: ["pos"],
    update() {
      this.move(r.scale(e));
    },
  };
}
function ru(t = {}) {
  let e = !1,
    r = new $(b(0), fe(), pe()),
    s = new $(b(0), 0, 0),
    n = (i) => {
      i.isOffScreen()
        ? (e || (i.trigger("exitView"), (e = !0)),
          t.hide && (i.hidden = !0),
          t.pause && (i.paused = !0),
          t.destroy && i.destroy())
        : (e && (i.trigger("enterView"), (e = !1)),
          t.hide && (i.hidden = !1),
          t.pause && (i.paused = !1));
    };
  return {
    id: "offscreen",
    require: ["pos"],
    offscreenDistance: t.distance ?? gs,
    isOffScreen() {
      let i = this.screenPos();
      if (!i) return !1;
      if (
        ((r.width = fe()),
        (r.height = pe()),
        !this.offscreenDistance && this.width && this.height)
      )
        return (
          (s.width = this.width),
          (s.height = this.height),
          (s.pos = this.pos),
          s.collides(r)
        );
      let a = this.offscreenDistance ? this.offscreenDistance : gs;
      return !lr(r, i) && r.sdistToPoint(i) > a * a;
    },
    onExitScreen(i) {
      return this.on("exitView", i);
    },
    onEnterScreen(i) {
      return this.on("enterView", i);
    },
    add() {
      t.pause && t.unpause ? bn(() => n(this)) : this.onUpdate(() => n(this));
    },
  };
}
function ar(...t) {
  return {
    id: "pos",
    pos: b(...t),
    moveBy(...e) {
      this.pos = this.pos.add(b(...e));
    },
    move(...e) {
      this.moveBy(b(...e).scale(de()));
    },
    moveTo(...e) {
      if (typeof e[0] == "number" && typeof e[1] == "number")
        return this.moveTo(b(e[0], e[1]), e[2]);
      let r = e[0],
        s = e[1];
      if (s === void 0) {
        this.pos = b(r);
        return;
      }
      let n = r.sub(this.pos);
      if (n.len() <= s * de()) {
        this.pos = b(r);
        return;
      }
      this.move(n.unit().scale(s));
    },
    worldPos(e = null) {
      return e
        ? ((this.pos = this.pos.add(this.fromWorld(e))), null)
        : this.parent
          ? this.parent.transform.multVec2(this.pos)
          : this.pos;
    },
    toWorld(e) {
      return this.parent
        ? this.parent.transform.multVec2(this.pos.add(e))
        : this.pos.add(e);
    },
    fromWorld(e) {
      return this.parent
        ? this.parent.transform.invert().multVec2(e).sub(this.pos)
        : e.sub(this.pos);
    },
    screenPos(e = null) {
      if (e) return ((this.pos = this.pos.add(this.fromScreen(e))), null);
      {
        let r = this.worldPos();
        return r ? (tt(this) ? r : Gr(r)) : null;
      }
    },
    toScreen(e) {
      let r = this.toWorld(e);
      return tt(this) ? r : Gr(r);
    },
    fromScreen(e) {
      return tt(this) ? this.fromWorld(e) : this.fromWorld(Tn(e));
    },
    toOther(e, r) {
      return e.fromWorld(this.toWorld(r));
    },
    fromOther(e, r) {
      return e.toOther(this, r);
    },
    inspect() {
      return `pos: (${Math.round(this.pos.x)}x, ${Math.round(this.pos.y)}y)`;
    },
    drawInspect() {
      yt({ color: J(255, 0, 0), radius: 4 / tn() });
    },
  };
}
function su(t) {
  return {
    id: "rotate",
    angle: t ?? 0,
    rotateBy(e) {
      this.angle += e;
    },
    rotateTo(e) {
      this.angle = e;
    },
    inspect() {
      return `angle: ${Math.round(this.angle)}`;
    },
  };
}
function or(...t) {
  if (t.length === 0) return or(1);
  let e = b(...t);
  return {
    id: "scale",
    set scale(r) {
      if (!(r instanceof M))
        throw Error(
          "The scale property on scale is a vector. Use scaleTo or scaleBy to set the scale with a number.",
        );
      e = b(r);
    },
    get scale() {
      return e;
    },
    scaleTo(...r) {
      e = b(...r);
    },
    scaleBy(...r) {
      e = e.scale(b(...r));
    },
    inspect() {
      return e.x == e.y
        ? `scale: ${e.x.toFixed(1)}x`
        : `scale: (${e.x.toFixed(1)}x, ${e.y.toFixed(1)}y)`;
    },
  };
}
function nu(t) {
  return {
    id: "z",
    z: t,
    inspect() {
      return `z: ${this.z}`;
    },
  };
}
var iu =
    "data:image/png;base64,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",
  au =
    "data:image/png;base64,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",
  ou = Qn.version,
  h = {
    k: null,
    globalOpt: null,
    gfx: null,
    game: null,
    app: null,
    assets: null,
    fontCacheCanvas: null,
    fontCacheC2d: null,
    debug: null,
    audio: null,
    pixelDensity: null,
    canvas: null,
    gscale: null,
    kaSprite: null,
    boomSprite: null,
  },
  lu = (t = { tagsAsComponents: !0 }) => {
    (h.k &&
      (console.warn(
        "KAPLAY already initialized, you are calling kaplay() multiple times, it may lead bugs!",
      ),
      h.k.quit()),
      (h.globalOpt = t));
    let e = t.root ?? document.body;
    e === document.body &&
      ((document.body.style.width = "100%"),
      (document.body.style.height = "100%"),
      (document.body.style.margin = "0px"),
      (document.documentElement.style.width = "100%"),
      (document.documentElement.style.height = "100%"));
    let r = t.canvas ?? e.appendChild(document.createElement("canvas"));
    h.canvas = r;
    let s = t.scale ?? 1;
    h.gscale = s;
    let n = t.width && t.height && !t.stretch && !t.letterbox;
    n
      ? ((r.width = t.width * s), (r.height = t.height * s))
      : ((r.width = r.parentElement.offsetWidth),
        (r.height = r.parentElement.offsetHeight));
    let i = ["outline: none", "cursor: default"];
    if (n) {
      let F = r.width,
        H = r.height;
      (i.push(`width: ${F}px`), i.push(`height: ${H}px`));
    } else (i.push("width: 100%"), i.push("height: 100%"));
    (t.crisp &&
      (i.push("image-rendering: pixelated"),
      i.push("image-rendering: crisp-edges")),
      (r.style.cssText = i.join(";")));
    let a = t.pixelDensity || 1;
    ((h.pixelDensity = a), (r.width *= a), (r.height *= a), (r.tabIndex = 0));
    let d = document.createElement("canvas");
    ((d.width = 256), (d.height = 256), (h.fontCacheCanvas = d));
    let l = d.getContext("2d", { willReadFrequently: !0 });
    h.fontCacheC2d = l;
    let o = qa({
      canvas: r,
      touchToMouse: t.touchToMouse,
      gamepads: t.gamepads,
      pixelDensity: t.pixelDensity,
      maxFPS: t.maxFPS,
      buttons: t.buttons,
    });
    h.app = o;
    let c = [],
      w = o.canvas.getContext("webgl", {
        antialias: !0,
        depth: !0,
        stencil: !0,
        alpha: !0,
        preserveDrawingBuffer: !0,
      });
    if (!w) throw new Error("WebGL not supported");
    let u = w,
      g = vo(u, { texFilter: t.texFilter }),
      f = Ro(t, g);
    h.gfx = f;
    let x = gl();
    h.audio = x;
    let m = $a(g, t.spriteAtlasPadding ?? 0);
    h.assets = m;
    let y = hl();
    ((h.game = y), y.root.use(Kr()));
    function q(F, H) {
      let j = new nr(g, F, H);
      return {
        clear: () => j.clear(),
        free: () => j.free(),
        toDataURL: () => j.toDataURL(),
        toImageData: () => j.toImageData(),
        width: j.width,
        height: j.height,
        draw: (_) => {
          (Re(), j.bind(), _(), Re(), j.unbind());
        },
        get fb() {
          return j;
        },
      };
    }
    function C() {
      (u.clear(u.COLOR_BUFFER_BIT),
        f.frameBuffer.bind(),
        u.clear(u.COLOR_BUFFER_BIT),
        f.bgColor ||
          Ye(() => {
            Ut({
              width: fe(),
              height: pe(),
              quad: new se(0, 0, fe() / 64, pe() / 64),
              tex: f.bgTex,
              fixed: !0,
            });
          }),
        (f.renderer.numDraws = 0),
        (f.fixed = !1),
        (f.transformStack.length = 0),
        (f.transform = new Ue()));
    }
    function D(F, H) {
      ((f.postShader = F), (f.postShaderUniform = H ?? null));
    }
    function S() {
      (Re(),
        (f.lastDrawCalls = f.renderer.numDraws),
        f.frameBuffer.unbind(),
        u.viewport(0, 0, u.drawingBufferWidth, u.drawingBufferHeight));
      let F = f.width,
        H = f.height;
      ((f.width = u.drawingBufferWidth / a),
        (f.height = u.drawingBufferHeight / a),
        ir({
          flipY: !0,
          tex: f.frameBuffer.tex,
          pos: new M(f.viewport.x, f.viewport.y),
          width: f.viewport.width,
          height: f.viewport.height,
          shader: f.postShader,
          uniform:
            typeof f.postShaderUniform == "function"
              ? f.postShaderUniform()
              : f.postShaderUniform,
          fixed: !0,
        }),
        Re(),
        (f.width = F),
        (f.height = H));
    }
    let A = !1,
      v = {
        inspect: !1,
        set timeScale(F) {
          h.app.state.timeScale = F;
        },
        get timeScale() {
          return h.app.state.timeScale;
        },
        showLog: !0,
        fps: () => o.fps(),
        numFrames: () => o.numFrames(),
        stepFrame: ut,
        drawCalls: () => f.lastDrawCalls,
        clearLog: () => (y.logs = []),
        log: (...F) => {
          let H = t.logMax ?? 8,
            j = F.length > 1 ? F.concat(" ").join(" ") : F[0];
          (y.logs.unshift({ msg: j, time: o.time() }),
            y.logs.length > H && (y.logs = y.logs.slice(0, H)));
        },
        error: (F) => v.log(new Error(F.toString ? F.toString() : F)),
        curRecording: null,
        numObjects: () => N("*", { recursive: !0 }).length,
        get paused() {
          return A;
        },
        set paused(F) {
          ((A = F), F ? x.ctx.suspend() : x.ctx.resume());
        },
      };
    h.debug = v;
    function R(F, H) {
      try {
        return JSON.parse(window.localStorage[F]);
      } catch {
        return H ? (I(F, H), H) : null;
      }
    }
    function I(F, H) {
      window.localStorage[F] = JSON.stringify(H);
    }
    function P(F, ...H) {
      let j = F(Te),
        _;
      typeof j == "function" ? (_ = j(...H)(Te)) : (_ = j);
      for (let le in _)
        ((Te[le] = _[le]), t.global !== !1 && (window[le] = _[le]));
      return Te;
    }
    function k(F) {
      let H = o.canvas.captureStream(F),
        j = x.ctx.createMediaStreamDestination();
      x.masterNode.connect(j);
      let _ = new MediaRecorder(H),
        le = [];
      return (
        (_.ondataavailable = (W) => {
          W.data.size > 0 && le.push(W.data);
        }),
        (_.onerror = () => {
          (x.masterNode.disconnect(j), H.getTracks().forEach((W) => W.stop()));
        }),
        _.start(),
        {
          resume() {
            _.resume();
          },
          pause() {
            _.pause();
          },
          stop() {
            return (
              _.stop(),
              x.masterNode.disconnect(j),
              H.getTracks().forEach((W) => W.stop()),
              new Promise((W) => {
                _.onstop = () => {
                  W(new Blob(le, { type: "video/mp4" }));
                };
              })
            );
          },
          download(W = "kaboom.mp4") {
            this.stop().then((ge) => ms(W, ge));
          },
        }
      );
    }
    function O() {
      return document.activeElement === o.canvas;
    }
    let K = y.root.add.bind(y.root),
      V = y.root.readd.bind(y.root),
      X = y.root.removeAll.bind(y.root),
      N = y.root.get.bind(y.root),
      U = y.root.wait.bind(y.root),
      te = y.root.loop.bind(y.root),
      z = y.root.query.bind(y.root),
      Z = y.root.tween.bind(y.root),
      ce = Pt(null, au),
      L = Pt(null, iu);
    ((h.kaSprite = ce), (h.boomSprite = L));
    function Ze() {
      y.root.fixedUpdate();
    }
    function ut() {
      y.root.update();
    }
    class At {
      source;
      target;
      normal;
      distance;
      resolved = !1;
      constructor(H, j, _, le, W = !1) {
        ((this.source = H),
          (this.target = j),
          (this.normal = _),
          (this.distance = le),
          (this.resolved = W));
      }
      get displacement() {
        return this.normal.scale(this.distance);
      }
      reverse() {
        return new At(
          this.target,
          this.source,
          this.normal.scale(-1),
          this.distance,
          this.resolved,
        );
      }
      hasOverlap() {
        return !this.displacement.isZero();
      }
      isLeft() {
        return this.displacement.cross(y.gravity || b(0, 1)) > 0;
      }
      isRight() {
        return this.displacement.cross(y.gravity || b(0, 1)) < 0;
      }
      isTop() {
        return this.displacement.dot(y.gravity || b(0, 1)) > 0;
      }
      isBottom() {
        return this.displacement.dot(y.gravity || b(0, 1)) < 0;
      }
      preventResolution() {
        this.resolved = !0;
      }
    }
    function Ht() {
      if (!Kl()) return;
      let F = {},
        H = t.hashGridSize || 64,
        j = new Ue(),
        _ = [];
      function le(W) {
        if (
          (_.push(j.clone()),
          W.pos && j.translate(W.pos),
          W.scale && j.scale(W.scale),
          W.angle && j.rotate(W.angle),
          (W.transform = j.clone()),
          W.c("area") && !W.paused)
        ) {
          let ge = W,
            Ke = ge.worldArea().bbox(),
            wr = Math.floor(Ke.pos.x / H),
            yr = Math.floor(Ke.pos.y / H),
            Ar = Math.ceil((Ke.pos.x + Ke.width) / H),
            xr = Math.ceil((Ke.pos.y + Ke.height) / H),
            Kt = new Set();
          for (let ke = wr; ke <= Ar; ke++)
            for (let Ve = yr; Ve <= xr; Ve++)
              if (!F[ke]) ((F[ke] = {}), (F[ke][Ve] = [ge]));
              else if (!F[ke][Ve]) F[ke][Ve] = [ge];
              else {
                let Vt = F[ke][Ve];
                e: for (let ye of Vt) {
                  if (ye.paused || !ye.exists() || Kt.has(ye.id)) continue;
                  for (let Le of ge.collisionIgnore) if (ye.is(Le)) continue e;
                  for (let Le of ye.collisionIgnore) if (ge.is(Le)) continue e;
                  let xt = Oi(ge.worldArea(), ye.worldArea());
                  if (xt) {
                    let Le = new At(ge, ye, xt.normal, xt.distance);
                    ge.trigger("collideUpdate", ye, Le);
                    let Yt = Le.reverse();
                    ((Yt.resolved = Le.resolved),
                      ye.trigger("collideUpdate", ge, Yt));
                  }
                  Kt.add(ye.id);
                }
                Vt.push(ge);
              }
        }
        (W.children.forEach(le), (j = _.pop()));
      }
      le(y.root);
    }
    function Gt(F) {
      (console.error(F), x.ctx.suspend());
      let H =
        F.message ?? String(F) ?? "Unknown error, check console for more info";
      o.run(
        () => {},
        () => {
          (C(),
            Ye(() => {
              let j = fe(),
                _ = pe(),
                le = {
                  size: 36,
                  width: j - 64,
                  letterSpacing: 4,
                  lineSpacing: 4,
                  font: rr,
                  fixed: !0,
                };
              Ce({ width: j, height: _, color: J(0, 0, 255), fixed: !0 });
              let W = nt({
                ...le,
                text: "Error",
                pos: b(32),
                color: J(255, 128, 0),
                fixed: !0,
              });
              (it(W),
                qs({
                  ...le,
                  text: H,
                  pos: b(32, 32 + W.height + 16),
                  fixed: !0,
                }),
                xe(),
                y.events.trigger("error", F));
            }),
            S());
        },
      );
    }
    function gr(F) {
      c.push(F);
    }
    function mr() {
      y.events.onOnce("frameEnd", () => {
        (o.quit(),
          u.clear(
            u.COLOR_BUFFER_BIT | u.DEPTH_BUFFER_BIT | u.STENCIL_BUFFER_BIT,
          ));
        let F = u.getParameter(u.MAX_TEXTURE_IMAGE_UNITS);
        for (let H = 0; H < F; H++)
          (u.activeTexture(u.TEXTURE0 + H),
            u.bindTexture(u.TEXTURE_2D, null),
            u.bindTexture(u.TEXTURE_CUBE_MAP, null));
        (u.bindBuffer(u.ARRAY_BUFFER, null),
          u.bindBuffer(u.ELEMENT_ARRAY_BUFFER, null),
          u.bindRenderbuffer(u.RENDERBUFFER, null),
          u.bindFramebuffer(u.FRAMEBUFFER, null),
          g.destroy(),
          c.forEach((H) => H()));
      });
    }
    let ht = !0;
    (o.run(
      () => {
        try {
          m.loaded && (v.paused || Ze(), Ht());
        } catch (F) {
          Gt(F);
        }
      },
      (F, H) => {
        try {
          (F(),
            m.loaded ||
              (st() === 1 &&
                !ht &&
                ((m.loaded = !0),
                sn().forEach((j) => y.events.trigger("loadError", ...j)),
                y.events.trigger("load"))),
            (!m.loaded && t.loadingScreen !== !1) || ht
              ? (C(), Mo(), S())
              : (v.paused || ut(),
                Ht(),
                C(),
                Eo(),
                t.debug !== !1 && bo(),
                S()),
            ht && (ht = !1),
            y.events.trigger("frameEnd"),
            H());
        } catch (j) {
          Gt(j);
        }
      },
    ),
      en(),
      On());
    let Te = {
      _k: h,
      VERSION: ou,
      loadRoot: Ja,
      loadProgress: st,
      loadSprite: Pt,
      loadSpriteAtlas: cn,
      loadSound: fo,
      loadMusic: po,
      loadBitmapFont: io,
      loadFont: so,
      loadShader: uo,
      loadShaderURL: ho,
      loadAseprite: ro,
      loadPedit: ao,
      loadBean: to,
      loadJSON: Za,
      load: Lr,
      getSound: dn,
      getFont: ln,
      getBitmapFont: un,
      getSprite: nn,
      getShader: hn,
      getAsset: _a,
      Asset: Pe,
      SpriteData: Qe,
      SoundData: Ot,
      width: fe,
      height: pe,
      center: sr,
      dt: de,
      fixedDt: Or,
      restDt: Ur,
      time: o.time,
      screenshot: o.screenshot,
      record: k,
      isFocused: O,
      setCursor: o.setCursor,
      getCursor: o.getCursor,
      setCursorLocked: o.setCursorLocked,
      isCursorLocked: o.isCursorLocked,
      setFullscreen: o.setFullscreen,
      isFullscreen: o.isFullscreen,
      isTouchscreen: o.isTouchscreen,
      onLoad: as,
      onLoadError: rl,
      onLoading: $o,
      onResize: el,
      onGamepadConnect: o.onGamepadConnect,
      onGamepadDisconnect: o.onGamepadDisconnect,
      onError: tl,
      onCleanup: gr,
      flash: Pn,
      setCamPos: Sn,
      getCamPos: qn,
      setCamRot: Cn,
      getCamRot: In,
      setCamScale: Bn,
      getCamScale: Rn,
      getCamTransform: sl,
      camPos: al,
      camScale: ol,
      camFlash: ul,
      camRot: ll,
      camTransform: nl,
      shake: il,
      toScreen: Gr,
      toWorld: Tn,
      setGravity: dl,
      getGravity: cl,
      setGravityDirection: fl,
      getGravityDirection: Tt,
      setBackground: Va,
      getBackground: Ya,
      getGamepads: o.getGamepads,
      getTreeRoot: El,
      add: K,
      make: os,
      destroy: Ln,
      destroyAll: X,
      get: N,
      query: z,
      readd: V,
      pos: ar,
      scale: or,
      rotate: su,
      color: yn,
      opacity: An,
      anchor: Yr,
      area: Vl,
      sprite: jr,
      text: Rl,
      polygon: Oo,
      rect: vn,
      circle: Co,
      uvquad: Cl,
      outline: ko,
      particles: Fo,
      body: Yl,
      platformEffector: Zl,
      surfaceEffector: zl,
      areaEffector: Wl,
      pointEffector: Ql,
      buoyancyEffector: _l,
      constantForce: Jl,
      doubleJump: Xl,
      shader: Uo,
      textInput: jl,
      timer: Kr,
      fixed: jn,
      stay: Gn,
      health: Ll,
      lifespan: Nl,
      named: Hl,
      state: Gl,
      z: nu,
      layer: eu,
      move: tu,
      offscreen: ru,
      follow: $l,
      fadeIn: Po,
      mask: To,
      drawon: Io,
      raycast: xn,
      tile: Nn,
      animate: Ul,
      serializeAnimation: Hn,
      agent: Il,
      sentry: kl,
      patrol: Tl,
      pathfinder: Pl,
      trigger: No,
      on: Me,
      onFixedUpdate: Ho,
      onUpdate: bn,
      onDraw: Go,
      onAdd: En,
      onDestroy: jo,
      onTag: Mn,
      onUntag: Yo,
      onUse: Ko,
      onUnuse: Vo,
      onClick: Qo,
      onCollide: Xo,
      onCollideUpdate: zo,
      onCollideEnd: Wo,
      onHover: Jo,
      onHoverUpdate: Zo,
      onHoverEnd: _o,
      onKeyDown: o.onKeyDown,
      onKeyPress: o.onKeyPress,
      onKeyPressRepeat: o.onKeyPressRepeat,
      onKeyRelease: o.onKeyRelease,
      onMouseDown: o.onMouseDown,
      onMousePress: o.onMousePress,
      onMouseRelease: o.onMouseRelease,
      onMouseMove: o.onMouseMove,
      onCharInput: o.onCharInput,
      onTouchStart: o.onTouchStart,
      onTouchMove: o.onTouchMove,
      onTouchEnd: o.onTouchEnd,
      onScroll: o.onScroll,
      onHide: o.onHide,
      onShow: o.onShow,
      onGamepadButtonDown: o.onGamepadButtonDown,
      onGamepadButtonPress: o.onGamepadButtonPress,
      onGamepadButtonRelease: o.onGamepadButtonRelease,
      onGamepadStick: o.onGamepadStick,
      onButtonPress: o.onButtonPress,
      onButtonDown: o.onButtonDown,
      onButtonRelease: o.onButtonRelease,
      mousePos: o.mousePos,
      mouseDeltaPos: o.mouseDeltaPos,
      isKeyDown: o.isKeyDown,
      isKeyPressed: o.isKeyPressed,
      isKeyPressedRepeat: o.isKeyPressedRepeat,
      isKeyReleased: o.isKeyReleased,
      isMouseDown: o.isMouseDown,
      isMousePressed: o.isMousePressed,
      isMouseReleased: o.isMouseReleased,
      isMouseMoved: o.isMouseMoved,
      isGamepadButtonPressed: o.isGamepadButtonPressed,
      isGamepadButtonDown: o.isGamepadButtonDown,
      isGamepadButtonReleased: o.isGamepadButtonReleased,
      getGamepadStick: o.getGamepadStick,
      isButtonPressed: o.isButtonPressed,
      isButtonDown: o.isButtonDown,
      isButtonReleased: o.isButtonReleased,
      setButton: o.setButton,
      getButton: o.getButton,
      pressButton: o.pressButton,
      releaseButton: o.releaseButton,
      getLastInputDeviceType: o.getLastInputDeviceType,
      charInputted: o.charInputted,
      loop: te,
      wait: U,
      play: wl,
      setVolume: Dn,
      getVolume: Fn,
      volume: yl,
      burp: kn,
      audioCtx: x.ctx,
      Line: Ee,
      Rect: $,
      Circle: be,
      Ellipse: je,
      Point: yi,
      Polygon: we,
      Vec2: M,
      Color: Y,
      Mat4: Ue,
      Quad: se,
      RNG: Is,
      rand: he,
      randi: Ps,
      randSeed: ei,
      vec2: b,
      rgb: J,
      hsl2rgb: Jn,
      quad: ae,
      choose: si,
      chooseMultiple: ri,
      shuffle: Ts,
      chance: ti,
      lerp: ve,
      tween: Z,
      easings: Dt,
      map: Fe,
      mapc: Zn,
      wave: Cs,
      deg2rad: oe,
      rad2deg: rt,
      clamp: Oe,
      evaluateQuadratic: xi,
      evaluateQuadraticFirstDerivative: vi,
      evaluateQuadraticSecondDerivative: bi,
      evaluateBezier: _r,
      evaluateBezierFirstDerivative: Ei,
      evaluateBezierSecondDerivative: Mi,
      evaluateCatmullRom: Si,
      evaluateCatmullRomFirstDerivative: qi,
      curveLengthApproximation: js,
      normalizedCurve: Bi,
      hermite: Nt,
      cardinal: Ks,
      catmullRom: tr,
      bezier: Ri,
      kochanekBartels: Ci,
      easingSteps: Fi,
      easingLinear: ki,
      easingCubicBezier: Di,
      testLineLine: Xr,
      testRectRect: ks,
      testRectLine: zr,
      testRectPoint: lr,
      testCirclePolygon: hr,
      testLinePoint: Wr,
      testLineCircle: Lt,
      isConvex: Gi,
      triangulate: Ys,
      NavMesh: ja,
      drawSprite: qo,
      drawText: qs,
      formatText: nt,
      drawRect: Ce,
      drawLine: Rt,
      drawLines: is,
      drawTriangle: mn,
      drawCircle: yt,
      drawEllipse: fn,
      drawUVQuad: Ut,
      drawPolygon: Xe,
      drawCurve: pn,
      drawBezier: Ao,
      drawFormattedText: it,
      drawMasked: So,
      drawSubtracted: Bo,
      pushTransform: Be,
      popTransform: xe,
      pushTranslate: ne,
      pushScale: Ft,
      pushRotate: gt,
      pushMatrix: Xa,
      usePostEffect: D,
      makeCanvas: q,
      debug: v,
      scene: Ml,
      getSceneName: Bl,
      go: Sl,
      onSceneLeave: ql,
      layers: bl,
      getLayers: xl,
      setLayers: Un,
      getDefaultLayer: vl,
      addLevel: Lo,
      getData: R,
      setData: I,
      download: es,
      downloadJSON: sa,
      downloadText: _s,
      downloadBlob: ms,
      plug: P,
      ASCII_CHARS: Xs,
      canvas: o.canvas,
      addKaboom: Al,
      LEFT: M.LEFT,
      RIGHT: M.RIGHT,
      UP: M.UP,
      DOWN: M.DOWN,
      RED: Y.RED,
      GREEN: Y.GREEN,
      BLUE: Y.BLUE,
      YELLOW: Y.YELLOW,
      MAGENTA: Y.MAGENTA,
      CYAN: Y.CYAN,
      WHITE: Y.WHITE,
      BLACK: Y.BLACK,
      quit: mr,
      KEvent: me,
      KEventHandler: kt,
      KEventController: ot,
      cancel: () => Ws,
    };
    h.k = Te;
    let jt = t.plugins;
    if ((jt && jt.forEach(P), t.global !== !1))
      for (let F in Te) window[F] = Te[F];
    return (t.focus !== !1 && o.canvas.focus(), Te);
  },
  uu = lu;
let qr = 0;
const G = uu({ width: 1e3, height: 500 }),
  hu = G.add([G.text("Press Enter to start!"), G.pos(G.center())]);
G.scene("game", () => {
  (G.loadBean(), G.setGravity(1e3));
  const t = G.add([
    G.sprite("bean"),
    G.area(),
    G.pos(45, 45),
    G.body(),
    "player",
  ]);
  (G.add([
    G.rect(G.width(), 300),
    G.pos(0, 500),
    G.outline(2),
    G.body({ isStatic: !0 }),
    G.area(),
  ]),
    t.onKeyPress("space", () => {
      t.isGrounded() && t.jump(450);
    }));
  let e = 0;
  const r = G.add([G.text("0"), G.color(0, 0, 255)]);
  (G.loop(2, () => {
    ((r.text = e.toString()), e++);
    const s = [250, 300, 230, 280],
      n = s[Math.floor(Math.random() * s.length)];
    G.add([
      G.rect(50, 50),
      G.pos(800, 500),
      G.outline(3),
      G.body(),
      G.area(),
      "boxes",
      move(180, n),
    ]);
  }),
    G.scene("gameover", () => {
      (qr < e && (qr = e),
        G.add([G.text(`Height Score: ${qr.toString()}`)]),
        G.add([
          G.text(`Game over!
Score: ${e}
Press Enter to play again`),
          G.pos(G.center()),
        ]),
        G.onKeyPress("enter", () => {
          go("game");
        }));
    }),
    G.onCollide("player", "boxes", () => {
      G.go("gameover");
    }));
});
G.onKeyPress("enter", () => {
  (hu.destroy(), G.go("game"));
});
