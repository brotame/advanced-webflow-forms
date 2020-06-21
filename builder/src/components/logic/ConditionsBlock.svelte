<script>
  //Svelte
  import { createEventDispatcher } from "svelte";

  // Exports
  export let condition, index;

  // Functions
  const dispatch = createEventDispatcher();

  function updateSelector() {
    if (!condition.selectorString) return;

    condition.selector =
      condition.type === "radios"
        ? `input[name="${condition.selectorString}"]:checked`
        : `#${condition.selectorString}`;
  }
</script>

<div class="hflex-c-s mb-4">
  <div class="logic-block">
    <div class="condition-grid">

      <!-- Type Select -->
      <div class="hflex-c-s">
        <label for={`type-${index}`} class="mr-2">The</label>
        <select
          id={`type-${index}`}
          name="Condition Origin Type"
          class="input-field flex-grow w-select"
          bind:value={condition.type}
          on:input={() => {
            updateSelector();
            dispatch('inputchange');
          }}>
          <option value="text">Plain / Textarea Field</option>
          <option value="email">Email Field</option>
          <option value="password">Password Field</option>
          <option value="phone">Phone Field</option>
          <option value="number">Number Field</option>
          <option value="select">Select Field</option>
          <option value="checkbox">Checkbox</option>
          <option value="radios">Radio Group</option>
        </select>
      </div>

      <!-- Selector Input -->
      <div class="hflex-c-s">
        <label for={`selector-${index}`} class="mr-2">
          {condition.type === 'radios' ? 'which Group Name is' : 'which ID is'}
        </label>
        <input
          type="text"
          class="input-field flex-grow w-input"
          maxlength="256"
          name="Condition Selector"
          placeholder="your-element"
          id={`selector-${index}`}
          bind:value={condition.selectorString}
          on:input={() => {
            updateSelector();
            dispatch('inputchange');
          }} />
      </div>

      <!-- Condition Operator Select -->
      <div class="hflex-c-s">
        <label for={`operator-${index}`} class="mr-2">must</label>
        <select
          id={`operator-${index}`}
          name="Condition Operator"
          class="input-field flex-grow w-select"
          bind:value={condition.operator}
          on:input={() => {
            dispatch('inputchange');
          }}>
          <option value="equal">Be Equal To</option>
          <option value="not-equal">Not Be Equal To</option>
          <option value="contain">Contain</option>
          <option value="not-contain">Not Contain</option>
          <option value="greater">Be Greater Than</option>
          <option value="select">Be Greater or Equal Than</option>
          <option value="less">Be Less Than</option>
          <option value="less-equal">Be Less or Equal Than</option>
          <option value="empty">Be Empty</option>
          <option value="filled">Be Filled</option>
          <option value="checked">Be Checked</option>
          <option value="not-checked">Not Be Checked</option>
        </select>
      </div>

      <!-- Value Input -->
      <div class="hflex-c-s">
        <label for={`value-${index}`} class="mr-2">the value</label>
        <input
          type="text"
          class="input-field flex-grow w-input"
          maxlength="256"
          name="Condition Value"
          placeholder="Your Value"
          id={`value-${index}`}
          bind:value={condition.value}
          on:input={() => {
            dispatch('inputchange');
          }} />
      </div>
    </div>
  </div>

  <!-- Condition Controls -->
  <div>

    <!-- Add Condition -->
    <div
      class="control-icon add ml-4 mb-4"
      on:click={() => dispatch('addcondition')}>
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

    <!-- Remove Condition -->
    {#if index !== 0}
      <div
        class="control-icon delete ml-4"
        on:click={() => dispatch('removecondition', index)}>
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
