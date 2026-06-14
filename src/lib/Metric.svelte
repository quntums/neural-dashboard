<script>
  export let label = ''
  export let value = ''
  export let unit = ''
</script>

<div class="bg-lab-panel border border-lab-border rounded-2xl p-4 backdrop-blur">
  <div class="text-xs text-lab-muted uppercase tracking-wider">{label}</div>
  <div class="mt-2 text-2xl font-mono text-lab-text">{value}<span class="text-lab-muted text-base ml-1">{unit}</span></div>
</div>
