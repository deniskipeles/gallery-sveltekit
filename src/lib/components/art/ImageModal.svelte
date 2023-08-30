<script>
  import { img_to_view_data, img_to_view_url, open_model } from "$lib/stores";
  import { Modal, Button, Card } from "flowbite-svelte";

  export let closeModal;
</script>

<Modal
  title={$img_to_view_data?.caption}
  bind:open={$open_model}
  size="xl"
  autoclose
>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img class="" src={$img_to_view_url} alt="no image available" />
  <div class="text-lg">
    <!-- svelte-ignore a11y-missing-content -->
    <a href={$img_to_view_url} target="_blank" rel="noopener noreferrer">
      <p class="w-1/2 truncate">
        {$img_to_view_url?.split("/").pop()}
      </p>
    </a>
  </div>
  <Button class="w-full" on:click={closeModal}>Close</Button>
</Modal>
