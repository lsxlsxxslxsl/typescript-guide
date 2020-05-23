import cheerio from 'cheerio';
import fs from 'fs';
import { IAnalyzer } from './crowller';

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

export default class Analyzer implements IAnalyzer {
  private static instance: Analyzer;

  static getInstance() {
    if (!Analyzer.instance) Analyzer.instance = new Analyzer();
    return Analyzer.instance;
  }

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseList = $('.shizhan-course-wrap');
    const courseInfoList: Course[] = [];
    courseList.map((index, element) => {
      const title = $(element).find('.shizan-name').attr('title') || '';
      let i = $(element).find('.shizhan-info span').eq(0).hasClass('grade') ? 1 : 0;
      const count = parseInt($(element).find('.shizhan-info span').eq(i).text());
      courseInfoList.push({ title, count });
    });

    return {
      time: new Date().getTime(),
      data: courseInfoList
    };
  }

  private generateJsonContent(courseInfo: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo, filePath);
    return JSON.stringify(fileContent);
  }
}
