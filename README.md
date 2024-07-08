## Description

This project is a web application designed to help users create and manage their professional resumes. It includes features for uploading resumes, managing personal details, skills, and professional experiences.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#Components)
- [Dependencies](#dependencies)
- [Contact](#contact)

## Features

1. **Resume Upload**
2. **Personal Details Upload**
3. **Skills Section**
4. **Professional Experience**

## Demo

[Live demo link](https://d-tech-inky.vercel.app/)

## Installation

1. Clone the repository
   ```sh
   git clone hhttps://github.com/Alausa-AbdulAzeez/d-tech.git
   ```
2. Navigate to the project directory
   ```sh
   cd d-tech
   ```
3. Install the dependencies
   ```sh
   npm install
   ```
4. **Start the development server:**
   ```sh
   npm run dev
   ```

## Usage

### Resume Upload

Users can upload their resumes directly to the application. The uploaded resume will be stored and can be viewed or replaced as needed.

### Personal Details Upload

Users can input their personal details including name, contact information, and other relevant information. This section ensures that all necessary personal details are included in the resume.

### Skills Section

Users can add multiple skills to their profile. The skills are displayed in a list and can be updated or removed as needed.

### Professional Experience

Users can add, edit, and delete their professional experiences. Each entry includes the job role, employer, country, city/state/province, start date, end date (if applicable), skills used in the job, and a detailed job description. The job description is handled using a rich text editor.

#### Adding Professional Experience

1. Click on the "Add new experience" button.
2. Fill out the form with the necessary details.
3. Click "Save" to store the experience in local storage.
4. The form will reset after submission.

#### Editing Professional Experience

1. Click the edit icon next to the experience you want to edit.
2. Update the necessary details in the form.
3. Click "Save" to update the experience in local storage.

#### Deleting Professional Experience

1. Click the delete icon next to the experience you want to remove.
2. Confirm the deletion.

## Components

### ResumeUpload

Handles the functionality for users to upload their resumes. It includes file input and validation to ensure the uploaded file is in an acceptable format (e.g., PDF, DOCX).

### PersonalDetailsForm

Allows users to input and update their personal details such as name, email, phone number, and address. This component ensures that the personal information is always up-to-date.

### SkillsSection

Enables users to add, edit, and delete skills. Skills are displayed in a list format and can be updated as the user gains new skills or wants to remove old ones.

### ProfessionalExperienceForm

Handles the form for adding and editing professional experiences. It includes fields for job role, employer, country, city/state/province, start date, end date, skills, and job description. The job description uses a rich text editor.

### SingleWorkHistory

Displays a single entry of professional experience. It includes the employer, job role, location, duration, skills, and job description. It also provides edit and delete functionalities.

## Local Storage

Professional experiences, resumes, personal details, and skills are stored in the local storage as separate arrays of objects. Each object contains the necessary fields relevant to its section.

## Dependencies

- React
- React Router DOM
- React Select
- React Quill
- React Toastify
- Iconify

## Contact

For questions or support, please contact:

- Email address - [alausaabdulazeez@gmail.com](mailto:alausaabdulazeez@gmail.com)
- Project Link: [https://github.com/Alausa-AbdulAzeez/d-tech.git](https://github.com/Alausa-AbdulAzeez/d-tech.git)

