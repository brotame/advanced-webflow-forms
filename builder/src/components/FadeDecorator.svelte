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
    }, 400);
  });
</script>

<div transition:fade={{ duration: 200, delay: 200 }} class="content-wrap">
  <slot />
</div>
