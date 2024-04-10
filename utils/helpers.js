export const charIsNumber = (char) => {
  return !isNaN(char);
};

export const charIsLetter = (char) => {
  let regex = /^[a-zA-Z]+$/;
  return regex.test(char);
};

export const medsCsvToArr = (stringVal, splitter) => {
  const allValuesArray = stringVal.split(splitter);
  let i = 0;
  const resultArray = [];
  while (i < allValuesArray.length - 1) {
    const medicationData = {
      name: allValuesArray[i],
      dosage: allValuesArray[i + 1],
    };
    const thirdValue = allValuesArray[i + 2];
    if (thirdValue) {
      if (charIsNumber(thirdValue[0])) {
        medicationData['start_date'] = allValuesArray[i + 2];
        medicationData['end_date'] = allValuesArray[i + 3];
        i += 4;
        resultArray.push(medicationData);
      } else if (thirdValue === 'true') {
        medicationData['taken'] = true;
        i += 3;
        resultArray.push(medicationData);
      } else if (thirdValue === 'false') {
        medicationData['taken'] = false;
        i += 3;
        resultArray.push(medicationData);
      } else {
        medicationData['taken'] = false;
        i += 2;
        resultArray.push(medicationData);
      }
    } else {
      medicationData['taken'] = false;
      i += 2;
      resultArray.push(medicationData);
    }
  }
  return resultArray;
};

export const tempsCsvToArr = (stringVal, splitter) => {
  const allValuesArray = stringVal.split(splitter);
  let i = 0;
  const resultArray = [];
  while (i < allValuesArray.length - 1) {
    const tempData = {
      date: allValuesArray[i],
      temperature: allValuesArray[i + 1],
    };
    resultArray.push(tempData);
    i += 2;
  }
  return resultArray;
};

export const medsArrayToPipeCsv = (medsArray) => {
  return [
    ...medsArray.map((medication) => {
      if (Object.hasOwn(medication, 'taken')) {
        return [medication.name, medication.dosage, medication.taken];
      } else if (medication.start_date) {
        return [
          medication.name,
          medication.dosage,
          medication.start_date,
          medication.end_date,
        ];
      } else {
        return [medication.name, medication.dosage];
      }
    }),
  ]
    .map((e) => e.join('|'))
    .join('|');
};

export const tempReadingsArrayToPipeCsv = (tempReadingsArray) => {
  return [
    ...tempReadingsArray.map((reading) => [reading.date, reading.temperature]),
  ]
    .map((e) => e.join('|'))
    .join('|');
};
