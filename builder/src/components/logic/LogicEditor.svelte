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
  let missingCondition, missingAction, triedToSubmit;
  let logic = {
    id: uuidv4(),
    conditions: [{}],
    operator: "and",
    actions: [{}]
  };

  // Reactive
  $: if (editID) logic = $logicStore.find(logic => logic.id === editID);

  // Functions
  const dispatch = createEventDispatcher();

  function checkFilledInputs() {
    console.log(logic);
    logic.conditions.forEach(condition => {
      missingCondition =
        !condition.type || !condition.selector || !condition.operator;
    });

    logic.actions.forEach(action => {
      missingAction = !action.selector || !action.action;
    });
  }

  function formSubmit() {
    if (!triedToSubmit) triedToSubmit = true;

    checkFilledInputs();

    if (missingCondition || missingAction) return;

    if (editID) logicStore.modify(logic);
    else logicStore.add(logic);

    dispatch("cancel");

    console.log(logic);
  }

  function addCondition() {
    logic.conditions = [...logic.conditions, {}];
  }

  function addAction() {
    logic.actions = [...logic.actions, { clear: false }];
  }

  function removeCondition(e) {
    logic.conditions = logic.conditions.filter(
      condition => condition !== e.detail
    );
  }

  function removeAction(e) {
    logic.actions = logic.actions.filter(action => action !== e.detail);
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
    {#each logic.conditions as condition, index}
      <div transition:fade={{ duration: 250 }}>
        <ConditionsBlock
          {condition}
          {index}
          on:addcondition={addCondition}
          on:removecondition={removeCondition}
          on:inputchange={checkFilledInputs} />
      </div>
    {/each}

    <!-- Operator Select -->
    <div class="hflex-c-s my-8">

      {#if logic.conditions.length > 1}
        <label for="operator" class="bold">If</label>
        <select
          id="operator"
          name="Operator"
          class="input-field _w-auto mx-2 w-select"
          bind:value={logic.operator}>

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
    {#each logic.actions as action, index}
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
