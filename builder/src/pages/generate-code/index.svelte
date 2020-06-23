<script>
  // Stores
  import logicStore, {
    logicParams,
    logicExport
  } from "../../stores/logic-store";

  // Components
  import Hero from "../../components/Hero.svelte";
  import CodeBox from "../../components/code/CodeBox.svelte";

  //Variables
  let generatedCode = $logicExport;
  let logicExists = $logicStore.length > 0 ? true : false;

  // Functions
</script>

<section class="section">
  <Hero
    title="Generate the code!"
    subtitle={`All you have to do is copy and paste it in the <b>before &lt;/body&gt; tag</b> of the page that contains your form.`}
    primaryText="Minified code"
    secondaryText="Unminified code" />
</section>

<section class="section">
  <CodeBox>{JSON.stringify(generatedCode)}</CodeBox>
</section>
