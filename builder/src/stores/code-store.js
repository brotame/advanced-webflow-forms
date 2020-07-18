// Imports
import { derived } from 'svelte/store';
import { logicExport } from './logic-store';
import stringifyObject from 'stringify-object';

const generatedCode = derived(logicExport, ($logicExport) => {
  const logicScript = `<script src="https://cdn.jsdelivr.net/gh/brotame/advanced-webflow-forms@master/conditional-logic/dist/logic.js"><\/script>`;

  const logicString = `new ConditionalLogic(${stringifyObject($logicExport, {
    inlineCharacterLimit: 99999,
  })});`;

  return `
    <!-- Advanced Forms Code -->
    ${logicScript}

    <!-- Advanced Forms Init -->
    <script>
    var Webflow = Webflow || [];
    Webflow.push(function () {
      ${logicString}
    )};
    <\/script>
    `;
});

export default generatedCode;
