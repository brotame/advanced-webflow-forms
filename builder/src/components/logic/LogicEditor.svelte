<script>
  // Helpers
  import { uuidv4 } from "../../helpers";

  // Svelte
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";

  // Store
  import logicStore from "../../stores/logic-store";

  // Components
  import ConditionsBlock from "./ConditionsBlock.svelte";
  import ActionsBlock from "./ActionsBlock.svelte";

  // Exports
  export let editID;

  // Variables
  let storedLogic;
  let conditions = [{}];
  let operator = "and";
  let actions = [{ clear: false }];
  let missingCondition, missingAction, triedToSubmit;

  // Reactive
  $: if (editID) storedLogic = $logicStore.find(logic => logic.id === editID);
  $: if (storedLogic) conditions = storedLogic.conditions;
  $: if (storedLogic) operator = storedLogic.operator;
  $: if (storedLogic) actions = storedLogic.actions;

  // Functions
  const dispatch = createEventDispatcher();

  function updateSelector(e) {
    const target =
      e.detail.from === "condition"
        ? conditions[e.detail.index]
        : actions[e.detail.index];

    if (!target.selectorString) return;

    target.selector =
      target.type === "radios"
        ? `input[name="${target.selectorString}"]:checked`
        : `#${target.selectorString}`;
  }

  function handleConditionOperator(e) {
    const condition = conditions[e.detail];

    if (condition.operator === "checked") condition.value = true;
    if (condition.operator === "not-checked") condition.value = false;
  }

  function checkFilledInputs() {
    console.log(conditions);
    conditions.forEach(condition => {
      missingCondition =
        !condition.type ||
        !condition.selectorString ||
        !condition.operator ||
        !condition.value;
    });

    actions.forEach(action => {
      missingAction = !action.selectorString || !action.action;
    });
  }

  function formSubmit() {
    if (!triedToSubmit) triedToSubmit = true;

    checkFilledInputs();

    if (missingCondition || missingAction) return;

    if (editID)
      logicStore.modify({ id: editID, conditions, operator, actions });
    else logicStore.add({ id: uuidv4(), conditions, operator, actions });

    dispatch("cancel");

    console.log(storedLogic);
    console.log(conditions);
    console.log(operator);
    console.log(actions);
  }

  function addCondition() {
    conditions = [...conditions, {}];
  }

  function addAction() {
    actions = [...actions, { clear: false }];
  }

  function removeCondition(e) {
    conditions = conditions.filter(condition => condition !== e.detail);
  }

  function removeAction(e) {
    actions = actions.filter(action => action !== e.detail);
  }
</script>

<!-- Intro -->
<div class="container max-w-2xl">
  <div class="relative px-8">
    <div class="back-button" on:click={() => dispatch('cancel')}>
      <svg
        viewbox="0 0 512 253"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M153.21 172.286H498.286C505.859 172.286 512 166.145 512
          158.571V94.5714C512 86.9977 505.859 80.8572 498.286
          80.8572H153.21V28.2183C153.21 3.78172 123.666 -8.45598 106.386
          8.82287L8.03314 107.176C-2.67885 117.888 -2.67885 135.255 8.03314
          145.966L106.386 244.319C123.665 261.598 153.21 249.36 153.21
          224.923V172.286Z" />
      </svg>
    </div>
    <h1 class="center">{editID ? 'Edit' : 'Add new'} logic</h1>
  </div>

  <!-- Form -->
  <form id="logic-editor" name="Logic Editor">

    <!-- Conditions -->
    {#each conditions as condition, index}
      <div transition:fade={{ duration: 250 }}>
        <ConditionsBlock
          {condition}
          {index}
          on:addcondition={addCondition}
          on:removecondition={removeCondition}
          on:inputchange={checkFilledInputs}
          on:updateselector={updateSelector}
          on:operatorchange={handleConditionOperator} />
      </div>
    {/each}

    <!-- Operator Select -->
    <div class="hflex-c-s my-8">

      {#if conditions.length > 1}
        <label for="operator" class="bold">If</label>
        <select
          id="operator"
          name="Operator"
          class="input-field _w-auto mx-2 w-select"
          bind:value={operator}>
          <option value="and">All Conditions Are Met</option>
          <option value="or">One Condition Is Met</option>
        </select>
        <div class="bold">then do the following actions:</div>
      {:else}
        <div class="bold">
          If the condition is met, then do the following actions:
        </div>
      {/if}

    </div>

    <!-- Actions -->
    {#each actions as action, index}
      <div transition:fade={{ duration: 250 }}>
        <ActionsBlock
          {action}
          {index}
          on:addaction={addAction}
          on:removeaction={removeAction}
          on:inputchange={checkFilledInputs} />
      </div>
    {/each}

    <!-- Submit Buttons -->
    <div class="hflex-c-s">
      <div
        class="button outline mr-4 w-button"
        on:click={() => dispatch('cancel')}>
        Cancel
      </div>
      <button
        type="submit"
        class="button w-button mr-4"
        class:error={(missingCondition || missingAction) && triedToSubmit}
        on:click|preventDefault={formSubmit}>
        {(missingCondition || missingAction) && triedToSubmit ? 'Some Fields Are Missing' : 'Save Logic'}
      </button>
    </div>

  </form>

</div>
