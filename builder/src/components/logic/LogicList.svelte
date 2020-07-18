<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

  // Store
  import logicStore, { logicParams } from "../../stores/logic-store";

  // Imports
  import LogicBlock from "./LogicBlock.svelte";

  // Icons
  import AddIcon from "../../icons/add-icon.svg";

  // Functions
  function deleteLogic(e) {
    logicStore.remove(e.detail);
  }

  const dispatch = createEventDispatcher();
</script>

<div class="container max-w-2xl">
  <div class="logic-block-divider my-12" />
  <div class="vflex-str-s">
    <div class="hflex-c-sb mb-8">

      <!-- New Logic Button -->
      <div class="new-button" on:click={() => dispatch('newLogic')}>
        <div class="small-icon mr-4">
          <AddIcon />
        </div>
        <div>Add New</div>
      </div>

      <!-- Global Options -->
      <div>
        <div class="bold mb-3">Global Options:</div>

        <!-- Submit Hidden Inputs -->
        <label class="w-checkbox mb-2">
          <input
            type="checkbox"
            id="submitHidden"
            name="Submit-Hidden"
            class="w-checkbox-input checkbox"
            bind:checked={$logicParams.submitHiddenInputs} />
          <span for="Submit Hidden" class="w-form-label">
            Submit hidden inputs
          </span>
        </label>

        <!-- Check Conditions On Load -->
        <label class="w-checkbox">
          <input
            type="checkbox"
            id="checkConditionsOnLoad"
            name="Check-Conditions-On-Load"
            class="w-checkbox-input checkbox"
            bind:checked={$logicParams.checkConditionsOnLoad} />
          <span for="Check Conditions On Load" class="w-form-label">
            Check conditions on load
          </span>
        </label>
      </div>
    </div>

    {#each $logicStore as logic, index (logic.id)}
      <LogicBlock {...logic} {index} on:delete={deleteLogic} />
    {/each}
  </div>
</div>
