<script>
  import { url } from "@sveltech/routify";
</script>

<div>
  <div>404</div>
  <div>
    Page not found.
    <!-- link to the parent folder of _fallback.svelte -->
    <a href={$url('/')}>Go back</a>
  </div>
</div>
