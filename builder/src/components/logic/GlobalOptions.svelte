<script>
  // Store
  import { logicParams } from "../../stores/logic-store";
</script>

<div>
  <div class="bold mb-3">Global Options:</div>

  <!-- Submit Hidden Inputs -->
  <label class="w-checkbox mb-2">
    <input
      type="checkbox"
      id="submitHidden"
      name="Submit-Hidden"
      class="w-checkbox-input checkbox"
      bind:checked={$logicParams.submitHiddenInputs} />
    <span for="Submit Hidden" class="w-form-label">Submit hidden inputs</span>
  </label>

  <!-- Check Conditions On Load -->
  <label class="w-checkbox">
    <input
      type="checkbox"
      id="checkConditionsOnLoad"
      name="Check-Conditions-On-Load"
      class="w-checkbox-input checkbox"
      bind:checked={$logicParams.checkConditionsOnLoad} />
    <span for="Check Conditions On Load" class="w-form-label">
      Check conditions on load
    </span>
  </label>
</div>
