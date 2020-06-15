const conditions = [
  'equal',
  'not-equal',
  'contain',
  'not-contain',
  'greater',
  'greater-equal',
  'less',
  'less-equal',
  'empty',
  'filled',
];

const actions = ['show', 'hide', 'enable', 'disable', 'require', 'unrequire'];

const logic = [
  {
    conditions: [
      { selector: '#email', operator: 'equal', value: 'test@test.com' }, // Value always a string!
      { selector: '#name', operator: 'not-equal', value: 'Alex' },
    ],
    operator: 'and',
    actions: [
      {
        selector: '#phone',
        action: 'show',
        clear: false,
      },
    ],
  },
];

const params = {
  submitHidden: false,
};

var conditionalLogic = new ConditionalLogic({
  logicList: [
    {
      conditions: [
        { origin: '#email', operator: 'equal', value: 'test@test.com' },
        { origin: '#name', operator: 'not-equal', value: 'Alex' },
      ],
      operator: 'and',
      actions: [
        {
          selector: '#phone',
          action: 'show',
          clear: false,
        },
      ],
    },
  ],
  submitHidden: true,
});
