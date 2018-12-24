export class BlogArticleElement {
  id: number;
  parent: number;

  constructor(object) {
    this.id = object.id;
    this.parent = object.parent;
  }
}

export class BlogArticleChapter extends BlogArticleElement {
  text: string;

  constructor(object) {
    super(object);
    this.text = object.text;
  }
}

export class BlogArticleImage extends BlogArticleElement {
  image: string;
  legend: string;

  constructor(object) {
    super(object);
    this.image = object.image;
    this.legend = object.legend;
  }
}
