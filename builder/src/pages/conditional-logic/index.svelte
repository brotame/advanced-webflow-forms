<script>
  // Imports
  import introSlides from "./introSlides";

  // Svelte
  import { setContext } from "svelte";
  import { fade } from "svelte/transition";

  // Store
  import logicStore from "../../stores/logic-store";

  // Components
  import Hero from "../../components/Hero.svelte";
  import Modal from "../../components/Modal.svelte";
  import ModalContent from "../../components/ModalContent.svelte";
  import LogicList from "../../components/logic/LogicList.svelte";
  import LogicEditor from "../../components/logic/LogicEditor.svelte";

  // Variables
  let editMode,
    editID,
    showModal,
    currentModalSlide = 0;

  // Functions
  function newLogic() {
    editMode = "new";
  }

  function editLogic(id) {
    editMode = true;
    editID = id;
  }

  function cancelEdit() {
    editMode = null;
    editID = null;
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    currentModalSlide = 0;
  }

  function nextModal() {
    currentModalSlide += 1;
  }

  function previousModal() {
    currentModalSlide -= 1;
  }

  // Context
  setContext("edit", editLogic);
</script>

<!-- Head -->
<svelte:head>
  <title>Conditional Logic</title>
</svelte:head>

<!-- Logic Editor -->
{#if editMode}
  <section class="section min-h-screen" transition:fade={{ duration: 250 }}>
    <LogicEditor on:cancel={cancelEdit} {editID} />
  </section>

  <!-- Main Content -->
{:else}
  <section class="section" transition:fade={{ duration: 250 }}>

    <!-- Hero -->
    <Hero
      title="Conditional Logic"
      subtitle="Here you can build all the conditions and actions that you want
      to add to the form."
      primaryText="Quick Intro"
      secondaryText="Watch Tutorials"
      on:primaryclick={openModal} />

    <!-- Logic List -->
    <LogicList on:newLogic={newLogic} />
  </section>
{/if}

<!-- Modal -->
{#if showModal}
  <div transition:fade={{ duration: 100 }}>
    <Modal on:closemodal={closeModal}>

      <ModalContent
        {...introSlides[currentModalSlide]}
        index={currentModalSlide}
        isLast={currentModalSlide === introSlides.length - 1}
        on:closemodal={closeModal}
        on:previous={previousModal}
        on:next={() => {
          if (currentModalSlide === introSlides.length - 1) closeModal();
          else nextModal();
        }} />

    </Modal>
  </div>
{/if}
