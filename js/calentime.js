// calentime.js
function getZodiacFromEarthBranch(_earthBranch) {
    let earthBranch = EarthBranch.fromName(_earthBranch);
    return earthBranch.getZodiac();
}

var Moment = {
    getSolarToday: function () {
        var today = new Date();
        var solarToday = new SolarDay.fromYmd(today.getFullYear(), today.getMonth() + 1, today.getDate());
        return solarToday;
    },

    getSolarTimeNow: function () {
        var today = new Date();
        var solarTime = new SolarTime.fromYmdHms(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());
        return solarTime;
    },

    getSixtyCycleHourNow: function () {
        return this.getSolarTimeNow().getSixtyCycleHour();
    },

    // 获取当前时辰的八字对象
    getEightCharNow: function () {
        return this.getSixtyCycleHourNow().getEightChar();
    },

    getFullPillarsNow: function () {
        return `${this.getEightCharNow().getYear()}年 ${this.getEightCharNow().getMonth()}月 ${this.getEightCharNow().getDay()}日 ${this.getEightCharNow().getHour()}时`;
    },

    // 获取今日农历对象
    getLunarToday: function () {
        var solarToday = this.getSolarToday();
        var lunarToday = solarToday.getLunarDay();
        return lunarToday;
    },

    getWeekToday: function () {
        return this.getSolarToday().getWeek();
    },

    // 获取今日的干支对象
    getSixtyCycleToday: function () {
        return this.getLunarToday().getSixtyCycle();
    },

    // 获取今日的二十八宿
    get28StarToday: function () {
        return this.getLunarToday().getTwentyEightStar();
    },

    // 获取今日的二十八宿属性
    get28StarElementToday: function () {
        let star = this.get28StarToday();
        return star.getSevenStar();
    },

    // 获取今日的二十八宿的象
    get28StarAnimalToday: function () {
        let star = this.get28StarToday();
        return star.getAnimal();
    },

    // 获取今日的二十八宿全称
    get28StarFullNameToday: function () {
        return this.get28StarToday() + this.get28StarElementToday() + this.get28StarAnimalToday();
    },

    // 获取今日的二十八宿的吉凶
    get28StarLuckToday: function () {
        let star = this.get28StarToday();
        return star.getLuck();
    },

    // 获取今日三柱对象
    getThreePillarsToday: function () {
        return this.getLunarToday().getThreePillars();
    },

    getYearZodiacTextToday: function () {
        let yearPillar = this.getLunarToday().getThreePillars().getYear();
        let eb = yearPillar.toString().slice(1);
        return getZodiacFromEarthBranch(eb).toString();
    },

    getAllThreePillarsTextToday: function (containsZodiac = false) {
        let threePillars = this.getThreePillarsToday();
        if (!containsZodiac) {
            return threePillars.getYear() + '年 ' + threePillars.getMonth() + '月 ' + threePillars.getDay() + '日';
        } else {
            return threePillars.getYear() + '(' + this.getYearZodiacTextToday() + ')年 ' + threePillars.getMonth() + '月 ' + threePillars.getDay() + '日';
        }
    },

    // 获取今日的节气
    getSolarTermToday: function () {
        return this.getSolarToday().getTerm();
    },

    // 获取今日的节气第几天的对象
    getTermDayToday: function () {
        return this.getSolarToday().getTermDay();
    },

    // 获取今日的物候
    getPhenologyToday: function () {
        return this.getSolarToday().getPhenology();
    },

    // 获取今日的月相
    getPhaseToday: function () {
        return this.getLunarToday().getPhase();
    },

    getConstellationToday: function () {
        return this.getSolarToday().getConstellation();
    },

    getLunarHourNow: function () {
        return lh = this.getSolarTimeNow().getLunarHour();
    },

    getSixtyCycleHourNow: function () {
        return this.getLunarHourNow().getSixtyCycleHour();
    }
}

var E_Calendar = document.getElementById('Calendar');
var E_Solar = document.getElementById('Solar');
var E_Lunar = document.getElementById('Lunar');
var E_Clock = document.getElementById('Clock');
var E_Week = document.getElementById('Week');
var E_ThreePillars = document.getElementById('ThreePillars');
var E_EightChar = document.getElementById('EightChar');
var E_YearIndex = document.getElementById('YearIndex');
var E_NineStar = document.getElementById('NineStar');
var E_TermDay = document.getElementById('TermDay');
var E_Phenology = document.getElementById('Phenology');
var E_Duty = document.getElementById('Duty');
var E_ThreePillars = document.getElementById('ThreePillars');
var E_Land = document.getElementById('Land');
var E_28Star = document.getElementById('28Star');
var E_Phase = document.getElementById('Phase');
var E_Constellation = document.getElementById('Constellation');
var E_OtherDateInfo = document.getElementById('OtherDateInfo');

var E_DateTimeSelector = document.getElementById('DateTimeSelector');

function fillClock() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    E_Clock.innerText = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`;
    let eightChar = Moment.getEightCharNow();
    E_EightChar.innerHTML = eightChar.getYear() + '年 ' + eightChar.getMonth() + '月 ' + eightChar.getDay() + '日 ' + eightChar.getHour() + '时';
    let lh = Moment.getLunarHourNow();
    E_NineStar.innerText = `${lh.getLunarDay().getLunarMonth().getLunarYear().getNineStar().toString()} ${lh.getLunarDay().getLunarMonth().getNineStar().toString()} ${lh.getLunarDay().getNineStar().toString()} ${lh.getNineStar().toString()}`;
}

function fillCalendar() {
    E_Solar.innerText = `${Moment.getSolarToday().toString()}`;
    E_Lunar.innerText = `${Moment.getLunarToday().toString().slice(5)}`;
    E_Week.innerText = `${Moment.getWeekToday().toString()}`;
    document.getElementById('Julian').innerText = `${dateToMJD(new Date())}`;
    if (Moment.getTermDayToday().getDayIndex() == 0) {
        E_TermDay.innerText = Moment.getTermDayToday().toString().slice(0, 2);
    } else {
        E_TermDay.innerText = Moment.getTermDayToday().toString();
    }
    E_Duty.innerText = Moment.getSixtyCycleHourNow().getSixtyCycleDay().getDuty().toString();
    E_ThreePillars.innerText = Moment.getAllThreePillarsTextToday(true);
    E_Land.innerText = Moment.getSixtyCycleHourNow().getSixtyCycleDay().getJupiterDirection().toString() + Moment.getSixtyCycleHourNow().getSixtyCycleDay().getJupiterDirection().getLand().toString();
    E_28Star.innerText = Moment.get28StarFullNameToday();
    E_Phase.innerText = Moment.getPhaseToday().toString();
    E_Constellation.innerText = Moment.getConstellationToday().toString();
    E_Phenology.innerText = Moment.getPhenologyToday().toString();
    E_YearIndex.innerText = '第' + (Moment.getSolarToday().getIndexInYear() + 1) + '日';
}

document.body.onload = () => {
    fillClock();
    fillCalendar();
    // E_DateTimeSelector.value = new Date().getFullYear() + '-' + ((new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)) + '-' + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + 'T' + (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + ':' + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes());
}

window.setInterval(fillClock, 1000);

function scheduleMidnightTask(task) {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const delay = nextMidnight - now;  // 到下一个午夜的毫秒数

    setTimeout(() => {
        task();                         // 执行你的函数
        scheduleMidnightTask(task);     // 递归调度下一天
    }, delay);
}

// 每天午夜执行一次
scheduleMidnightTask(() => {
    fillCalendar();
});