<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

  // Functions
  const dispatch = createEventDispatcher();
</script>

<style>
  .modal-overlay {
    backdrop-filter: blur(0.5rem);
  }
</style>

<div class="modal">
  <slot />
  <div class="modal-overlay" on:click={() => dispatch('closemodal')} />
</div>
