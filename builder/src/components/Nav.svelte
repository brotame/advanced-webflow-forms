<script>
  // Routify
  import { url, isActive } from "@sveltech/routify";

  // Icons
  import Logo from "../icons/logo.svg";
  import IntroIcon from "../icons/intro-icon.svg";
  import MultiStepsIcon from "../icons/multi-steps-icon.svg";
  import ConditionalLogicIcon from "../icons/conditional-logic-icon.svg";
  import GenerateCodeIcon from "../icons/generate-code-icon.svg";
</script>

<header class="nav-wrap">
  <!-- Logo -->
  <a href="https://brota.me/" target="_blank" class="logo-wrap w-inline-block">
    <div class="logo">
      <Logo />
    </div>
  </a>

  <!-- Nav -->
  <nav class="nav">

    <!-- Intro Link -->
    <a
      aria-current={$isActive('./index') ? 'page' : undefined}
      href={$url('/')}
      class="nav-item w-inline-block"
      class:w--current={$isActive('./index')}>
      <div class="nav-icon">
        <IntroIcon />
      </div>
      <div class="nav-text">Intro</div>
    </a>

    <!-- Multi Steps Link -->
    <a
      aria-current={$isActive('./multi-steps') ? 'page' : undefined}
      href={$url('./multi-steps')}
      class="nav-item w-inline-block"
      class:w--current={$isActive('./multi-steps')}>
      <div class="nav-icon">
        <MultiStepsIcon />
      </div>
      <div class="nav-text">Multi Steps</div>
    </a>

    <!-- Conditional Logic Link -->
    <a
      aria-current={$isActive('./conditional-logic') ? 'page' : undefined}
      href={$url('./conditional-logic')}
      class="nav-item w-inline-block"
      class:w--current={$isActive('./conditional-logic')}>
      <div class="nav-icon">
        <ConditionalLogicIcon />
      </div>
      <div class="nav-text">Conditional Logic</div>
    </a>

    <!-- Generate Code Link -->
    <a
      aria-current={$isActive('./generate-code') ? 'page' : undefined}
      href={$url('./generate-code')}
      class="nav-item last w-inline-block"
      class:w--current={$isActive('./generate-code')}>
      <div class="nav-icon">
        <GenerateCodeIcon />
      </div>
      <div class="nav-text">Generate Code</div>
    </a>
  </nav>

  <!-- About Section -->
  <p class="nav-about">
    An
    <a href="https://github.com/brotame/advanced-webflow-forms" target="_blank">
      open source
    </a>
    project by
    <a href="https://webflow.com/alexiglesias" target="_blank">Alex Iglesias</a>
    .
  </p>
</header>
