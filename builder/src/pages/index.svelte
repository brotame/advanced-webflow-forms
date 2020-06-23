<script>
  // Routify
  import { url, goto } from "@sveltech/routify";

  // Components
  import Hero from "../components/Hero.svelte";

  // Functions
  function startBuilder() {
    $goto("/conditional-logic");
  }
</script>

<section class="section">
  <Hero
    title="Webflow Advanced Forms"
    subtitle="This is a beta version of the builder for testing purposes. The
    Multi Steps builder is not ready yet, but you can start playing around with
    the Conditional Logic."
    primaryText="Get Started!"
    secondaryText="Watch Tutorials"
    on:primaryclick={startBuilder} />
</section>
