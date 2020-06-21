<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

  // Store
  import logicStore from "../../stores/logic-store";

  // Imports
  import LogicBlock from "./LogicBlock.svelte";

  // Functions
  function deleteLogic(e) {
    logicStore.remove(e.detail);
  }

  const dispatch = createEventDispatcher();
</script>

<section class="section">
  <div class="container max-w-xl vflex-c-c center">
    <h1 class="mb-4">Conditional Logic</h1>
    <p class="mb-8">
      Here you can build all the conditions and actions that you want to add to
      the form.
    </p>
    <div class="hero-buttons">
      <div
        class="button w-button"
        on:click={() => {
          dispatch('openmodal');
        }}>
        Quick Intro
      </div>
      <a href="." class="button outline w-button">Watch Tutorials</a>
    </div>
  </div>
  <div class="container max-w-2xl">
    <div class="logic-block-divider my-12" />
    <div class="vflex-str-s">
      <div class="hflex-c-sb mb-8">
        <div class="new-button" on:click={() => dispatch('newLogic')}>
          <div class="small-icon mr-4">
            <svg
              viewbox="0 0 448 448"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M416 176H272V32C272 14.33 257.67 0 240 0H208C190.33 0 176
                14.33 176 32V176H32C14.33 176 0 190.33 0 208V240C0 257.67 14.33
                272 32 272H176V416C176 433.67 190.33 448 208 448H240C257.67 448
                272 433.67 272 416V272H416C433.67 272 448 257.67 448 240V208C448
                190.33 433.67 176 416 176Z" />
            </svg>
          </div>
          <div>Add New</div>
        </div>
        <div>
          <div class="bold mb-3">Global Options:</div>
          <label class="w-checkbox mb-2">
            <input
              type="checkbox"
              id="submitHidden"
              name="Submit-Hidden"
              data-name="Submit Hidden"
              class="w-checkbox-input checkbox" />
            <span for="Submit Hidden" class="w-form-label">
              Submit hidden inputs
            </span>
          </label>
          <label class="w-checkbox">
            <input
              type="checkbox"
              id="checkConditionsOnLoad"
              name="Check-Conditions-On-Load"
              data-name="Check Conditions On Load"
              class="w-checkbox-input checkbox" />
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
</section>
