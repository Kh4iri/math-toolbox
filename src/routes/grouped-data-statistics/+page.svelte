<script lang="ts">
  import { github } from '$src/configuration';
  import { Close, Plus, Settings, Trash } from '$src/icons';
  import { formatNumberToString, getMeanGrouped, getMedianGrouped, type GroupedData } from '$src/lib';
  import Katex from '../Katex.svelte';

  type InputData = { class: string, freq: number }[];
  let inputData: InputData = [
    {
      class: '35 - 39',
      freq: 3
    },
    {
      class: '40 - 44',
      freq: 10
    },
    {
      class: '45 - 49',
      freq: 15
    },
    {
      class: '50 - 54',
      freq: 7
    },
    {
      class: '55 - 59',
      freq: 5
    }
  ];

  let groupedData: GroupedData = [];
  let errorIndexes: number[] = [];
  let modal: HTMLDialogElement;
  const modalInputData = {
    startValue: 0,
    interval: 1,
    amount: 1
  };

  // Update groupedData and errorIndexes.
  $: {
    errorIndexes = [];
    groupedData = inputData.map(({ class: inputClass, freq }) => {
      const splitted = inputClass.split(/ ?- ?/);
      const min = parseFloat(splitted[0]);
      const max = splitted[1] ? parseFloat(splitted[1]) : undefined;
      return { min, max, freq };
    }).filter(({ min, max, freq }, i) => {
      const pass =
        min != null && !isNaN(min) &&
        (max == null || !isNaN(max)) && // Allow max to be null/undefined but must be a number.
        freq != null && !isNaN(freq);

      if (!pass)
        errorIndexes.push(i);

      return pass;
    });
  }

  $: console.log(groupedData);
  $: mean = getMeanGrouped(groupedData);
  $: median = getMedianGrouped(groupedData);
  $: console.log('Median:', median);

  function removeAt(index: number) {
    inputData.splice(index, 1);
    inputData = inputData;
  }

  function removeLast() {
    inputData.pop();
    inputData = inputData;
  }

  function handleModalSubmit() {
    const { startValue, interval, amount } = modalInputData;
    const data: GroupedData = [];

    for (let i = 0; i < amount; i++) {
      const prev = data[i - 1];
      const min = i == 0 ? startValue : prev.max! + 1;
      const max = min + interval - 1;

      data.push({ min, max, freq: 0 });
    }

    inputData = data.map(({ min, max, freq }) => {
      return { class: `${min} - ${max}`, freq };
    });

    console.log(data);
  }
</script>

<svelte:head>
  <title>Grouped Data Statistics</title>
</svelte:head>

<h1 class="mb-3 text-5xl text-accent font-medium">Grouped Data Statistics</h1>
<p class="mb-7">
  This handy tool calculates essential metrics like <b>Mean</b>, <b>Median</b>, and
  <b>Mode</b> for grouped data sets, simplifying complex statistical analysis. Check it out on
  <a href={github} class="link link-accent" target="_blank">Github</a>
</p>

<p class="mb-1 text-sm italic opacity-70">Click in the cells to edit the value</p>

<!-- Main table -->
<div class="h-[2px] bg-gradient-to-r from-transparent via-accent/50" />
<table class="mx-auto table table-sm border-spacing-2 border-2 border-transparent">
  <thead>
    <tr class="border-b border-accent/25">
      <th class="border-r border-accent/25 text-right">Class</th>
      <th>Freq</th>
      <th></th>
    </tr>
  </thead>
  <tbody>

    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each inputData as _, i}
      <tr class="group bg-gradient-to-r from-transparent hover:via-base-300 {errorIndexes.includes(i) ? 'via-error/20 hover:via-error/10' : ''}">
        <td class="p-1 text-right">
          <input
            bind:value={inputData[i].class}
            type="text"
            class="w-full input input-sm rounded-none bg-transparent invalid:input-error text-right"
            required
          >
        </td>
        <td class="p-1 border-l border-accent/25">
          <input
            bind:value={inputData[i].freq}
            type="number"
            class="w-full input input-sm rounded-none bg-transparent invalid:input-error"
            required
          >
        </td>
        <td>
          <button
            class="btn btn-sm btn-square btn-ghost opacity-0 group-hover:opacity-100 focus:opacity-100 transition-none"
            on:click={() => removeAt(i)}
          >
            <Close size={20} />
          </button>
        </td>
      </tr>
    {/each}

  </tbody>
