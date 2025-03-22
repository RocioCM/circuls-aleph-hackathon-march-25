export const CONTRACT_ADDRESS = '0x52ef0a91E6a7Ef22BdACB415D53DCe8020a73DFD';

export const CONTRACT_ABI = [
  {inputs: [], stateMutability: 'nonpayable', type: 'constructor'},
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'containerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recycler',
        type: 'address',
      },
    ],
    name: 'ContainerRecycled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'containerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'producer',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'depositValue',
        type: 'uint256',
      },
    ],
    name: 'ContainerRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'containerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recycler',
        type: 'address',
      },
    ],
    name: 'ContainerRejected',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'containerId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'recycler',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'releasedAmount',
        type: 'uint256',
      },
    ],
    name: 'ContainerValidated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'admin',
    outputs: [{internalType: 'address', name: '', type: 'address'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'containers',
    outputs: [
      {internalType: 'address', name: 'producer', type: 'address'},
      {internalType: 'uint256', name: 'depositValue', type: 'uint256'},
      {internalType: 'address', name: 'recycler', type: 'address'},
      {internalType: 'bool', name: 'validated', type: 'bool'},
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPendingContainerIds',
    outputs: [{internalType: 'uint256[]', name: '', type: 'uint256[]'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: '', type: 'address'}],
    name: 'pendingBalances',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    name: 'pendingContainerIds',
    outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'containerId', type: 'uint256'}],
    name: 'recycleContainer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256[]', name: 'containerIds', type: 'uint256[]'},
    ],
    name: 'recycleMultipleContainers',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {internalType: 'uint256', name: 'containerId', type: 'uint256'},
      {internalType: 'uint256', name: 'depositValue', type: 'uint256'},
    ],
    name: 'registerContainer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'containerId', type: 'uint256'}],
    name: 'rejectContainer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'address', name: 'newAdmin', type: 'address'}],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256[]', name: 'ids', type: 'uint256[]'}],
    name: 'setPendingContainerIds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{internalType: 'uint256', name: 'containerId', type: 'uint256'}],
    name: 'validateContainer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
