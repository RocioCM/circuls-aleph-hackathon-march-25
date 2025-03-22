// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title IWorldCoinToken
 * Interface for interacting with the WLD (Worldcoin) token contract.
 * This interface may be adjusted or replaced by the official Worldcoin ERC-20 interface.
 */
interface IWorldCoinToken {
  /**
   * Transfers tokens from one address to another.
   * @param from The address to transfer tokens from.
   * @param to The address to transfer tokens to.
   * @param amount The amount of tokens to transfer.
   * @return A boolean indicating whether the operation succeeded.
   */
  function transferFrom(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);

  /**
   * Transfers tokens to a specified address.
   * @param to The address to transfer tokens to.
   * @param amount The amount of tokens to transfer.
   * @return A boolean indicating whether the operation succeeded.
   */
  function transfer(address to, uint256 amount) external returns (bool);

  /**
   * Returns the token balance of a given address.
   * @param account The address for which the balance is queried.
   * @return The balance of the specified address.
   */
  function balanceOf(address account) external view returns (uint256);
}

/**
 * @title DepositReturnSystem
 * A digital deposit return system that uses the WLD (Worldcoin) token.
 * Internally, this contract refers to these tokens as "circoins," but
 * they are effectively WLD tokens.
 */
contract CirculsDApp {
  /**
   * Stores information about each container.
   * @param producer The address of the producer who registered this container.
   * @param depositValue The deposit value (in WLD) allocated for this container.
   * @param recycler The address of the user who has recycled this container.
   * @param validated Indicates whether this container was validated by the admin.
   * @param rejected Indicates whether this container was rejected by the admin.
   */
  struct Container {
    address producer;
    uint256 depositValue;
    address recycler;
    bool validated;
  }

  /** Reference to the WLD token contract */
  IWorldCoinToken public circoinToken;

  /** Address that has administrative privileges to validate or reject containers */
  address public admin;

  /** Mapping from container ID to the container data */
  mapping(uint256 => Container) public containers;

  /**
   * Mapping of producer addresses to their available deposit balances.
   */
  mapping(address => uint256) public producerDeposits;

  /**
   * Mapping of recycler addresses to their pending balances (amounts awaiting validation).
   */
  mapping(address => uint256) public pendingBalances;

  /**
   * Emitted when a container is successfully registered by a producer.
   */
  event ContainerRegistered(
    uint256 indexed containerId,
    address indexed producer,
    uint256 depositValue
  );

  /**
   * Emitted when a container is recycled by a user.
   */
  event ContainerRecycled(
    uint256 indexed containerId,
    address indexed recycler
  );

  /**
   * Emitted when a container is validated by the admin.
   */
  event ContainerValidated(
    uint256 indexed containerId,
    address indexed recycler,
    uint256 releasedAmount
  );

  /**
   * Emitted when a container is rejected by the admin.
   */
  event ContainerRejected(
    uint256 indexed containerId,
    address indexed recycler
  );

  /**
   * Sets the WLD token contract address and assigns the contract deployer as the admin.
   * @param _circoinTokenAddress The address of the WLD token contract.
   */
  constructor(address _circoinTokenAddress) {
    require(_circoinTokenAddress != address(0), 'Invalid token address');
    circoinToken = IWorldCoinToken(_circoinTokenAddress);
    admin = msg.sender;
  }

  /**
   * Restricts certain functions to be callable only by the admin.
   */
  modifier onlyAdmin() {
    require(msg.sender == admin, 'Only the admin can call this function');
    _;
  }

  /**
   * Allows a producer to deposit WLD tokens into this contract.
   * @param amount The number of tokens to deposit.
   */
  function depositFunds(uint256 amount) external {
    bool success = circoinToken.transferFrom(msg.sender, address(this), amount);
    require(success, 'Token transfer failed');
    producerDeposits[msg.sender] += amount;
  }

  /**
   * Registers a new container with a specified deposit value, deducting the producer's available balance.
   * @param containerId A unique identifier for the container.
   * @param depositValue The deposit amount for this container (in WLD).
   */
  function registerContainer(
    uint256 containerId,
    uint256 depositValue
  ) external {
    require(
      producerDeposits[msg.sender] >= depositValue,
      'Insufficient producer deposit balance'
    );
    require(
      containers[containerId].producer == address(0),
      'Container already exists'
    );

    producerDeposits[msg.sender] -= depositValue;
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
  function recycleContainer(uint256 containerId) external {
    Container storage c = containers[containerId];
    require(c.producer != address(0), 'Container does not exist');
    require(
      c.recycler == address(0) && !c.validated,
      'Container has already been processed'
    );
    require(
      c.recycler == address(0),
      'Container is already claimed by a recycler'
    );

    c.recycler = msg.sender;
    pendingBalances[msg.sender] += c.depositValue;

    emit ContainerRecycled(containerId, msg.sender);
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

    bool success = circoinToken.transfer(recycler, amount);
    require(success, 'Token transfer failed');

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
    producerDeposits[c.producer] += amount;

    emit ContainerRejected(containerId, recycler);
  }

  /**
   * Allows a producer to withdraw uncommitted funds from their deposit balance.
   * @param amount The number of tokens to withdraw.
   */
  function withdrawFunds(uint256 amount) external {
    require(
      producerDeposits[msg.sender] >= amount,
      'Insufficient funds to withdraw'
    );
    producerDeposits[msg.sender] -= amount;
    bool success = circoinToken.transfer(msg.sender, amount);
    require(success, 'Token withdrawal failed');
  }

  /**
   * Allows the current admin to set a new admin address.
   * @param newAdmin The address of the new admin.
   */
  function setAdmin(address newAdmin) external onlyAdmin {
    require(newAdmin != address(0), 'Invalid admin address');
    admin = newAdmin;
  }
}
