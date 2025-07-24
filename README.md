# Comprehensive Bilingual Resume Builder Application

This project is a sophisticated web application designed to help users create comprehensive, bilingual resumes with ease. It features a multi-step form, various customization options, and AI integration for optimized resume generation.

## Features

  * **Multi-Step Resume Building:** A guided, step-by-step process for inputting personal information, work experience, education, skills, projects, and certifications.
  * **Bilingual Support:** Seamlessly switch between English and German, with content and formatting adjusted for each language.
  * **Multiple Resume Templates:** Choose from various professional templates, including Modern, Classic, Creative, and Minimal designs, to customize the visual appeal of your resume.
  * **Real-time Preview:** See changes reflected instantly with a live preview of your resume.
  * **AI Optimization:** Leverage AI (via Mistral Large API) to optimize resume content for specific job descriptions, enhancing your application's effectiveness.
  * **Download Functionality:** Download your finalized resume as a PDF.

## Technologies Used

This project is built using modern web technologies to provide a robust and responsive user experience.

  * **Frontend:**
      * **React:** A JavaScript library for building user interfaces.
      * **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
      * **Vite:** A fast build tool that provides a lightning-fast development experience.
      * **Tailwind CSS:** A utility-first CSS framework for rapidly styling the application.
  * **State Management:** React Context API for managing the application's state, including resume data and UI steps.
  * **Icons:** Lucide React for a collection of beautiful and customizable SVG icons.
  * **Linting:** ESLint with TypeScript ESLint and React-specific plugins for code quality and consistency.
  * **AI Integration:** Mistral Large API (planned/mocked) for resume optimization.

## Project Structure

The project follows a component-based architecture, with a clear separation of concerns:

  * `src/App.tsx`: The main application component, setting up context providers and routing.
  * `src/components/`: Contains all reusable UI components.
      * `Editor/`: Components related to the resume editing forms.
      * `Preview/`: Components for displaying the resume preview and different templates.
      * `Header/`: Application header with language switching.
      * `Sidebar/`: Navigation for resume sections.
  * `src/contexts/`: React Contexts for global state management (e.g., `ResumeContext`, `LanguageContext`).
  * `src/types/`: TypeScript type definitions for resume data structures.
  * `src/main.tsx`: Entry point of the React application.
  * `public/index.html`: The main HTML file for the application.

## Installation and Usage

To get this project up and running on your local machine, follow these steps:

### Prerequisites

  * Node.js (v18 or higher recommended)
  * npm or Yarn

### Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd comprehensive-resume-builder
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

1.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    This will start the Vite development server, and you can access the application in your browser at `http://localhost:5173` (or another port if 5173 is in use).

2.  **Build for production:**

    ```bash
    npm run build
    # or
    yarn build
    ```

    This command will compile the application into the `dist` directory, ready for deployment.

## Scripts

  * `npm run dev`: Starts the development server.
  * `npm run build`: Builds the application for production.
  * `npm run lint`: Runs ESLint to check for code quality issues.
  * `npm run preview`: Previews the production build locally.

## Contributing

Contributions are welcome\! Please feel free to submit issues, fork the repository, and send pull requests.

## License

This project is open-sourced under the GNU GPL.