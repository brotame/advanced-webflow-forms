const introSlides = [
  {
    title: 'Step 1',
    content: `<p>
    Build your form in the Webflow Designer as you would normally
    do.<br />
  </p>
  <p>
    Make sure each target
    <span class="opacity-75"
      >(element that will be affected by an action)</span
    >
    is wrapped in a <em>Div Block</em> that has the custom
    attribute:<br />
  </p>
  <ul role="list" class="list-none">
    <li><strong>Name:</strong> data-logic</li>
    <li><strong>Value:</strong> parent</li>
  </ul>`,
    image: 'images/logo-512.png',
  },
  {
    title: 'Tip!',
    content: `<p>
    You can also group multiple elements in the same parent
    wrapper.<br />
  </p>
  <p>
    If you set that group as the target of an action, all the inputs
    inside it will be affected.<br />
  </p>
  <p class="text-sm pl-4 mb-8">
    <strong>E.g.</strong> disable all inputs that are inside the
    <em>Div Block</em> which ID is
    <span class="opacity-75">contact-info</span>.<br />
  </p>`,
    image: 'images/logo-512.png',
  },
  {
    title: 'Step 2',
    content: `<p>Set your conditions and actions in the builder.<br /></p>
    <p class="mb-1">
      If the target of an action is a single input, use its ID.<br />
    </p>
    <p class="text-sm pl-4">
      <strong>E.g.</strong> <span class="opacity-75">phone</span><br />
    </p>
    <p class="mb-1">
      If the target is a group of inputs, use the ID of the parent that
      wraps all of them.<strong>‍</strong><br />
    </p>
    <p class="text-sm pl-4">
      <strong>E.g.</strong> <span class="opacity-75">contact-info</span
      ><br />
    </p>
    <p class="text-sm mb-8">
      <strong>Note:</strong> Remember that each parent
      <em>Div Block</em> must have the custom attribute
      <span class="opacity-75">data-logic = parent</span>.
    </p>`,
    image: 'images/logo-512.png',
  },
  {
    title: 'Step 3 (Optional)',
    content: `<p>
    You can trigger Webflow Interactions when any action is
    performed.<br />
  </p>
  <p>
    To do so, add a hidden <em>Div Block</em> inside the target&#x27;s
    parent wrapper and bind it to a
    <span class="opacity-75">Mouse click (tap)</span> interaction.
    Then, add the following custom attribute:<br />
  </p>
  <ul role="list" class="list-none">
    <li><strong>Name:</strong> data-logic</li>
    <li>
      <strong>Value:</strong> show, hide, enable, disable, require,
      unrequire or custom.
    </li>
  </ul>
  <p>
    The script will automatically click the correspondent
    <em>Div Block</em>.<br />
  </p>
  <p class="text-sm pl-4 mb-8">
    <strong>E.g.</strong> when you show the input
    <span class="opacity-75">phone</span>, the script will click the
    <em>Div Block</em> that has the attribute
    <span class="opacity-75">data-logic=show</span>.
  </p>`,
    image: 'images/logo-512.png',
  },
  {
    title: 'Important!',
    content: `<p>
    When you choose to <em>show </em>or <em>hide </em>a target, by
    default the script will set the parent wrapper to
    <span class="opacity-75">display: block</span> or
    <span class="opacity-75">display: none</span>.<br />
  </p>
  <p>
    If you bind a Webflow Interaction to the <em>hide </em>or
    <em>show </em>actions, the script expects you to set that display
    property.<br />
  </p>
  <p class="text-sm pl-4 mb-8">
    <strong>E.g.</strong> when the target is showed, trigger a Webflow
    Interaction that sets
    <span class="opacity-75">display: flex</span> and
    <span class="opacity-75">opacity: 100%</span>.<br />
  </p>`,
    image: 'images/logo-512.png',
  },
];

export default introSlides;
