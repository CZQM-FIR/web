<script lang="ts">
  import type { PageData } from './$types';
  import RosterStatusIndicator from './RosterStatusIndicator.svelte';

  let { data }: { data: PageData } = $props();

  let controllers: any[] = $state([]);
  let visitors: any[] = $state([]);

  const getRosterStatus = (flags: any[], position: string) => {
    if (flags.some((flag) => flag.flag.name === `roster-${position}-cert`)) return 1;
    else if (flags.some((flag) => flag.flag.name === `roster-${position}-solo`)) return 0;
    else if (flags.some((flag) => flag.flag.name === `roster-${position}-sup`)) return -2;
    else return -1;
  };

  $effect(() => {
    controllers = data.controllers.filter((controller) => {
      return (
        controller.name_full.toLowerCase().includes(search.toLowerCase()) ||
        controller.cid.toString().includes(search) ||
        controller.rating.short.toLowerCase().includes(search.toLowerCase())
      );
    });
  });

  let search = $state('');
</script>

<section id="roster">
  <div class="container mx-auto mb-12">
    <h1 class="mt-6 text-2xl">Roster</h1>
    <div class="divider"></div>
    <table class="table table-zebra">
      <thead>
        <tr>
          <th></th>
          <!-- Name, Rating, Role -->
          <th></th>
          <!-- CID -->
          <th></th>
          <!-- Status -->
          <th>GND</th>
          <th>TWR</th>
          <th>APP</th>
          <th>CTR</th>
        </tr>
      </thead>
      <tbody>
        {#each controllers as controller}
          <tr>
            <th class="flex flex-col">
              <span class="font-bold">{controller.name_full} ({controller.rating.short})</span>
              <span class="font-normal">{controller.role}</span>
            </th>
            <td>{controller.cid}</td>
            <td></td>
            <RosterStatusIndicator roster={getRosterStatus(controller.flags, 'gnd')} />
            <RosterStatusIndicator roster={getRosterStatus(controller.flags, 'twr')} />
            <RosterStatusIndicator roster={getRosterStatus(controller.flags, 'app')} />
            <RosterStatusIndicator roster={getRosterStatus(controller.flags, 'ctr')} />
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
