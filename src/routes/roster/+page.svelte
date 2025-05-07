<script lang="ts">
  import type { PageData } from './$types';
  import RosterStatusIndicator from './RosterStatusIndicator.svelte';
  import type { RosterPosition, RosterStatus, SoloEndorsement } from '$lib/czqm/db/schema';

  let { data }: { data: PageData } = $props();

  let controllers: any[] = $state([]);
  let visitors: any[] = $state([]);

  const getRosterStatus = (userData: any, position: RosterPosition) => {
    if (userData.roster.filter((r: RosterStatus) => r.position === position).length === 0) {
      return -1; // N/A
    } else if (
      userData.soloEndorsements.filter((r: any) => {
        if (
          r.position.callsign.toLowerCase().includes(position) &&
          r.expiresAt > new Date().getTime()
        ) {
          console.log('soloEndorsement', r);
          return true;
        }
      }).length > 0
    ) {
      return 1; // solo
    } else if (
      userData.roster.filter((r: RosterStatus) => r.position === position)[0].status === 0
    ) {
      return 0; // training
    } else if (
      userData.roster.filter((r: RosterStatus) => r.position === position)[0].status === 2
    ) {
      return 2; // certified
    } else {
      return -1; // N/A
    }
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
    <table class="table-zebra table">
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
            <RosterStatusIndicator roster={getRosterStatus(controller, 'gnd')} />
            <RosterStatusIndicator roster={getRosterStatus(controller, 'twr')} />
            <RosterStatusIndicator roster={getRosterStatus(controller, 'app')} />
            <RosterStatusIndicator roster={getRosterStatus(controller, 'ctr')} />
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
