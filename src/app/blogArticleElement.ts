export class BlogArticleElement {
  id: number;
  parent: number;
  __inheritance__:string;

  constructor(object = null) {
    if (object) {
      this.id = object.id;
      this.parent = object.parent;
      this.__inheritance__ = object.__inheritance__;
    }
  }
}

export class BlogArticleChapter extends BlogArticleElement {
  text: string;

  constructor(object = null) {
    if (object) {
      super(object);
      this.text = object.text;
    }
    this.__inheritance__ = 'BlogArticleChapter';
  }
}

export class BlogArticleImage extends BlogArticleElement {
  image: string;
  legend: string;

  constructor(object = null) {
    if (object) {
      super(object);
      this.image = object.image;
      this.legend = object.legend;
    }
    this.__inheritance__ = 'BlogArticleImage';
  }
}
