/*!
 * network.js - sidechain template for bitcoin.
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License)
 * Copyright (c) 2023, Jonathan Gonzales (MIT License)
 * https://github.com/rojii/testchain
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('bcrypto/lib/bn.js');

const network = exports;

/*
 * Helpers
 */

function b(hash) {
  return Buffer.from(hash, 'hex');
}

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'regtest'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [];


/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xc1f1a5d5;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 8271;

/**
 * Default port number
 * for the mainchain rpc daemon
 * @const {Number}
 * @default
 */

main.mainchainPort = 8332;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  0: b('654601393cd0ee8b706ece50e23e3ce8069265747900ad6a6690a68cd827b716')
}


/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 0;

main.txnData = {
  /**
   * update this data when the sidechain is more active
   * data as of hash: b('ae152d22eb344ae592bb3ab250eed47b96174d66537ed9000000000000000000')
   * and blockheight: 478913
   */

  rate: 0.0,
  time: 0.0,
  count: 0.0
};

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 210000;

/**
 * Genesis block header.
 * @const {Object}
 */

main.genesis = {
  version: 1,
  hash: b('654601393cd0ee8b706ece50e23e3ce8069265747900ad6a6690a68cd827b716'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('8a6be158deb38d5cc20aa8612ac303bb7ae59520d3b22213df5e88434f36b18e'),
  // Sidechain developers can be change this into some other useful hash.
  withdrawalBundle:
    b('8ccd756300000000000000000000000000000000000000000000000000000000'),
  mainchainBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  time: 1668664716,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */

main.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '008a6be158deb38d5cc20aa8612ac303bb7ae59520d3b22213df5e88434f36b18e8ccd'
  + '7563000000000000000000000000000000000000000000000000000000000000000000'
  + '0000000000000000000000000000000000000000000000000000000000000001010000'
  + '00010000000000000000000000000000000000000000000000000000000000000000ff'
  + 'ffffff3104ffff001d0104296e6e6e6e6e6e3a30786e6e6e6e6e6e6e6e6e6e6e6e6e6e'
  + '6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6effffffff01000000000000000043410467'
  + '8afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f'
  + '4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';

/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 486604799,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '00000000000000000000000000000000000000000259c9b7d8c7779d29a1188f',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 14 * 24 * 60 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 10 * 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 2016,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: true
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 1,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash:
    b('0000000000000000000000000000000000000000000000000000000000000000'),

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 0,

   /**
   * Height at which bip66 was activated.
   */

  bip66height: 0,

   /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 1000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 325000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {
  91842: b('eccae000e3c8e4e093936360431f3b7603c563c1ff6181390a4d0a0000000000'),
  91880: b('21d77ccb4c08386a04ac0196ae10f6a1d2c2a377558ca190f143070000000000')
};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 1916; // 95% of 2016

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1462060800, // May 1st, 2016
    timeout: 1493596800, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1479168000, // November 15th, 2016.
    timeout: 1510704000, // November 15th, 2017.
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 1496275200, // June 1st, 2017.
    timeout: 1510704000, // November 15th, 2017.
    threshold: 269, // 80%
    window: 336, // ~2.33 days
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.segsignal,
  main.deployments.testdummy
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0x80,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x00,
  scripthash: 0x05,
  bech32: 'sc'  // sidechain prefix
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 8272;

/**
 * Default wallet port.
 * @const {Number}
 * @default
 */

main.walletPort = 8274;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 1000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 5000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [];

regtest.magic = 0xdab5bffa;

regtest.port = 18742;

regtest.mainchainPort = 18443;

regtest.checkpointMap = {
  0: b('7447440597b4b519bd177c7331bf38ad84169d5e4ea602b70ea7ba9f5faad914')
};

regtest.lastCheckpoint = 0;

regtest.txnData = {
  rate: 0,
  time: 0,
  count: 0
};

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: b('7447440597b4b519bd177c7331bf38ad84169d5e4ea602b70ea7ba9f5faad914'),
  prevBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),
  merkleRoot:
    b('8a6be158deb38d5cc20aa8612ac303bb7ae59520d3b22213df5e88434f36b18e'),
  // This hash can be changed to some other useful hash instead
  withdrawalBundle:
    b('2d87ce6000000000000000000000000000000000000000000000000000000000'),
  mainchainBlock:
    b('0000000000000000000000000000000000000000000000000000000000000000'),

  time: 1624147757,
  height: 0
};

// For Sidechains the timestamp should be the mainchains blockheight:blockhash
regtest.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '008a6be158deb38d5cc20aa8612ac303bb7ae59520d3b22213df5e88434f36b18e2d87'
  + 'ce60000000000000000000000000000000000000000000000000000000000000000000'
  + '0000000000000000000000000000000000000000000000000000000000000001010000'
  + '00010000000000000000000000000000000000000000000000000000000000000000ff'
  + 'ffffff3104ffff001d0104296e6e6e6e6e6e3a30786e6e6e6e6e6e6e6e6e6e6e6e6e6e'
  + '6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6effffffff01000000000000000043410467'
  + '8afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f'
  + '4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 100000000,
  bip34hash: null,
  bip65height: 1351,
  bip65hash: null,
  bip66height: 1251,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: -1,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.segsignal,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  bech32: 'scrt'
};

regtest.requireStandard = false;

regtest.rpcPort = 18743;

regtest.walletPort = 18745;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;


/*
 * Expose
 */

network.main = main;
network.regtest = regtest;

