---
layout: page
title: Free Energy of Iron from Materials Properties
description: From properties to free energy
img: assets/img/iron/project_thumbnail.png
importance: 1
category: work
---

A compilation of interactive visualizations related to reconstructing the Gibbs free energy surface of iron.

Entropies
<div class="l-page">
  <iframe src="{{ '/assets/plotly/iron/entropy_BCC_surf.html' | relative_url }}" frameborder='0' scrolling='no' height="800px" width="1000px" style="border: 1px dashed grey;"></iframe>
</div>

<div class="l-page">
  <iframe src="{{ '/assets/plotly/iron/entropy_FCC_surf.html' | relative_url }}" frameborder='0' scrolling='no' height="800px" width="1000px" style="border: 1px dashed grey;"></iframe>
</div>

Volumes

<div class="l-page">
  <iframe src="{{ '/assets/plotly/iron/volume_BCC_surf.html' | relative_url }}" frameborder='0' scrolling='no' height="800px" width="1000px" style="border: 1px dashed grey;"></iframe>
</div>

<div class="l-page">
  <iframe src="{{ '/assets/plotly/iron/volume_FCC_surf.html' | relative_url }}" frameborder='0' scrolling='no' height="800px" width="1000px" style="border: 1px dashed grey;"></iframe>
</div>

Energies

<div class="l-page">
  <iframe src="{{ '/assets/plotly/iron/gibbs_BCC_surf.html' | relative_url }}" frameborder='0' scrolling='no' height="800px" width="1000px" style="border: 1px dashed grey;"></iframe>
</div>

<div class="l-page">
  <iframe src="{{ '/assets/plotly/iron/gibbs_FCC_surf.html' | relative_url }}" frameborder='0' scrolling='no' height="800px" width="1000px" style="border: 1px dashed grey;"></iframe>
</div>

<div class="l-page">
  <iframe src="{{ '/assets/plotly/iron/gibbs_bcc_fcc.html' | relative_url }}" frameborder='0' scrolling='no' height="800px" width="1000px" style="border: 1px dashed grey;"></iframe>
</div>

Phase Map (not interactive. zoom plz)

{% include figure.liquid path="assets/plotly/iron/stability.png" class="img-fluid rounded z-depth-1" zoomable=true %}


