---
layout: post
title: Onboarding - The Volcano Plot
date: 2022-08-15
description: This guide is meant for new members of the Sun group, or anyone interested in getting started with the Materials Project API.
tags: tutorials, code
---

Welcome! This guide will teach you how to get started with Python and <a href="https://materialsproject.org/api">The Materials Project API</a>. The Materials Project is a powerful database providing access to over 140,000 unique materials. These materials along with a plethora of their properties were calculated *ab-initio*, or from first principles. Many of these calculations are driven by high-throughput density-functional theory (DFT). Given only a materials crystal structure, DFT can calculate a variety of different materials properties. By the end of this guide you'll have learned to (1) run Python scripts, (2) connect to the Materials Project API, and (3) plot in <a href="https://matplotlib.org/">matplotlib</a>. This will be done by creating what we like to call "The Volcano Plot" from the paper, <a href="https://www.nature.com/articles/s41563-019-0396-2">"A map of the inorganic ternary metal nitrides"</a>, by Wenhao Sun et al.

{% include figure.liquid path="/assets/img/blog/volcano-guide/volcano_plot_src.png" class="img-fluid rounded z-depth-1" caption="The Volcano plot." %}

## Getting started with Python

There are many different guides online for getting started with Python. This guide will use <a href="https://www.anaconda.com/">Anaconda</a> for managing Python environments and <a href="https://code.visualstudio.com/">Visual Studio Code</a> as an intergrated development environment (IDE).

### 1. Setting up a conda environment

Download and install <a href="https://www.anaconda.com/">Anaconda</a>. Follow the installation instructions for your OS. Open a new terminal and create a new environment using the `conda create --name myenv` command. Replace `myenv` with your desired environment name. Now to navigate to your new environment use `conda activate myenv` and to naviagate away use `conda deactivate myenv`. Now your ready to use Python! Simply navigate to your new environment and type `python` to enter the interactive interpreter.

### 2. Setting up Visual Studo Code (VSCode)

Download and install <a href="https://code.visualstudio.com/">Visual Studo Code</a>. Follow the installation instructions for your OS. VSCode is a lightweight IDE used for a variety of langauges. Once installed open VSCode and navigate to the "Extensions" tab. Search the marketplace for the "Python" extension and install. Once installed VSCode will be able to recognize Python, giving you meaningful feedback from the IDE when writing your code. 

Now locate the "New File" option in VSCode to create a new file. Then save it as a `.py` file to tell VSCode that this file is a python script. Now in VSCode open a "New Terminal" using the toolbar. From here you should have opened a new interactive shell within VSCode. Now active your conda environment and type `python filename.py` to run your script (make sure your in the same directory as your saved python file).

{% include figure.liquid path="/assets/img/blog/volcano-guide/vscode_python_good.png" class="img-fluid rounded z-depth-1" caption="Getting Python setup in VSCode." %}

At this point it's also a good idea to open the Command Palette to tell VSCode (and Pylance) which Python interpreter to point to. This will allow VSCode to properly identify which packages you have installed and which you do not. Use <span style="color:blue">&#8679;&#8984;P</span> (Mac) or <span style="color:blue">`Ctrl+Shift+P`</span> (Windows). Then type `Python: Select Interpreter` and select the option. From here you should see all your available global environments. Choose the one you've setup and are using.

## Connecting to the Materials Project API

The Materials Project allows anyone to have direct access to current, most up-to-date information for the Materials Project database through their application programming interface (API).

### 1. Getting a Key

Go to the <a href="https://materialsproject.org/api"> Materials Project API</a> and create an account to acquire a key. This key is your API access to their database. Keep track of this.

### 2. Connecting to the API

Since you've created a new conda environment, you'll need to install the required packages in order to connect to the Materials Project API. This can be done via `conda install <package name>`. In your environment type:

```conda install mp-api```

into your terminal. After doing open a new python file and run the following code:

```py
# Testing connectivity to API by grabbing data for "mp-149"
from mp_api import MPRester
with MPRester(api_key=YOUR_KEY) as mpr:
    doc = mpr.summary.get_data_by_id("mp-149")
```
If the code above executes with no errors, you're all set!

## Completing the Onboarding Assignment

Now you have all the necessary ground work to produce the volcano plot! The next steps are entirely up to you, but I would recommend following the ordered list below.

1.  Read <a href="https://www.nature.com/articles/s41563-019-0396-2">"A map of the inorganic ternary metal nitrides"</a>, by Wenhao Sun et al.
2.  Read the <a href="https://docs.materialsproject.org/">Materials Project API Docs</a> and play around with the API functionality.
3.  Acquire the data needed to create the volcano plot.
4.  Familiarize yourself with <a href="https://matplotlib.org/">matplotlib</a>, then make the plot! Note: The plot may look slightly different from API changes over the years.

Lastly, good luck!
