<script>
  // Imports
  import introSlides from "./introSlides";

  // Svelte
  import { setContext } from "svelte";
  import { fade } from "svelte/transition";

  // Store
  import logicStore from "../../stores/logic-store";

  // Components
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

  // Conext
  setContext("edit", editLogic);

  console.log(introSlides);
</script>

<svelte:head>
  <title>Conditional Logic</title>
</svelte:head>

{#if editMode}
  <div>
    <LogicEditor on:cancel={cancelEdit} {editID} />
  </div>
{:else}
  <LogicList
    on:newLogic={newLogic}
    on:openmodal={() => {
      showModal = true;
    }} />
{/if}

{#if showModal}
  <div transition:fade={{ duration: 100 }}>
    <Modal
      on:closemodal={() => {
        showModal = false;
      }}>

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
