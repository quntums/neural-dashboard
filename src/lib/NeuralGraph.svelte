<script>
  import { onMount } from 'svelte'
  import { metrics } from './stores.svelte.js'

  let canvas
  let ctx
  let w = 800
  let h = 400

  onMount(() => {
    ctx = canvas.getContext('2d')
    const resize = () => {
      w = canvas.clientWidth * devicePixelRatio
      h = canvas.clientHeight * devicePixelRatio
      canvas.width = w
      canvas.height = h
    }
    resize()
    new ResizeObserver(resize).observe(canvas)

    let nodes = Array.from({length: 60}, (_,i)=>({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random()-0.5)*0.002,
      vy: (Math.random()-0.5)*0.002
    }))

    function frame() {
      ctx.clearRect(0,0,w,h)
      ctx.fillStyle = '#0a0a0b'
      ctx.fillRect(0,0,w,h)

      // update
      nodes.forEach(n=>{
        n.x += n.vx * (metrics.activity/70)
        n.y += n.vy * (metrics.activity/70)
        if(n.x<0||n.x>1) n.vx*=-1
        if(n.y<0||n.y>1) n.vy*=-1
      })

      // links
      ctx.strokeStyle = 'rgba(59,130,246,0.15)'
      ctx.lineWidth = 1
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a=nodes[i], b=nodes[j]
          const dx=(a.x-b.x)*w, dy=(a.y-b.y)*h
          const d=Math.hypot(dx,dy)
          if(d<120){
            ctx.globalAlpha = 1 - d/120
            ctx.beginPath()
            ctx.moveTo(a.x*w, a.y*h)
            ctx.lineTo(b.x*w, b.y*h)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha=1

      // nodes
      nodes.forEach(n=>{
        const x=n.x*w, y=n.y*h
        const pulse = 2 + Math.sin(performance.now()*0.003 + x)*1.5
        ctx.fillStyle = '#3b82f6'
        ctx.shadowColor = '#3b82f6'
        ctx.shadowBlur = 12
        ctx.beginPath()
        ctx.arc(x,y,pulse,0,Math.PI*2)
        ctx.fill()
        ctx.shadowBlur=0
      })

      requestAnimationFrame(frame)
    }
    frame()
  })
</script>

<div class="bg-lab-panel border border-lab-border rounded-2xl p-4 h-[420px]">
  <div class="flex items-center justify-between mb-3">
    <h2 class="text-sm uppercase tracking-wider text-lab-muted">Neural Activity</h2>
    <span class="text-xs font-mono text-lab-accent">{metrics.activity}%</span>
  </div>
  <canvas bind:this={canvas} class="w-full h-[360px] rounded-xl"></canvas>
</div>
