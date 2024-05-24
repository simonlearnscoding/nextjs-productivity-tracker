function setTime(totalDay: number, startedTime: Date | undefined) {
  if (!startedTime) {
    return totalDay;
  }
  else {
    const now = new Date();
    const diff = now.getTime() - startedTime.getTime();
    return totalDay + diff;
  }
}
