<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { pb } from "$lib/pocketbase";
  import { img_to_view_data, img_to_view_url, open_model } from "$lib/stores";
  import { serializeNonPOJOs } from "$lib/tools";
  import ImageModal from "./ImageModal.svelte";

  export let imageUrl;
  export let caption;
  export let image;
  export let key;
  export let updateData;

  async function removeImage() {
    try {
      const photos = [];
      photos.push(image?.photos[key]);
      // console.log(image?.id,photos);
      let record = await pb.collection("arts").update(image?.id, {
        "photos-": photos,
      });
      record = serializeNonPOJOs(record);
      await updateData(record);
    } catch (error) {
      console.log(error);
    }
  }

  function openModal() {
    if (
      image?.photos?.length > 1 &&
      !$page.url?.pathname?.startsWith("/arts/")
    ) {
      goto(`/arts/${image?.id}`, { replaceState: false });
    } else {
      let img = image?.photos
        ? pb.files.getUrl(image, image?.photos[key], {
            //   thumb: "100x100",
          })
        : "/images/img1.jpg";
      img_to_view_url.set(img);
      // open_model.set(true);
      img_to_view_data.set(image);
    }
  }

  function closeModal() {
    // img_to_view_url.set("");
    open_model.set(false);
    img_to_view_data.set({});
  }

  let isLoading = true;

  function handleImageLoad() {
    isLoading = false;
  }

  function handleImageError() {
    isLoading = false;
    // Handle the error (e.g., display an error message).
  }
</script>

<div class="relative">
  {#if isLoading}
    <div
      role="status"
      class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex items-center"
    >
      <div
        class="flex items-center justify-center w-full h-72 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
      >
        <svg
          class="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
          />
        </svg>
      </div>
    </div>
  {/if}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    on:load={handleImageLoad}
    on:error={handleImageError}
    src={imageUrl}
    alt={caption}
    on:click={openModal}
    class="cursor-pointer h-auto w-full rounded-lg"
  />
  {#if $page?.url?.pathname?.startsWith("/arts/")}
    <!-- content here -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="remove-button" on:click={removeImage}>X</div>
  {/if}
  <div
    class="absolute bottom-0 bg-black bg-opacity-50 w-full p-2 text-white text-center"
  >
    {caption}
  </div>
  <ImageModal {closeModal} />
</div>

<style>
  .remove-button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 4px;
    border-radius: 50%;
    font-size: 16px;
    cursor: pointer;
  }

  .remove-button:hover {
    background-color: rgb(241, 52, 52);
  }
</style>
