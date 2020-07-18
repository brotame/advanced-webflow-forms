<script>
  //Svelte
  import { createEventDispatcher } from "svelte";

  // Exports
  export let action, index;

  // Icons
  import AddIcon from "../../icons/add-icon.svg";
  import RemoveIcon from "../../icons/remove-icon.svg";

  // Functions
  const dispatch = createEventDispatcher();

  console.log(action);
</script>

<div class="hflex-c-s mb-4">
  <div class="logic-block">
    <div class="action-grid">

      <!-- Trigger Select -->
      <div class="hflex-c-s">
        <label for={`action-${index}`} class="mr-2">Trigger</label>
        <select
          id={`action-${index}`}
          name="Action"
          class="input-field flex-grow w-select"
          bind:value={action.action}
          on:input={() => {
            dispatch('inputchange');
          }}>
          <option value="show">Show</option>
          <option value="hide">Hide</option>
          <option value="enable">Enable</option>
          <option value="disable">Disable</option>
          <option value="require">Require</option>
          <option value="unrequire">Unrequire</option>
          <option value="custom">Custom Interaction</option>
        </select>
      </div>

      <!-- Selector Input -->
      <div class="hflex-c-s">
        <label for={`action-selector-${index}`} class="mr-2">
          on the element with an ID of
        </label>
        <input
          type="text"
          class="input-field flex-grow w-input"
          maxlength="256"
          name="Action Selector"
          placeholder="your-target"
          id={`action-selector-${index}`}
          bind:value={action.selector}
          on:input={() => {
            dispatch('inputchange');
          }} />
      </div>

      <!-- Clear Check -->
      <label class="w-checkbox">
        <input
          type="checkbox"
          id={`clear-${index}`}
          name="Clear Action Target"
          class="w-checkbox-input checkbox"
          bind:checked={action.clear} />
        <span class="w-form-label">And clear its value</span>
      </label>
    </div>
  </div>

  <!-- Action Controls -->
  <div>

    <!-- Add Action -->
    <div
      class="control-icon add ml-4 mb-4"
      on:click={() => dispatch('addaction')}>
      <div class="small-icon ">
        <AddIcon />
      </div>
    </div>

    <!-- Remove Action -->
    {#if index !== 0}
      <div
        class="control-icon delete ml-4"
        on:click={() => dispatch('removeaction', action)}>
        <div class="small-icon ">
          <RemoveIcon />
        </div>
      </div>
    {/if}

  </div>
</div>
