
<a name="Index"></a>
Index
===
    
*   [Full Stack: Front-to-Back](#full-stack-front-to-back)
*   [2) Pre-flight Check](#2---pre-flight-check)
*   [3) Dynatrace Intro](#3---dynatrace-intro) 
*   [4) Deploy](#4---deploy)
*   [5) Explore: Dynabank](#5---explore-dynabank)
*   [6) Release: Dynabank](#6---release-dynabank)
*   [7) Troubleshoot!](#7---troubleshoot)
*   [8) Customization](#8---customization)
*   [9) Sessions / Session Replay](#9---sessions--session-replay)
*   [A) Azure Specific](#a---azure-specific)
    

[GitHub](https://github.com/dtdave/dbic)



<a name="FullStackFront-to-Back"></a>
Full Stack: Front-to-Back
=========================

This is designed as an instructor led workshop taking around 3h 30m.

Please join us in a hands-on workshop where we’ll use the power of Dynatrace automation and AI to deploy a real-world application from scratch, immediately get answers to user impacting problems, and encourage collaboration across all IT teams.

It requires login credentials provided by your instructor. If you’re interested in running this workshop yourself or with your organization, please [contact us](https://www.dynatrace.com/contact/)!

<a name="Overview1"></a>
Section Overview
===

*   [Overview](#Overview1)
*   [Typical Agenda](#TypicalAgenda)
*   [Introductions/Housekeeping](#IntroductionsHousekeeping)
    *   [Housekeeping](#Housekeeping)

<a name="TypicalAgenda"></a>
Typical Agenda
--------------

2 Hours:

*   10m Introductions/Housekeeping
*   30m Pre-Flight setup/checklist
*   30m Dynatrace & DynaBank Introduction (and the roles we’ll play today!)
*   10m Deploy Dynatrace & DynaBank
*   30m Explore your new app & how Dynatrace continously maps It
*   10m Deploy a new release into production (What could go wrong?)

20m Leave for the week-end (Q&A and short break)

70 Minutes plus Q&A:

*   20m Root cause analysis with the Davis A.I.
*   20m Customize Dynatrace, Service Level Objectives (SLO’s)
*   30m User Sessions, Session replay
*   Final Q&A and wrap-up

<a name="IntroductionsHousekeeping"></a>
Introductions/Housekeeping
--------------------------
<img src="../images/spaceballs.yZ4LnrjP_Z1JwWgI.webp">

<a name="Housekeeping"></a>
### Housekeeping

*   Phone calls, Restrooms, Breakouts <img src="../images/breakoutrooms.PotW5HAZ_I8EGa.webp">

About our group:

*   What does the job description say on your office door? Is it accurate?
*   Have you built a Kubernetes Cluster before? Deployed an Application?
*   Have you used Dynatrace in the last few months?
*   What’s your favorite dinosaur?
*   What was your favorite toy? (Purposeful lack of “childhood”!)


<br /><br /><br />

<a name="Pre-flightCheck"></a>
2 - Pre-flight Check 
===
<br />

<a name="Overview2"></a>
Section Overview
===

*   [Overview](#Overview2)
*   [Environment setup](#EnvironmentSetup)
*   [A) Dynatrace tenant setup](#DynatraceTenantSetup)
*   [B) Cloud setup](#CloudSetup)
    *   [AWS](#CloudSetupAWS)
    *   [AZURE](#CloudSetupAzure)
    *   [GCP](#CloudSetupGCP)
*   [C) Setup](#Setup)


<a name="EnvironmentSetup"></a>
Environment setup
---

We’ll spin up a Dynatrace tenant and build an application together from scratch.

Please keep in mind that this is a “live-fire” experience. It’s instructor led- but can be more like white-water rafting than a museum tour.

Please let us know how it’s going with thumbs up reactions when it’s good sailing and chat/speak up if things are tipping over.

<a name="DynatraceTenantSetup"></a>
A) Dynatrace tenant setup
-------------------------

1.  Launch the [Dyantrace trial](https://www.dynatrace.com/trial/) page.
2.  Enter an email address and “Start free trial”.
3.  Follow the prompts.
4.  Check email (junk/spam folders!) for a “Welcome” message.

<a name="CloudSetup"></a>

B) Cloud setup
--------------

1.  Dynatrace works natively across cloud providers. Follow the instructor prompts to connect to your selected environment.
2.  Once logged in check the section below matching your provider.

<a name="CloudSetupAWS"></a>
### AWS

1.  In the top right bar, confirm the region is Ohio. If not, click the region and select “US EAST (OHIO)” <img src="../images/preflight1.3fIdo1o1_sQNBt.webp">
2.  You have full access to the various features of AWS. You could search for “Elastic Kubernetes Service” or “EC2”. Aside from a Cloudformation VPC, everything should be empty as we’ll build it all today.
3.  in the top bar, open an AWS cloud shell session by clicking the shell icon. <img src="../images/preflight2.BIzX0nMU_Z1A38Yu.webp">
4.  If the text is ridiculously tiny, there is a gear icon in the top right you can select to pick something other than “microscopic”.

<a name="CloudSetupAzure"></a>

### AZURE

1.  Click the shell icon in the top bar of the Azure portal login. <img src="../images/cloudazure.B0R0-rKl_Z5VgX1.webp">
2.  The setup steps should automatically connect you to the correct subscription.
3.  A resource group will be created for you during setup steps. You’ll have full access to all items in this group.

<a name="CloudSetupGCP"></a>

### GCP

1.  In your google cloud console, start a shell from the prompt icon top right. <img src="../images/cloudgoogle.CuIv9Trk_XoYjl.webp">
2.  You have full access to the **project** in Google Cloud. Ensure you select your designated project during setup steps.

<a name="Setup"></a>
C) Setup
--------

We’ll use [Pepper](https://github.com/dtdave/scw/blob/Main/docs/pepper/pepper.md) today. It’s a cloud-agnostic deployment assistant built to help setup applications while providing every step along the way. (No magic whooosh then done!)

1.  In your cloud shell, download Pepper.

Terminal window

    curl https://raw.githubusercontent.com/dtdave/scw/refs/heads/Main/pepper/pepper.ps1 -s > ~/pepper.ps1

2.  Start Pepper with the `-c` option to show commands as they run so you could use them manually later, and `-n` option to specify the existing VPC.

Terminal window

    pwsh ./pepper.ps1 -c

Pepper will generate a running checklist of deployment items. Anything showing `[-]` is information, while anything with `[>]` shows the exact command you could run yourself with everything filled it.

3.  You should see something similar to below. Select any items marked `Required`. The step that builds your kubernetes cluster takes some time across all cloud providers. (Some take more than others. _sideways glance at AWS_)

Terminal window

    Option description                     current------ -----------                     -------     1 Switch Cloud Provider           AWS us-east-2/bravecannon     2 Required: Create AWS Components

The first line shows which cloud provider you’re using, the space within that cloud, and a unique identifier. If used in a local terminal with multiple available cloud providers, the option to `switch cloud providers` would let you switch between them.

Section Complete!
-----------------

Congratulations, you’ve built an Kubernetes cluster!


*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)

    
<br /><br /><br />

<a name="DynatraceIntro"></a>
3 - Dynatrace Intro
==================
<br />

<a name="Overview3"></a>
Section Overview
===

*   [Overview](#Overview3)
*   [Dynatrace](#Dynatrace)
*   [Dynabank](#Dynabank)
    *   [Login Page](#LoginPage)
    *   [Architecture Overview](#ArchitectureOverview)

<a name="Dynatrace"></a>
Dynatrace
---------

<img src="../images/intro1.CdBpMZSb_217i92.webp">

*   Brief overview of [Dynatrace](https://www.dynatrace.com/)
*   [Dynatrace Hub](https://www.dynatrace.com/hub/)

<a name="Dynabank"></a>
Dynabank
--------

<a name="LoginPage"></a>
### Login Page
<img src="../images/dynabank.BVMHfkA1_1xOhIk.webp">

<a name="ArchitectureOverview"></a>
### Architecture Overview
<img src="../images/DynaBankInsuraCart.BvoXZC_z_Z1TmFLI.webp">

Section Complete!
-----------------

*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)


<br /><br /><br />

<a name="Deploy"></a>
4 - Deploy
===

<br />

<a name="Overview4"></a>
Section Overview
===

*   [Overview](#Overview4)
*   [Dynatrace](#DeployDynatraceSection)
    *   [A) Create a Token](#CreateAToken)
    *   [B) Save token in Pepper](#SavetokeninPepper)
    *   [C) Deploy Dynatrace](#DeployDynatrace)
    *   [D) Confirm Deployment](#ConfirmDeployment)
*   [DynaBank](#Dynabank4)
    *   [E) Deploy DynaBankInsuraCart](#DeployDynaBankInsuraCart)
    *   [F) Dynabank (Quick) Overview](#DynabankOverview)



<a name="DeployDynatraceSection"></a>
Dynatrace
---------

Dynatrace provides a managed token system to make deployments secure and easy. In this section, we’ll give Pepper access to the tenant.

<a name="CreateAToken"></a>
### A) Create a Token

Tip

If you have used Dynatrace before it might automatically login to other tenants. Open an “incognito” style browser if that might be the case and login there.

1.  Navigate to your Dynatrace tenant. You should have a welcome email with link.
2.  Once you login, copy the main part of the URL and paste somewhere handy. <img src="../images/deploy0.BoClmtR9_3xiz1.webp">

3.  Click “Access Tokens” on the left side very near the bottom. (You might have to expand “Manage”) <img src="../images/deploy1.Q41q8hfm_2mkCb6.webp">
4.  In the tokens screen, click “Generate New Token” on the right side. Give it a name. It could be “fullstack workshop” or “rick”.
5.  In the “search scopes” box, type “write api tokens”, then select the option when it appears below.
6.  Click “Generate Token” at the bottom of the screen. Click Copy on the following screen. Make sure to **copy/paste** your token somewhere safe before clicking done.
7.  Click Done.

<a name="SavetokeninPepper"></a>

### B) Save token in Pepper

1.  In your cloud shell, select the menu option to `create dynakube.yaml`.
2.  Paste your tenant into the tenant ID prompt, then paste the token into the follow prompt.
3.  Pepper will confirm a valid connection and save the token.
4.  Press _enter_ to stop Pepper for now.

<a name="DeployDynatrace"></a>

### C) Deploy Dynatrace

1.  In your Dynatrace tenant, click “Deploy Dynatrace” in the top right, then “Start installation.”

Alternatively, open the Manage subheading at the bottom of left menu, then “Deploy Dynatrace”

2.  Pick Kubernetes from the most common deployment options. <img src="../images/deploy2.Bhpl8Bi7_Z1diP8j.webp">
    
3.  Give it a friendly name like “cloudkubernetes” or “morty”.
    
4.  Click “Create token” for Dynatrace Operator & then click “copy” near the bottom. <img src="../images/deploy3.BxiREZwP_1oUDob.webp">

    
5.  In your cloud shell prompt (not Pepper), paste the contents
    
6.  Press _enter_ a couple of times to ensure your cloud provider runs all 4 steps.
    

<a name="ConfirmDeployment"></a>

### D) Confirm Deployment

1.  Restart Pepper.

Terminal window

    pwsh ./pepper.ps1 -c

2.  If you don’t see the new section below showing Dynatrace running 5/5 pods, select the option to “Show Pods”. It might take a few minutes until ready.

Terminal window

    NAME                                  READY   STATUS    RESTARTS   AGEdynatrace-operator-6dfbfd5768-tqk88   1/1     Running   0          3m2sdynatrace-webhook-8954d9c5b-gwrmh     1/1     Running   0          3m2sdynatrace-webhook-8954d9c5b-wgnxp     1/1     Running   0          3m2sk8sagreeableapple-activegate-0        1/1     Running   0          2m15sk8sagreeableapple-oneagent-bw5pm      1/1     Running   0          2m15s

3.  In Dynatrace, you can check on deployment status from the menu. Select “active gates” from the inner menu to confirm Dynatrace is connected.

<a name="Dynabank4"></a>

DynaBank
--------

<a name="DeployDynaBankInsuraCart"></a>

### E) Deploy DynaBankInsuraCart

Pepper is able to deploy any number of applications via a yaml file. This session has one yaml file for Dynabank.

1.  In Pepper, select the option to `download dempo apps yaml files`.
2.  You’ll see a new application deployment option (similar to Dynatrace) for DynabankInsuracart (dbic).
3.  Select the `dbic: Deploy App` option. Deployment will take a few minutes.
4.  Check the status of deployment with the `dbic: Refresh/Show Pods` option.
5.  When all pods are ready, you can copy the application URL into a new browser. <img src="../images/appurl.D6zkkqaw_1MI7Rx.webp">


<a name="DynabankOverview"></a>

### F) Dynabank (Quick) Overview

Dynabank is your one stop shop for non-stop shopping! You can:

*   find the perfect item you need
*   get insurance quotes for auto & home
*   pay your bills

To facilitate quick demos when you shop or bank, Dynabank will create an account for you including:

*   home address/shipping details
*   checking and savings accounts (here’s hoping for a 5+ digit balance!)
*   a Dynacard credit card

You are also added to the administrators group. Access administration from your account button to see transactions as they process. <img src="../images/admin.DcDuLRMD_Z1eDFci.webp">



Section Complete!
-----------------

Congratulations, you’ve deployed Dynatrace for end to end observability and a real-world application.

*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)


<br /><br /><br />

<a name="ExploreDynabank"></a>
5 - Explore: Dynabank 
===

<br />

<a name="Overview5"></a>
Section Overview
===

*   [Overview](#Overview5)
*   [A) Smartscape](#Smartscape)
*   [B) Services View](#ServiceView)
    *   [Dynatrace workshops versus real deployment or evaluations](#Dynatraceworkshopsversus)
*   [C) Kubernetes View](#Kubernetesview)
*   [D) Databases View](#Databasesview)
*   [E) Logs](#Logs)
    *   [Feature Hightlight: full log integration](#FeatureHighlightfulllogintegration)
*   [F) Application View](#ApplicationView)
    *   [Feature Highlight: Session Replay](#FeatureHighlightSessionReplay)

In this section we’ll look at the front to back visibility provided by Dynatrace immediately after deployment.

We’ll also share a few highlights of user-configurable options available. Any of them could be automated.

<a name="Smartscape"></a>

A) Smartscape
-------------

1.  In your Dynatrace tenant, select the “Smartscape” option from the menu. You’ll see that Dynatrace has already generated a topology view. <img src="../images/explore1.DZTQufaG_ZsH39W.webp">


2.  Click any components in Dynatrace to show the automatically tracked vertical relationships for that entity. <img src="../images/explore2.FZ6IpTFK_ZFsnho.webp">


This visibility is unparalled when planning to move applications to another data center or cloud; All dependencies are clearly visible.

<a name="ServicesView"></a>

B) Services View
----------------

<img src="../images/explore3.3w6TUZBQ_2UBT3.webp">


1.  Select “Services” on the left menu. Dynatrace shows all detected services and key metrics for each.
2.  Select the “OrdersAPI” service to see a dashboard and further drilldowns for it:

*   The top left block shows what calls this service, what this service depends on, and where it’s running
*   Bottom left shows service KPI’s like failure rate & throughput
*   Dynatrace always keeps everything connected. The right side shows ways to view the service flow, back up the chain, and individual traces

<a name="Dynatraceworkshopsversus"></a>

### Dynatrace workshops versus real deployment or evaluations

While Dynatrace will immediately evaluate every transaction, it builds data and context about the environment for a few hours prior to automatically raising problem cards.

4.  To avoid 6 hour workshops, return to the services screen & click the “flask mainapi” service. <img src="../images/flaskservice.BwFixYyG_Zc3hR2.webp">

5.  In the service, click the more button ”…”, then “settings”.
6.  Select “Anomaly Detection”. <img src="../images/service1.CJczYTqW_Z1Pp1eq.webp">

7.  Under **failure rate** switch from automatic detection to “Using fixed thresholds” & set a threshold of “5”%. <img src="../images/service2.Cjupr6XW_ZOd3fD.webp">

8.  Make sure to save! <img src="../images/savebottomleft.DXhdBLr5_Z1TXFAg.webp">

<a name="KubernetesView"></a>

C) Kubernetes View
------------------

1.  Select “Kubernetes” from the left menu (under ), then click on the cluster matching your id.

You’ll see a cluster overview, namespaces, workloads, and the option to turn on cluster events. <img src="../images/explore10.B1JUXq-0_2jd4Ar.webp">

2.  Try clicking on the “dbic” namespace on the lower right to see infrastructure metrics.
    
3.  From here, check out the services running and click ordersAPI.
    
4.  On this page, you can see Dynatrace automatically building visibility up to the services provided & down into the infrastructure.
    

<a name="DatabasesView"></a>

D) Databases View
-----------------

<img src="../images/explore4.OOQwN4yw_Z2io2OH.webp">

1.  Select “Databases” on the left menu, then “dbic”. Similar to services, Dynatrace constantly tracks service dependencies, and underlying infrastructure at all times.
2.  Database calls from any source are shown here with the ability to reverse back up the chain with the “view backtrace” button.

<a name="Logs"></a>

E) Logs
-------

<a name="FeatureHighlightfulllogintegration"></a>

### Feature Hightlight: full log integration

1.  In Settings -> Log Monitoring -> Log sources and storage, check the box for the host to enable log integration. <img src="../images/explore9.CR2IGei4_Z2hyoN9.webp">

2.  Make sure to save changes! <img src="../images/savelogs.C09ZIz3q_2skECx.webp">

3.  **Hang tight for a couple of minutes.**
4.  Select “Logs” on the left menu.
5.  Select from log types, messages, and sources in “available attributes”. <img src="../images/explore5.ByQ33iag_ZThdyU.webp">

<a name="ApplicationView"></a>

F) Application View
-------------------

<img src="../images/explore6.DIpYg1Yw_Z2jLawv.webp">

1.  Select “Frontend” on the left menu (under “Applications & Microservices”)
2.  Select “My Web Application”
3.  Select “1 service” in the lower right of top box. <img src="../images/appservice.j8y5hoRQ_1azBGg.webp">
4.  Select “view service flow” to show this applications ecosystem front to back.

Tip

It’s easy to split applications into their own views. It’s done by selecting the ”…” in the applications view and “editing detection settings”

<a name="FeatureHighlightSessionReplay"></a>

### Feature Highlight: Session Replay

1.  Return to the main application page.
2.  Edit the application with the more button ”…” top right.
3.  In Capturing -> Async web requests and SPAs, enable both options under “Generic Support”. <img src="../images/genericsupport.FCOAQqUn_Z1i5nk3.webp">

4.  Enable Session Replay from the “enablement and cost control” page (under “General Settings”). <img src="../images/sessionreplay.C5jHJkBj_1zixQX.webp">

5.  (Optional!) In the “Data Privacy” -> “Session Replay” section, select the “Recording” and then “Block List.” Do the same for “Playback”.
6.  (Optional!) Dynatrace defaults to high security settings. You can unblock all items to see everything in the replay today. <img src="../images/explore8.C0M6bxyr_1tjtcE.webp">

7.  Make sure to save! <img src="../images/genericsupport.FCOAQqUn_Z1i5nk3.webp">


Tip

Dynatrace offers granular control at the point of capture for security and privacy. Your organization’s needs might be open, closed, or a very unique combination. For today’s session, it’s often more interesting to allow more visibility to see replay capabilities in realtime.

Section Complete!
-----------------

Congratulations, you’ve successfully explored your application in Dynatrace!

*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)


<br /><br /><br />

<a name="ReleaseDynabank"></a>

6 - Release: Dynabank
====================

<br />

<a name="Overview6"></a>
Section Overview
===

*   [Overview](#Overview6)
*   [The story so far](#thestorysofar)
*   [Enable the service](#Enabletheservice)



<a name="Thestorysofar"></a>

The story so far
----------------

The organization is implementing a fraud detection service.

*   Large transactions are targets for fraud.
*   The fraud service will check those transactions for address and account owner details prior to posting them.
*   Users should receive a transaction error message when fraud is detected.

As developers:

*   we’ve confirmed the solution works on our dev laptops.
*   We’ve staged the change as a feature flag in the application’s main API.
*   At 4:50PM Friday we put on our jackets, enable the flag, and start a week long beach vacation.

<img src="../images/leavework.DR6Rlv7g_APkzs.webp">


<a name="Enabletheservice"></a>

Enable the service
------------------

Your DynaBank account is authorized to deploy new software features!

1.  Open the Operations panel of DynaBankInsuraCart. <img src="../images/operationsmenu.BWZx_bsl_Z19P4q8.webp">

    
2.  Enable the Fraud Detection service. <img src="../images/enablefraud.CCBxCwuF_ZEjLea.webp">

    
3.  Take a well deserved week long vacation!
    

*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)


<a name="Troubleshoot"></a>

7 - Troubleshoot!
================

<a name="Overview7"></a>

Section Overview
===

*   [Overview](#Overview7)
*   [The story even further](#Thestoryevenfurther)
*   [Enter Dynatrace](#EnterDynatrace)
*   [Companies using this today](#Companiesusingthistoday)

<a name="Thestoryevenfurther"></a>

The story even further
----------------------

*   After an hour or so, the support center starts a priority conference call.
*   They report that customers are receiving payment success messages but transactions don’t post.
*   Someone suggests that the network must be down. The network team is paged, searches for an hour, and finds no issue.
*   The network team suggests last time this happened their might have been a database error.
*   The database team is paged.
*   Hours pass and more teams are called.

<img src="../images/troubleshoot1.yOjzrqA5_Z1h1Gxy.webp">

<a name="EnterDynatrace"></a>

Enter Dynatrace
---------------

Just kidding. That didn’t happen. <img src="../images/relief.DU3Hi419_Z1RSUeQ.webp">


With Dynatrace, any problem in the enterprise affecting users is automatically analyzed and the Davis AI provides root cause.

1.  Open the Problems Pane in Dynatrace, or click the exclamation point at top right.

Tip

Dynatrace has a full suite of options to route problem types to an array of email, notification, and customizable integrations.

2.  Click on the “failure rate increase” problem.

You’ll see start and end time of the problem, user impact analysis, and the root cause of the problem.

Tip

Incidentally, all of the other context is present to clearly show where the problem **isn’t**. By clicking on the “python” box top left, you can jump right into the host and confirm all infrastructure is A-OK.

3.  Click on the failing service in red.

With Dynatrace, you’ll see critical context in black/blue and the reason for the alert in red.

4.  Quick aside: Dynatrace shows the python services and databases in blue. Dynatrace automatically checked all of the network traffic and databases on the way to providing you root cause.
    
5.  Click on Failure rate to see a view of service performance with the problem area highlighted.
    
6.  Click Analyze failure rate degradation to see root-cause error message, faulty service, and automatic integration with relevant logs. <img src="../images/troubleshoot2.Djje3kDe_1FbKmz.webp">

    

With Dynatrace you have immediate full visibility front to back.

7.  Disable the fraud service. On the end of the base URL, add:

Terminal window

    /api/api/features/disable/fraud_service

8.  Review the transactionAPI for decrease in failures. After a few minutes without user users, Dynatrace will automatically close the ticket.

<a name="Companiesusingthistoday"></a>

Companies using this today
--------------------------

<img src="../images/examples.tR_91jl__Z29aNy0.webp">

[Click for many more enterprise success stories.](https://www.dynatrace.com/news/customers/)

*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)


<br /><br /><br />

<a name="Customization"></a>

8 - Customization
================

<br />

<a name="Overview8"></a>

Section Overview
===

*   [Overview](#Overview8)
*   [Easy ways to make Dynatrace your own](#Easyways)
*   [A) Service Request Attributes](#ServiceRequestAttributes)
*   [B) Application Tags](#ApplicationsTags)
*   [C) Dashboards](#Dashboards)


<a name="Easyways"></a>

Easy ways to make Dynatrace your own
------------------------------------

<a name="ServiceRequestAttributes"></a>

A) Service Request Attributes
-----------------------------

1.  Click “Settings” under “Manage”.
2.  On inner menu, click “request attributes” under “Server-side service monitoring”. <img src="../images/customize3.BvxYreqy_2pPtds.webp">

3.  Click “Define new Request Attribute” at the top.
4.  Use the following values:

Setting

Value

_Request attribute name_

Any friendly name

Allow this request to access unmasked personal data

checked

All service technologies

node.js

Request Attribute Source

Web request URL Path

Preprocess parameter by extracting substring

**after** /api/main/users/login/

<img src="../images/customize4.LPcWTgRT_1P7w2o.webp">

5.  **Make sure** to save your attribute source.
6.  **Make sure** to click “save” in the top right corner.

<a name="ApplicationsTags"></a>

B) Application Tags
-------------------

4.  Click “Frontend” in the menu (under “Applications & Microservices”).
5.  Click “my web application”, then the ”…” button, then “edit”. <img src="../images/customize1.Dq208auk_2ltUgd.webp">

6.  In the inner menu, select Capturing -> User tag & specify settings as shown.

Setting

Value

Source Type

Server side request attribute

Request Attribute

DynaUser (or whatever you selected)

<img src="../images/appuser.BOc5O0Kn_Z17wFH9.webp">


7.  Make sure to save! <img src="../images/usertagsave.CTecWDps_2rq5Y3.webp">
    
8.  Hang tight for just a minute or two and then return to “My web application” (from the main “frontend” menu)
    
9.  Click “Analyze user sessions” in the top right. <img src="../images/analyze.BGgAhNBA_1xFD9X.webp">

    

After a short time, you’ll see Dynatrace associate users with their sessions.

<a name="Dashboards"></a>

C) Dashboards
-------------

Hopefully you’ve seen that Dynatrace goes way beyond dashboards by watching every transaction, click, and process for you and simply raising problem cards when negative events occur. But Dynatrace has a full suite of dashboard capabilities built in.

1.  Click “Dashboards” on the top left and then select a specific dashboard from the list- or you can choose to make your own.
2.  Your own dashboard might include:

*   Services health view
*   Databases
*   Problems
*   Network Status

Or use the data explore for some really run options:

*   Kubernetes workloads by type
*   Server side response times

3.  Share the dashboard with others using the more button ”…” top right -> share.

Section Complete!
-----------------

You've successfully see how Dynatrace can be tailored to your specific needs.

*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)


<br /><br /><br />

<a name="SessionsSessionReplay"></a>

9 - Sessions / Session Replay
============================
    
<br />   

<a name="Overview9"></a>

Section Overview
===

*   [Overview](#Overview9)
*   [User Sessions overview](#UserSessionsoverview)
*   [User Replay overview](#UserReplayoverview)



<a name="UserSessionsoverview"></a>

User Sessions overview
----------------------

Overview of User Sessions in Dynatrace.

<img src="../images/sessions.BI2piuDj_ZNcT5f.webp">


<a name="UserReplayoverview"></a>

User Replay overview
--------------------

Overview of Session Replay in Dynatrace.

<img src="../images/replay.DZGBJWht_ZU6VaW.webp">


*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)


<br /><br /><br /> 

<a name="AzureSpecific"></a>

A - Azure Specific
=================

<img src="../images/azureoverview.BLImUcaZ_1MOYk1.webp">

Instamation on Azure (Azure Web App)
------------------------------------

Our company has instructed us to build and deploy a modern quoting service.

We’ve developed Instamation (tm) and chosen to deploy it as an Azure Web App for easy scalability and configuration.

### Deploy

1.  In the Azure Console, go to “App Services.”
2.  Type your class id (sessionX#) into the filter top right.
3.  You should see just ONE web app and click to select. It will be in the _format scw-webapp-\[classname\]_.
4.  Select the Deployment Center (blue highlight) then External Git as the source (green highlight).  
    <img src="../images/awa1.DQE_y1ga_ZthMMw.webp">
5.  Copy the following service repository link into the repository field:

Terminal window

    https://github.com/suchcodewow/instamationsvc

1.  Type `main` for the branch (blue highlight) then Save (green highlight).
    
    Tip
    
    The “example/grey” branch example is also named main. You do need to type `main` into this field to be able to save.
    
    <img src="../images/awa2.DnOIZkYX_2uj6yd.webp">
2.  Go back to the overview page (blue highlight) and click the default domain (green highlight) to see your new service. ![awa3](./A) Azure Specific _ suchcodewow_files/awa3.DbCKiXYY_2d79Ri.webp)
3.  The deployment will likely take a minute or two. You might see a boilerplate message the first time you click- or it might not respond. When successfully deployed, you should see a simple json response simlar to:

Terminal window

    {"status":"ready","appname":"scw-webapp-[classname]"}

When this appears, it means your service is working! You are ready to move to the next step.

### Dynatrace Extension

1.  In the inset-menu, click on _Extensions_ within the _Development Tools_ section.
2.  Click Add in the main window. Search/Find Dynatrace Oneagent and select it: <img src="../images/extension1.D1UhP6xU_Z1gTC05.webp">
3.  At the bottom of the panel, check the agreement box, then click _Add_.
4.  Hang tight for a few seconds until it loads, then click the small browse box: <img src="../images/extension2.DJc3FRrR_Z2o2U53.webp">
5.  Briefly switch to Tab #1. In Pepper, choose the option for `Dynatrace: Token Details`. You might need to scroll up slightly to see the output.
6.  Using the image below as a guide, fill in the environment ID, token, and then the server URL. <img src="../images/extension3.DacqQL8t_CnEKm.webp">
7.  Click _Install OneAgent_ and hang tight until you see _Enjoy monitoring from Dynatrace._ at the top of the screen.
8.  In the _Overview_ page of your web app, click the _Restart_ button.

### Dynabank & Azure Web App

1.  In Tab #6 showing the Instamation service API response, copy the URL from the address bar.
2.  In Dynabank, Log-in using any random name provided with the orange button top right.
3.  Click the orange button top right and click _Operations_. <img src="../images/dynabankwebapp1.2YbURMKo_DPeNX.webp">
4.  In the _Estimation Service URL box_, paste in the URL of the Instamation service, then click _save_.
5.  Confirm it worked by checking for a _successfully configured_ message. The App Name should reflect your user id (sessionX#). (The value is retrieved directly from your web service to make sure it worked.) <img src="../images/dynabankwebapp2._wF-SCNy_Zk0FiQ.webp">
6.  New Collecticare quotes will now automatically by quoted by the Instamation Service. You can check on it by going to Administration: <img src="../images/dynabankwebapp3.DbOvWT0N_Vyrxg.webp">
7.  Review new Collecticare quotes on the first administration panel. Instead of quotes showing up in the _new_ state, they will show as _quoted_ instead: <img src="../images/dynabankwebapp4.D2ZEEdvK_Z1eWIS9.webp">

#### Diagnostic settings

1.  Back in Tab #3, scroll down to diagnostic settings and click (green box).
2.  Click _Add Diagnostic Setting_. <img src="../images/webappsetting.uNrdGcCq_ZP6mFT.webp">
3.  Click _App Service Application Logs_ (green box) and click _Stream to Event Hub_ (blue box).
4.  Make sure the hub namespace matches below & select the shown event hub. <img src="../images/appdiagnostic.BwoISPPj_Z16LYpa.webp">
5.  Click _save_ in the top left corner.

Hands On: API Mgmt
------------------

### Deployment

Once the Dynabank business teams confirmed initial success of Instamation, our next goal is to configure it to use Azure API Management.

1.  In Tab #3 Azure Portal, search for ‘APIM’ and click on _API Management services_.
2.  Click on the APIM for your region in the format _scw-\[region\]-apim_.
3.  Click on _API’s_ from the inset-left menu: <img src="../images/apim1.BpUr1eld_ZY4GfE.webp">
4.  And then click on _App Service_. <img src="../images/apim2.DDN2Xnsz_2nqoB4.webp">
5.  Click the `Browese` button.
6.  Type in your id (sessionX#). You should see ONE matching App Service. Select the App Service & click select at the bottom.
7.  Copy the name provided into the API URL suffix box. Your Base URL should look something like:

Terminal window

    https://scw-useast2-apim.azure-api.net/scw-webapp-colossalcactus

1.  Click _Create_.
2.  Find your API in the list, click on it (blue highlight), and then click _Settings_ at the top of the details box to the right (green highlight): <img src="../images/apim3.kXj5Qlqr_1wggyR.webp">
3.  Uncheck the _Subscription required_ option box (blue highlight). Click Save (green highlight). This will allow all connections to reach your Instamation service. <img src="../images/apim4.C94K5_BF_Z2wAlrj.webp">

:::tip Lab vs Real World In a real-world scenario we wouldn’t go without a subscription/authorization mechanism. We’re doing it here to keep the focus on Observability vs application configuration. Dynatrace will detect all traffic just fine with any configuration. :::

1.  Before leaving this screen, find the _Base URL_ of your service and copy it.
2.  Confirm it worked by pasting this URL into a new tab of your browser. You should see your service respond just fine behind the apim!
3.  In your Dynabank Operations portal (click orange button top right -> Operations), you can replace the Instamation Web App with the APIM version and click _save_. You should receive the same _succesfully configured_ message.

Hands On: Azure Log Forwarder
-----------------------------

With metrics and traces automatically ingested and baselined, our company wants to include logs as well. The Collecticare development teams use logs to write out critical business information like policy estimates and quoting decisions.

### Deployment

1.  In Tab #1, run the Pepper command to retrieve Dynatrace token information.
2.  Drag-select all EXPORT commands shown. Right-click and copy. Press _ENTER_ to quit Pepper.
3.  At the BASH command prompt, paste the EXPORT commands and press _ENTER_.
4.  Copy the Log Forwarder function below & paste it into the terminal window.

Terminal window

    wget -q https://github.com/dynatrace-oss/dynatrace-azure-log-forwarder/releases/latest/download/dynatrace-azure-logs.sh -O dynatrace-azure-logs.sh && chmod +x ./dynatrace-azure-logs.sh \&& ./dynatrace-azure-logs.sh --deployment-name $DEPLOYMENT_NAME --target-url $TARGET_URL --target-api-token $TARGET_API_TOKEN --resource-group $RESOURCE_GROUP --event-hub-connection-string $EVENT_HUB_CONNECTION_STRING --require-valid-certificate true

1.  It will take a few minutes to deploy all resources.

Hands On: Azure Monitor
-----------------------

### Deployment: Service Principal

1.  On Tab #1 in the terminal, exit Pepper if it is running.
2.  Run the command below to generate a Service Principal/App Registration:

Terminal window

    az ad sp create-for-rbac --name $DEPLOYMENT_NAME --role reader --scopes /subscriptions/9939cbf8-8de6-49a1-a641-b664b214838f --query "{ClientID:appId,TenantID:tenant,SecretKey:password}"

1.  In Tab #4 Dynatrace, Open the Settings App —> Cloud and Virtualization —> Azure.
2.  Click on Connect New instance.
3.  Choose a name for the connection.
4.  Add the ClientID, SecretKey and TenantID that exported from the Terminal Command line /Azure CLI.
5.  Click Connect. That’s it!
6.  Open the Azure App in Dynatrace to see all resources.

Tip

Since we’re running many copies of Dynabank in a ‘multiverse’ kind of scenario, you’ll obviously see them all in our Azure Classroom.  
But it does show how easily Dynatrace provides full visibility into an Azure environment with all services instantly tracked, organized, and tagged for easy business organization.

Bonus Hands On: Grail!
----------------------

### Introduction

The deployment of Instamation by Dynabank after the Collecticare acquisition was a great success technical success.  
With Dynatrace, we have full visibility into the entire quoting process and can see that quotes are fast and error free.

A big win!

Except that… the underwriting department is in a complete PANIC! <img src="../images/troubleshoot1.yOjzrqA5_Z1h1Gxy.webp">
 The automated instamation quoting system has produced quotes for $1 on extremely expensive items that will cause serious financial problems for Dynabank.

We can easily double-check that all quotes work technically. What could be going on?

### Logs and Business Events on Grail

With the Grail framework powering Log and Business Event ingestion, we can quickly dive into problems in business flows beyond technical issues.

1.  Download this [Grail notebook template](https://suchcodewow.io/manifests/ditl.json).
2.  On Tab #4 Dynatrace, open the Notebooks App.
3.  Click to create a new notebook.
4.  On the left inset panel, choose _Upload_.
5.  We’ll step through each example to see how Grail powers solutions beyond technical issues.

*   Index
    
    *   [Full Stack: Front-to-Back](#full-stack-front-to-back)
    *   [2) Pre-flight Check](#Pre-flightCheck)
    *   [3) Dynatrace Intro](#3---dynatrace-intro)
    *   [4) Deploy](#3---dynatrace-intro)
    *   [5) Explore: Dynabank](#5---explore-dynabank)
    *   [6) Release: Dynabank](#6---release-dynabank)
    *   [7) Troubleshoot!](#7---troubleshoot)
    *   [8) Customization](#8---customization)
    *   [9) Sessions / Session Replay](#9---sessions--session-replay)
    *   [A) Azure Specific](#a---azure-specific)
