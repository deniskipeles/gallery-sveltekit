<script>
  import { img_to_view_data, img_to_view_url, open_model } from "$lib/stores";
  import { Modal, Button } from "flowbite-svelte";

  export let closeModal;
</script>

<Modal
  title={$img_to_view_data?.caption}
  bind:open={$open_model}
  size="xl"
  autoclose
>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img src={$img_to_view_url} alt="no image available" />
  <Button class="w-full" on:click={closeModal}>Close</Button>
</Modal>
