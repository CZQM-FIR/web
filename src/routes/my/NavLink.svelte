<script lang="ts">
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores';

  let { name, icon, href } = $props();
</script>

<li class="">
  <a
    {href}
    class="{$page.route.id == href
      ? 'link text-blue-400'
      : ''} flex flex-row items-center gap-2 hover:link"
  >
    <Icon {icon} />
    {name}
  </a>
</li>
