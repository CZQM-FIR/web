<script lang="ts">
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data = $bindable() }: Props = $props();

  let user = $state(data.user!);
</script>

<div class="flex flex-row flex-wrap gap-3">
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
            2) On a regular basis, we reach out to VATSIM to retrive the latest information for all
            users. This is the best way to update your rating
          </p>
          <div class="modal-action">
            <label class="btn" for="incorrect-info">Close</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex max-w-96 flex-col gap-2 rounded-lg bg-base-300 p-5">
    <h4 class="text-md font-semibold">Looking for your controlling hours?</h4>
    <p>
      They'll be back here soon! Don't worry, we're still tracking everything like before. Check
      back here soon to see your past controlling history.
    </p>
    <p>
      For now, checkout the <a
        class="link"
        target="_blank"
        href={`https://stats.vatsim.net/stats/${user.cid}`}>VATSIM stats page</a
      >!
    </p>
  </div>
</div>
