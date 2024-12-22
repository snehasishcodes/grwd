export default function isValidDate(date: string) {
    const day = date.split("-")[0];
    const month = date.split("-")[1];
    const year = date.split("-")[2];

    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const isLeapYear = currentYear % 4 === 0;
    const thirtyDayMonths = [4, 6, 9, 11];

    if (!day || !month || !year) return false;
    const dayNum = parseInt(day), monthNum = parseInt(month), yearNum = parseInt(year);

    // normal validation
    if (dayNum < 1 || dayNum > 31) return false;
    if (monthNum < 1 || monthNum > 12) return false;
    if (monthNum !== currentMonth) return false;
    if (yearNum !== currentYear) return false;
    // extra validations
    if (monthNum === 2 && !isLeapYear && dayNum > 28) return false; // non leap year february
    if (monthNum === 2 && isLeapYear && dayNum > 29) return false; // leap year february
    if (thirtyDayMonths.includes(monthNum) && dayNum > 30) return false; // 30 days months
    // only allow yesterday
    if ((currentDay - dayNum) > 1 || (currentDay - dayNum) < 0) return false; // allow 1 day back in time

    return true;
}