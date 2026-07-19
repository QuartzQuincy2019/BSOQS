// calentime.js
function getZodiacFromEarthBranch(_earthBranch) {
    let earthBranch = EarthBranch.fromName(_earthBranch);
    return earthBranch.getZodiac();
}

class CalenTime {
    dataArr = [1970, 1, 1, 0, 0, 0];
    constructor(year, month, date, hour, minute, second) {
        this.dataArr[0] = year;
        this.dataArr[1] = month;
        this.dataArr[2] = date;
        this.dataArr[3] = hour;
        this.dataArr[4] = minute;
        this.dataArr[5] = second;
    }
    toString() {
        return `${this.dataArr[0]}-${this.dataArr[1] < 10 ? "0" + this.dataArr[1] : this.dataArr[1]}-${this.dataArr[2] < 10 ? "0" + this.dataArr[2] : this.dataArr[2]}T${this.dataArr[3] < 10 ? "0" + this.dataArr[3] : this.dataArr[3]}:${this.dataArr[4] < 10 ? "0" + this.dataArr[4] : this.dataArr[4]}:${this.dataArr[5] < 10 ? "0" + this.dataArr[5] : this.dataArr[5]}`;
    }
    setYear(year) {
        this.dataArr[0] = year;
        return this;
    }
    setMonth(month) {
        this.dataArr[1] = month;
        return this;
    }
    setDate(date) {
        this.dataArr[2] = date;
        return this;
    }
    setHour(hour) {
        this.dataArr[3] = hour;
        return this;
    }
    setYMD(year, month, date) {
        this.dataArr[0] = year;
        this.dataArr[1] = month;
        this.dataArr[2] = date;
        return this;
    }
    moveDate(delta) {
        let st = SolarTime.fromYmdHms(...this.dataArr);
        let g = st.getSolarDay();
        g = g.next(delta);
        st = SolarTime.fromYmdHms(
            g.year,
            g.month,
            g.day,
            st.hour,
            st.minute,
            st.second,
        );
        this.dataArr = [
            st.year,
            st.month,
            st.day,
            st.hour,
            st.minute,
            st.second,
        ];
        return this;
    }
    moveWeek(delta) {
        let st = SolarTime.fromYmdHms(...this.dataArr);
        let g = st.getSolarDay();
        g = g.next(delta * 7);
        st = SolarTime.fromYmdHms(
            g.year,
            g.month,
            g.day,
            st.hour,
            st.minute,
            st.second,
        );
        this.dataArr = [
            st.year,
            st.month,
            st.day,
            st.hour,
            st.minute,
            st.second,
        ];
        return this;
    }
    moveMonth(delta) {
        let st = SolarTime.fromYmdHms(...this.dataArr);
        let g = st.getSolarDay().getSolarMonth();
        g = g.next(delta);
        st = SolarTime.fromYmdHms(
            g.year,
            g.month,
            st.day,
            st.hour,
            st.minute,
            st.second,
        );
        this.dataArr = [
            st.year,
            st.month,
            st.day,
            st.hour,
            st.minute,
            st.second,
        ];
        return this;
    }
    moveYear(delta) {
        let st = SolarTime.fromYmdHms(...this.dataArr);
        let g = st.getSolarDay().getSolarMonth();
        g = g.next(delta * 12);
        st = SolarTime.fromYmdHms(
            g.year,
            g.month,
            st.day,
            st.hour,
            st.minute,
            st.second,
        );
        this.dataArr = [
            st.year,
            st.month,
            st.day,
            st.hour,
            st.minute,
            st.second,
        ];
        return this;
    }
    moveTwoHours(delta) {
        let st = SolarTime.fromYmdHms(...this.dataArr);
        st = st.next(delta * 7200);
        this.dataArr = [
            st.year,
            st.month,
            st.day,
            st.hour,
            st.minute,
            st.second,
        ];
        return this;
    }
    /**
     * 重置为本地时间
     * @returns
     */
    localize() {
        let date = new Date();
        this.dataArr = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
        ];
        return this;
    }
}

