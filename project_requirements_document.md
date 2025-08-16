Functional Requirements Document: Artifacts of Reflection
Version: 1.0
Date: August 14, 2025
Author: Grant Kilgard (Project Lead)
Project Goal: To create a minimalist, anonymous micro-social media site where users can submit stories about personal objects in response to evocative prompts. The site will serve as a public-facing ethnographic research tool, displaying submissions on a collective "wall" after manual moderation.
1. Guiding Principles
Simplicity Over Complexity: The technology must serve the research. Prioritize the simplest possible implementation at every step. This is a prototype, not a production-scale application.
Emotional Safety: The user experience must be calm, inviting, and respectful. The UI should be minimal and non-intrusive.
Researcher Control: The admin (the project lead) must have full control over what content becomes public. The moderation workflow is a critical feature.
2. User Personas
The Submitter (Anonymous User): A member of the public who visits the site to share a personal story. They are not required to create an account.
The Viewer (Anonymous User): A member of the public who visits the site to browse and read the collected stories.
The Admin (Researcher): The project lead (you) who manages content, curates the public wall, and uses the platform for research.
3. Functional Requirements & Tasks (MVP)
This outlines the essential features required for the capstone exhibition.
Feature 1: Anonymous User Session & Question Delivery
User Story: "As a new or returning user, I want to be greeted with a small, rotating set of questions so I can feel inspired to share a new story without being overwhelmed."
Task ID	Task Description	Acceptance Criteria (AC)	Priority
QD-01	Implement Anonymous User Identification	- On first visit, a unique, non-identifiable user ID is generated and stored in a client-side cookie or local storage.<br>- This ID persists between visits on the same browser.<br>- No personal information (email, name, etc.) is ever requested or stored.	High
QD-02	Create Question Bank	- Create a static array or simple JSON file within the application code containing 20-30 curated questions (using the "Claude" response as a source).<br>- Each question should have a unique ID and its text.	High
QD-03	Implement Question Serving Logic	- On page load, the system randomly selects three (3) questions from the bank.<br>- The system checks the user's local storage/cookie to see if they have answered any of the selected questions within the last 24 hours. If so, it attempts to select a different one.<br>- The three selected questions are displayed clearly to the user.	High
Feature 2: Story Submission Flow
User Story: "As a Submitter, I want to easily answer a prompt by uploading a photo and writing a short text, so that my story can be added to the collection."
Task ID	Task Description	Acceptance Criteria (AC)	Priority
SF-01	Build the Submission Form	- When a user clicks on a question, they are presented with a simple form.<br>- The form contains: 1) The selected question text (read-only), 2) A file input for a single image (.jpg, .png, .gif), 3) A textarea for the story.	High
SF-02	Implement Form Validation	- Client-Side: The "Submit" button is disabled until both an image is selected and text is entered.<br>- Server-Side: Submission is rejected if: image is missing, file is not an allowed type, or text is outside the 50-500 character limit.	High
SF-03	Create Submission Data Model & Storage	- Create a submissions table in a database (e.g., Supabase, Firebase Firestore) or a simple JSON file as a data store.<br>- The record must include: submission_id, user_id (from QD-01), question_text, story_text, image_path (URL after upload), status (default: 'pending'), created_at timestamp.	High
SF-04	Handle Image Upload	- Upon submission, the selected image is uploaded to a cloud storage service (e.g., Supabase Storage, Cloudinary).<br>- The server should strip EXIF data from the image before storing it to protect user privacy.<br>- The public URL of the stored image is saved in the submission record.	High
SF-05	Provide Submission Feedback	- After a successful submission, the user is shown a clear confirmation message (e.g., "Thank you. Your story has been submitted for review.").<br>- If submission fails, a clear error message is shown.	Medium
Feature 3: Admin Moderation
User Story: "As the Admin, I want a private, password-protected area where I can review all pending submissions and either approve or reject them, so I can curate the content on the public wall."
Task ID	Task Description	Acceptance Criteria (AC)	Priority
AM-01	Create a Protected Admin Route	- Create an /admin page that is not publicly accessible.<br>- Access is granted via a simple password check. The password should be stored as an environment variable, not in the code.	High
AM-02	Build the Moderation Queue UI	- The /admin page fetches all submissions with status: 'pending'.<br>- Each submission is displayed as a card showing the image, story text, and question.<br>- Each card has two buttons: "Approve" and "Reject."	High
AM-03	Implement Moderation Actions	- Clicking "Approve" updates the corresponding submission's status to 'approved'.<br>- Clicking "Reject" updates the status to 'rejected' (or deletes the record).<br>- The submission card is removed from the pending queue UI after an action is taken.	High
Feature 4: The Public "Wall" Display
User Story: "As a Viewer, I want to see all the approved stories and photos on a single page, so I can browse the collection and feel a sense of shared human experience."
Task ID	Task Description	Acceptance Criteria (AC)	Priority
WD-01	Create the Public Wall Page	- Create a public page (e.g., the homepage or /wall).<br>- The page fetches all submissions from the data store where status: 'approved'.	High
WD-02	Implement a Simple Grid Layout	- Approved submissions are displayed in a responsive grid (e.g., Masonry-style or a simple CSS grid).<br>- The grid should be ordered by created_at descending (newest first).<br>- Each grid item shows the submitted image.	High
WD-03	Implement Detail View	- When a user clicks on a grid item, a modal (or a separate page) opens.<br>- The detail view displays the full-size image, the question, and the full story text.	Medium
4. Non-Functional Requirements (NFRs)
Category	Requirement
Technology Stack	- Frontend: Next.js or Astro (for simplicity and server-side rendering).<br>- Styling: Tailwind CSS or plain CSS.<br>- Database: Supabase (recommended for integrated Auth/Storage/DB) or Firebase. A flat-file JSON database is an acceptable MVP alternative.<br>- Hosting: Vercel or Netlify.
Performance	- Images displayed on the wall should be optimized (e.g., served in a modern format like .webp and appropriately sized).<br>- The wall page should load in under 3 seconds on a standard connection.
Usability	- The UI must be fully responsive and function on mobile, tablet, and desktop.<br>- All text must have sufficient color contrast to be legible (WCAG AA).<br>- A simple "About" page must be present to explain the project's intent and privacy policy.
5. Phased Rollout Plan (Post-MVP / Stretch Goals)
These tasks should only be considered after all MVP tasks are complete.
Task ID	Feature Description
V2-01	Submission Tagging: Allow users to add optional tags (e.g., material, emotion) during submission.
V2-02	Wall Filtering: Add controls to the wall page to filter submissions by their tags.
V2-03	"Resonance" Button: Add a "this resonates with me" button to the detail view, allowing a simple, anonymous form of interaction.
V2-04	Advanced Wall Visualization: Explore using a canvas-based library (like d3-zoom) to create a more dynamic, "infinite" wall experience.
V2-05	Admin Dashboard: Enhance the admin page to show basic stats (e.g., number of pending/approved submissions).