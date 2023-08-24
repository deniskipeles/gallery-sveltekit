<script lang="ts">
  import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import type { Admin, ListResult, Record } from "pocketbase";
  import GalleryItem from "$lib/components/art/GalleryItem.svelte";
  import ErrorComp from "$lib/components/ErrorComp.svelte";
  import { getPbImageUrl } from "$lib/tools";
  import AddArt from "$lib/components/art/AddArt.svelte";
  import { goto } from "$app/navigation";
  /** @type {import('./$types').PageData} */
  export let data: {
    arts: Record | null;
    user: Record | Admin | null;
    company: Record;
    error: any;
  };
  function updateData(dt: any) {
    data = dt;
  }
  function goBack(dt: any) {
    goto("/arts", { replaceState: true });
  }
</script>

<Breadcrumb class="pt-20 py-8">
  <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
</Breadcrumb>
<Button pill on:click={goBack}>Go Back</Button>
<!-- <AddArt {updateData} {data} /> -->
{#if data?.arts}
  <!-- content here -->
  <div class="gap-4 grid-cols-2 grid">
    {#each data?.arts?.photos as image, key}
      <GalleryItem
        imageUrl={getPbImageUrl(data?.arts, image, "200x0")}
        caption={data?.arts?.caption}
        image={data?.arts}
        {key}
      />
    {/each}
  </div>
  <!-- <GalleryCustom class="gap-4 grid-cols-2" items={data?.arts?.items}/> -->
{:else}
  <!-- else content here -->
  <ErrorComp error={data?.error} />
{/if}
