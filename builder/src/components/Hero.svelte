<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

  // Exports
  export let title, subtitle, primaryText, secondaryText;

  // Functions
  const dispatch = createEventDispatcher();
</script>

<div class="container max-w-xl vflex-c-c center">

  <!-- Title -->
  <h1 class="mb-4">{title}</h1>

  <!-- Subtitle -->
  <p class="mb-8">
    {@html subtitle}
  </p>

  <!-- Hero Buttons -->
  <div class="hero-buttons">
    <div
      class="button w-button"
      on:click={() => {
        dispatch('primaryclick');
      }}>
      {primaryText}
    </div>
    <div
      class="button outline w-button"
      on:click={() => {
        dispatch('secondaryclick');
      }}>
      {secondaryText}
    </div>
  </div>
</div>