class CalenOperator {
    getSolarTime(calenTime) {
        return SolarTime.fromYmdHms(...calenTime.dataArr);
    }
    getSolarDay(calenTime) {
        return this.getSolarTime(calenTime).getSolarDay();
    }
    getLunarHour(calenTime) {
        return this.getSolarTime(calenTime).getLunarHour();
    }
    getLunarDay(calenTime) {
        return this.getLunarHour(calenTime).getLunarDay();
    }
    getSixtyCycleDay(calenTime) {
        return this.getLunarDay(calenTime).getSixtyCycleDay();
    }
    getSixtyCycleHour(calenTime) {
        return this.getSolarTime(calenTime).getSixtyCycleHour();
    }
    getJulianDay(calenTime) {
        return JulianDay.fromYmdHms(...calenTime.dataArr);
    }
    getMJD(calenTime) {
        return this.getJulianDay(calenTime) - 2400000.5;
    }
    getEightChar(calenTime) {
        return this.getLunarHour(calenTime).getEightChar();
    }
    getHourRecommends(calenTime) {
        return this.getLunarHour(calenTime).getRecommends();
    }
    getHourAvoids(calenTime) {
        return this.getLunarHour(calenTime).getAvoids();
    }
    // 日历相关
    getWeek(calenTime) {
        return this.getSolarDay(calenTime).getWeek();
    }
    getPhase(calenTime) {
        return this.getSolarDay(calenTime).getPhase();
    }
    getDayRecommends(calenTime) {
        return this.getLunarDay(calenTime).getRecommends();
    }
    getDayAvoids(calenTime) {
        return this.getLunarDay(calenTime).getAvoids();
    }
    /**
     * 获取太岁方位
     * @param {CalenTime} calenTime
     * @returns
     */
    getDirection(calenTime) {
        return this.getSixtyCycleDay(calenTime).getJupiterDirection();
    }
    /**
     * 获取建除十二值神
     * @param {CalenTime} calenTime
     * @returns
     */
    getDuty(calenTime) {
        return this.getLunarDay(calenTime).getDuty();
    }
    /**
     * 获取黄道黑道十二神
     * @param {CalenTime} calenTime
     * @returns
     */
    getTwelveStar(calenTime) {
        return this.getLunarDay(calenTime).getTwelveStar();
    }
    getEcliptic(calenTime) {
        return this.getTwelveStar(calenTime).getEcliptic();
    }
    /**
     * 获取逐日胎神
     * @param {CalenTime} calenTime
     * @returns
     */
    getFetusDay(calenTime) {
        return this.getLunarDay(calenTime).getFetusDay();
    }
    /**
     * 获取二十八宿
     * @param {CalenTime} calenTime
     * @returns
     */
    getTwentyEightStar(calenTime) {
        return this.getLunarDay(calenTime).getTwentyEightStar();
    }
    /**
     * 获取当天的三柱对象
     * @param {CalenTime} calenTime
     * @returns
     */
    getThreePillars(calenTime) {
        return this.getLunarDay(calenTime).getThreePillars();
    }
    getConstellation(calenTime) {
        return this.getSolarDay(calenTime).getConstellation();
    }
    getSolarTerm(calenTime) {
        return this.getSolarDay(calenTime).getTerm();
    }
    getSolarTermDay(calenTime) {
        return this.getSolarDay(calenTime).getTermDay();
    }
    getPhenology(calenTime) {
        return this.getSolarDay(calenTime).getPhenology();
    }
    getLand(calenTime) {
        return this.getTwentyEightStar(calenTime).getLand();
    }
    getZone(calenTime) {
        return this.getTwentyEightStar(calenTime).getZone();
    }
    getAnimal(calenTime) {
        return this.getTwentyEightStar(calenTime).getAnimal();
    }
    getBeast(calenTime) {
        return this.getZone(calenTime).getBeast();
    }
    getSound(calenTime) {
        return this.getSixtyCycleDay(calenTime).getSixtyCycle().getSound();
    }
    getPengZu(calenTime) {
        return this.getSixtyCycleDay(calenTime).getSixtyCycle().getPengZu();
    }
    getYearZodiac(calenTime) {
        return this.getSixtyCycleDay(calenTime)
            .getYear()
            .getEarthBranch()
            .getZodiac();
    }
}

