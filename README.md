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

With our innovative and scalable solution, personalized education reaches new heights of productivity and efficiency for students and instructors. 

## How we built it
We used ReactJS for the frontend and Google Cloud Platform's Firebase for the backend database. For our livestreaming service, we used an open sourced API called Mux with a NodeJS backend to connect to Firebase. 

## Challenges we ran into
Our biggest challenge originated from the hackathon's time constraint. In our brainstorming, we had an endless list of features we wanted to add that could be injected straight into a modern school system. The challenge came from having to remove features that would not be completed before the end of the competition while still maintaining the integrity of the core application and its original focus. Prioritizing essential features meant leaving behind impactful additions. 

We also ran into major issues with our livestreaming service latency with the heavy traffic gym-WiFi. Testing at home or in the library produced fantastic results with the streaming due to stronger WiFi.


## Accomplishments that we're proud of
We’ve accomplished so much this weekend. Overall, we were able to see our project through from an idea on a whiteboard to polished software. Some of the features we are most proud of include high quality live streaming, real time chat and ticketing systems, and recorded office hours. All in all, we developed a tangible, impactful solution to the problem we wanted to address. We were able to provide a virtual experience that significantly improved the efficiency of office hours as we know them.

## What we learned
We learned that building something meaningful in 48 hours is more difficult than it looks. To solve this, we improved our efficiency as a team. Other than that, everyone on the team ended up learning something new along with way, whether that be integrating with Firebase or setting up end to end live streaming.

## What's next for Virtus
Virtus has unlimited potential. One feature we plan to add in the future is time stamping for when the TA answers a questions. This would allow students to easily navigate to a specific question being answered by the TA during the office hour recording. Other possible features could include a live chat replay during recorded office hours, and auto clipping recordings that match with a corresponding text transcript.
