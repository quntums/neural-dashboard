export const metrics = $state({
  neurons: 12800,
  synapses: 4200000,
  activity: 73,
  loss: 0.042,
  throughput: 1.8,
  epoch: 1
})

let timer

export function start() {
  if (timer) return
  timer = setInterval(() => {
    metrics.activity = Math.round(65 + Math.random() * 20)
    metrics.loss = +(Math.max(0.01, metrics.loss + (Math.random() - 0.5) * 0.004)).toFixed(3)
    metrics.throughput = +(1.5 + Math.random() * 0.7).toFixed(2)
    metrics.neurons += Math.floor(Math.random() * 5 - 2)
    metrics.synapses += Math.floor(Math.random() * 1200 - 400)
    if (Math.random() < 0.1) metrics.epoch += 1
  }, 1200)
}

export function stop() {
  clearInterval(timer)
  timer = null
}
