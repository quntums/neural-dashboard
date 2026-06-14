<script>
  import './app.css'
  import { onMount } from 'svelte'
  import { metrics, start, stop } from './lib/stores.svelte.js'
  import Metric from './lib/Metric.svelte'
  import NeuralGraph from './lib/NeuralGraph.svelte'

  onMount(() => {
    start()
    return () => stop()
  })

  $: neurons = metrics.neurons.toLocaleString()
  $: synapses = (metrics.synapses/1e6).toFixed(1) + 'M'
</script>

<main class="min-h-screen bg-lab-bg text-lab-text p-6">
  <header class="flex items-center justify-between mb-6">
    <h1 class="text-xl tracking-widest uppercase">Neural Dashboard</h1>
    <div class="text-xs text-lab-muted font-mono">epoch {metrics.epoch} • loss {metrics.loss}</div>
  </header>

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <Metric label="Neurons" value={neurons} />
    <Metric label="Synapses" value={synapses} />
    <Metric label="Activity" value={metrics.activity} unit="%" />
    <Metric label="Throughput" value={metrics.throughput} unit="GB/s" />
  </div>

  <NeuralGraph />

  <footer class="mt-8 text-[11px] text-lab-muted font-mono">
    lab://neural • dark mode • Svelte 5 runes
  </footer>
</main>
