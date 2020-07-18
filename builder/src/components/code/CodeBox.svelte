<script>
  // ClipboardJS
  import Clipboard from "clipboard";

  // Icons
  import CopyIcon from "../../icons/copy-icon.svg";

  // Functions
  function copyToClipboard(node) {
    new Clipboard(node);
  }
</script>

<svelte:head>
  <link rel="stylesheet" href="/prism.css" />
  <script src="/prism.js">

  </script>
</svelte:head>

<div class="container max-w-2xl">

  <!-- Code Wrap -->
  <div class="code-wrap">

    <!-- Code -->
    <pre>
      <code id="generated-code" class="language-markup">
        <slot />
      </code>
    </pre>

    <!-- Copy Button -->
    <div
      class="control-icon copy"
      data-clipboard-target="#generated-code"
      use:copyToClipboard>
      <div class="small-icon w-embed">
        <CopyIcon />
      </div>
    </div>

  </div>
</div>
