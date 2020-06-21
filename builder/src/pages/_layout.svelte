<script>
  // Components
  import Nav from "../components/Nav.svelte";
  import FadeDecorator from "../components/FadeDecorator.svelte";
</script>

<div class="page-wrap">
  <Nav />
  <main class="main">
    <slot decorator={FadeDecorator} />
  </main>
</div>
