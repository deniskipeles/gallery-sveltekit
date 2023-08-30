<script lang="ts">
  import { img_to_view_data, img_to_view_url } from "$lib/stores";
  import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import type { Admin, ListResult, Record } from "pocketbase";
  import GalleryItem from "$lib/components/art/GalleryItem.svelte";
  import ErrorComp from "$lib/components/ErrorComp.svelte";
  import { getPbImageUrl } from "$lib/tools";
  import AddArt from "$lib/components/art/AddArt.svelte";
  import { goto } from "$app/navigation";
  import AddMoreArt from "$lib/components/art/AddMoreArt.svelte";
  import { page } from "$app/stores";
  import { pb } from "$lib/pocketbase";
  /** @type {import('./$types').PageData} */
  export let data: {
    arts: Record | null;
    user: Record | Admin | null;
    company: Record;
    error: any;
  };

  async function updateData(dt: any) {
    if (data?.arts) {
      data.arts = dt;
    }
  }
  function goBack(dt: any) {
    history.back();
  }

  let hidden = "hidden";
  function setImage(record: any, image: any, key: number) {
    let img = pb.files.getUrl(record, image, {
      //   thumb: "100x100",
    });
    currentSlide = key;
    img_to_view_url.set(img);
  }

  let currentSlide = 0;

  function nextSlide() {
    if (data.arts) {
      currentSlide = (currentSlide + 1) % data.arts.photos.length;
      focusImageOnModal(currentSlide);
    }
  }

  function prevSlide() {
    if (data.arts) {
      currentSlide =
        (currentSlide - 1 + data.arts.photos.length) % data.arts.photos.length;
      focusImageOnModal(currentSlide);
    }
  }

  function focusImageOnModal(key: number) {
    let image = data?.arts;
    let img = image?.photos
      ? pb.files.getUrl(image, image?.photos[key], {
          //   thumb: "100x100",
        })
      : "/images/img1.jpg";
    img_to_view_url.set(img);
    // img_to_view_data.set(image);
  }
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<Button pill on:click={goBack}>Go Back</Button>
<AddMoreArt {updateData} art_id={$page?.params?.art_id} />
<!-- <AddArt {updateData} {data} /> -->
{#if data?.arts}
  <!-- content here -->
  <div class="gap-4 grid-cols-2 grid">
    {#each data?.arts?.photos as image, key}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={() => (hidden = "")}>
        <GalleryItem
          imageUrl={getPbImageUrl(data?.arts, image, "200x0")}
          caption={data?.arts?.caption}
          image={data?.arts}
          {key}
          {updateData}
        />
      </div>
    {/each}
  </div>
{:else}
  <ErrorComp error={data?.error} />
{/if}

<div
  id="modal"
  class={`fixed top-0 left-0 z-50 w-screen h-screen bg-slate-800 flex justify-center items-center ${hidden}`}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    on:click={() => (hidden = "hidden")}
    class="fixed hover:cursor-pointer z-50 top-0 right-0 text-white text-5xl font-bold"
    >&times;</span
  >
  <div class="absolute h-auto mb-36 mt-36">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      id="modal-img"
      class="w-auto h-auto object-cover"
      src={$img_to_view_url}
      alt="no image available"
      on:dblclick={() => (hidden = "hidden")}
    />
  </div>

  <div class="absolute opacity-75 bottom-4 flex h-auto space-x-2 ml-4">
    {#each data?.arts?.photos.slice(currentSlide, currentSlide + 10) as image, key}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        on:click={() => setImage(data?.arts, image, key)}
        class={`${
          currentSlide == key ? "w-20 h-20" : "w-16 h-16"
        } bg-cover bg-center rounded hover:cursor-pointer`}
        style={`background-image: url('${getPbImageUrl(
          data?.arts,
          image,
          "200x0"
        )}');`}
      >
        &hearts;
      </div>
    {/each}
  </div>

  <button
    class="absolute right-4 bottom-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
    on:click={nextSlide}
  >
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>

  <button
    class="absolute left-4 bottom-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full"
    on:click={prevSlide}
  >
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
</div>
