import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import Analyzer from './analyzer';

export interface IAnalyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crowller {
  private filePath = path.resolve(__dirname, '../data/course.json');

  private async getRawHtml() {
    const { text } = await superagent.get(this.url);
    return text;
  }

  private writeFile(content: string) {
    fs.writeFile(this.filePath, content, () => {
      console.log('文件写入成功🍊')
    });
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: IAnalyzer) {
    this.initSpiderProcess();
  }
}

const url = `https://coding.imooc.com/`;

const analyzer = Analyzer.getInstance()
new Crowller(url, analyzer);
console.log('1234')
