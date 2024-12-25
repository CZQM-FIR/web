<script lang="ts">
  import type { PageData } from './$types';
  import { page } from '$app/stores';

  let { data }: { data: PageData } = $props();
</script>

<div>
  <a href="/auth" class="btn m-5">Login</a>
  <a href="/auth/logout" class="btn m-5">Logout</a>

  <ul>
    <li>{JSON.stringify(data.user)}</li>
    <li>{JSON.stringify(data.session)}</li>
  </ul>
</div>
