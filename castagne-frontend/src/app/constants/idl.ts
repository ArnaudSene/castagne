export const IDL_PLAYER = {
  version: '0.1.0',
  name: 'vote',
  instructions: [
    {
      name: 'createProposal',
      accounts: [
        { name: 'proposal', isMut: true, isSigner: true },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'choices', type: { vec: 'string' } },
        { name: 'deadline', type: 'u64' },
      ],
    },
    {
      name: 'castVote',
      accounts: [
        { name: 'proposal', isMut: true, isSigner: false },
        { name: 'voter', isMut: true, isSigner: false },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [{ name: 'choice', type: 'u8' }],
    },
  ],
  accounts: [
    {
      name: 'Proposal',
      type: {
        kind: 'struct',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'choices', type: { vec: { defined: 'Choice' } } },
          { name: 'deadline', type: 'u64' },
        ],
      },
    },
    {
      name: 'Voter',
      type: {
        kind: 'struct',
        fields: [
          { name: 'proposal', type: 'publicKey' },
          { name: 'user', type: 'publicKey' },
          { name: 'choiceOption', type: 'u8' },
        ],
      },
    },
  ],
  types: [
    {
      name: 'Choice',
      type: {
        kind: 'struct',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'count', type: 'u64' },
        ],
      },
    },
  ],
  errors: [
    { code: 6000, name: 'MaxChoicesReach', msg: 'Too many choices' },
    { code: 6001, name: 'InvalidOption', msg: 'Invalid option' },
    { code: 6002, name: 'VotingIsOver', msg: 'Vote is over' },
  ],
};

export const IDL_BATTLE = {
  version: '0.1.0',
  name: 'vote',
  instructions: [
    {
      name: 'createProposal',
      accounts: [
        { name: 'proposal', isMut: true, isSigner: true },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'choices', type: { vec: 'string' } },
        { name: 'deadline', type: 'u64' },
      ],
    },
    {
      name: 'castVote',
      accounts: [
        { name: 'proposal', isMut: true, isSigner: false },
        { name: 'voter', isMut: true, isSigner: false },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [{ name: 'choice', type: 'u8' }],
    },
  ],
  accounts: [
    {
      name: 'Proposal',
      type: {
        kind: 'struct',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'choices', type: { vec: { defined: 'Choice' } } },
          { name: 'deadline', type: 'u64' },
        ],
      },
    },
    {
      name: 'Voter',
      type: {
        kind: 'struct',
        fields: [
          { name: 'proposal', type: 'publicKey' },
          { name: 'user', type: 'publicKey' },
          { name: 'choiceOption', type: 'u8' },
        ],
      },
    },
  ],
  types: [
    {
      name: 'Choice',
      type: {
        kind: 'struct',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'count', type: 'u64' },
        ],
      },
    },
  ],
  errors: [
    { code: 6000, name: 'MaxChoicesReach', msg: 'Too many choices' },
    { code: 6001, name: 'InvalidOption', msg: 'Invalid option' },
    { code: 6002, name: 'VotingIsOver', msg: 'Vote is over' },
  ],
};

export const IDL_STATS = {
  version: '0.1.0',
  name: 'vote',
  instructions: [
    {
      name: 'createProposal',
      accounts: [
        { name: 'proposal', isMut: true, isSigner: true },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'choices', type: { vec: 'string' } },
        { name: 'deadline', type: 'u64' },
      ],
    },
    {
      name: 'castVote',
      accounts: [
        { name: 'proposal', isMut: true, isSigner: false },
        { name: 'voter', isMut: true, isSigner: false },
        { name: 'signer', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [{ name: 'choice', type: 'u8' }],
    },
  ],
  accounts: [
    {
      name: 'Proposal',
      type: {
        kind: 'struct',
        fields: [
          { name: 'title', type: 'string' },
          { name: 'description', type: 'string' },
          { name: 'choices', type: { vec: { defined: 'Choice' } } },
          { name: 'deadline', type: 'u64' },
        ],
      },
    },
    {
      name: 'Voter',
      type: {
        kind: 'struct',
        fields: [
          { name: 'proposal', type: 'publicKey' },
          { name: 'user', type: 'publicKey' },
          { name: 'choiceOption', type: 'u8' },
        ],
      },
    },
  ],
  types: [
    {
      name: 'Choice',
      type: {
        kind: 'struct',
        fields: [
          { name: 'label', type: 'string' },
          { name: 'count', type: 'u64' },
        ],
      },
    },
  ],
  errors: [
    { code: 6000, name: 'MaxChoicesReach', msg: 'Too many choices' },
    { code: 6001, name: 'InvalidOption', msg: 'Invalid option' },
    { code: 6002, name: 'VotingIsOver', msg: 'Vote is over' },
  ],
};
