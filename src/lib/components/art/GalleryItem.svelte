<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { pb } from "$lib/pocketbase";
  import { img_to_view_data, img_to_view_url, open_model } from "$lib/stores";
  import ImageModal from "./ImageModal.svelte";

  export let imageUrl;
  export let caption;
  export let image;
  export let key;

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
      open_model.set(true);
      img_to_view_data.set(image);
    }
  }

  function closeModal() {
    img_to_view_url.set("");
    open_model.set(false);
    img_to_view_data.set({});
  }
</script>

<div class="relative">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    src={imageUrl}
    alt={caption}
    on:click={openModal}
    class="cursor-pointer h-auto w-full rounded-lg"
  />
  <div
    class="absolute bottom-0 bg-black bg-opacity-50 w-full p-2 text-white text-center"
  >
    {caption}
  </div>
  <ImageModal {closeModal} />
</div>
