<script>
  //Svelte
  import { createEventDispatcher } from "svelte";

  // Exports
  export let condition, index;

  // Icons
  import AddIcon from "../../icons/add-icon.svg";
  import RemoveIcon from "../../icons/remove-icon.svg";

  // Variables
  const types = [
    {
      name: "Plain / Textarea Field",
      value: "text"
    },
    {
      name: "Email Field",
      value: "email"
    },
    {
      name: "Password Field",
      value: "password"
    },
    {
      name: "Phone Field",
      value: "phone"
    },
    {
      name: "Number Field",
      value: "number"
    },
    {
      name: "Select Field",
      value: "select"
    },
    {
      name: "Checkbox",
      value: "checkbox"
    },
    {
      name: "Radio Group",
      value: "radios"
    }
  ];

  const operators = [
    {
      name: "Be Equal To",
      value: "equal",
      compatibleTypes: [
        "text",
        "email",
        "password",
        "phone",
        "number",
        "select",
        "radios"
      ]
    },
    {
      name: "Not Be Equal To",
      value: "not-equal",
      compatibleTypes: [
        "text",
        "email",
        "password",
        "phone",
        "number",
        "select",
        "radios"
      ]
    },
    {
      name: "Contain",
      value: "contain",
      compatibleTypes: [
        "text",
        "email",
        "password",
        "phone",
        "number",
        "select",
        "radios"
      ]
    },
    {
      name: "Not Contain",
      value: "not-contain",
      compatibleTypes: [
        "text",
        "email",
        "password",
        "phone",
        "number",
        "select",
        "radios"
      ]
    },
    {
      name: "Be Empty",
      value: "empty",
      compatibleTypes: [
        "text",
        "email",
        "password",
        "phone",
        "number",
        "select",
        "radios"
      ]
    },
    {
      name: "Be Filled",
      value: "filled",
      compatibleTypes: [
        "text",
        "email",
        "password",
        "phone",
        "number",
        "select",
        "radios"
      ]
    },
    {
      name: "Be Greater Than",
      value: "greater",
      compatibleTypes: ["number"]
    },
    {
      name: "Be Greater or Equal Than",
      value: "greater-equal",
      compatibleTypes: ["number"]
    },
    {
      name: "Be Less Than",
      value: "less",
      compatibleTypes: ["number"]
    },
    {
      name: "Be Less or Equal Than",
      value: "greater-equal",
      compatibleTypes: ["number"]
    },
    {
      name: "Be Checked",
      value: "checked",
      compatibleTypes: ["checkbox"]
    },
    {
      name: "Not Be Checked",
      value: "not-checked",
      compatibleTypes: ["checkbox"]
    }
  ];

  // Reactive
  $: if (
    condition.operator === "empty" ||
    condition.operator === "filled" ||
    condition.type === "checkbox"
  )
    delete condition.value;

  $: filteredOperators = operators.filter(operator =>
    operator.compatibleTypes.includes(condition.type)
  );

  // Functions
  const dispatch = createEventDispatcher();

  function resetOperator() {
    condition.operator = "";
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
            resetOperator();
            dispatch('inputchange');
          }}>

          {#each types as type}
            <option value={type.value}>{type.name}</option>
          {/each}
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
          bind:value={condition.selector}
          on:input={() => {
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

          <option value="" disabled>-- Choose Operator --</option>
          {#each filteredOperators as operator (operator.name)}
            <option value={operator.value}>{operator.name}</option>
          {/each}
        </select>
      </div>

      <!-- Value Input -->
      {#if condition.type !== 'checkbox' && condition.operator !== 'empty' && condition.operator !== 'filled'}
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
      {/if}

    </div>
  </div>

  <!-- Condition Controls -->
  <div>

    <!-- Add Condition -->
    <div
      class="control-icon add ml-4 mb-4"
      on:click={() => dispatch('addcondition')}>
      <div class="small-icon ">
        <AddIcon />
      </div>
    </div>

    <!-- Remove Condition -->
    {#if index !== 0}
      <div
        class="control-icon delete ml-4"
        on:click={() => dispatch('removecondition', condition)}>
        <div class="small-icon ">
          <RemoveIcon />
        </div>
      </div>
    {/if}
  </div>
</div>
