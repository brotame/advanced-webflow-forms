<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<div class="page-wrap">
  <Nav {segment} />
  <main class="main">
    <slot />
  </main>
</div>
