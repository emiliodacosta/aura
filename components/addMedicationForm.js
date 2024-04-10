import { charIsNumber, charIsLetter } from '@/utils/helpers';

export default function AddMedicationForm({
  nameInputErrorMessage,
  setNameInputErrorMessage,
  dosageInputErrorMessage,
  setDosageInputErrorMessage,
  showAddMedFormErrors,
  setShowAddMedFormErrors,
  handleAddMedFormSubmit,
  setAddMedFormVisible,
  // toggleAddMedFormVisible,
}) {
  return (
    <div>
      <span className="flex">
        <form onSubmit={handleAddMedFormSubmit}>
          <label>
            Name:{' '}
            <input
              className='text-darkGray'
              name='name'
              type='text'
              placeholder='Medication x'
              required
              onChange={(e) => {
                const nameInput = e.target.value.trim();
                const firstChar = nameInput[0];
                if (firstChar && charIsLetter(firstChar)) {
                  setNameInputErrorMessage(null);
                  if (!dosageInputErrorMessage) {
                    setShowAddMedFormErrors(false);
                  }
                } else if (firstChar) {
                  setNameInputErrorMessage('name must start with letter');
                }
              }}
            />
          </label>
          {`\u00A0\u00A0\u00A0`}
          <label>
            Dosage:{' '}
            <input
              className='text-darkGray'
              name='dosage'
              type='text'
              placeholder='50mg'
              required
              onChange={(e) => {
                const dosageInput = e.target.value.trim();
                const firstChar = dosageInput[0];
                const lastChar = dosageInput[dosageInput.length - 1];
                if (
                  firstChar &&
                  charIsNumber(firstChar) &&
                  charIsLetter(lastChar)
                ) {
                  setDosageInputErrorMessage(null);
                  if (!nameInputErrorMessage) {
                    setShowAddMedFormErrors(false);
                  }
                } else if (firstChar && !charIsNumber(firstChar)) {
                  setDosageInputErrorMessage('dosage must start with number');
                } else if (
                  firstChar &&
                  charIsNumber(firstChar) &&
                  !charIsLetter(lastChar)
                ) {
                  setDosageInputErrorMessage('dosage must end with letter');
                }
              }}
            />
          </label>
          {`\u00A0\u00A0\u00A0`}
          <button
            className='mb-1 rounded border-2 py-1 px-2 hover:bg-white hover:text-darkGray hover:border-lightGray disabled:bg-white disabled:text-darkGray disabled:border-transparent'
            type='submit'
          >
            Save new medication
          </button>
          {`\u00A0\u00A0\u00A0`}
        </form>
        <button
          onClick={() => {
            setAddMedFormVisible(false);
          }}
          className='mb-1 rounded border-2 py-1 px-2 hover:bg-white hover:text-darkGray hover:border-lightGray'
        >
          Cancel
        </button>
      </span>
      {showAddMedFormErrors && (
        <span className='text-red-800 flex'>
          {nameInputErrorMessage && (
            <div className='underline'>{nameInputErrorMessage}</div>
          )}
          {dosageInputErrorMessage && (
            <>
              <div>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</div>
              <div className='underline'>{dosageInputErrorMessage}</div>
            </>
          )}
        </span>
      )}
    </div>
  );
}