var moment = new CalenTime(1970, 1, 1, 0, 0, 0);
var operator = new CalenOperator();

var E_Calendar = document.getElementById("Calendar");
var E_Solar = document.getElementById("Solar");
var E_Lunar = document.getElementById("Lunar");
var E_Clock = document.getElementById("Clock");
var E_Week = document.getElementById("Week");
var E_ThreePillars = document.getElementById("ThreePillars");
var E_EightChar = document.getElementById("EightChar");
var E_YearIndex = document.getElementById("YearIndex");
var E_NineStar = document.getElementById("NineStar");
var E_TermDay = document.getElementById("TermDay");
var E_Phenology = document.getElementById("Phenology");
var E_Duty = document.getElementById("Duty");
var E_ThreePillars = document.getElementById("ThreePillars");
var E_Land = document.getElementById("Land");
var E_28Star = document.getElementById("28Star");
var E_Phase = document.getElementById("Phase");
var E_FetusDay = document.getElementById("FetusDay");
var E_TwelveStar = document.getElementById("TwelveStar");
var E_Recommends = document.getElementById("Recommends");
var E_Taboos = document.getElementById("Taboos");
var E_Sound = document.getElementById("Sound");
var E_PengZu = document.getElementById("PengZu");
var E_ExternalTime = document.getElementById("ExternalTime");
var E_JulianDay = document.getElementById("JulianDay");
var E_DayDiff = document.getElementById("DayDiff");
var E_Constellation = document.getElementById("Constellation");
var E_TodayRecommends = document.getElementById("TodayRecommends");
var E_TodayAvoids = document.getElementById("TodayAvoids");
var E_OtherDateInfo = document.getElementById("OtherDateInfo");
var E_Festival = document.getElementById("Festival");

var E_DateTimeSelector = document.getElementById("DateTimeSelector");

function fillClock() {
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    E_Clock.innerText = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
}

