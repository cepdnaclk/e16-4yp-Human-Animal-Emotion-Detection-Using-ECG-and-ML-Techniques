---
layout: home
permalink: index.html

# Please update this with your repository name and title
repository-name: e16-4yp-Human-Animal-Emotion-Detection-Using-ECG-and-ML-Techniques
title: Human/Animal Emotion Detection Using ECG and ML Techniques
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Project Title

#### Team

- E/16/069, De Silva M.D.S., [email](mailto:e16069@eng.pdn.ac.lk)
- E/16/070, De Silva N.S.C.K.S., [email](mailto:e16070@eng.pdn.ac.lk)
- E/16/232, Marzook F.S. , [email](e16232@eng.pdn.ac.lk)

#### Supervisors

- Prof. Roshan Ragel, [email](mailto:roshanr@eng.pdn.ac.lk)
- Dr. Isuru Nawinne, [email](mailto:isurunawinne@eng.pdn.ac.lk)
- Dr. Mahanama Wickramasinghe, [email](mailto:mahanamaw@eng.pdn.ac.lk)
- Dr. Suranji Wijekoon, [email](mailto:suranjisk@gmail.com)
- Mr. Theekshana Dissanayake, [email](mailto:theekshanadis@eng.pdn.ac.lk)

#### Table of content

1. [Abstract](#abstract)
3. [Methodology](#methodology)
4. [Experiment Setup](#experiment-setup)
5. [Publications](#publications)
6. [Links](#links)

---
## Abstract
Different kinds of machine learning models have recently been used by researchers in the field of biosensor-based human emotion recognition to identify human emotions. With only a few bio-sensors integrated, the majority of them still lack the capacity to identify human emotions with greater classification accuracy as well as the ability to identify many emotions. Convolutional neural networks have been successfully used in the machine learning field to address a variety of practical machine learning issues requiring increased classification accuracy. To emphasize that, this study proposes a deep learning method using convolutional neural networks to implement a model using electrocardiogram (ECG) signals.  Using 25 subjects, data was collected using video and audio as the emotion elicitation technique to create a dataset that consists data of nine emotions which were chosen from the valence-arousal-dominance 3D emotional model. This dataset was preprocessed and prepared to train and test the 2D CNN models. Three 2D CNN classifiers are implemented in this study. A valence based emotion classification model, an arousal based emotion classification model and a nine emotion classification model to predict the valence, arousal and the dominance values of the ECG signal and map those values to the valence-arousal-dominance 3D plane and predict the emotion. The valence based emotion classification model resulted in an accuracy of 70%, the arousal based emotion classification model resulted in an accuracy of 65% and the nine emotion classification model an accuracy of 40%.  Furthermore, we explored the possibility of using the valence based emotion classification model to predict emotions of animals, specifically the dogs and were able to predict results with an accuracy of 32%. 

[//]: # "##Related works"

## Methodology

<p align="center">
    <img src="./images/Methodology Overview.png"  width="1000" /><br />
    <span><i>Figure 01: Methodology Overview</i></span>
</p>

The overall procedure of the proposed emotion recognition model is shown in Figure 01. The ECG signals related to selected nine different emotions were collected by following an experimental setup. Emotions were elicited using short video clips selected from movies. To record the ECG signals the spiker shield heart and brain sensor were used together with the web application developed to automate the data collection process. The collected ECG signals were divided into identical durations of 20 seconds. After that, the segmented raw ECG signals were pr processed using different techniques to remove noises and transform them into normal form. Afterward, each ECG signal record was transformed into an image of a time-frequency spectrogram using the short-time Fourier transform (STFT). The ECG spectrogram images were fed into proposed deep two-dimensional convolutional neural network (CNN) models. 

Based on the two-dimensional emotional model collected, ECG Signals were categorized in three ways. First, categorization was done based on distinct emotions.  In that categorization, signals were categorized into nine classes. The second categorization was done based on the valance of each emotion. In that case, ECG signals were categorized into two classes, positive and negative. The third categorization was done based on the arousal of emotions and ECG Signals were categorized into two classes, active and passive. A deep two-dimensional convolutional neural network (CNN) model was developed for the three categorization methods mentioned above.

As an extension to the research, the possibility of recognizing animal emotions using the emotion recognition model developed using human data was explored. For that, the model based on the valence was used. Dogs were selected to experiment.  

## Experiment Setup 
<p align="center">
    <img src="./images/Electrode Placement_Human.jpeg"  width="250" /><br />
    <span><i>Figure 02: Electrode Placement in Human</i></span>
</p>

<p align="center">
    <img src="./images/Experimental Setup_Human.jpg"  width="250" /><br />
    <span><i>Figure 03: Experimental Setup of Human</i></span>
</p>

<p align="center">
    <img src="./images/Electrode Placement_Animal.png"  width="250" /><br />
    <span><i>Figure 04: Electrode Placement in Animal</i></span>
</p>

<p align="center">
    <img src="./images/Experimental Setup_Animal.jpg"  width="250" /><br />
    <span><i>Figure 05: Experimental Setup of Animal</i></span>
</p>


## Publications
[//]: # "Note: Uncomment each once you uploaded the files to the repository"

1. [Semester 7 report](./Publications/Review%20Paper.pdf)
2. [Semester 7 slides](./Publications/Semester_7_Final_Evaluation_Slides.pdf)
3. [Semester 8 report](./)
4. [Semester 8 slides](./Publications/Semester_8_Final_Evaluation_Slides.pdf)
<!-- 5. Author 1, Author 2 and Author 3 "Research paper title" (2021). [PDF](./). -->

## Links

[//]: # ( NOTE: EDIT THIS LINKS WITH YOUR REPO DETAILS )

- [Project Repository](https://github.com/cepdnaclk/e16-4yp-Human-Animal-Emotion-Detection-Using-ECG-and-ML-Techniques)
- [Project Page](https://cepdnaclk.github.io/e16-4yp-Human-Animal-Emotion-Detection-Using-ECG-and-ML-Techniques/)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # "Please refer this to learn more about Markdown syntax"
[//]: # "https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
