<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

  // Store
  import logicStore from "../../stores/logic-store";

  // Imports
  import LogicBlock from "./LogicBlock.svelte";
  import GlobalOptions from "./GlobalOptions.svelte";

  // Icons
  import AddIcon from "../../icons/add-icon.svg";

  // Functions
  function deleteLogic(e) {
    logicStore.remove(e.detail);
  }

  const dispatch = createEventDispatcher();
</script>

<div class="container max-w-2xl">

  <!-- Divider -->
  <div class="logic-block-divider my-12" />

  <!-- Content -->
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
      <GlobalOptions />
    </div>

    {#each $logicStore as logic, index (logic.id)}
      <LogicBlock {...logic} {index} on:delete={deleteLogic} />
    {/each}
  </div>
</div>
