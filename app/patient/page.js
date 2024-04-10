'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Section from '../../components/section';
import LineChart from '../../components/lineChart';
import FullPageLoader from '../../components/fullPageLoader';
import { getPatient, updatePatient } from '../api/route';
import {
  medsCsvToArr,
  tempsCsvToArr,
  medsArrayToPipeCsv,
  tempReadingsArrayToPipeCsv,
} from '@/utils/helpers';
import { MS_IN_MONTH, TODAY_DATE_STRING } from '@/utils/constants';
import AddMedicationForm from '@/components/addMedicationForm';

export default function Page() {
  const [patientName, setPatientName] = useState(null);
  const [patient, setPatient] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(6);
  const [filteredTempReadings, setFilteredTempReadings] = useState(null);
  // const [triggerRender, setTriggerRender] = useState(false);
  const [addMedFormVisible, setAddMedFormVisible] = useState(false);
  const [nameInputErrorMessage, setNameInputErrorMessage] = useState(null);
  const [dosageInputErrorMessage, setDosageInputErrorMessage] = useState(null);
  const [showAddMedFormErrors, setShowAddMedFormErrors] = useState(false);

  // const [editMedFormVisible, setEditMedFormVisible] = useState(false);

  const searchParams = useSearchParams();
  if (searchParams && !patientName) {
    const paramsName = searchParams.get('name');
    setPatientName(paramsName);
  }

  useEffect(() => {
    const getPatientFromName = async () => {
      const patientData = await getPatient(patientName);
      const medicationsArr = medsCsvToArr(patientData.medications, '|');
      patientData.medications = medicationsArr;
      const tempsArr = tempsCsvToArr(patientData.bodyTemperatures, '|');
      patientData.bodyTemperatures = tempsArr;
      setPatient(patientData);
      console.log(patientData);
    };
    if (patientName) {
      getPatientFromName();
    }
  }, [patientName]);

  useEffect(() => {
    const filterTempReadings = (tempReadings) => {
      const result = tempReadings.filter(
        (tempReading) =>
          Date.parse(tempReading.date) >
          Date.now() - MS_IN_MONTH * selectedPeriod
      );
      return result.reverse();
    };
    if (patient) {
      setFilteredTempReadings(filterTempReadings(patient.bodyTemperatures));
    }
    // if (triggerRender) {
    //   setTriggerRender(false);
    // }
  }, [patient, selectedPeriod]);

  const addTempReading = async () => {
    const currentDate = TODAY_DATE_STRING;
    // Generate random number between 36.0 and 38.0
    const randomTemp = Math.floor(Math.random() * (380 - 360 + 1) + 360) / 10;
    const newReading = {
      date: currentDate,
      temperature: randomTemp.toString(),
    };
    const patientBodyTemps = patient.bodyTemperatures;
    console.log(patientBodyTemps);
    patientBodyTemps.unshift(newReading);
    console.log(patientBodyTemps);

    const pipeCsvTemps = tempReadingsArrayToPipeCsv(patientBodyTemps);
    console.log(pipeCsvTemps);
    const fieldAndNewEntryObject = {
      bodyTemperatures: pipeCsvTemps,
    };
    await updatePatient(patientName, fieldAndNewEntryObject);
    // setTriggerRender(true);
  };

  const saveUpdatedMeds = async (updatedMeds) => {
    const pipeCsvMeds = medsArrayToPipeCsv(updatedMeds);
    // console.log(pipeCsvMeds);
    const fieldAndNewEntryObject = {
      medications: pipeCsvMeds,
    };
    await updatePatient(patientName, fieldAndNewEntryObject);
    // setTriggerRender(true);
  };

  const takeMedication = async (medicationTaken) => {
    const patientMedications = patient.medications;
    patientMedications.map((medication) => {
      if (medicationTaken === `${medication.name} ${medication.dosage}`) {
        medication.taken = true;
      }
    });
    await saveUpdatedMeds(patientMedications);
  };

  const addNewMedication = async (newMedication) => {
    const patientMedications = patient.medications;
    patientMedications.push(newMedication);
    // console.log('new patientMedications:', patientMedications);
    await saveUpdatedMeds(patientMedications);
    setAddMedFormVisible(false);
  };

  const handleAddMedFormSubmit = async (e) => {
    e.preventDefault();

    // console.log('nameError', nameInputErrorMessage);
    // console.log('dosageError', dosageInputErrorMessage);
    if (nameInputErrorMessage || dosageInputErrorMessage) {
      setShowAddMedFormErrors(true);
      return;
    }

    const newMedication = {};
    const form = e.target;
    const formData = new FormData(form);
    for (const kVpair of formData.entries()) {
      // console.log(kVpair[0], kVpair[1]);
      newMedication[kVpair[0]] = kVpair[1];
    }
    newMedication['taken'] = false;
    // console.log('newMedication', newMedication);
    await addNewMedication(newMedication);
  };

  // const editMedication = async (medicationName) => {};

  // const handleEditMedFormSubmit = async (e) => {
  //   e.preventDefault();
  //   // console.log('nameError', nameInputErrorMessage);
  //   // console.log('dosageError', dosageInputErrorMessage);
  //   // if (nameInputErrorMessage || dosageInputErrorMessage) {
  //   //   setShowAddMedFormErrors(true);
  //   //   return;
  //   // }
  // };

  return patient && filteredTempReadings ? (
    <div className='grid gap-5 p-4'>
      <div>
        <Section title='Patient Basic Information'>
          <div className='grid grid-cols-2 gap-x-5'>
            <div>
              <ul className='mb-1'>Name: {patient.name}</ul>
              <ul className='mb-1'>First Name: {patient.firstName}</ul>
              <ul>Age: {patient.age}</ul>
            </div>
            <div>
              <ul className='mb-1'>Height: {patient.height}</ul>
              <ul className='mb-1'>Weight: {patient.weight}</ul>
              <ul>Gender: {patient.gender}</ul>
            </div>
          </div>
        </Section>
      </div>
      <div className='grid grid-cols-2 gap-x-5'>
        <Section title={`Highlights for ${TODAY_DATE_STRING}`}>
          {patient.bodyTemperatures[0].date !== TODAY_DATE_STRING ? (
            <>
              <button
                onClick={addTempReading}
                className='rounded border-2 py-1 px-2 hover:bg-white hover:text-darkGray hover:border-lightGray'
              >
                Take a temperature reading
              </button>
              <br />
            </>
          ) : (
            <div>{`The patient's temperature has been taken today.`}</div>
          )}
          {patient.medications.map((medication) => {
            return (
              <React.Fragment key={`${medication.name} ${medication.dosage}`}>
                {!Object.hasOwn(medication, 'end_date') &&
                  (!medication.taken ? (
                    <button
                      value={`${medication.name} ${medication.dosage}`}
                      onClick={(e) => takeMedication(e.target.value)}
                      key={medication.name}
                      className='my-2 rounded border-2 py-1 px-2 hover:bg-white hover:text-darkGray hover:border-lightGray'
                    >
                      Administer {medication.dosage} of {medication.name}
                    </button>
                  ) : (
                    <div
                      key={medication.name}
                    >{`The patient has taken ${medication.dosage} of ${medication.name} today.`}</div>
                  ))}
              </React.Fragment>
            );
          })}
        </Section>
        <Section
          title='Temperature Readings (°C)'
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        >
          <LineChart
            tempReadings={filteredTempReadings}
            className='h-48 w-full'
          />
        </Section>
      </div>
      <Section title='Medications'>
        {patient.medications.length > 0 ? (
          patient.medications.map((medication) => {
            return (
              <ul
                key={`${medication.name} ${medication.dosage}`}
                className='mb-1'
              >
                {`Name: ${medication.name}\u00A0\u00A0\u00A0
                Dosage: ${medication.dosage}\u00A0\u00A0\u00A0`}
                {!Object.hasOwn(medication, 'start_date') &&
                  `Taken Today: ${medication.taken ? `Yes` : `No`}
                `}
                {Object.hasOwn(medication, 'start_date') &&
                  `Started: ${medication.start_date} \u00A0\u00A0\u00A0`}
                {Object.hasOwn(medication, 'end_date') &&
                  `Ended: ${medication.end_date} \u00A0\u00A0\u00A0`}
                {/* {editMedFormVisible ? (
                  <div></div>
                ) : (
                  <button
                    onClick={() => {
                      setEditMedFormVisible(true);
                    }}
                    className='mb-1 rounded border-2 py-1 px-2 hover:bg-white hover:text-darkGray hover:border-lightGray'
                  >
                    Edit medication
                  </button>
                )} */}
              </ul>
            );
          })
        ) : (
          <div>No medications were found for this patient.</div>
        )}
        {addMedFormVisible ? (
          <AddMedicationForm
            nameInputErrorMessage={nameInputErrorMessage}
            setNameInputErrorMessage={setNameInputErrorMessage}
            dosageInputErrorMessage={dosageInputErrorMessage}
            setDosageInputErrorMessage={setDosageInputErrorMessage}
            showAddMedFormErrors={showAddMedFormErrors}
            setShowAddMedFormErrors={setShowAddMedFormErrors}
            handleAddMedFormSubmit={handleAddMedFormSubmit}
            setAddMedFormVisible={setAddMedFormVisible}
            // toggleAddMedFormVisible={toggleAddMedFormVisible}
          />
        ) : (
          <button
            onClick={() => {
              setAddMedFormVisible(true);
            }}
            className='mb-1 rounded border-2 py-1 px-2 hover:bg-white hover:text-darkGray hover:border-lightGray'
          >
            Add a new medication
          </button>
        )}
      </Section>
    </div>
  ) : (
    <div className='p-4'>
      <div className='bg-darkGray'>
        <FullPageLoader />
      </div>
    </div>
  );
}
