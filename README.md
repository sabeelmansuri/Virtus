# Virtus
*Created by: Sabeel Mansuri, Subhash Ramesh, Ayush Shukla, Nikhil Pathak*  
*SD Hacks 2019*  

## Inspiration
The demand for education is increasing with each passing year, forcing colleges to admit more and more students. This has led
to larger class sizes where, unfortunately, professors have no choice but to mass-lecture to hundreds of students. 
In the face of this generic learning experience, our vision is to make personalized education feasible.

In our experience, office hours provide an invaluable, personalized opportunity at getting help. Students are able to directly
speak with instructors/assistants, get instant feedback, and truly digest the material.

However, office hours are limited. Restricted to small rooms or a few tables and only available for a few hours
scattered throughout the week, it's far too easy for students to not get the help they need. And, with the rise in admissions, 
it's becoming obvious that office hours don't scale. Our solution: Virtus.

## What it does
Virtus is a platform for hosting online office hours. Instructors can register their class, set up a 
broadcast, and host their office hours remotely. Students can then join the stream, submit questions to the instructor, and 
collaborate with other students in a chatroom, gaining a personalized education without the limitations of a physical
room.

Virtus also removes the temporal bounds of traditional office hours: all broadcasts are automatically saved as recordings after 
they've ended, allowing students who cannot make the session to learn at a time convenient for them. This also saves 
instructors from having to manage hoards of students, many of whom come to learn from other students' questions.

Virtus is a scalable solution for personalized education that makes office hours more productive and efficient for students and instructors.

## How we built it
We used ReactJS for the frontend, Google Cloud Platform's Firebase for the backend database, and NodeJS to connect the frontend and backend. For our livestreaming service, we used Mux, an open sourced API. 

## Challenges we ran into
Our biggest challenge was balancing ideation and feasability. We had brainstormed an endless list of features for Virtus that would help re-personalize modern education. Given the hackathon's time constraint, however, we were forced to chip away while still maintiaining the integrity and focus of the product. Prioritizing essential features meant understanding the value of Virtus, and deciding how best to provide that. 

The major technical challenge we encountered was livestreaming service latency. Caused by the heavy traffic of the gym-WiFi, high latency made testing and development difficult. Using Virtus at home or in the library, however, produced excellent results.

## Accomplishments that we're proud of
So, so many. We've developed an impactful solution to the problem we wanted to tackle. Seeing Virtus come to life from an idea to a whiteboard to a polished software was indcredible. We're particularly proud of the high qualtiy livestream, realtime chat and ticketing systems, and automatic saved recordings--all of which help make virtual office hours a scalable solution to educational needs.

## What we learned
Personally, we learned how difficult it is to build something meaningful in 36 hours. As the hackathon progressed, we became better at dividing work and communicating, greatly boosting our efficiency.

Technically, everyone on our team ended up learning at least one new technology along the way, whether it be Firebase integration or setting up end-to-end livestreaming.

## What's next for Virtus
One of the hallmarks of Virtus is its potential to expand. For example, we want to add timestamps for when instructors answer a question, allowing students to easily view and navigate to when a question they have was answered. Other planned features include a live chat replay during recorded office hours, and generating transcripts for recordings for easy searchability.


After completing these features, we'd love to try a beta with some instructors!
