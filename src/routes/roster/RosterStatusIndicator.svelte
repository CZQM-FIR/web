<script lang="ts">
  interface Props {
    roster: Number;
  }

  let { roster }: Props = $props();
</script>

{#if roster === -1}
  <td class="text-center"> --- </td>
{:else if roster === -2}
  <td class="text-center text-error-content"
    ><div class="badge badge-error badge-lg">In Training</div></td
  >
{:else if roster === 0}
  <td class="text-center text-warning-content"
    ><div class="badge badge-warning badge-lg">Solo</div></td
  >
{:else if roster === 1}
  <td class="text-center text-success-content"
    ><div class="badge badge-success badge-lg">Certified</div></td
  >
{/if}
