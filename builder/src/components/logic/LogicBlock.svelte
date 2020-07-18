<script>
  // Svelte
  import { createEventDispatcher } from "svelte";
  import { getContext } from "svelte";

  // Icons
  import EditIcon from "../../icons/edit-icon.svg";
  import TrashIcon from "../../icons/trash-icon.svg";

  // Exports
  export let index, id, conditions, operator, actions;

  // Functions
  const dispatch = createEventDispatcher();
  const editLogic = getContext("edit");

  function convertOperator(operator) {
    if (operator === "equal") return "is equal to";
    if (operator === "not-equal") return "is not equal to";
    if (operator === "contain") return "contains";
    if (operator === "not-contain") return "does not contain";
    if (operator === "greater") return "is greater than";
    if (operator === "greater-equal") return "is greater or equal to";
    if (operator === "less") return "is less than";
    if (operator === "less-equal") return "is less or equal to";
    if (operator === "empty") return "is empty";
    if (operator === "filled") return "is filled";
    if (operator === "checked") return "is checked";
    if (operator === "not-checked") return "is not checked";
  }
</script>

<div class="logic-block mb-4">

  <!-- Logic Number -->
  <div class="logic-number">{index + 1}</div>

  <!-- Logic Info -->
  <div class="logic-info">

    <!-- Conditions -->
    {#each conditions as condition, index}
      <div class="mb-2">
        <strong class="capitalize">{index === 0 ? 'If' : operator}</strong>
        {condition.selector}
        <span class="sea-green">{convertOperator(condition.operator)}</span>
        {#if condition.value}{condition.value}{/if}
      </div>
    {/each}

    <!-- Divider -->
    <div class="logic-block-divider my-3" />

    <!-- Actions -->
    {#each actions as action, index}
      <div class={index < actions.length - 1 ? 'mb-2' : ''}>
        <span class="sea-green capitalize">{action.action}</span>
        {action.selector} {action.clear ? 'and clear its value' : ''}
      </div>
    {/each}
  </div>

  <!-- Logic Controls -->
  <div class="logic-controls">

    <!-- Edit -->
    <div class="logic-control edit" on:click={() => editLogic(id)}>
      <EditIcon />
    </div>

    <!-- Delete -->
    <div class="logic-control delete" on:click={() => dispatch('delete', id)}>
      <TrashIcon />
    </div>
  </div>
</div>
