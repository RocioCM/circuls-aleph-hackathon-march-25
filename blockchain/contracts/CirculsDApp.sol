// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title DigitalDepositReturnScheme
 * A digital deposit return system that tracks each container's deposit value and the user who recycled it.
 */
contract CirculsDApp {
  /**
   * Stores information about each container.
   * @param producer The address of the producer who registered this container.
   * @param depositValue The deposit value (in WLD) allocated for this container.
   * @param recycler The address of the user who has recycled this container.
   * @param validated Indicates whether this container was validated by the admin.
   */
  struct Container {
    address producer;
    uint256 depositValue;
    address recycler;
    bool validated;
  }

  /** Address that has administrative privileges to validate or reject containers */
  address public admin;

  /** Mapping from container ID to the container data */
  mapping(uint256 => Container) public containers;

  /** Mapping of recycler addresses to their pending balances (amounts awaiting validation) */
  mapping(address => uint256) public pendingBalances;

  /** Array of container IDs that have pending validation */
  uint256[] public pendingContainerIds;

  // ---------- EVENTS ---------- //

  /** Emitted when a container is successfully registered by a producer */
  event ContainerRegistered(
    uint256 indexed containerId,
    address indexed producer,
    uint256 depositValue
  );

  /** Emitted when a container is recycled by a user */
  event ContainerRecycled(
    uint256 indexed containerId,
    address indexed recycler
  );

  /** Emitted when a container is validated by the admin */
  event ContainerValidated(
    uint256 indexed containerId,
    address indexed recycler,
    uint256 releasedAmount
  );

  /** Emitted when a container is rejected by the admin */
  event ContainerRejected(
    uint256 indexed containerId,
    address indexed recycler
  );

  /** Constructor assigns the contract deployer as the admin */
  constructor() {
    admin = msg.sender;
  }

  /** Restricts certain functions to be callable only by the admin */
  modifier onlyAdmin() {
    require(msg.sender == admin, 'Only the admin can call this function');
    _;
  }

  /**
   * Registers a new container with a specified deposit value from a producer.
   * @param containerId A unique identifier for the container.
   * @param depositValue The deposit amount for this container (in WLD).
   */
  function registerContainer(
    uint256 containerId,
    uint256 depositValue
  ) external {
    require(
      containers[containerId].producer == address(0),
      'Container already exists'
    );
    containers[containerId] = Container({
      producer: msg.sender,
      depositValue: depositValue,
      recycler: address(0),
      validated: false
    });

    emit ContainerRegistered(containerId, msg.sender, depositValue);
  }

  /**
   * Called by a user to recycle a container. This action increases the user's pending balance
   * until the admin validates the container.
   * @param containerId The unique identifier of the container to recycle.
   */
  function recycleContainer(uint256 containerId) public {
    Container storage c = containers[containerId];
    require(c.producer != address(0), 'Container does not exist');
    require(
      c.recycler == address(0),
      'Container is already claimed by a recycler'
    );
    require(!c.validated, 'Container has already been processed');

    c.recycler = msg.sender;
    pendingBalances[msg.sender] += c.depositValue;
    pendingContainerIds.push(containerId);

    emit ContainerRecycled(containerId, msg.sender);
  }

  /**
   * Called by a user to recycle multiple containers. This action increases the user's pending balance
   * until the admin validates the containers.
   * @param containerIds - An array of container IDs to recycle
   */
  function recycleMultipleContainers(uint256[] memory containerIds) external {
    for (uint256 i = 0; i < containerIds.length; i++) {
      recycleContainer(containerIds[i]);
    }
  }

  /**
   * Called by the admin to validate a container. This action releases the deposit amount to the recycler
   * and marks the container as validated.
   * @param containerId The unique identifier of the container to validate.
   */
  function validateContainer(uint256 containerId) external onlyAdmin {
    Container storage c = containers[containerId];
    require(c.recycler != address(0), 'Container has not been claimed yet');
    require(!c.validated, 'Container has already been processed');

    c.validated = true;
    uint256 amount = c.depositValue;
    address recycler = c.recycler;
    pendingBalances[recycler] -= amount;

    emit ContainerValidated(containerId, recycler, amount);
  }

  /**
   * Called by the admin to reject a container. This action returns the deposit amount to the producer
   * and deducts it from the recycler's pending balance, marking the container as rejected.
   * @param containerId The unique identifier of the container to reject.
   */
  function rejectContainer(uint256 containerId) external onlyAdmin {
    Container storage c = containers[containerId];
    require(c.recycler != address(0), 'Container has not been claimed yet');
    require(!c.validated, 'Container has already been processed');

    c.recycler = address(0);
    uint256 amount = c.depositValue;
    address recycler = c.recycler;
    pendingBalances[recycler] -= amount;

    emit ContainerRejected(containerId, recycler);
  }

  /**
   * Allows the current admin to set the pending container IDs that are awaiting validation.
   * The recalculations are done off-chain after validation and the results are passed to this function.
   * @param ids An array of container IDs that are pending validation.
   */
  function setPendingContainerIds(uint256[] memory ids) external onlyAdmin {
    pendingContainerIds = ids;
  }

  /**
   * Allows the current admin to set a new admin address.
   * @param newAdmin The address of the new admin.
   */
  function setAdmin(address newAdmin) external onlyAdmin {
    require(newAdmin != address(0), 'Invalid admin address');
    admin = newAdmin;
  }

  /** Returns the pending container IDs that are awaiting validation. */
  function getPendingContainerIds() external view returns (uint256[] memory) {
    return pendingContainerIds;
  }
}
