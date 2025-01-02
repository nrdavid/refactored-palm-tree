---
layout: post
title: Public facing dynamic visualizations
date: 2024-01-28
description: This guide will demonstrate how to host a public, dynamic, interactive visualization
tags: tutorials, code
---
Often times interactive visualizations require code to be executed in response to user input. This guide will demonstrate how to host such a visualization publicly on a server. Everything in this guide is completely ***free***. The visualization used as an example in this tutorial is one made by Nicholas Amano which demonstrates the power of the [Regular Solutions Model in 3D](https://gibbs3d.mooo.com/rsm/).

## 0. Creating a free Oracle cloud account
There are many services which provide free cloud servers such as AWS, Azure, and Google Cloud, just to name a few. I've decided to go with [Oracle](https://www.oracle.com/cloud/free/) since they have generous *always free* server instances. Before we continue, first create a free account. Oracle will ask for a valid form of payment, however rest assured, they will not charge you for the services requested in this tutorial.

## 1. Creating your Oracle Virtual Cloud Network (VCN) and Oracle Cloud Instance (OCI)
Now that your account is created, follow the steps below to create your Virtual Cloud Network (VCN) which will grant us complete control over our cloud networking environment.

1. Go to “Get Started” and choose under “Pinned” Virtual Cloud Networks
2. Select “Compartment” from the left side panel
3. Now select “Start VCN Wizard” and select “Create with Internet”
4. Name your VCN and use all the defaults. Click "Next" then "Create".
5. Select "View VCN" in the bottom left

Now that our VCN is created, we need to create our instance. Think of the instance as our virtual machine (VM). We'll configure it with Ubuntu and allocate the maximum amount of resources we're allowed to get for free.

1. Under Launch Resources select “Create VM Instance”
2. Under Placement select “edit” and choose “AD 2”
    - You may need to select a different option other than "AD 2" depending on your region.
3. Under "Image" and "Shape" select “Edit”
4. Change the Image to Ubutnu (Canonical Ubuntu 22.04)
5. Change the Shape the AMPERE with 4 OCPUs and 24 GB memory
6. Now create new ssh key pair on your system. You can also have Oracle create one for you, but I found this way to be the easiest.
    - ```bash
    ssh-keygen -t rsa
    ```
7. Copy and paste your public keys use “Paste public keys” option
8. Select “Use in-transit encryption”
9. Now select “Create”

Now that our instance is created, you can now `ssh` into it with the following command (replacing the information relevant to your key and IP).

```bash
ssh -i <PATH_TO_PRIVATE_KEY> ubuntu@<VM_IP>
```

If you can successfully `ssh` into your instance you can move on to the following section

## 2. Allowing public communication to your server

Since we ultimately want other people to be able to see the visualizations hosted through your server, we need to configure the VCN to allow for these types of connections.

1. Go to your VCN
2. Go to your "Public subnet"
3. Go to "Default Security List for ..." 
4. Select "Add Ingress Rules"
5. Under "Source CIDR" enter: 0.0.0.0/0
6. Under "Destination Port Range" enter: 80
7. Add a description if you want. i.e. Public connect 80
8. Select "Add Ingress rules"
9. **Repeat steps 4-8 but replace port 80 with port 443**. Port 80 is the default port for http connections and port 443 is the default port for http**s** connections.

Now any client can access your server using your IP. However, we're currently not serving anything on those ports.

## 3. Hosting a plotly dash app

To demonstrate the work we've done thusfar, we will serve a [plotly dash app](https://plotly.com/examples/) from our server. For the remainder of this tutorial, we'll be using [Docker](https://www.docker.com/) extensively to manage various services. I will also provide an example app which you may use if you don't have one already.

1. Update and upgrade your instance
    - ```bash
    sudo apt update && sudo apt upgrade
    ```
2. Install [Docker](https://docs.docker.com/engine/install/ubuntu/) on your instance.
    - If a message about your kernel shows up just hit enter. If you receive a message about restarting your instance, there is a reboot button online in your instance configuration which may be of use.
    - Be sure to verify Docker was installed properly.
3. Clone the [test][https://github.com/nrdavid/dash-test/tree/main] repository.
    - ```bash
    git clone https://github.com/nrdavid/dash-test.git
    ```
4. Navigate to the newly cloned repository.
5. Start the application.
    - ```
    sudo docker compose up --detach
    ```
6. Type your instance IP into your web browser to view your visualization.

Now anyone can view your visualization simply by typing your instance IP into their browser. However, this is just weird. Ideally, we'd want someone to type in some more memorable web address such as google.com.

## 4. Create your free Domain Name System (DNS)

If you have your own DNS, you may use that instead. I've found this [Free DNS](https://freedns.afraid.org/) to be suitable. Note: For some reason University of Michigan does not like this website and will sometimes block your connection to it. There are a few ways around this (cough cough google translate) which you may remember from grade school :).

1. Create a free account from [afraid](https://freedns.afraid.org/)
2. Go to the "Subdomains" tab in the left panel and select "add"
3. Fill out the "Add a new subdomain" with the following information.
    - Type: A
    - Subdomain: (Whatever you like)
    - Domain: (Whatever you like). Although I suggest using one with few users as a popular one could cause issues downstream.
    - Destination: YOUR_INSTANCE_IP
    - Complete the captcha. These can be kind of hard so keep hitting "Different Image" until you get an easy one.
4. **Repeat steps 2-3 prepending "traefik" to your subdomain. For example, if your subdomain is "cabbage" add a new subdomain for "traefik.cabbage". This subdomain will be used in the following section.** 

After a few minutes (or less), you will be able to navigate to your new domain which should show the visualization served from part 3. However, you'll notice that a little "not secured" symbol might show up next to the domain name in your browser. This is because we are using HTTP instead of HTTP**s**. We ought to really use the latter since it's more secure.


## 5. Putting the 'S' in HTTPS

To create a secure site that others can visit, we need to obtain Transport Layer Security (TLS) certificates, also known as Secure Sockets Layer (SSL). These are digital objects that allows systems to verify the identity and subsequently establish an encrypted network connection to another system. There are a few different ways of doing this, but in this tutorial we will be using [Let's Encrypt](https://letsencrypt.org/), a nonprofit certificate authority providing TLS certificates to 363 million websites. In addition, we will also be using [traefik](https://traefik.io/traefik/) to act as a reverse proxy and load balancer. The services we set up below are *complicated* and I will not be explaining how they work in this tutorial. [Tiangolo](https://github.com/tiangolo/blog-posts/blob/master/deploying-fastapi-apps-with-https-powered-by-traefik/README.md), the creator of FastAPI (which we will also be using here), provides an in detail tutorial and explanation of deploying FastAPI (and other) apps with HTTPS powered by Traefik. The service created below also uses (Uvicorn)[https://www.uvicorn.org/], an ASGI web server implementation for Python. Because Plotly Dash is old and not optimized for ASGI, we also use [Flask](https://flask.palletsprojects.com/en/3.0.x/) which depends on the WSGI toolkit.

1. Begin by stopping your Docker container from the previous sections which is currently serving our visualization.
    - ```bash
    sudo docker ps
    ```
    - Copy the CONTAINER ID
    - ```bash
    sudo docker stop CONTAINER_ID
    ```
2. Clone the following repository: https://github.com/nrdavid/dash-fastapi-public
3. Change to the root user of your instance
    - ```bash
    sudo su
    ```
4. Edit the `docker-compose.traefik.yml` file. Change the following references to your traefik subdomain. Also modify the last line below, inputting your email for "example@email.com".
    - Line 19: traefik.http.routers.traefik-dashboard-http.rule=Host(`traefik.example.com`)
    - Line 24: traefik.http.routers.traefik-dashboard-https.rule=Host(`traefik.example.com`)
    - Line 55: certificatesresolvers.le.acme.email=example@email.com

5. Edit the `docker-compose.yml`.
    - Line 13: traefik.http.routers.app-http.rule=Host(`example.com`)
    - Line 18: traefik.http.routers.app-https.rule=Host(`example.com`)
6. Since these files contain references to environment variables, we'll need to set those. You can change the USERNAME and PASSWORD specified below to your choosing. These will be used for logging into your traefik dashboard via basic HTTPS auth.
    - ```bash
    export USERNAME=admin
    ```
    - ```bash
    export PASSWORD=change_this
    ```
7. We actually end up using a hashed version of the password above in the compose.yml (don't worry you won't need to remember this).
    - ```bash
    export HASHED_PASSWORD=$(openssl passwd -apr1 $PASSWORD)
    ```
8. Create the Docker network.
    - ```bash
    docker network create traefik-public
    ```
9. Start the traefik service.
    - ```bash
    docker compose -f docker-compose.traefik.yml up -d
    ```
    - Note: If you receive some error saying "too many certificates issued for..." choose a different subdomain from afraid. Also you may omit the `-d` flag in the above command to receive output from Docker on the operation.
10. Start your visualization service.
    - ```bash
    docker compose -f docker-compose.yml up -d
    ```
    - Note. If you for some reason have any "orphaned" containers, it might be a good idea to clean those up.
11. If you are able to navigate to both your visualization subdomain and traefik sub-subdomain, and HTTPS appears, then you're all set! Note that the actual visualization will be located at "/rsm".

## 6. Conclusion

This portion of the tutorial utilizes various different services to obtain the end product, therefore there is a lot that can go wrong. Just remember that google is your best friend :). With this created tool you can literally host *whatever you want*. It's extremely powerful what we can do within this framework; the possibilities are endless. Good luck!

