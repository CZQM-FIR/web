<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<h1>Tests</h1>
<p>{JSON.stringify(data.tests)}</p>
