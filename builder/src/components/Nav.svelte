<script>
  // Routify
  import { url, isActive } from "@sveltech/routify";
</script>

<header class="nav-wrap">
  <a href="https://brota.me/" target="_blank" class="logo-wrap w-inline-block">
    <div class="logo w-embed">
      <svg
        viewbox="0 0 128 128"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M93.1648 128H20.2534C9.088 128 0 118.912 0 107.747V20.2534C0 9.088
          9.088 0 20.2534 0H93.1648C112.372 0 128 15.6262 128 34.8352C128
          47.0259 121.706 57.7741 112.197 64C121.706 70.2259 128 80.9741 128
          93.1648C128 112.374 112.372 128 93.1648 128ZM20.2534 11.3421C17.8908
          11.3448 15.6258 12.2845 13.9552 13.9552C12.2845 15.6258 11.3448
          17.8908 11.3421 20.2534V107.747C11.3448 110.109 12.2845 112.374
          13.9552 114.045C15.6258 115.715 17.8908 116.655 20.2534
          116.658H93.1648C106.118 116.658 116.658 106.118 116.658
          93.1648C116.658 81.9648 108.782 72.5709 98.2771 70.231C95.3318 86.4768
          81.0816 98.8352 64 98.8352C62.4961 98.8352 61.0538 98.2378 59.9904
          97.1744C58.927 96.111 58.3296 94.6687 58.3296 93.1648C58.3296 80.9741
          64.6221 70.2259 74.1325 64C64.6221 57.7741 58.3296 47.0259 58.3296
          34.8352C58.3296 33.3313 58.927 31.889 59.9904 30.8256C61.0538 29.7622
          62.4961 29.1648 64 29.1648C81.0816 29.1648 95.3318 41.5232 98.2771
          57.769C108.782 55.4291 116.658 46.0352 116.658 34.8352C116.658 21.8816
          106.118 11.3421 93.1648 11.3421H20.2534ZM86.5446 70.6202C82.7734
          71.737 79.3411 73.7788 76.56 76.56C73.7788 79.3411 71.737 82.7734
          70.6202 86.5446C74.3913 85.4276 77.8235 83.3857 80.6046
          80.6046C83.3857 77.8235 85.4276 74.3913 86.5446 70.6202ZM70.6202
          41.4554C71.737 45.2266 73.7788 48.6589 76.56 51.4401C79.3411 54.2212
          82.7734 56.263 86.5446 57.3798C85.4276 53.6087 83.3857 50.1765 80.6046
          47.3954C77.8235 44.6143 74.3913 42.5724 70.6202 41.4554Z" />
      </svg>
    </div>
  </a>
  <nav class="nav">
    <a
      aria-current={$isActive('./index') ? 'page' : undefined}
      href={$url('/')}
      class="nav-item w-inline-block"
      class:w--current={$isActive('./index')}>
      <div class="nav-icon w-embed">
        <svg
          viewbox="0 0 34 30"
          stroke="currentColor"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.800049 5.8H32.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M29.8 28.8H3.80005C2.10005 28.8 0.800049 27.5 0.800049
            25.8V3.8C0.800049 2.1 2.10005 0.800003 3.80005 0.800003H29.8C31.5
            0.800003 32.8 2.1 32.8 3.8V25.8C32.8 27.4 31.4 28.8 29.8 28.8Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M14.8 20.8H5.80005V24.8H14.8V20.8Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M27.8 9.8H5.80005V16.8H27.8V9.8Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M17.8 20.8H27.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M17.8 24.8H27.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
      <div class="nav-text">Intro</div>
    </a>
    <a
      aria-current={$isActive('./multi-steps') ? 'page' : undefined}
      href={$url('./multi-steps')}
      class="nav-item w-inline-block"
      class:w--current={$isActive('./multi-steps')}>
      <div class="nav-icon w-embed">
        <svg
          viewbox="0 0 42 34"
          stroke="currentColor"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.800049 27.7H8.80005"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M8.80005 24.8H0.800049V32.8H8.80005V24.8Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M16.8 27.7H24.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M24.8 24.8H16.8V32.8H24.8V24.8Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M32.8 27.7H40.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M40.8 24.8H32.8V32.8H40.8V24.8Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M20.8 19.8V24.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M10.6 17.6L6.49995 19.9C5.39995 20.5 4.69995 21.7 4.69995 23V24.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M30.9001 17.6L35.0001 19.9C36.1001 20.5 36.8001 21.7 36.8001
            23V24.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M21.2001 11.8C18.1001 12 16.6001 8.4 19.0001 6.4C19.4001 6.1
            19.9001 5.9 20.4001 5.8C23.5001 5.6 25.0001 9.2 22.6001 11.2C22.2001
            11.5 21.7001 11.7 21.2001 11.8Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M27.2 7.2C27 6.5 26.7 5.8 26.4 5.2L27.2 3.9L25.6 2.3L24.3
            3.1C23.7 2.7 23 2.4 22.3 2.3L21.9 0.800003H19.6L19.2 2.3C18.5 2.5
            17.8 2.8 17.2 3.1L15.9 2.3L14.3 3.9L15.1 5.2C14.7 5.8 14.4 6.5 14.3
            7.2L12.8 7.6V9.9L14.3 10.3C14.5 11 14.8 11.7 15.1 12.3L14.3
            13.6L15.9 15.2L17.2 14.4C17.8 14.8 18.5 15.1 19.2 15.2L19.6
            16.7H21.9L22.3 15.2C23 15 23.7 14.7 24.3 14.4L25.6 15.2L27.2
            13.6L26.4 12.3C26.8 11.7 27.1 11 27.2 10.3L28.7 9.9V7.6L27.2 7.2Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
      <div class="nav-text">Multi Steps</div>
    </a>
    <a
      aria-current={$isActive('./conditional-logic') ? 'page' : undefined}
      href={$url('./conditional-logic')}
      class="nav-item w-inline-block"
      class:w--current={$isActive('./conditional-logic')}>
      <div class="nav-icon w-embed">
        <svg
          viewbox="0 0 38 38"
          stroke="currentColor"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.5 6H13.5C12.1 6 11 4.9 11 3.5C11 2.1 12.1 1 13.5 1H21.5C22.9
            1 24 2.1 24 3.5C24 4.8 22.8 6 21.5 6Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M18 26V28"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M8 17H6C3.8 17 2 18.8 2 21C2 23.2 3.8 25 6 25H33V28"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M27 3H33V11"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M17.6999 13.9L22.9999 17L17.6999 20L12.3999 17L17.6999 13.9Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M18 8V11"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M36 14H29V19H36V14Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M30 34C30 32.3 31.3 31 33 31C34.7 31 36 32.3 36 34C36 35.7 34.7
            37 33 37C31.3 37 30 35.6 30 34Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M18 37C16.3 37 15 35.7 15 34C15 32.3 16.3 31 18 31C19.7 31 21
            32.3 21 34C21 35.6 19.6 37 18 37Z"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
      <div class="nav-text">Conditional Logic</div>
    </a>
    <a
      aria-current={$isActive('./generate-code') ? 'page' : undefined}
      href={$url('./generate-code')}
      class="nav-item last w-inline-block"
      class:w--current={$isActive('./generate-code')}>
      <div class="nav-icon w-embed">
        <svg
          viewbox="0 0 34 30"
          stroke="currentColor"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.800049 5.8H32.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M6.80005 15.8L4.80005 13.8L6.80005 11.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M14.8 11.8L16.8 13.8L14.8 15.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M11.8 9.8L9.80005 17.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M16.8 28.8H3.80005C2.10005 28.8 0.800049 27.5 0.800049
            25.8V3.8C0.800049 2.1 2.10005 0.800003 3.80005 0.800003H29.8C31.5
            0.800003 32.8 2.1 32.8 3.8V12.8"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M28.2001 16.9C26.2001 16.4 24.0001 16.9 22.5001 18.5C20.2001 20.8
            20.2001 24.6 22.5001 27L24.2001 25.3"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
          <path
            d="M25.1001 28.5C27.1001 29.1 29.4001 28.6 31.0001 27C33.3001 24.7
            33.3001 20.9 31.0001 18.5L29.3001 20.2"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </div>
      <div class="nav-text">Generate Code</div>
    </a>
  </nav>
  <p class="nav-about">
    An
    <a href="https://github.com/brotame/advanced-webflow-forms" target="_blank">
      open source
    </a>
    project by
    <a href="https://webflow.com/alexiglesias" target="_blank">Alex Iglesias</a>
    .
  </p>
</header>