</table>
<div class="h-[2px] mb-4 bg-gradient-to-r from-transparent via-accent/50" />

<!-- Control buttons -->
<div class="flex flex-wrap gap-3">
  <button
    class="btn btn-sm btn-outline"
    on:click={() => inputData = [...inputData, { class: '0', freq: 0 }]}
  >
    <Plus size={20} />
    Add
  </button>

  <button
    class="btn btn-sm btn-outline {inputData.length <= 1 ? 'hidden' : ''}"
    on:click={removeLast}
  >
    <Close size={20} />
    Remove Last
  </button>

  <button
    class="btn btn-sm btn-outline"
    on:click={() => modal.showModal()}
  >
    <Settings size={20} />
    Generate...
  </button>

  <!-- Spacer (on small or wider screens) -->
  <div class="grow hidden sm:block" />

  <button
    class="btn btn-sm btn-outline btn-error"
    on:click={() => inputData = [{ class: '0', freq: 0 }]}
  >
    <Trash size={20} />
    Clear
  </button>
</div>

<!-- Modal -->
<dialog class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Generate...</h3>

    <!-- Close button at corner -->
    <button
      class="btn btn-sm btn-circle btn-ghost absolute top-3 right-3"
      on:click={() => modal.close()}
    >
      ✕
    </button>

    <form method="dialog" on:submit={handleModalSubmit}>

      <!-- Input: Start value  -->
      <label for="startValue" class="label">
        <span class="label-text">Start value</span>
      </label>
      <input
        bind:value={modalInputData.startValue}
        type="number"
        id="startValue"
        class="mb-1 input input-bordered w-full"
        required
      />

      <!-- Input: Interval  -->
      <label for="interval" class="label">
        <span class="label-text">Interval (Class size)</span>
      </label>
      <input
        bind:value={modalInputData.interval}
        type="number"
        id="interval"
        class="mb-1 input input-bordered w-full"
        min="1"
        required
      />

      <!-- Input: Class amount  -->
      <label for="classAmount" class="label">
        <span class="label-text">Class amount</span>
      </label>
      <input
        bind:value={modalInputData.amount}
        type="number"
        id="classAmount"
        class="mb-1 input input-bordered w-full"
        min="1"
        required
      />

      <div class="modal-action">
        <button class="btn">Generate</button>
      </div>
    </form>
  </div>
</dialog>

<div class="divider" />

<!-- Mean -->
<div class="collapse collapse-arrow bg-base-200">
  <input type="checkbox" checked={true}>
  <div class="collapse-title text-xl font-medium">
    Mean
  </div>
  <div class="collapse-content">
    <table class="table table-sm">
      <thead>
        <tr>
          <th>Class</th>
          <th>Freq</th>
          <th>Midpoint</th>
          <th>F * Midpoint</th>
        </tr>
      </thead>

      <tbody>
        {#each groupedData as { min, max, freq }}
          <tr>
            <td>{min}{max != null ? ` - ${max}` : ''}</td>
            <td>{freq}</td>
            <td>{formatNumberToString(max != null ? (min + max) / 2 : min)}</td>
            <td>{formatNumberToString((max != null ? (min + max) / 2 : min) * freq)}</td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="divider my-1"></div>

    <div class="flex flex-col gap-2">
      <div>Total Frequency = <Katex math={formatNumberToString(mean.totalFreq)} /></div>
      <Katex math='\sum(Mid * Freq) = {mean.sum}' />
      <div>
        <Katex math={mean.formula} />
        <span class="text-success"><Katex math={formatNumberToString(mean.result)} /></span>
      </div>
    </div>
  </div>
</div>