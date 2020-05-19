import cheerio from 'cheerio';
import superagent from 'superagent';

interface Course {
  title: string | undefined;
  count: number;
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

    const result = {
      time: new Date().getTime(),
      data: courseInfoList
    };
    console.log(result);
  }

  async getRawHtml() {
    const { text } = await superagent.get(this.url);
    this.getCourseInfo(text);
  }

  constructor() {
    this.getRawHtml();
  }
}

const crowller = new Crowller();
