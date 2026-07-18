// database.js
const USERS = {
  BLOG_OWNER: {
    codeName: "QuartzQuincy2019",
    signName: "Quincy K."
  },
  VLambda24: {
    codeName: "24",
    signName: "QS-Vλ24"
  },
  VDelta16: {
    codeName: "16",
    signName: "QS-Vδ16"
  },
  Qolerde: {
    codeName: "Qolerde",
    signName: "Qolerde Kung"
  },
  VDelta46: {
    codeName: "46",
    signName: "QS-Vδ46"
  },
  VDelta702: {
    codeName: "702",
    signName: "QS-Vδ702"
  }
}

const ROLES = {
  FirstAuthor: "First Author",
  CoAuthor: "Co-Author",
  CorrespondingAuthor: "Corresponding Author",
  CoFirstAuthor: "Co-first Author",
  Contributor: "Contributor",
  Instructor: "Instructor"
}

const POSTS_IN_ONE_PAGE = 5;// 每页显示的博客数量

// 节日注册
EventManager.update('中国人民警察节', Event.builder().solarDay(1, 10, 0).startYear(2021).build());
EventManager.update('8节', Event.builder().lunarDay(12, 23, 0).build());
EventManager.update('情人节', Event.builder().solarDay(2, 14, 0).startYear(270).build());
EventManager.update('九·一八事变', Event.builder().solarDay(9, 18, 0).startYear(1931).build());
EventManager.update('烈士纪念日', Event.builder().solarDay(9, 30, 0).startYear(2014).build());
EventManager.update('辛亥革命纪念日', Event.builder().solarDay(10, 10, 0).startYear(1949).build());
EventManager.update('台湾光复纪念日', Event.builder().solarDay(10, 25, 0).startYear(1945).build());
EventManager.update('抗美援朝纪念日', Event.builder().solarDay(10, 25, 0).startYear(1951).build());
EventManager.update('记者节', Event.builder().solarDay(11, 8, 0).startYear(2000).build());
EventManager.update('感恩节', Event.builder().solarWeek(11, 4, 4).build());
EventManager.update('国家公祭日', Event.builder().solarDay(12, 13, 0).startYear(1937).build());
EventManager.update('澳门回归纪念日', Event.builder().solarDay(12, 20, 0).startYear(1999).build());
EventManager.update('长津湖战役胜利日', Event.builder().solarDay(12, 24, 0).startYear(1950).build());
EventManager.update('平安夜', Event.builder().solarDay(12, 24, 0).build());
EventManager.update('圣诞节', Event.builder().solarDay(12, 25, 0).build());
EventManager.update('下元节', Event.builder().lunarDay(10, 15, 0).build());