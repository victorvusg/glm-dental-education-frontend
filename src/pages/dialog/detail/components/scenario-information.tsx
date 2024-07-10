import { ScenarioDetail } from '../../../../store/scenario/types';

interface Props {
  scenario?: ScenarioDetail;
}

const ScenarioInformation = ({ scenario }: Props) => {
  if (!scenario) return <></>;
  return (
    <div className='border-gray-200 w-[300px] shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex items-start flex-col py-10 pl-6 pr-4'>
        <img
          className='w-24 h-24 mb-3 rounded-full shadow-lg'
          src='https://api.dicebear.com/7.x/pixel-art/svg'
          alt='Bonnie image'
        />
        <div className='rounded-xl p-4 bg-gray-700 w-full'>
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            Name: {scenario.patientName}
          </h5>
          <span className='text-sm dark:text-gray-400'>
            Age: {scenario.age} ({scenario.gender})
          </span>
          <p className='dark:text-gray-400 text-sm mt-1'>
            Date of birth: {scenario.dateOfBirth}
          </p>
        </div>

        <div
          className='flex mt-12 justify-start gap-7'
          style={{ maxWidth: '300px' }}
        >
          <div>
            <p className='text-gray-200 text-sm mb-5'>
              <b>Symptoms:</b> {scenario.symptoms}
            </p>
            <p className='text-gray-200 text-sm mb-5'>
              <b>Life style:</b> {scenario.lifeStyle}
            </p>

            <p className='text-gray-200 text-sm mb-5'>
              <b>Status: </b>
              {scenario.symptoms}
            </p>
            <p className='text-gray-200 text-sm mb-5'>
              <b>Medical History: </b> {scenario.medicalHistory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioInformation;
