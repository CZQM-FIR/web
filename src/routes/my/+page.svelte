<script lang="ts">
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data = $bindable() }: Props = $props();

  let user = $state(data.user!);
</script>

<div>
  <div class="rounded-lg bg-base-300 p-5">
    <h3 class="text-xl font-semibold">Your Account</h3>
    <div class="mt-2 flex flex-col">
      <p>{user.name_full} {user.cid}</p>
      <p class="font-light">{user.rating.long} ({user.rating.short})</p>

      <label for="incorrect-info" class="mt-3 cursor-pointer text-sm italic text-primary"
        >Incorrect Information?</label
      >

      <input type="checkbox" id="incorrect-info" class="modal-toggle" />
      <div class="modal" role="dialog">
        <div class="modal-box">
          <h3 class="text-lg font-bold">Why is my information wrong?</h3>
          <p class="py-4">We update your user info in a variety of ways:</p>
          <p>
            1) Whenever you log into the website, we pull your latest information directly from
            VATSIM. This is the best way to update your name and email.
          </p>
          <p class="mt-3">
            2) Every on a regular basis, we reach out to VATSIM to retrive the latest information
            for all users. This is the best way to update your rating
          </p>
          <label class="modal-backdrop" for="incorrect-info">Close</label>
        </div>
      </div>
    </div>
  </div>
</div>
