export class Service {
  id: number;
  title: string;
  summary: string;
  text: string;
  logo: number;
  color: string;
  articles: string;
  important: string;
  keyWords: string[] = [];
  available: boolean = true;
}

export class MainService extends Service {
  subServices: Service[] = [];
}

export class SubService extends Service {
  mainService: number;
}
