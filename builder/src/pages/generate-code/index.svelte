<script>
  // Imports
  import stringifyObject from "stringify-object";

  // Stores
  import logicStore, {
    logicParams,
    logicExport
  } from "../../stores/logic-store";

  // Components
  import Hero from "../../components/Hero.svelte";
  import CodeBox from "../../components/code/CodeBox.svelte";

  //Variables
  let generatedCode = `
  <script>
  var Webflow = Webflow || [];
  Webflow.push(function () {
    var conditionalLogic = new ConditionalLogic(${stringifyObject(
      $logicExport,
      {
        inlineCharacterLimit: 9999
      }
    )});
    conditionalLogic.init();
  )};
  <\/script>
  `;
  let logicExists = $logicStore.length > 0 ? true : false;

  // Functions
  console.log($logicExport);
</script>

<section class="section">
  <Hero
    title="Generate the code!"
    subtitle={`All you have to do is copy and paste it in the <b>before &lt;/body&gt; tag</b> of the page that contains your form.`}
    primaryText="Minified code"
    secondaryText="Unminified code" />
</section>

<section class="section">
  <CodeBox>{generatedCode}</CodeBox>
</section>
