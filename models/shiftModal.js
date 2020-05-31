class Shift {
  constructor(
    id,
    companyId,
    userId,
    shiftMonth,
    shiftDay,
    shiftYear,
    shiftStartTime,
    shiftEndTime,
    shiftDurationNumber,
    shiftDurationText
  ) {
    this.id = id;
    this.companyId = companyId;
    this.userId = userId;
    this.shiftMonth = shiftMonth;
    this.shiftDay = shiftDay;
    this.shiftYear = shiftYear;
    this.shiftStartTime = shiftStartTime;
    this.shiftEndTime = shiftEndTime;
    this.shiftDurationNumber = shiftDurationNumber;
    this.shiftDurationText = shiftDurationText;
  }
}

export default Shift;
