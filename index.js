function createEmployeeRecord(employeeArray) {
  const [firstName, familyName, title, payPerHour] = employeeArray;

  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrayOfEmployeeArrays) {
  return arrayOfEmployeeArrays.map(createEmployeeRecord);
}

function createTimeEvent(dateStamp, type) {
  const processDateStamp = dateStamp.split(" ");
  const date = processDateStamp[0];
  const hour = +processDateStamp[1];

  return {
    type: type,
    hour: hour,
    date: date,
  };
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const timeInEvent = createTimeEvent(dateStamp, "TimeIn");

  employeeRecord.timeInEvents.push(timeInEvent);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const timeOutEvent = createTimeEvent(dateStamp, "TimeOut");

  employeeRecord.timeOutEvents.push(timeOutEvent);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeIn = employeeRecord.timeInEvents.find(
    (timeInEvent) => timeInEvent.date === date
  );
  const timeOut = employeeRecord.timeOutEvents.find(
    (timeOutEvent) => timeOutEvent.date === date
  );

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);

  return hoursWorked * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  const allWages = employeeRecord.timeInEvents.map((timeInEvent) =>
    wagesEarnedOnDate(employeeRecord, timeInEvent.date)
  );

  return allWages.reduce((wage, total) => (total += wage));
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find(
    (employeeRecord) => employeeRecord.firstName === firstName
  );
}

function calculatePayroll(employeeRecords) {
  const allWages = employeeRecords.map((employeeRecord) =>
    allWagesFor(employeeRecord)
  );

  return allWages.reduce((wage, total) => (total += wage));
}
