<script>
  // Imports
  import stringifyObject from "stringify-object";

  // Stores
  import generatedCode from "../../stores/code-store";

  // Components
  import Hero from "../../components/Hero.svelte";
  import CodeBox from "../../components/code/CodeBox.svelte";
</script>

<section class="section">
  <Hero
    title="Generate the code!"
    subtitle={`All you have to do is copy and paste it in the <b>before &lt;/body&gt; tag</b> of the page that contains your form.`}
    primaryText="Minified code"
    secondaryText="Unminified code" />
</section>

<section class="section">
  <CodeBox>{$generatedCode}</CodeBox>
</section>
