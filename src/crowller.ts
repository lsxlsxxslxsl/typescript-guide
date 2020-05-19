import cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import superagent from 'superagent';

interface Course {
  title: string | undefined;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crowller {
  private url = `https://coding.imooc.com/`;

  getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseList = $('.shizhan-course-wrap');
    const courseInfoList: Course[] = [];
    courseList.map((index, element) => {
      const title = $(element).find('.shizan-name').attr('title');
      let i = $(element).find('.shizhan-info span').eq(0).hasClass('grade') ? 1 : 0;
      const count = parseInt($(element).find('.shizhan-info span').eq(i).text());
      courseInfoList.push({ title, count });
    });

    return {
      time: new Date().getTime(),
      data: courseInfoList
    };
  }

  async getRawHtml() {
    const { text } = await superagent.get(this.url);
    return text;
  }

  generateJsonContent(courseInfo: CourseResult) {
    const filePath = path.resolve(__dirname, '../data/course.json');
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent
  }

  async initSpiderProcess() {
    const filePath = path.resolve(__dirname, '../data/course.json');
    const html = await this.getRawHtml();
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo);
    fs.writeFileSync(filePath, JSON.stringify(fileContent))
  }

  constructor() {
    this.initSpiderProcess();
  }
}

const crowller = new Crowller();