function fillCalendar() {
    E_Solar.innerText = `${operator.getSolarDay(moment).toString()}`;
    E_Lunar.innerText = `${operator.getLunarDay(moment).toString().slice(5)}`;
    E_Week.innerText = `${operator.getWeek(moment).toString()}`;
    document.getElementById("Julian").innerText = `${dateToMJD(new Date())}`;
    E_Phenology.innerText = operator.getPhenology(moment).toString();
    if (operator.getSolarTermDay(moment).dayIndex == 0) {
        E_TermDay.innerText = operator
            .getSolarTermDay(moment)
            .toString()
            .slice(0, 2);
    } else {
        E_TermDay.innerText = operator.getSolarTermDay(moment).toString();
    }
    E_ThreePillars.innerText =
        operator.getThreePillars(moment).getYear() +
        "(" +
        operator.getYearZodiac(moment).toString() +
        ")年 " +
        operator.getThreePillars(moment).getMonth() +
        "月 " +
        operator.getThreePillars(moment).getDay() +
        "日";
    let loadedFestivals = [];
    let eventFestivals = [];
    // console.log(eventFestivals);
    let allEvents = Event.all();
    allEvents.forEach((event) => {
        let currentSolarDay = operator.getSolarDay(moment);
        let currentSolarYear = currentSolarDay.year;
        let currentLunarDay = currentSolarDay.getLunarDay();
        let currentLunarYear = currentLunarDay.year;
        let eventDay;
        if (event.getType() == EventType.SOLAR_DAY || event.getType() == EventType.SOLAR_WEEK) {
            eventDay = event.getSolarDay(currentSolarYear);
            if (eventDay.equals(currentSolarDay)) {
                eventFestivals.push(event);
            }
        } else if (event.getType() == EventType.LUNAR_DAY) {
            eventDay = event.getSolarDayByLunarDay(currentLunarYear);
            if (eventDay.equals(currentSolarDay)) {
                eventFestivals.push(event);
            }
        }
    });
    loadedFestivals.push(
        operator.getSolarDay(moment).getFestival(),
        operator.getLunarDay(moment).getFestival(),
        operator.getSolarDay(moment).getDogDay(),
        operator.getSolarDay(moment).getNineDay(),
    );
    E_Festival.innerHTML = "";
    loadedFestivals = loadedFestivals.concat(eventFestivals);
    let matchedFestivals = [];
    loadedFestivals.forEach((festival) => {
        if (festival != null) matchedFestivals.push(festival);
    });
    for (var i = 0; i < matchedFestivals.length; i++) {
        if (matchedFestivals[i].name) {
            E_Festival.innerHTML += matchedFestivals[i].name;
        } else if (matchedFestivals[i]) {
            E_Festival.innerHTML += matchedFestivals[i].toLocaleString();
        }
        if (i != matchedFestivals.length - 1) E_Festival.innerHTML += ",";
    }
    E_Land.innerText =
        operator.getDirection(moment).toString() +
        operator.getDirection(moment).getLand().toString();
    let twentyEightStar = operator.getTwentyEightStar(moment);
    E_28Star.innerText =
        operator.getZone(moment).toString() +
        operator.getBeast(moment).toString() +
        " " +
        twentyEightStar.toString() +
        twentyEightStar.getSevenStar().toString() +
        twentyEightStar.getAnimal().toString();
    E_Phase.innerText = operator.getPhase(moment).toString();
    E_Constellation.innerText = operator.getConstellation(moment).toString();
    E_YearIndex.innerText =
        "第" + (operator.getSolarDay(moment).getIndexInYear() + 1) + "日";
    E_TwelveStar.innerText =
        operator.getEcliptic(moment).toString() +
        " " +
        operator.getTwelveStar(moment).toString();
    E_FetusDay.innerText = operator.getFetusDay(moment).toString();
    E_Sound.innerText = operator.getSound(moment).toString();
    E_PengZu.innerText = operator.getPengZu(moment).toString();
    E_JulianDay.innerText = Number(operator.getMJD(moment)).toFixed(5);
    E_TodayRecommends.innerText = operator
        .getDayRecommends(moment)
        .toSpliced(10)
        .toLocaleString();
    E_TodayAvoids.innerText = operator
        .getDayAvoids(moment)
        .toSpliced(10)
        .toLocaleString();
    //daydiff
    let nowMoment = new CalenTime().localize();
    let dayDiff = operator
        .getSolarDay(moment)
        .subtract(operator.getSolarDay(nowMoment));
    E_DayDiff.innerText = `${dayDiff > 0 ? "+" + dayDiff : dayDiff}`;
    //==========================
    let hour = moment.dataArr[3];
    let minute = moment.dataArr[4];
    let second = moment.dataArr[5];
    E_ExternalTime.innerText = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}:${second < 10 ? "0" + second : second}`;
    let eightChar = operator.getEightChar(moment);
    E_EightChar.innerHTML =
        eightChar.getYear() +
        "年 " +
        eightChar.getMonth() +
        "月 " +
        eightChar.getDay() +
        "日 " +
        eightChar.getHour() +
        "时";
    let lh = operator.getLunarHour(moment);
    E_NineStar.innerText = `${lh.getLunarDay().getLunarMonth().getLunarYear().getNineStar().toString()} ${lh.getLunarDay().getLunarMonth().getNineStar().toString()} ${lh.getLunarDay().getNineStar().toString()} ${lh.getNineStar().toString()}`;
    E_Duty.innerText = operator.getDuty(moment).toString();
    E_Recommends.innerText = operator
        .getHourRecommends(moment)
        .toSpliced(6)
        .toLocaleString();
    E_Taboos.innerText = operator
        .getHourAvoids(moment)
        .toSpliced(6)
        .toLocaleString();
}

function refreshCalendar() {
    moment.localize();
    fillCalendar();
}

document.body.onload = () => {
    fillClock();
    refreshCalendar();
};

var clockRefresher = window.setInterval(fillClock, 1000);
var calendarRefresher = window.setInterval(refreshCalendar, 5000);

function stopCalendarRefresher() {
    if (calendarRefresher) {
        window.clearInterval(calendarRefresher);
        calendarRefresher = null;
    }
}

function resumeCalendarRefresher() {
    stopCalendarRefresher();
    if (!calendarRefresher) {
        calendarRefresher = window.setInterval(refreshCalendar, 5000);
    }
}

window.addEventListener("keydown", (e) => {
    let keySet = ["-", "=", "o", "p", "k", "l", "m", ",", ".", "/", "0"];
    if (keySet.includes(e.key)) {
        e.preventDefault();
        if (e.key == "0" && !calendarRefresher) {
            refreshCalendar();
            resumeCalendarRefresher();
            E_Calendar.classList.remove("zigzag3d");
            return;
        }
        if (e.key == "0" && calendarRefresher) {
            stopCalendarRefresher();
            E_Calendar.classList.add("zigzag3d");
            return;
        }
        if (e.key != "0" && calendarRefresher) {
            // 如果按下的不是0且日历正在刷新，则按键无效
            return;
        }
        switch (e.key) {
            case "-":
                moment.moveTwoHours(-1);
                break;
            case "=":
                moment.moveTwoHours(1);
                break;
            case "o":
                moment.moveDate(-1);
                break;
            case "p":
                moment.moveDate(1);
                break;
            case "k":
                moment.moveMonth(-1);
                break;
            case "l":
                moment.moveMonth(1);
                break;
            case "m":
                moment.moveYear(-1);
                break;
            case ",":
                moment.moveYear(1);
                break;
            case ".":
                moment.moveYear(-50);
                break;
            case "/":
                moment.moveYear(50);
                break;
            default:
                break;
        }
        fillCalendar();
    }
});

E_LPPrevious = document.getElementById("LPPrevious");
E_LPNext = document.getElementById("LPNext");
E_LockButton = document.getElementById("LockButton");

function toggleLP() {
    if (calendarRefresher) {
        stopCalendarRefresher();
        E_LockButton.innerHTML = "Now";
        E_LPPrevious.style.display = "flex";
        E_LPNext.style.display = "flex";
        E_Calendar.classList.add("zigzag3d");
    } else {
        refreshCalendar();
        resumeCalendarRefresher();
        E_LockButton.innerHTML = "Pause";
        E_Calendar.classList.remove("zigzag3d");
        E_LPPrevious.style.display = "none";
        E_LPNext.style.display = "none";
    }
}
toggleLP();
toggleLP();

function touchMoveCalendar(mode) {
    switch (mode) {
        case "prevHour": {
            moment.moveTwoHours(-1);
            break;
        }
        case "nextHour": {
            moment.moveTwoHours(1);
            break;
        }
        case "prevDay": {
            moment.moveDate(-1);
            break;
        }
        case "nextDay": {
            moment.moveDate(1);
            break;
        }
        case "prevMonth": {
            moment.moveMonth(-1);
            break;
        }
        case "nextMonth": {
            moment.moveMonth(1);
            break;
        }
        case "prevYear": {
            moment.moveYear(-1);
            break;
        }
        case "nextYear": {
            moment.moveYear(1);
            break;
        }
        case "prev20Years": {
            moment.moveYear(-20);
            break;
        }
        case "next20Years": {
            moment.moveYear(20);
            break;
        }
    }
    fillCalendar();
}
