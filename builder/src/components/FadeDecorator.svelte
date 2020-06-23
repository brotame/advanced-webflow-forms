<script>
  // Svelte
  import { fade } from "svelte/transition";
  import { onDestroy, onMount, beforeUpdate, afterUpdate } from "svelte";

  // Helpers
  import { enableScroll, disableScroll } from "../helpers";

  beforeUpdate(() => {
    disableScroll();

    setTimeout(() => {
      enableScroll();
    }, 500);
  });
</script>

<div transition:fade={{ duration: 250, delay: 250 }} class="content-wrap">
  <slot />
</div>
