import {useEffect, useState} from 'react';
import {ValidatorViewType, ValidatorViewProps} from './types';
import {toast} from 'react-toastify';

const withValidatorController = (View: ValidatorViewType) =>
  function Controller(): JSX.Element {
    const [pendingContainerIds, setPendingContainerIds] = useState<
      null | number[]
    >(null);
    const [selectedContainerIds, setSelectedContainerIds] = useState<number[]>(
      []
    );
    const [shouldUpdatePendingContainers, setShouldUpdatePendingContainers] =
      useState(false);

    const fetchPendingContainers = async () => {
      try {
        const response = await fetch(`/api/get-pending-containers`);
        const data = await response.json();

        if (data.success) {
          setPendingContainerIds(data.data ?? []);
        }
      } catch (e) {
        console.error('Error fetching pending containers', e);
      }
    };

    useEffect(() => {
      fetchPendingContainers();
    }, []);

    const handleClickContainer = (containerId: number) => {
      if (selectedContainerIds.includes(containerId)) {
        setSelectedContainerIds((prev) =>
          prev.filter((id) => id !== containerId)
        );
      } else {
        setSelectedContainerIds((prev) => [...prev, containerId]);
      }
    };

    const handleVerifyContainer = async (
      containerId: number,
      accepted: boolean
    ) => {
      try {
        const response = await fetch(`/api/validate-container`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            containerId,
            accepted,
          }),
        });
        const data = await response.json();

        if (data.success) {
          console.log(`Rejected container ${containerId}`);
          setPendingContainerIds((prev) =>
            (prev ?? []).filter((id) => id !== containerId)
          );
        }
      } catch (e) {
        console.error('Error sending transaction', e);
      }
    };

    const handleUpdatePendingContainers = async () => {
      try {
        const response = await fetch(`/api/set-pending-containers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pendingContainerIds: pendingContainerIds ?? [],
          }),
        });
        const data = await response.json();

        if (data.success) {
          toast.success('Pending containers updated successfully');
        }
      } catch (e) {
        console.error('Error fetching pending containers', e);
      }
    };

    const handleBulkReject = async () => {
      for (const containerId of selectedContainerIds) {
        await handleVerifyContainer(containerId, false);
      }
      setSelectedContainerIds([]);
      setShouldUpdatePendingContainers(true);
    };

    const handleBulkAccept = async () => {
      for (const containerId of selectedContainerIds) {
        await handleVerifyContainer(containerId, true);
      }
      setSelectedContainerIds([]);
      setShouldUpdatePendingContainers(true);
    };

    useEffect(() => {
      if (shouldUpdatePendingContainers) {
        handleUpdatePendingContainers();
      }
    }, [shouldUpdatePendingContainers]);

    const viewProps: ValidatorViewProps = {
      pendingContainerIds,
      selectedContainerIds,
      handleClickContainer,
      handleBulkReject,
      handleBulkAccept,
    };

    return <View {...viewProps} />;
  };

export default withValidatorController;
