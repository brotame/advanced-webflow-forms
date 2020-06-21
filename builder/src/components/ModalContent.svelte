<script>
  // Svelte
  import { createEventDispatcher } from "svelte";

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
        <div class="modal-nav" class:hidden={index === 0}>
          <div class="icon mr-2">
            <svg
              viewbox="0 0 448 256"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M136.97 252.485L144.041 245.415C148.727 240.729 148.727
                233.131 144.041 228.444L60.113 145H436C442.627 145 448 139.627
                448 133V123C448 116.373 442.627 111 436 111H60.113L144.041
                27.556C148.727 22.87 148.727 15.272 144.041 10.585L136.97
                3.515C132.284 -1.171 124.686 -1.171 120 3.515L3.51499
                119.515C-1.17101 124.201 -1.17101 131.799 3.51499 136.486L120
                252.486C124.686 257.172 132.284 257.172 136.97 252.485Z" />
            </svg>
          </div>
          <div class="uppercase" on:click={() => dispatch('previous')}>
            Back
          </div>
        </div>
        <div class="modal-nav">
          <div class="uppercase mr-2" on:click={() => dispatch('next')}>
            {isLast ? 'Finish' : 'Next'}
          </div>
          {#if !isLast}
            <div class="icon">
              <svg
                viewbox="0 0 448 256"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M311.03 3.51501L303.959 10.585C299.273 15.271 299.273
                  22.869 303.959 27.556L387.887 111H12C5.373 111 0 116.373 0
                  123V133C0 139.627 5.373 145 12 145H387.887L303.959
                  228.444C299.273 233.13 299.273 240.728 303.959 245.415L311.03
                  252.485C315.716 257.171 323.314 257.171 328 252.485L444.485
                  136.485C449.171 131.799 449.171 124.201 444.485 119.514L328
                  3.51501C323.314 -1.17199 315.716 -1.17199 311.03 3.51501Z" />
              </svg>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Modal Close -->
    <div class="modal-close" on:click={() => dispatch('closemodal')}>
      <div class="_w-full vflex-str-c">
        <svg
          viewbox="0 0 512 512"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M353.047 256L498.604 110.444C516.465 92.5818 516.465 63.6218
            498.604 45.7455L466.255 13.3964C448.393 -4.46545 419.433 -4.46545
            401.556 13.3964L256 158.953L110.444 13.3964C92.5818 -4.46545 63.6218
            -4.46545 45.7455 13.3964L13.3964 45.7455C-4.46545 63.6073 -4.46545
            92.5673 13.3964 110.444L158.953 256L13.3964 401.556C-4.46545 419.418
            -4.46545 448.378 13.3964 466.255L45.7455 498.604C63.6073 516.465
            92.5818 516.465 110.444 498.604L256 353.047L401.556 498.604C419.418
            516.465 448.393 516.465 466.255 498.604L498.604 466.255C516.465
            448.393 516.465 419.433 498.604 401.556L353.047 256Z" />
        </svg>
      </div>
    </div>

    <!-- Modal Image -->
    <div class="vflex-str-c">
      <img src={image} alt={title} class="rounded-4" />
    </div>
  </div>
</div>
