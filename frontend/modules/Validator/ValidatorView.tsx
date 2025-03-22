import React from 'react';
import withValidatorController from './withValidatorController';
import {ValidatorViewType} from './types';
import InputCheckbox from '@/common/components/Inputs/InputCheckbox';
import LoadingSpinner from '@/common/components/LoadingSpinner';
import Button from '@/common/components/Button';

const ValidatorView: ValidatorViewType = ({
  pendingContainerIds,
  selectedContainerIds,
  handleClickContainer,
  handleBulkReject,
  handleBulkAccept,
}) => {
  return (
    <main className="h-screen w-full max-w-[700px] px-3xl py-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Validator</h1>
      <p className="my-2">
        On this page, the validator in the recycling center will be able to
        validate the containers that have been deposited. The validator can
        accept or reject the containers.
      </p>
      <p className="my-2">
        - The deposits of the accepted containers will be refunded to the users,
        but the rejected containers will keep their deposit locked.
      </p>
      <p className="my-2">- Rejected containers may be missing or damaged.</p>

      <div className="mt-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Pending containers
        </h2>

        {pendingContainerIds === null && <LoadingSpinner />}
        {Array.isArray(pendingContainerIds) && !pendingContainerIds.length && (
          <p className="text-lg text-gray-600">No pending containers</p>
        )}
        <div className="flex flex-col gap-4">
          {pendingContainerIds?.map((containerId) => (
            <InputCheckbox
              key={containerId}
              name="containerIds"
              checkOptionValue={containerId}
              label={`Container #${containerId}`}
              value={selectedContainerIds}
              handleChange={() => handleClickContainer(containerId)}
            />
          ))}
        </div>
      </div>

      {!!pendingContainerIds?.length && (
        <div className="flex gap-4 mt-4">
          <Button
            className="!bg-red-500 !shadow-none !rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleBulkReject();
            }}
          >
            Reject selected
          </Button>
          <Button
            className="!rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleBulkAccept();
            }}
          >
            Accept selected
          </Button>
        </div>
      )}
    </main>
  );
};

export default withValidatorController(ValidatorView);
