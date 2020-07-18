<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

  // Icons
  import ModalCloseIcon from "../icons/modal-close-icon.svg";
  import BackIcon from "../icons/back-icon.svg";
  import NextIcon from "../icons/next-icon.svg";

  // Exports
  export let index, title, content, image;
  export let isLast;

  // Functions
  const dispatch = createEventDispatcher();
</script>

<style>
  .hidden {
    opacity: 0;
    pointer-events: none;
  }
</style>

<div class="modal-content-wrap">

  <div class="modal-content">

    <!-- Modal Content -->
    <div class="vflex-str-s">

      <!-- Title -->
      <h3 class="mb-2">{title}</h3>

      <!-- Divider -->
      <div class="logic-block-divider mb-4" />

      <!-- Text -->
      {@html content}

      <!-- Navigation -->
      <div class="hflex-c-sb mt-auto">

        <!-- Back Button -->
        <div class="modal-nav" class:hidden={index === 0}>
          <div class="icon mr-2">
            <BackIcon />
          </div>
          <div class="uppercase" on:click={() => dispatch('previous')}>
            Back
          </div>
        </div>

        <!-- Next / Finish Button -->
        <div class="modal-nav">
          <div class="uppercase mr-2" on:click={() => dispatch('next')}>
            {isLast ? 'Finish' : 'Next'}
          </div>
          {#if !isLast}
            <div class="icon">
              <NextIcon />
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Modal Close -->
    <div class="modal-close" on:click={() => dispatch('closemodal')}>
      <div class="_w-full vflex-str-c">
        <ModalCloseIcon />
      </div>
    </div>

    <!-- Modal Image -->
    <div class="vflex-str-c">
      <img src={image} alt={title} class="rounded-4" />
    </div>
  </div>
</div>
