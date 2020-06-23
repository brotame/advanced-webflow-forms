<script>
  //Svelte
  import { createEventDispatcher } from "svelte";

  // Exports
  export let action, index;

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
        <svg
          viewbox="0 0 448 448"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M416 176H272V32C272 14.33 257.67 0 240 0H208C190.33 0 176 14.33
            176 32V176H32C14.33 176 0 190.33 0 208V240C0 257.67 14.33 272 32
            272H176V416C176 433.67 190.33 448 208 448H240C257.67 448 272 433.67
            272 416V272H416C433.67 272 448 257.67 448 240V208C448 190.33 433.67
            176 416 176Z" />
        </svg>
      </div>
    </div>

    <!-- Remove Action -->
    {#if index !== 0}
      <div
        class="control-icon delete ml-4"
        on:click={() => dispatch('removeaction', action)}>
        <div class="small-icon ">
          <svg
            viewbox="0 0 448 96"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M416 0H32C14.33 0 0 14.33 0 32V64C0 81.67 14.33 96 32
              96H416C433.67 96 448 81.67 448 64V32C448 14.33 433.67 0 416 0Z" />
          </svg>
        </div>
      </div>
    {/if}

  </div>
</div>
