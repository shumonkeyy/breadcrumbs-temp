# Breadcrumbs

Breadcrumbs is a student- and family-friendly website designed to help students and families navigate and learn more about 3 out of 5 Jefferson Union High School District (Westmoor, Oceana, and Jefferson High Schools). The purpose of the website is to be a centralized resource platform where new students (specifically, freshmen and transfer students) can find information regarding their schools so they can find a community and settle faster. The website includes interactive school maps and visuals to help students get familiar with their school campus, with descriptions accompanying the visuals. Frequently Asked Questions and club information are provided about each school site so new students can explore opportunities to get involved, build connections, and discover new interests. Counseling information is also included to connect students and families with helpful resources and support from the school.

In order to help with the maintenance of the website, an administrative dashboard was built for Breadcrumbs in order to ensure that the website lasts beyond our grade of students and can be sustained by the administration teams of each school. Translations in 6 different languages were also implemented. Currently, it is being employed by the district and is provided as a resource for over 2500 students.  

Due to safety reasons, the code of the original Breadcrumbs could not be published. This is a template of Breadcrumbs with all the school information removed, so if you want to reference it for your own version of Breadcrumbs, feel free to!

**Live Demo:** [breadcrumbs-temp.vercel.app](https://breadcrumbs-temp.vercel.app)

![Breadcrumbs App Screenshot](./public/screenshot.png)

## Tech Stack
* **Javascript:** ReactJS, FramerMotion, FontAwesome, Bootstrap.js
* **API:** Firebase Firecloud, Google Translate
* **Markup** CSS 3, Google Fonts, Bootstrap.css
* **Infrastructure** Vite, Vercel

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (version 18 or higher recommended) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com
   ```
2. Navigate to the project directory:
   ```bash
   cd breadcrumbs-temp
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add your keys:
   ```env
   VITE_FIREBASE_API_KEY=your_value_here
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   Open the local server in your browser to view the app.

## Roadmap
* [ ] Additional languages
* [ ] Better UI!
* [ ] Feedback Area to fix potential errors in information

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
